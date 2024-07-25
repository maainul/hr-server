

export const pagination = async (page, limit, queryResult, queryObject, model) => {
    let numberOfPages = 0;
    let startPageData = 0;
    let upToPageTotalData = 0;
    let totalDataCount = 0;
    if (page !== undefined || limit !== undefined) {
        const pageNumber = Number(page);
        const limitNumber = Number(limit);
        const skip = (pageNumber - 1) * limitNumber;

        queryResult = queryResult.skip(skip).limit(limitNumber)
        totalDataCount = await model.countDocuments(queryObject)
        numberOfPages = Math.ceil(totalDataCount / limit)
        upToPageTotalData = Math.min(pageNumber * limitNumber, totalDataCount)
        startPageData = skip + 1;
    }
    const pageDataCount = await model.countDocuments(queryResult)
    const data = await queryResult

    return {
        startPageData,
        pageDataCount,
        numberOfPages,
        totalDataCount,
        data,
        upToPageTotalData,
    }

}