import EmployeeModel from "../model/EmployeeModel.js"
import DepartmentModel from "../model/departmentModel.js";
import DesignationModel from "../model/designationModel.js";
import SalaryGradeModel from "../model/salaryGradeModel.js";


export const getAllEmployeeWithPaginationService = async ({ req }) => {
    try {
        // Query Param For Search
        const { search = '', sort = 'latest', page = 1, limit = 10 } = req.query;

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
        let queryResult = EmployeeModel.find(queryObject)

        //Sorting
        if (sort === 'latest') queryResult = queryResult.sort('-createdAt')
        if (sort === 'oldest') queryResult = queryResult.sort('createdAt')
        if (sort === 'a-z') queryResult = queryResult.sort('full_name')
        if (sort === 'z-a') queryResult = queryResult.sort('-full_name')

        //Pagination
        const pageNumber = Number(page)
        const limitNumber = Number(limit)
        const skip = (pageNumber - 1) * limitNumber

        //Skip
        queryResult = queryResult.skip(skip).limit(limit)

        //Per page Data Count = Total Data Count Based on Query Search
        const pageDataCount = await EmployeeModel.countDocuments(queryResult)

        //Total Data Count
        const totalDataCount = await EmployeeModel.countDocuments(queryObject)

        //Number of Pages
        const numberOfPages = Math.ceil(totalDataCount / limit)

        // Execute Query For List of Data
        const data = await queryResult

        // Department Info
        for (let emp of data) {
            const deprtInfo = await DepartmentModel.findOne({ '_id': emp.department })
            const desInfo = await DesignationModel.findOne({ '_id': emp.designation })
            const gradeInfo = await SalaryGradeModel.findOne({ '_id': emp.salary_grade })
            console.log(deprtInfo, gradeInfo, desInfo)
        }

        return {
            "currentPageData": pageDataCount,
            "totalData": totalDataCount,
            "totalNumberOfPages": numberOfPages,
            "data": data,
        }
    } catch (error) {
        throw new Error(`Error in getAllEmployeeWithPaginationService: ${error.message}`);
    }
}