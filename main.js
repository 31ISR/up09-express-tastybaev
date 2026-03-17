const express = require("express")
const db = require("./db")
const app = express()

app.use(express.json())

app.get("/", (req, res) => {
    res
        .status(200)
        .json({ message: "Hello world" })
})

app.get("/users", (req, res) => {
    const users = db.prepare("SELECT * FROM users").all()
    return res.status(200).json(users)
})

app.post("/users", (req, res) => {
    const { email, name } = req.body
    try {
        if (!email || !name)
            return res
                .status(400)
                .json({ error: "Не хватает данных" })
        const query = db
            .prepare(`INSERT INTO users (name, email) VALUES (?, ?)`).run(name, email)
        const newUser = db
            .prepare("SELECT * FROM users WHERE id = ?").get(query.lastInsertRowid)
        res.status(200).json(newUser)
    } catch (error) {
        console.error(error)
        res.status(500).json({error: "Что-то пошло не так"})
    }
})

app.listen(3000)
