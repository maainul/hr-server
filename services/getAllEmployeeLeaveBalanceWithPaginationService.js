import EmployeeLeaveBalanceModel from "../model/employeeLeaveBalanceModel.js";


export const getAllEmployeeLeaveBalanceWithPaginationService = async ({ req }) => {
    try {
        const { search = '', sort = 'latest', page = 1, limit = 10 } = req.query
        let queryObject = {}

        let queryResult = EmployeeLeaveBalanceModel.find(queryObject)

        if (sort === 'latest') queryResult = queryResult.sort('-createdAt')
        if (sort === 'oldest') queryResult = queryResult.sort('-createdAt')

        const pageNumber = Number(page)
        const limitNumber = Number(limit)
        const skip = (pageNumber - 1) * limit

        queryResult = queryResult.skip(skip).limit(limit)
        //Per page Data Count = Total Data Count Based on Query Search
        const pageDataCount = await EmployeeLeaveBalanceModel.countDocuments(queryResult)

        //Total Data Count
        const totalDataCount = await EmployeeLeaveBalanceModel.countDocuments(queryObject)

        //Number of Pages
        const numberOfPages = Math.ceil(totalDataCount / limit)
        // Execute Query For List of Data
        const data = await queryResult

        // Calculate upToPageTotalData
        const upToPageTotalData = Math.min(pageNumber * limitNumber, totalDataCount);

        // Calculate startPageData
        const startPageData = skip + 1; // Adjust for 1-based index


        return {
            start: startPageData,
            currentPageData: pageDataCount,
            totalData: totalDataCount,
            totalNumberOfPages: numberOfPages,
            data: data,
            upToPageTotalData: upToPageTotalData,
        }


    } catch (error) {
        throw new Error(`Error in getAllEmployeeLeaveBalanceWithPaginationService: ${error.message}`);
    }
}