import DivisionModel from "../model/divisionModel.js";

export const getAllDivisionWithPaginationService = async ({ req }) => {
  try {
    // Query Param For Search
    const { search = "", sort = "latest", page, limit } = req.query;

    //Conditions for searching filters
    let queryObject = {};

    //Check Search for Query
    if (search) {
      //Search by name or code
      queryObject = {
        $or: [
          { name: { $regex: search, $options: "i" } },
          { code: { $regex: search, $options: "i" } },
        ],
      };
    }

    // Build Mongoose Query Based on Search
    let queryResult = DivisionModel.find(queryObject);

    //Sorting
    if (sort === "latest") queryResult = queryResult.sort("-createdAt");
    if (sort === "oldest") queryResult = queryResult.sort("createdAt");
    if (sort === "a-z") queryResult = queryResult.sort("name");
    if (sort === "z-a") queryResult = queryResult.sort("-name");

    //Total Data Count
    const totalDataCount = await DivisionModel.countDocuments(queryObject);

    //Pagination
    let numberOfPages = 0;
    let startPageData = 0;
    let upToPageTotalData = 0;

    if (page != undefined || limit != undefined) {
      const pageNumber = Number(page);
      const limitNumber = Number(limit);
      const skip = (pageNumber - 1) * limitNumber;
      //Skip
      queryResult = queryResult.skip(skip).limit(limitNumber);
      numberOfPages = Math.ceil(totalDataCount / limit);
      // Calculate upToPageTotalData
      upToPageTotalData = Math.min(pageNumber * limitNumber, totalDataCount);
      // Calculate startPageData
      startPageData = skip + 1; // Adjust for 1-based index
    }

    //Per page Data Count = Total Data Count Based on Query Search
    const pageDataCount = await DivisionModel.countDocuments(queryResult);

    // Execute Query For List of Data
    const data = await queryResult;

    return {
      start: startPageData,
      currentPageData: pageDataCount,
      totalData: totalDataCount,
      totalNumberOfPages: numberOfPages,
      data: data,
      upToPageTotalData: upToPageTotalData,
    };
  } catch (error) {
    throw new Error(
      `Error in getAllDivisionWithPaginationService: ${error.message}`
    );
  }
};
