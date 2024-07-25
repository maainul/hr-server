
import EmployeeLeaveBalanceModel from '../model/employeeLeaveBalanceModel.js'
import { validateEmployeeLeaveBalance } from './../validations/employeeLeaveBalanceValidation.js';
import Employee from './../model/EmployeeModel.js';
import { EmployeeNotExists, LeaveTypeNotExists } from '../utils/errorMessage.js';
import LeaveTypeModel from '../model/leaveTypeModel.js';
import { getAllEmployeeLeaveBalanceWithPaginationService } from './../services/getAllEmployeeLeaveBalanceWithPaginationService.js';

export const createEmployeeLeaveBalanceCtrl = async (req, res) => {
    try {
        const { error, value } = validateEmployeeLeaveBalance(req.body)
        if (error) {
            const formattedErrors = error.details.map(detail => {
                return {
                    label: detail.context.label,
                    message: detail.message.replace(/"/g, '') // Corrected the replace method
                }
            })
            return res.status(400).json({
                success: false,
                error: formattedErrors
            })
        }
        const errors = [];

        const empExists = await Employee.findOne({ '_id': req.body.employee })
        if (!empExists) {
            errors.push({
                label: 'employee',
                message: EmployeeNotExists
            })
        }

        const leaveTyp = await LeaveTypeModel.findOne({ '_id': req.body.leaveType })
        if (!leaveTyp) {
            errors.push({
                label: 'leaveType',
                message: LeaveTypeNotExists
            })
        }

        if (errors.length > 0) {
            return res.status(400).json({
                success: false,
                error: error
            })
        }

        const newEmpLv = await EmployeeLeaveBalanceModel.create(value)
        return res.status(201).json({
            success: true,
            newEmpLv,
            message: 'New Employee Leave Balannce Added Successfully'
        })


    } catch (error) {
        console.error("Error Creating Employee Leave Balance:", error);
        return res.status(500).json({
            success: false,
            message: "Error Creating Employee Leave Balance",
            error: error.message
        });
    }
}


export const getEmployeeLeaveBalanceCtrl = async (req, res) => {
    try {
        const employeeLeaveBlnc = await getAllEmployeeLeaveBalanceWithPaginationService({ req });
        return res.status(200).json({
            success: true,
            ...employeeLeaveBlnc,
            message: 'All employee leave balance retrieve successfully'
        })
    } catch (error) {
        console.error("Error in getting all employee leaves balance:", error);
        return res.status(500).json({
            success: false,
            message: 'Error in getting all employee leaves balance',
            error: error.message || error,
        });
    }
}



export const updateEmployeeLeaveBalanceCtrl = async (req, res) => {
    try {
        const { employeeID, leaveTypeID } = req.query
        const { numberOfDays, pendingFlag } = req.body
        console.log(employeeID, leaveTypeID, numberOfDays, pendingFlag)

        // find by employee and leave id

        // if pending status is = 1 then update pending field to number of days


        // if pending status = 0 then update pending field and update data to totalLeaveTaken and update leveBalcne to = totalLeave - totalLeaveTaken

        // return 

    } catch (error) {

    }
}