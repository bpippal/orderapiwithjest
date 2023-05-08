const request = require("supertest");
const app = require("../server");

describe("Test suite for Fetch/Get" , () => {
    it("Get Initial Orders, which have length 3" , async () => {
        const response = await request(app).get("/orderall");
        expect(response.body).toHaveLength(3);
    })

    it("Get Order by id 223, Returns status code 200" , async () => {
        const response = await request(app).get("/order/223");
        expect(response.statusCode).toBe(200);
    })

    it("Get Order by InvalidId 999, Returns status code 404" , async () => {
        const response = await request(app).get("/order/999");
        expect(response.statusCode).toBe(404);
    })

})

describe("Test suite for Adding order", () => {

    it("Add simple data", async () => {
        const response = await request(app).post("/order").send({"anyKey" : "anyData"});
        expect(response.statusCode).toBe(200);
    })

    it("Adding another data immediately should prompt an error code 400" , async () => {
        const response = await request(app).post("/order").send({"anyKey" : "anyData"});
        expect(response.statusCode).toBe(400);
    })

})


describe("Test suite to delete by id 223" , () => {
    
    it("Delete by id 223 and getAllOrder count should be 3" , async () => {
        
        const firstResponse = await request(app).delete("/order/223");
        expect(firstResponse.statusCode).toBe(200);
        const secondResponse = await request(app).get("/orderall");
        expect(secondResponse.body).toHaveLength(3);

    })

    it("Delete by invalid id should prompt 400 status code" , async () => {
        const response = await request(app).delete("/order/999");
        expect(response.statusCode).toBe(400);
    })

})


describe("Test suite for unhandled routes" , () => {

    it("Test case for random route" , async () => {
        const response = await request(app).post("/abc");
        expect(response.statusCode).toBe(404);
    })

})
