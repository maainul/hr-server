import mongoose from "mongoose";
import EmployeeLeaveModel from "../model/employeeLeaveModel.js";
import EmployeeLeaveBalanceModel from "../model/employeeLeaveBalanceModel.js";
import { pagination } from "./pagination.js";

export const getAllEmployeeLeaveBalanceWithPaginationService = async ({ req }) => {
    try {
        const { search = '', sort = 'latest', page, limit } = req.query;
        let queryObject = {};

        // Add search filters if needed
        if (search) {
            queryObject = {
                ...queryObject,
                $or: [
                    { 'employee.full_name': { $regex: search, $options: 'i' } },
                    { 'leaveType.name': { $regex: search, $options: 'i' } }
                ]
            };
        }

        let queryResult = EmployeeLeaveBalanceModel.find(queryObject)
            .populate({ path: 'employee', model: 'Employee' })
            .populate({ path: 'leaveType', model: 'LeaveType' });

        if (sort === 'latest') queryResult = queryResult.sort('-createdAt');
        if (sort === 'oldest') queryResult = queryResult.sort('createdAt');

        // Pagination
        const paginationResult = await pagination(page, limit, queryResult, queryObject, EmployeeLeaveBalanceModel);

        return {
            ...paginationResult,
        };

    } catch (error) {
        throw new Error(`Error in getAllEmployeeLeaveBalanceWithPaginationService: ${error.message}`);
    }
}
