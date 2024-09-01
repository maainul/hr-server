import colors from "colors";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import connectDB from "./dbConnection.js";
import UnitModel from "./model/unitModel.js";
import PolicyModel from "./model/policyModel.js";
import UserModel from "./auth/model/userModel.js";
import MenuModel from "./auth/model/menuModel.js";
import GroupModel from "./auth/model/groupModel.js";
// import EmployeeModel from "./model/EmployeeModel.js";
import DivisionModel from "./model/divisionModel.js";
import menuSeedData from "./seedData/menuSeedData.js";
import subMenuSeedData from "./seedData/subMenuSeedData.js";
import unitSeedData from "./seedData/unitSeedData.js";
import userSeedData from "./seedData/userSeedData.js";
import LeaveTypeModel from "./model/leaveTypeModel.js";
import groupSeedData from "./seedData/groupSeedData.js";
import DepartmentModel from "./model/departmentModel.js";
import policySeedData from "./seedData/policySeedData.js";
import DesignationModel from "./model/designationModel.js";
import SalaryGradeModel from "./model/salaryGradeModel.js";
import PermissionModel from "./auth/model/permissionModel.js";
import divisionSeedData from "./seedData/divisionSeedData.js";
import employeeSeedData from "./seedData/employeeSeedData.js";
import leaveTypeSeedData from "./seedData/leaveTypeSeedData.js";
import departmentSeedData from "./seedData/departmentSeedData.js";
import permissionSeedData from "./seedData/permissionSeedData.js";
import designationSeedData from "./seedData/designationSeedData.js";
import salaryGradeSeedData from "./seedData/salaryGradeSeedData.js";
import SubmenuModel from "./auth/model/submenuModel.js";

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
    await PermissionModel.insertMany(permissionSeedData);
    console.log("Permission seeded successfully".bgGreen);

    // Menu Seeder
    console.log("Seeding Sidebar Menu...");
    await MenuModel.deleteMany();
    await MenuModel.insertMany(menuSeedData);
    console.log("Sidebar Menu seeded successfully".bgGreen);

    // Sub Menu
    console.log("Seeding Submenu");
    await SubmenuModel.deleteMany();
    for (const item of subMenuSeedData) {
      const menu = await MenuModel.findOne({ menuTitle: item.menuTitle });

      if (menu) {
        await SubmenuModel.create({
          label: item.label,
          icon: item.icon,
          url: item.url,
          menuID: menu._id,
        });
      }
    }

    console.log("Seeding Submenu Successfully...");

    // Group Seeder
    const groupArray = [];
    for (const group of groupSeedData) {
      const permissions = group.permissions;
      const permissionArray = [];
      for (const permission of permissions) {
        const [resource, action] = permission.split(":");
        const permissionData = await PermissionModel.findOne({
          resource,
          action,
        });
        if (permission) {
          const id = permissionData._id;
          permissionArray.push(id);
        } else {
          console.log("Permission Not Found");
        }
      }

      // SubMenu
      const subMenuURLArray = [];
      const subMenuURLs = group.subMenus;
      for (const singleURL of subMenuURLs) {
        const subMenuData = await SubmenuModel.findOne({ url: singleURL });
        if (subMenuData) {
          const id = subMenuData._id;
          subMenuURLArray.push(id);
        } else {
          console.error(`Submenu with URL '${singleURL}' not found.`);
          continue;
        }
      }
      let groupObj = {
        name: group.name,
        code: group.code,
        permissions: permissionArray,
        subMenus: subMenuURLArray,
      };
      groupArray.push(groupObj);
    }

    // Seed Groups
    console.log("Seeding groups...");
    await GroupModel.deleteMany();
    await GroupModel.insertMany(groupArray);
    console.log("Groups seeded successfully".bgGreen);

    // User Seeder
    console.log("Seeding User : ");
    await UserModel.deleteMany(); // Ensure you have a UserModel defined
    for (const userInfoObj of userSeedData) {
      console.log(userInfoObj)
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

    // leave Seeder
    console.log("Seeding Leave Type ...");
    await LeaveTypeModel.deleteMany();
    await LeaveTypeModel.insertMany(leaveTypeSeedData);
    console.log("Leave Type seeded successfully".bgGreen);

    // Employee Data Seed
    // console.log("Seeding Employee Data.......")
    // await EmployeeModel.deleteMany();
    // const employeeData = employeeSeedData.map((emp) => {
    //   const dptExsts = await DepartmentModel.findOne({ 'dptCode': emp.department_code });
    //   const dsgExsts = await DesignationModel.findOne({ 'name': emp.designation_name });
    //   const salaryGradeExts = await SalaryGradeModel.findOne({ 'name': emp.salary_grade_name });
    // })
    // console.log("Seeding Employee Data Successfully.......")

    process.exit();
  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1);
  }
};

seeder();
