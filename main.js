const express = require("express")
const db = require("./db")
const app = express()

app.use(express.json())

app.get("/", (req, res) => {
    res
        .status(200)
        .json({message: "Hello world"})
})

app.get("/users", (req, res) => {
    const users = db.prepare("SELECT * FROM users").all()
    return res.status(200).json(users)
})

app.post("/users", (req, res) => {
    console.log(req.body)
    res.status(200).json({error: "asd"})
})

app.listen(3000)
