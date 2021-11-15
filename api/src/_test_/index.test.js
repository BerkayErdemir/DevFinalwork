const {
    server
} = require("./../index");

const {
    expect
} = require("@jest/globals");

require('dotenv').config();
const request = require('supertest');


//-----------------------------------------------------------------

test("Progress succesfully send", async () => {

    const response = await request(server).post("/players").send({

        username: "opop",
        password: "test",
        email: "testestes@hotmmayl.uk"
    });
    expect(response.statusCode).toBe(200);


});

test("Progress succesfully deleted", async () => {

    const response = await request(server).delete("/players/opop").send();
    expect(response.statusCode).toBe(200);


});
test("bad request 404", async () => {

    const response = await request(server).post("/udsdsdsds").send({

        progress: "chapter5"
    });
    expect(response.statusCode).toBe(404);

});

test("testing if the user can log in", async () => {
    const response = await request(server).post("/user/progress").send({

        name: "name",
        password: "password"
    });
    expect(response.body.UserId).toBeDefined;


});

test("deleting a user", async () => {

    const response = await request(server).delete("/users").send({


    });
    expect(response.body.UserId);
});

// test("Delete name", async () => {
//     const name = "name";


//     const response = await request(server).delete(/user/delete/${name.id});
//     expect(response.status).toBe(404);
//     expect(typeof response.body).toBe("object");
//     expect(response.body.message).toBe("Name deleted");
// });