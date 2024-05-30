import mongoose from "mongoose";
import DocumentModel from "../model/documentModel.js"


export const getAllDocumentWithPaginationService = async ({ req }) => {
    try {
        // Query Param For Search
        const { search = '', sort = 'latest', page = 1, limit = 10 } = req.query;

        //Search
        let matchStage = {}
        if (search) {
            matchStage = {
                $or: [
                    { document_code: { $regex: search, $options: "i" } },
                    { document_name: { $regex: search, $options: "i" } },
                    { longdescription: { $regex: search, $options: "i" } },
                    { shortdescription: { $regex: search, $options: "i" } },
                    { document_type: { $regex: search, $options: "i" } }
                ]
            }

        }

        //Sorting
        let sortStage = {}
        if (sort === 'latest') sortStage.createdAt = -1;
        if (sort === 'oldest') sortStage.createdAt = 1;
        if (sort === 'a-z') sortStage.document_code = 1;
        if (sort === 'z-a') sortStage.document_code = -1;


        //Pagination
        const pageNumber = Number(page)
        const limitNumber = Number(limit)
        const skip = (pageNumber - 1) * limitNumber

        const documents = await DocumentModel.aggregate([
            { $match: matchStage },
            { $sort: sortStage },
            { $skip: skip },
            { $limit: limitNumber },
            {
                $lookup: {
                    from: 'departments',
                    localField: 'department',
                    foreignField: '_id',
                    as: 'departmentInfo'
                }
            },
            {
                $lookup: {
                    from: 'designations',
                    localField: 'designation',
                    foreignField: '_id',
                    as: 'designationInfo'
                }
            },
            {
                $lookup: {
                    from: 'units',
                    localField: 'unit',
                    foreignField: '_id',
                    as: 'unitInfo'
                }
            },
            {
                $lookup: {
                    from: 'emloyees',
                    localField: 'employee',
                    foreignField: '_id',
                    as: 'employeeInfo'
                }
            },
            {
                $unwind: {
                    path: '$departmentInfo',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $unwind: {
                    path: '$designationInfo',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $unwind: {
                    path: '$unitInfo',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $unwind: {
                    path: '$employeeInfo',
                    preserveNullAndEmptyArrays: true
                }
            },
        ])

        const totalDataCount = await DocumentModel.countDocuments(matchStage)
        const numberOfPages = Math.ceil(totalDataCount / limitNumber)

        return {
            success: true,
            "currentPageData": documents.length,
            "totalData": totalDataCount,
            "totalNumberOfPages": numberOfPages,
            "data": documents,
            message: "All Documents retrieved successfully"
        }
    } catch (error) {
        throw new Error(`Error in getAllDocumetnWithPaginationService: ${error.message}`);
    }
}



/******************************************** DOC *************************************

### Explanation:
1. **Match Stage**:
   Filters employees based on the search query.

2. **Sort Stage**:
   Sorts the results based on the `sort` parameter.

3. **Pagination**:
   Skips and limits the number of results based on the `page` and `limit` parameters.

4. **Lookup Stages**:
   Joins the `EmployeeModel` with `DepartmentModel`, `DesignationModel`, and `SalaryGradeModel` using the `$lookup` aggregation stage.

5. **Unwind Stages**:
   Ensures that each document in the arrays resulting from `$lookup` stages is converted to a single document. 
   `preserveNullAndEmptyArrays` ensures employees without related documents still appear in the result.

6. **Project Stage**:
   Reshapes the documents to include only the necessary fields from the related collections. This example assumes you only need `name` and `status` from `departmentInfo`, and similar selective fields from `designationInfo` and `salaryGradeInfo`.
***********/
