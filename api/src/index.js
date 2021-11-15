const express = require('express');

const server = express();
const PORT = process.env.PORT;


require('dotenv').config();


const knex = require('knex')({
    client: 'pg',
    version: '7.2',
    connection: {
        host: process.env.POSTGRES_HOST ? process.env.POSTGRES_HOST : "localhost",
        port: 5432,
        user: process.env.POSTGRES_USER ? process.env.POSTGRES_USER : "test",
        password: process.env.POSTGRES_PASSWORD ? process.env.POSTGRES_PASSWORD : "test",
        database: process.env.POSTGRES_DATABASE ? process.env.POSTGRES_DATABASE : "test"
    }
});

async function manageTables() {
    try {
        knex.schema.hasTable('players').then(function (exists) {
            if (!exists) {
                return knex.schema.createTable('players', function (table) {
                    table.increments('id').primary();
                    table.string('username', 100);
                    table.string('password', 100);
                    table.text('email');
                });
            }
        });
    } catch (error) {
        console.log("error", error);
    }
}

async function folderTable() {
    await knex.table("players").insert({
        id: 0,
        username: "Kekw",
        password: "testing123",
        email: "sahdashbj@gmail.com"
    })
}


async function init() {
    await manageTables();
    // await folderTable();
}
init()
server.use(express.json())

server.get('/players', (req, res) => {

    try {
        knex.select("*").from("players").then(function (data) {

            res.json(data);
        });

    } catch (err) {
        console.log(err.message);
    }
});

server.get('/', (req, res) => {

    try {

        res.send("Hey, welcum")
    } catch (err) {
        console.log(err.message);
    }
});

server.get('/players/:id', (req, res) => {

    try {
        const {
            id
        } = req.params;
        const player = knex("players").select().where("id", id).then(function (data) {

            res.json(data);
        });

    } catch (err) {
        console.log(err.message);
    }
});

server.put('/players/:id', (req, res) => {

    try {
        const player = req.body;
        console.log(player);
        const {
            id
        } = req.params;

        const updateInfo = knex("players").where("id", id).update({
            username: player.username
        }).then(function (data) {

            res.json(data);
        });

    } catch (err) {
        console.log(err.message);
    }
});


server.delete('/players/:id', (req, res) => {

    try {
        const {
            id
        } = req.params;
        const deleteUser = knex("players").where("id", id).del().then(function (data) {

            res.json(data);
        });

    } catch (err) {
        console.log(err.message);
    }
});



server.post('/players', (req, res) => {

    try {
        const player = req.body;

        const newName = knex("players").insert({
            username: player.username,
            password: player.password,
            email: player.email
        }).then(function (data) {

            res.json(data);
        });

    } catch (err) {
        console.log(err.message)
    }
});

//Listening f
server.listen(PORT, () => {

    console.log(`listening to port ${PORT}`)
});

module.exports = {
    server
};