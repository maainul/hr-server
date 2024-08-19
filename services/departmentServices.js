import DepartmentModel from "../model/departmentModel.js";
import { pagination } from "./pagination.js";

export const getAllDepartmentWithPaginationService = async ({ req }) => {
  try {
    // Query Param For Search
    const { search = "", sort = "latest", page, limit, status } = req.query;

    //Conditions for searching filters
    let queryObject = {};

    if (status) {
      queryObject.status = status;
    }

    //Check Search for Query
    if (search) {
      //Search by name or dptCode
      queryObject = {
        $or: [
          { name: { $regex: search, $options: "i" } },
          { dptCode: { $regex: search, $options: "i" } },
        ],
      };
    }

    // Build Mongoose Query Based on Search
    let queryResult = DepartmentModel.find(queryObject);

    //Sorting
    if (sort === "latest") queryResult = queryResult.sort("-createdAt");
    if (sort === "oldest") queryResult = queryResult.sort("createdAt");
    if (sort === "a-z") queryResult = queryResult.sort("name");
    if (sort === "z-a") queryResult = queryResult.sort("-name");

    const paginationResult = await pagination(
      page,
      limit,
      queryResult,
      queryObject,
      DepartmentModel
    );

    return paginationResult;
  } catch (error) {
    throw new Error(
      `Error in getAllDepartmentWithPaginationService: ${error.message}`
    );
  }
};
