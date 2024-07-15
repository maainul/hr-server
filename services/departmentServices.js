import DepartmentModel from "../model/departmentModel.js"


export const getAllDepartmentWithPaginationService = async ({ req }) => {
    console.log(req.query)
    try {
        // Query Param For Search
        const { search = '', sort = 'latest', page = 1, limit = 10 } = req.query;

        console.log("===>", page)
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
        let queryResult = DepartmentModel.find(queryObject)

        //Sorting
        if (sort === 'latest') queryResult = queryResult.sort('-createdAt')
        if (sort === 'oldest') queryResult = queryResult.sort('createdAt')
        if (sort === 'a-z') queryResult = queryResult.sort('name')
        if (sort === 'z-a') queryResult = queryResult.sort('-name')

        //Pagination
        const pageNumber = Number(page)
        const limitNumber = Number(limit)
        const skip = (pageNumber - 1) * limitNumber

        //Skip
        queryResult = queryResult.skip(skip).limit(limit)

        //Per page Data Count = Total Data Count Based on Query Search
        const pageDataCount = await DepartmentModel.countDocuments(queryResult)

        //Total Data Count
        const totalDataCount = await DepartmentModel.countDocuments(queryObject)

        //Number of Pages
        const numberOfPages = Math.ceil(totalDataCount / limit)

        // Execute Query For List of Data
        const data = await queryResult
        // Calculate upToPageTotalData
        const upToPageTotalData = Math.min(
            pageNumber * limitNumber,
            totalDataCount
        );
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
        throw new Error(`Error in getAllDepartmentWithPaginationService: ${error.message}`);
    }
}