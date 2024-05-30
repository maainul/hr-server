import EmployeeSalaryModel from "../model/employeeSalaryModel.js"


export const getAllEmployeeSalaryWithPaginationService = async ({ req }) => {
    try {
        // Query Param For Search
        const { search = '', sort = 'latest', page = 1, limit = 10 } = req.query;

        //Conditions for searching filters
        let matchStage = {}

        //Check Search for Query
        if (search) {
            //Search by name or code
            matchStage = {
                $or: [
                    { name: { $regex: search, $options: "i" } },
                ]
            }
        }

        // Build Mongoose Query Based on Search
        let sortStage = {}

        //Sorting
        if (sort === 'latest') sortStage.createdAt = -1
        if (sort === 'oldest') sortStage.createdAt = 1

        //Pagination
        const pageNumber = Number(page)
        const limitNumber = Number(limit)
        const skip = (pageNumber - 1) * limitNumber


        // unit data fetch
        const unit = await EmployeeSalaryModel.aggregate([
            { $match: matchStage },
            { $sort: sortStage },
            { $skip: skip },
            { $limit: limitNumber },
            {
                $lookup: {
                    from: 'employees',
                    localField: 'employee',
                    foreignField: '_id',
                    as: 'employeeInfo'
                }
            },
            {
                $unwind: {
                    path: '$employeeInfo',
                    preserveNullAndEmptyArrays: true
                }
            },
        ])

        const totalDataCount = await EmployeeSalaryModel.countDocuments(matchStage)
        const numberOfPages = Math.ceil(totalDataCount / limitNumber)

        return {
            success: true,
            "currentPageData": unit.length,
            "totalData": totalDataCount,
            "totalNumberOfPages": numberOfPages,
            "data": unit,
            message: "All Employee Salary retrieve successfully"
        }
    } catch (error) {
        throw new Error(`Error in getAllEmployeeSalaryWithPaginationService: ${error.message}`);
    }
}