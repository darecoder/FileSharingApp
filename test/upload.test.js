const app = require('../app');
const supertest = require('supertest');
const mongoose = require('mongoose');

describe("test hello", async() => {
    const response = await supertest(app).get('/test');
    expect(response.body).toBe("hello");
});

describe("Testing the home API", () => {

	it("tests the base route and returns true for status", async () => {

		const response = await supertest(app).get('/');

		expect(response.status).toBe(200);
		expect(response.body.status).toBe(true);

	});

});

