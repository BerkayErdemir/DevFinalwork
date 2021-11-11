const express = require('express');
const dotenv = require("dotenv");
dotenv.config();

const server = express();
const PORT = 3000;



const password = process.env.POSTGRES_PASSWORD;

const knex = require('knex')({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        port: 5432,
        user: 'postgres',
        password: password,
        database: 'database_players'
    }
});
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
        const player = knex("players").select().where("user_id", id).then(function (data) {

            res.json(data);
        });

    } catch (err) {
        console.log(err.message);
    }
});

server.put('/players/:id', (req, res) => {

    try {
        const player = req.body;
        const {
            id
        } = req.params;

        const updateInfo = knex("players").where("user_id", id).update({
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
        const deleteUser = knex("players").where("user_id", id).del().then(function (data) {

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