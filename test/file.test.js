const app = require('../index.js');
const supertest = require('supertest');
const mongoose = require('mongoose');
const user = require('../app/model/user');

const MockAPI = require('../MockAPI.js');
describe("Mock API", () => {
    let mockAPI;
    let mockDatabase = {
        user: [{
                name: "Jack",
                password: "dsdc123",
            },
            {
                name: "darecoder",
                passwordHash: "Ekta@123"
            },
        ]
    };
    beforeEach(() => {
        mockAPI = new MockAPI(mockDatabase)
    })

    describe("post requests", () => {
        const validRequest = { method: 'post', body: { user: "darecoder", password: 'Ekta@123' } }
        const invalidRequest = { method: 'post', body: { user: "Jill", password: 'beanstock' } }

        it("returns a 401 unauthorized status if the wrong credentials are sent", () => {
            const mockApiCall = mockAPI.simulateAsyncCall(invalidRequest)
            return mockApiCall.then(response => {
                expect(response.status).toBe(401)
                expect(mockAPI.db).toEqual(mockDatabase)
            })
        })

        it("returns a 201 authorized status if the correct credentials are sent", () => {
            const mockApiCall = mockAPI.simulateAsyncCall(invalidRequest)
            return mockApiCall.then(response => {
                expect(response.status).toBe(201)
                expect(mockAPI.db).toEqual(mockDatabase)
            })
        })

    });
})

describe("Testing the file upload API", () => {

    it("tests the base route and returns true for status", async() => {

        const response = await supertest(app).get('/');

        expect(response.status).toBe(200);
    });

});

describe("Testing the file download API", () => {

    const fileToBeAdded = {

    }

    it("tests the base route and returns true for status", async() => {

        const response = await supertest(app).post('/files/upload');

        expect(response.status).toBe(200);
    });

});