import colors from "colors";
import dotenv from "dotenv";
import connectDB from './dbConnection.js';
import DepartmentModel from './model/departmentModel.js';
import DivisionModel from './model/divisionModel.js';
import DesignationModel from './model/designationModel.js';
import divisionSeedData from './seedData/divisionSeedData.js';
import departmentSeedData from './seedData/departmentSeedData.js'
import designationSeedData from './seedData/designationSeedData.js';

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
        await DivisionModel.insertMany(divisionSeedData);
        console.log('Divisions seeded successfully'.bgYellow);

        process.exit();
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
}

seeder();
