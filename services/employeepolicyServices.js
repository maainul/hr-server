import EmployeePolicyModel from "../model/employeePolicyModel.js"


export const getAllemployeePolicyWithPaginationService = async ({ req }) => {
    try {
        // Query Param For Search
        const { search = '', sort = 'latest', page = 1, limit = 10 } = req.query;

        //Conditions for searching filters
        let matchStage = {}

        //Check Search for Query
        if (search) {
            //Search by name or dptCode
            matchStage = {
                $or: [
                    { employee: { $regex: search, $options: "i" } },
                    { policy: { $regex: search, $options: "i" } }
                ]
            }
        }

        //Sorting
        let sortStage = {}
        if (sort === 'latest') sortStage.createdAt = -1;
        if (sort === 'oldest') sortStage.createdAt = 1;

        //Pagination
        const pageNumber = Number(page)
        const limitNumber = Number(limit)
        const skip = (pageNumber - 1) * limitNumber


        // Employee Policy Data
        const emPloicy = await EmployeePolicyModel.aggregate([
            { $match: matchStage },
            { $sort: sortStage },
            { $skip: skip },
            { $limit: limitNumber },
            {
                $lookup: {
                    from: 'employees',
                    localField: 'Employee',
                    foreignField: '_id',
                    as: 'employeeInfo'
                },
                $lookup: {
                    from: 'policies',
                    localField: 'policy',
                    foreignField: '_id',
                    as: 'policyInfo'
                }
            },
            {
                $unwind: {
                    path: '$employee',
                    preserveNullAndEmptyArrays: true
                },
                $unwind: {
                    path: '$policy',
                    preserveNullAndEmptyArrays: true
                }
            },
        ])

        const totalDataCount = await EmployeePolicyModel.countDocuments(matchStage)
        const numberOfPages = Math.ceil(totalDataCount / limitNumber)


        return {
            success: true,
            "currentPageData": emPloicy.length,
            "totalData": totalDataCount,
            "totalNumberOfPages": numberOfPages,
            "data": emPloicy,
            message: "All Employee Policy retrieve successfully"
        }
    } catch (error) {
        throw new Error(`Error in getAllemployeePolicyWithPaginationService: ${error.message}`);
    }
}