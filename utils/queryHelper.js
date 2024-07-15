export const buildQueryWithPagination = (model, queryObject, sort, page, limit) => {
    let queryResult = model.find(queryObject);

    switch (sort) {
        case 'latest':
            queryResult = queryResult.sort('-createdAt');
            break;
        case 'oldest':
            queryResult = queryResult.sort('createdAt');
            break;
        case 'a-z':
            queryResult = queryResult.sort('name');
            break;
        case 'z-a':
            queryResult = queryResult.sort('-name');
            break;
        default:
            break;
    }

    const pageNumber = Number(page);
    const limitNumber = Number(limit);
    const skip = (pageNumber - 1) * limitNumber;

    queryResult = queryResult.skip(skip).limit(limitNumber);

    return queryResult;
};

export const getPaginationData = async (model, queryObject, page, limit) => {
    const totalDataCount = await model.countDocuments(queryObject);
    const pageNumber = Number(page);
    const limitNumber = Number(limit);
    const skip = (pageNumber - 1) * limitNumber;
    const numberOfPages = Math.ceil(totalDataCount / limitNumber);
    const upToPageTotalData = Math.min(pageNumber * limitNumber, totalDataCount);
    const startPageData = skip + 1;

    return {
        totalDataCount,
        numberOfPages,
        upToPageTotalData,
        startPageData,
    };
};
