import PolicyModel from "../model/policyModel.js"
import { pagination } from "./pagination.js";


export const getAllpolicyWithPaginationService = async ({ req }) => {
    try {
        // Query Param For Search
        const { search = '', sort = 'latest', page = 1, limit = 10 } = req.query;

        //Conditions for searching filters
        let queryObject = {}

        //Check Search for Query
        if (search) {
            //Search by name or dptCode
            queryObject = {
                $or: [
                    { name: { $regex: search, $options: "i" } },
                    { dptCode: { $regex: search, $options: "i" } }
                ]
            }
        }

        // Build Mongoose Query Based on Search
        let queryResult = PolicyModel.find(queryObject)

        //Sorting
        if (sort === 'latest') queryResult = queryResult.sort('-createdAt')
        if (sort === 'oldest') queryResult = queryResult.sort('createdAt')
        if (sort === 'a-z') queryResult = queryResult.sort('name')
        if (sort === 'z-a') queryResult = queryResult.sort('-name')
        const paginationResult = await pagination(page, limit, queryResult, queryObject, SalaryGradeModel)

        return paginationResult
    } catch (error) {
        throw new Error(`Error in getAllpolicyWithPaginationService: ${error.message}`);
    }
}