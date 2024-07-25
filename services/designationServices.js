import DesignationModel from "../model/designationModel.js";
import { pagination } from './pagination.js';

export const getAllDesignationWithPaginationService = async ({ req }) => {
  try {
    // Query Param For Search
    const { search = "", sort = "latest", page = 1, limit = 10 } = req.query;

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
    let queryResult = DesignationModel.find(queryObject);

    //Sorting
    if (sort === "latest") queryResult = queryResult.sort("-createdAt");
    if (sort === "oldest") queryResult = queryResult.sort("createdAt");
    if (sort === "a-z") queryResult = queryResult.sort("name");
    if (sort === "z-a") queryResult = queryResult.sort("-name");

    const paginationResult = await pagination(page, limit, queryResult, queryObject, DesignationModel)

    return paginationResult;
  } catch (error) {
    throw new Error(
      `Error in getAllDesignationWithPaginationService: ${error.message}`
    );
  }
};
