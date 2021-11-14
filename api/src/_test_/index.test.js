const {
    server
} = require("../index")

const {
    expect
} = require("@jest/globals");

const request = require('supertest');


//-----------------------------------------------------------------


//Post integration test
// test("Progress succesfully send", () => {
//     const player = req.body;

//     const response = request(server).post("/players").send({
//         username: "GG"

//     });
//     expect(response).toBe("username: GG")
// });

//get integration test
test("getting info", () => {
    request(server).get("/players").then((res) => {
        res.body;
    })
});

test("bad request 404", async () => {
    const response = await request(server).post("/udsdsdsds").send({
        progress: "chapter5"
    });
    expect(response.statusCode).toBe(404)

});

// test("change name", () => {
//     const response = request(server).put("/players/5").send({
//         username: "GG"
//     })
//     JSON.stringify(response);
//     console.log(response);
//     expect(response).toBe("GG");

// });

//Delete integration test
test("deleting a user", async () => {

    const response = await request(server).delete("/players/5");
    expect(response.body.UserId)
});

// test("Delete name", async () => {
//     const name = "name";


//     const response = await request(server).delete(`/user/delete/${name.id}`);
//     expect(response.status).toBe(404);
//     expect(typeof response.body).toBe("object");
//     expect(response.body.message).toBe("Name deleted");
// });

// it("PUT /players/6", async () => {
//     let player = {
//         username: "GG",
//         password: "fjdsk",
//         email: "testtest@gmail.com",
//     };
//     const response = await request(server).put("/player/6").send(player);
//     expect(response.body).toEqual({
//         status: "success",
//         playerinfo: {
//             username: "GG",
//             password: "fjdsk",
//             email: "testtest@gmail.com"
//         },
//     });