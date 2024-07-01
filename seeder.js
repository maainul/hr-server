import colors from "colors";
import dotenv from "dotenv";
import connectDB from "./dbConnection.js";
import DepartmentModel from "./model/departmentModel.js";
import DivisionModel from "./model/divisionModel.js";
import DesignationModel from "./model/designationModel.js";
import PolicyModel from "./model/policyModel.js";
import divisionSeedData from "./seedData/divisionSeedData.js";
import departmentSeedData from "./seedData/departmentSeedData.js";
import designationSeedData from "./seedData/designationSeedData.js";
import policySeedData from "./seedData/policySeedData.js";
import SalaryGradeModel from "./model/salaryGradeModel.js";
import salaryGradeSeedData from "./seedData/salaryGradeSeedData.js";
import UnitModel from "./model/unitModel.js";
import unitSeedData from "./seedData/unitSeedData.js";
import PermissionModel from "./auth/model/permissionModel.js";
import GroupModel from "./auth/model/groupModel.js";
import UserModel from "./auth/model/userModel.js";
import permissionSeedData from "./seedData/SeedData.js";
import groupSeedData from "./seedData/groupSeedData.js";
import userSeedData from "./seedData/userSeedData.js";
import bcrypt from "bcryptjs";
import MenuModel from "./model/menuModel.js";
import menuSeedData from "./seedData/menuSeedData.js";

const seeder = async () => {
  // Configure env
  dotenv.config();

  // Database config
  await connectDB();

  try {
    // Seed Departments
    console.log("Seeding departments...");
    await DepartmentModel.deleteMany();
    await DepartmentModel.insertMany(departmentSeedData);
    console.log("Departments seeded successfully".bgGreen);

    // Seed Designations
    console.log("Seeding designations...");
    await DesignationModel.deleteMany();
    await DesignationModel.insertMany(designationSeedData);
    console.log("Designations seeded successfully".bgGreen);

    // Seed Divisions
    console.log("Seeding divisions...");
    await DivisionModel.deleteMany();
    const seededDivisions = await DivisionModel.insertMany(divisionSeedData);
    console.log("Divisions seeded successfully".bgGreen);

    // Policy
    console.log("Seeding Policy...");
    await PolicyModel.deleteMany();
    await PolicyModel.insertMany(policySeedData);
    console.log("Divisions seeded successfully".bgGreen);

    // Salary Grade
    console.log("Salary Grade...");
    await SalaryGradeModel.deleteMany();
    await SalaryGradeModel.insertMany(salaryGradeSeedData);
    console.log("Salary Grade seeded successfully".bgGreen);

    //unit seed
    const unitSeededDataWithDivisions = unitSeedData.map((unit) => {
      const division = seededDivisions.find(
        (div) => div.name === unit.divisionName
      );
      if (!division) {
        throw new Error(`Division Not Found For Unit : ${unit.name}`);
      }
      return {
        ...unit,
        division: division._id,
      };
    });

    console.log("Seeding Unit...");
    await UnitModel.deleteMany();
    await UnitModel.insertMany(unitSeededDataWithDivisions);
    console.log("Unit seeded successfully".bgGreen);

    // Salary Grade
    console.log("Salary Grade...");
    await SalaryGradeModel.deleteMany();
    await SalaryGradeModel.insertMany(salaryGradeSeedData);
    console.log("Salary Grade seeded successfully".bgGreen);

    // Permission Seeder
    console.log("Permission...");
    await PermissionModel.deleteMany();
    const seededPermissions = await PermissionModel.insertMany(
      permissionSeedData
    );
    console.log("Permission seeded successfully".bgGreen);

    // Create a lookup for permissions by resource and action
    const permissionLookup = {};
    seededPermissions.forEach((permission) => {
      const key = `${permission.resource}:${permission.action}`;
      permissionLookup[key] = permission._id;
    });

    // Group
    const groupSeedDataWithPermissionIds = groupSeedData.map((group) => {
      const permissions = group.permissions.map((perm) => {
        const permissionId = permissionLookup[perm];
        if (!permissionId) {
          throw new Error(`Permission not found: ${permissionName}`);
        }
        return permissionId;
      });
      return {
        name: group.name,
        code: group.code,
        permissions,
      };
    });

    // Seed Groups
    console.log("Seeding groups...");
    await GroupModel.deleteMany();
    await GroupModel.insertMany(groupSeedDataWithPermissionIds);
    console.log("Groups seeded successfully".bgGreen);

    // User Seeder
    console.log("Seeding User : ");
    await UserModel.deleteMany(); // Ensure you have a UserModel defined
    for (const userInfoObj of userSeedData) {
      const group = await GroupModel.findOne({ code: userInfoObj.group });
      if (!group) {
        throw new Error(`Group not found for user: ${userInfoObj.username}`);
      }

      const salt = await bcrypt.genSalt();
      const passWordHash = await bcrypt.hash(userInfoObj.password, salt);

      await UserModel.create({
        name: userInfoObj.name,
        password: passWordHash,
        group: group._id,
      });
    }

    console.log("User seeded successfully".bgGreen);

    // Menu Seeder
    console.log("Seeding Sidebar Menu...");
    await MenuModel.deleteMany();
    await MenuModel.insertMany(menuSeedData);
    console.log("Sidebar Menu seeded successfully".bgGreen);

    process.exit();
  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1);
  }
};

seeder();
