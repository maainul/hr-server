import UnitModel from "../model/unitModel.js"


export const getAllUnitWithPaginationService = async ({ req }) => {
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
        if (sort === 'a-z') sortStage.name = 1
        if (sort === 'z-a') sortStage.name = -1

        //Pagination
        const pageNumber = Number(page)
        const limitNumber = Number(limit)
        const skip = (pageNumber - 1) * limitNumber


        // unit data fetch
        const unit = await UnitModel.aggregate([
            { $match: matchStage },
            { $sort: sortStage },
            { $skip: skip },
            { $limit: limitNumber },
            {
                $lookup: {
                    from: 'divisions',
                    localField: 'division',
                    foreignField: '_id',
                    as: 'division'
                }
            },
            {
                $unwind: {
                    path: '$division',
                    preserveNullAndEmptyArrays: true
                }
            },
        ])

        const totalDataCount = await UnitModel.countDocuments(matchStage)
        const numberOfPages = Math.ceil(totalDataCount / limitNumber)
        const upToPageTotalData = Math.min(pageNumber * limitNumber, totalDataCount)
        const startPageData = skip + 1

        return {

            start: startPageData,
            currentPageData: unit.length,
            totalData: totalDataCount,
            totalNumberOfPages: numberOfPages,
            data: unit,
            upToPageTotalData: upToPageTotalData
        }
    } catch (error) {
        throw new Error(`Error in getAllUnitWithPaginationService: ${error.message}`);
    }
}