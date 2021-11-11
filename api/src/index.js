const express = require('express');
const pool = require("./../database/db")

const server = express();

const PORT = 1234;

server.use(express.json())


server.get('/user/progress', async (req, res) => {

    try {
        const allUsersWithdes = await pool.query("SELECT * FROM players");
        res.json(allUsersWithdes.rows);
    } catch (err) {
        console.log(err.message);
    }
});

server.get('/', async (req, res) => {

    try {

        res.send("Hey, welcum")
    } catch (err) {
        console.log(err.message);
    }
});

server.get('/user/progress/:id', async (req, res) => {

    try {
        const {
            id
        } = req.params;
        const player = await pool.query("SELECT * FROM players WHERE user_id = $1", [id]);
        res.json(player.rows[0]);
    } catch (err) {
        console.log(err.message);
    }
});

server.put('/user/progress/:id', async (req, res) => {

    try {
        const {
            id
        } = req.params;
        const {
            username
        } = req.body;
        const {
            password
        } = req.body;
        const {
            email
        } = req.body;

        const updateInfo = await pool.query("UPDATE players SET username = $1, password = $2, email = $3 WHERE user_id = $4", [username, password, email, id]);
        res.json("updated")
    } catch (err) {
        console.log(err.message);
    }
});


server.delete('/user/progress/:id', async (req, res) => {

    try {
        const {
            id
        } = req.params;
        const deleteUser = await pool.query("DELETE FROM players WHERE user_id = $1", [id]);
        res.json("deleted");
    } catch (err) {
        console.log(err.message);
    }
});



server.post('/user/progress', async (req, res) => {

    try {
        const {
            username
        } = req.body;
        const {
            password
        } = req.body;
        const {
            email
        } = req.body;

        const newName = await pool.query("INSERT INTO players (username, password, email) VALUES ($1, $2, $3) RETURNING *", [username, password, email]);
        res.json(newName)

    } catch (err) {

        console.log(err.message)
    }


});

//Listening
server.listen(PORT, () => {

    console.log('listening to port 1234')
});

module.exports = {
    server
};