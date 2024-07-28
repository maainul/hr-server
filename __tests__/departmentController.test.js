import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import request from 'supertest';
import express from 'express'
import DepartmentModel from '../model/departmentModel.js'; // Ensure correct path
import dotenv from 'dotenv';
import departmentRoutes from '../routes/departmentRoutes.js'
const url = '/api/v1/department/create';

dotenv.config()

const app = express()
app.use(express.json())

app.use('/api/v1/department', departmentRoutes)

const PORT = 8081;


let mongoServer;
let server
beforeAll(async () => {
    try {
        mongoServer = await MongoMemoryServer.create();
        const uri = mongoServer.getUri();
        // Check if mongoose is already connected to avoid multiple connections
        if (mongoose.connection.readyState === 0) { // 0 means disconnected
            await mongoose.connect(uri, {
                serverSelectionTimeoutMS: 20000, // Increase timeout for server selection
                socketTimeoutMS: 45000 // Increase socket timeout
            });
        }
        server = app.listen(PORT, () => {
            console.log('Server running on port', PORT);
        });
    } catch (error) {
        console.error('Error setting up test environment:', error);
    }
});

afterAll(async () => {
    try {
        console.log('Disconnecting mongoose...');
        if (mongoose.connection.readyState !== 0) {
            await mongoose.disconnect();
        }
        console.log('Stopping MongoMemoryServer...');
        if (mongoServer) {
            await mongoServer.stop();
        }
        await server.close()
    } catch (error) {
        console.error('Error tearing down test environment:', error);
    }
});


beforeEach(async () => {
    // Clear the database before each test
    await DepartmentModel.deleteMany({});
}, 30000);

afterEach(async () => {
    // Ensure that no connections or open handles are left
    jest.clearAllTimers();
    await DepartmentModel.deleteMany({});
}, 30000);


describe(`POST ${url}`, () => {
    it('should create a new department', async () => {
        const res = await request(app)
            .post('/api/v1/department/create')
            .send({
                name: 'HR',
                dptCode: 'HR001',
                dptLocation: 'New York',
                status: 1
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('success', true);
        expect(res.body).toHaveProperty('newDepartment');
        expect(res.body.newDepartment).toHaveProperty('name', 'HR');
        expect(res.body.newDepartment).toHaveProperty('dptCode', 'HR001');
        expect(res.body.newDepartment).toHaveProperty('dptLocation', 'New York');
    }, 30000);

    it('should not create a department with duplication name', async () => {
        await DepartmentModel.create({
            name: 'HR',
            dptCode: 'HR001',
            dptLocation: 'New York',
            status: 1
        });

        const res = await request(app)
            .post(url)
            .send({
                name: 'HR',
                dptCode: 'HR02',
                dptLocation: 'Los Angeles',
                status: 1
            });

        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('success', false);
        expect(res.body.error).toEqual(expect.arrayContaining([
            expect.objectContaining({
                label: 'name',
                message: 'Department Name Already Exists'
            })
        ]));
    }, 30000);

    it('should not create a department with duplicate code', async () => {
        await DepartmentModel.create({
            name: 'HR',
            dptCode: 'HR001',
            dptLocation: 'New York',
            status: 1
        });

        const res = await request(app)
            .post(url)
            .send({
                name: 'Finance',
                dptCode: 'HR001',
                dptLocation: 'Los Angeles',
                status: 1
            });

        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('success', false);
        expect(res.body.error).toEqual(expect.arrayContaining([
            expect.objectContaining({
                label: 'dptCode',
                message: 'Department Code Already Exists'
            })
        ]));
    }, 30000);
});
