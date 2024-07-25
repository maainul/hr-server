import EmployeeLeaveModel from "../model/employeeLeaveModel.js"


export const getAllEmployeeLeaveWithPaginationService = async ({ req }) => {
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
                    { leaveType: { $regex: search, $options: "i" } }
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


        // Employee Leave Data
        const empLeave = await EmployeeLeaveModel.find()
            .populate({ path: 'employee', model: 'Employee' })
            .populate({ path: 'leaveType', model: 'LeaveType' })

        const totalDataCount = await EmployeeLeaveModel.countDocuments(matchStage)
        const numberOfPages = Math.ceil(totalDataCount / limitNumber)
        const startPageData = skip + 1;
        const upToPageTotalData = Math.min(
            pageNumber * limitNumber,
            totalDataCount
        );
        return {
            start: startPageData,
            currentPageData: empLeave.length,
            totalData: totalDataCount,
            totalNumberOfPages: numberOfPages,
            data: empLeave,
            upToPageTotalData: upToPageTotalData,
        }
    } catch (error) {
        throw new Error(`Error in getAllemployeeLeaveWithPaginationService: ${error.message}`);
    }
}