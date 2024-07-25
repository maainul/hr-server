

export const pagination = async (page, limit, queryResult, queryObject, model) => {
    const pageNumber = Number(page)
    const limitNumber = Number(limit)
    const skip = (pageNumber - 1) * limitNumber

    queryResult = queryResult.skip(skip).limit(limit)

    // Total Data Count with search
    const pageDataCount = await model.countDocuments(queryResult)
    // Total Data Count
    const totalDataCount = await model.countDocuments(queryObject)
    // Number of Pages
    const numberOfPages = Math.ceil(totalDataCount / limit)
    const startPageData = skip + 1;
    const upToPageTotalData = Math.min(pageNumber * limitNumber, totalDataCount)
    const data = await queryResult

    return {
        startPageData,
        pageDataCount,
        totalDataCount,
        numberOfPages,
        data,
        upToPageTotalData,
    }

}