import mongoose from "mongoose";
import EmployeeModel from "../model/EmployeeModel.js"


export const getAllEmployeeWithPaginationService = async ({ req }) => {
    try {
        // Query Param For Search
        const { search = '', sort = 'latest', page = 1, limit = 10 } = req.query;

        //Search
        let matchStage = {}
        if (search) {
            const isNumeric = !isNaN(search)

            if (isNumeric) {
                matchStage = {
                    $or: [
                        { national_id: Number(search) },
                    ]
                }
            } else {
                matchStage = {
                    $or: [
                        { full_name: { $regex: search, $options: "i" } },
                        { phone: { $regex: search, $options: "i" } },
                        { email: { $regex: search, $options: "i" } },
                    ]
                }
            }
        }

        //Sorting
        let sortStage = {}
        if (sort === 'latest') sortStage.createdAt = -1;
        if (sort === 'oldest') sortStage.createdAt = 1;
        if (sort === 'a-z') sortStage.full_name = 1;
        if (sort === 'z-a') sortStage.full_name = -1;


        //Pagination
        const pageNumber = Number(page)
        const limitNumber = Number(limit)
        const skip = (pageNumber - 1) * limitNumber

        const employees = await EmployeeModel.aggregate([
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
                    from: 'salarygrades',
                    localField: 'salary_grade',
                    foreignField: '_id',
                    as: 'salaryGradeInfo'
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
                    path: '$salaryGradeInfo',
                    preserveNullAndEmptyArrays: true
                }
            },
        ])

        const totalDataCount = await EmployeeModel.countDocuments(matchStage)
        const numberOfPages = Math.ceil(totalDataCount / limitNumber)
        const upToPageTotalData = Math.min(pageNumber * limitNumber, totalDataCount)

        const startPageData = skip + 1

        return {
            start: startPageData,
            currentPageData: employees.length,
            totalData: totalDataCount,
            totalNumberOfPages: numberOfPages,
            data: employees,
            upToPageTotalData: upToPageTotalData
        }
    } catch (error) {
        throw new Error(`Error in getAllEmployeeWithPaginationService: ${error.message}`);
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

export const getSingleEmployeeService = async (id) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error("Invalid Employee ID format");
        }

        const employee = await EmployeeModel.aggregate([
            { $match: { _id: mongoose.Types.ObjectId(id) } },
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
                    from: 'salarygrades',
                    localField: 'salary_grade',
                    foreignField: '_id',
                    as: 'salaryGradeInfo'
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
                    path: '$salaryGradeInfo',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $addFields: {
                    "departmentInfo.name": "$departmentInfo.name",
                    "departmentInfo.status": "$departmentInfo.status",
                    "designationInfo.name": "$designationInfo.name",
                    "designationInfo.status": "$designationInfo.status",
                    "salaryGradeInfo.grade_name": "$salaryGradeInfo.grade_name",
                    "salaryGradeInfo.min_salary": "$salaryGradeInfo.min_salary",
                    "salaryGradeInfo.max_salary": "$salaryGradeInfo.max_salary",
                    "salaryGradeInfo.status": "$salaryGradeInfo.status"
                }
            },
            {
                $project: {
                    name: 1,
                    dptCode: 1,
                    createdAt: 1,
                    full_name: 1,
                    departmentInfo: 1,
                    designationInfo: 1,
                    salaryGradeInfo: 1
                }
            }
        ]);

        if (employee.length === 0) {
            throw new Error("Employee not found");
        }

        return employee[0];
    } catch (error) {
        return Error(error.message);
    }
};
