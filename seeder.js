import colors from "colors";
import dotenv from "dotenv";
import connectDB from './dbConnection.js';
import DepartmentModel from './model/departmentModel.js';
import DivisionModel from './model/divisionModel.js';
import DesignationModel from './model/designationModel.js';
import PolicyModel from "./model/policyModel.js";
import divisionSeedData from './seedData/divisionSeedData.js';
import departmentSeedData from './seedData/departmentSeedData.js'
import designationSeedData from './seedData/designationSeedData.js';
import policySeedData from "./seedData/policySeedData.js";
import SalaryGradeModel from "./model/salaryGradeModel.js";
import salaryGradeSeedData from './seedData/salaryGradeSeedData.js';
import UnitModel from "./model/unitModel.js";
import unitSeedData from './seedData/unitSeedData.js';

const seeder = async () => {
    // Configure env
    dotenv.config();

    // Database config
    await connectDB();

    try {
        // Seed Departments
        console.log('Seeding departments...');
        await DepartmentModel.deleteMany();
        await DepartmentModel.insertMany(departmentSeedData);
        console.log('Departments seeded successfully'.bgGreen);

        // Seed Designations
        console.log('Seeding designations...');
        await DesignationModel.deleteMany();
        await DesignationModel.insertMany(designationSeedData);
        console.log('Designations seeded successfully'.bgMagenta);

        // Seed Divisions
        console.log('Seeding divisions...');
        await DivisionModel.deleteMany();
        const seededDivisions = await DivisionModel.insertMany(divisionSeedData);
        console.log('Divisions seeded successfully'.bgYellow);

        // Policy
        console.log('Seeding Policy...');
        await PolicyModel.deleteMany();
        await PolicyModel.insertMany(policySeedData);
        console.log('Divisions seeded successfully'.bgGreen);

        // Salary Grade
        console.log('Salary Grade...');
        await SalaryGradeModel.deleteMany();
        await SalaryGradeModel.insertMany(salaryGradeSeedData);
        console.log('Salary Grade seeded successfully'.bgGreen);

        //unit seed
        const unitSeededDataWithDivisions = unitSeedData.map(unit => {
            const division = seededDivisions.find(div => div.name === unit.divisionName)
            if (!division) {
                throw new Error(`Division Not Found For Unit : ${unit.name}`)
            }
            return {
                ...unit,
                division: division._id
            }
        })


        console.log('Seeding Unit...');
        await UnitModel.deleteMany();
        await UnitModel.insertMany(unitSeededDataWithDivisions);
        console.log('Unit seeded successfully'.bgGreen);

        process.exit();
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
}

seeder();
