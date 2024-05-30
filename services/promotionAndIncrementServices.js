import PromotionsAndIncrementModel from "../model/promotionsAndIncrementModel.js"


export const getAllPromotionsAndIncrementWithPaginationService = async ({ req }) => {
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


        // promotionsAndIncrement data fetch
        const promotionsAndIncrement = await PromotionsAndIncrementModel.aggregate([
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

        const totalDataCount = await PromotionsAndIncrementModel.countDocuments(matchStage)
        const numberOfPages = Math.ceil(totalDataCount / limitNumber)

        return {
            success: true,
            "currentPageData": promotionsAndIncrement.length,
            "totalData": totalDataCount,
            "totalNumberOfPages": numberOfPages,
            "data": promotionsAndIncrement,
            message: "All Promoto and Increment retrieve successfully"
        }
    } catch (error) {
        throw new Error(`Error in getAllPromotionsAndIncrementWithPaginationService: ${error.message}`);
    }
}