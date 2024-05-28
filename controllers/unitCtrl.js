import {validateUnit} from '../validations/unitValidation.js'
import UnitModel from '../model/unitModel.js'
import DivisionModel from '../model/divisionModel.js';
import { getAllUnitWithPaginationService } from '../services/unitServices.js';
import mongoose from 'mongoose';


export const createUnitCtrl = async (req, res) => {
    try {
           const { name, status, division } = req.body;
           console.log('Received data:', { name, status, division });
          

            //Joi Validation
            const {error,value} = validateUnit(req.body)
            if(error){
                const formattedErrors = error.details.map(detail =>{
                    return{
                        label:detail.context.label,
                        message: detail.message.replace(/"/g, '') // Corrected the replace method
                    }
                })
                return res.status(400).json({
                    success:false,
                    error:formattedErrors
                })
            }

            // Collect errors
            const errors = [];

            // Check if Unit name already exists
            const nameExists = await UnitModel.findOne({ name });
            if (nameExists) {
                errors.push({
                    label: 'name',
                    message: "Unit Name Already Exists"
                });
            }
            

            // If there are errors, return them
            if (errors.length > 0) {
                return res.status(400).json({
                    success: false,
                    error: errors
                });
            }

            //Create New UnitModel
            const newUnit = await UnitModel.create(value)
            return res.status(201).json({
                success:true,
                newUnit,
                message:"New Unit Added Successfully"
            })
        
        } catch (error) {
            console.error("Error Creating Unit:", error);
            return res.status(500).json({
                success: false,
                message: "Error Creating Unit",
                error: error.message
            });
        }
};

export const getUnitCtrl = async (req, res) => {
    try {
        //Fetch all UnitModel from the database
        const Units = await getAllUnitWithPaginationService({req});

        return res.status(200).json({
            success: true,
            ...Units,
            message:'All Units retrieved successfully',
        });
    } catch (error) {
        console.error("Error in getting all Unit :", error);
        return res.status(500).json({
            success: false,
            message: 'Error in getting all Units',
            error: error.message || error,
        });
    }
};

// Update UnitModels Status
export const updateUnitStatusCtrl = async(req,res)=>{
    try {
        const {status,id} = req.query
       
        // Validate presence of id and status
        if(!id || !status){
            return res.status(400).json({error:"Missing id or status"})
        }
        
        // Validate status is valid
        const validStatuses = [1,2]
        if(!validStatuses.includes(Number(status))){
            return res.status(400).json({error:"Invalid status value"})
        }

        // Find UnitModel by id
        const singleUnit = await UnitModel.findById(id)
        if(!singleUnit){
            return res.status(404).json({error:"Unit Not Found"})
        }


        // Update the UnitModels status
        singleUnit.status = status
        await singleUnit.save();

        return res.status(200).json({
            success:true,
            message: "Unit status updated successfully",
            data: singleUnit
        })

    } catch (error) {
       console.error("Error in updateUnitStatusCtrl:", error);
       return res.status(500).json({
        success:false,
        message:"Error in updating Unit status",
        error:error.message || error
       })

    }
}

//Get Single UnitModel Details
export const getSingleUnitCtrl = async (req, res) => {
    try {
        const {id} = req.params

        //Validate the ID
        if(!id){
            return res.status(400).json({error:"Unit ID is Required"})
        }

        // Validate the ID format before processing 
        /*
        Reason : Remove or add new character in id.
        Message: BSONError: input must be a 24 character hex string, 12 byte Uint8Array, or an integer

        */

        if(!mongoose.Types.ObjectId.isValid(id)){
             return res.status(400).json({ success: false, error: "Invalid Unit ID format" });
        }

       // Find the UnitModel by ID and populate the 'division' field to get division details
        const unit = await UnitModel.findById(id)

        if (!unit) {
            return res.status(404).json({ error: "Unit not Found" });
        }
       
       // Return the UnitModel details along with division name
        return res.status(200).json({
            success: true,
            message: "Unit Data Found",
            data:unit,
            
        });

        
    } catch (error) {
        console.error("Error in getSingleUnitCtrl:", error);
         return res.status(500).json({
            success: false,
            message: "Error in fetching Unit details",
            error: error.message || error,
        });
    }

}

// Update Unit Details
export const updateUnitCtrl = async (req, res) => {
    try {
        const {id} = req.params
        const {name,code} = req.body

        // Validate the ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, error: "Invalid Unit ID format" });
        }

        // Check if the Unit exists
         const unit = await UnitModel.findById(id);
        if(!unit){
            return res.status(404).json({ success: false, error: "Unit not found" });
        }
        
        // Update the UnitModel details
        if (name) unit.name = name
        if(code) unit.dptCode = code

        // Save the update UnitModel
        await unit.save()

        // Return the updated UnitModel details
        return res.status(200).json({
            success:true,
            unit,
            message:"Update Unit Data."
        })



    } catch (error) {
        console.error("Error in updateUnitCtrl:", error);
         return res.status(500).json({
            success: false,
            message: "Error in updating Unit details",
            error: error.message || error,
        });
    }
}