import SalaryGradeModel from "../model/salaryGradeModel.js"


export const getAllSalaryGradeWithPaginationService = async ({req}) =>{
    try {
          // Query Param For Search
     const { search = '', sort = 'latest', page = 1, limit = 10 } = req.query;

    //Conditions for searching filters
    let queryObject = {}

    //Check Search for Query
    if(search){
        //Search by name or code
        queryObject = {
            $or:[
                {name:{$regex:search,$options:"i"}},
                {code:{$regex:search,$options:"i"}}
            ]
        }
    }

    // Build Mongoose Query Based on Search
    let queryResult = SalaryGradeModel.find(queryObject)

    //Sorting
    if(sort === 'latest') queryResult = queryResult.sort('-createdAt')
    if(sort === 'oldest') queryResult = queryResult.sort('createdAt')
    if(sort === 'a-z') queryResult = queryResult.sort('grade_name')
    if(sort === 'z-a') queryResult = queryResult.sort('-grade_name')

    //Pagination
    const pageNumber = Number(page)
    const limitNumber = Number(limit)
    const skip = (pageNumber -1) * limitNumber

    //Skip
    queryResult = queryResult.skip(skip).limit(limit)

    //Per page Data Count = Total Data Count Based on Query Search
    const pageDataCount = await SalaryGradeModel.countDocuments(queryResult)

    //Total Data Count
    const totalDataCount = await SalaryGradeModel.countDocuments(queryObject)

    //Number of Pages
    const numberOfPages = Math.ceil(totalDataCount / limit)

    // Execute Query For List of Data
    const data = await queryResult

    return {
        "currentPageData":pageDataCount,
        "totalData":totalDataCount,
        "totalNumberOfPages":numberOfPages,
        "data":data,
    }
    } catch (error) {
          throw new Error(`Error in getAllSalaryGradeWithPaginationService: ${error.message}`);
    }
}