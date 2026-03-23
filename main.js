const express = require("express")
const bcr = require("bcryptjs")
const db = require("./db.js")
const app = express()
app.use(express.json())
const PORT = 3000


app.use(express.json())

app.get("/", (req, res) => {
    res
        .status(200)
        .json({ message: "Hello world" })
})

app.get("/users",(req,res)=>{
    try{
            const users= db
            .prepare('SELECT * FROM users')
            .all()

         return res.status(200).json(users)   
    } catch(error){
        console.error(error)
        res
            .status(500)
            .json({error: "something went wrong "})
    }
})


add.post("/login", (req,res)=>{
    try{
        const{email,password}=req.body

        if(!email||!password)
            return res
        .status(400)
        .json({error:"Missing fields"})

        const user = db
        .prepare('SELECT * FROM users WHERE email = ?')
        .get(email)
        if (!user) return res
        .status(401)
        .json({error:"wrong password"})

    } catch(error){
        console.error(error)
        res 
            .status(500)
            .json({error: "Spomething went wrong"})
    }
})

app.post("/users", (req,res) =>{
    try{
        const{email, name} = req.body

        if(!email || !name)
            return res
        .status(400)
        .json({error: "Missing fields"})
        const info =db.prepare('INSERT INTO users (email, name) VALUES(?, ?)')
                    .run(email, name)

        const user = db
        .prepare("SELECT * FROM users id= ?" )
        .run(info.lastInsertRowid)            


         return res.status(200).json(user)  
    } catch(error){
        console.error(error)
        res
            .status(500)
            .json({error: "something went wrong "})
    }



    app.post("/todos", (req,res) =>{
    try{
        const{name, status} = req.body

        if(!name || !status)
            return res
        .status(400)
        .json({error: "Missing fields"})
        const info =db.prepare('INSERT INTO todos (name, status) VALUES(?, ?)')
                    .run(name, status)

        const user = db
        .prepare("SELECT * FROM todos id= ?" )
        .run(info.lastInsertRowid)            


         return res.status(200).json(user)  
    } catch(error){
        console.error(error)
        res
            .status(500)
            .json({error: "something went wrong "})
    }


})

})


app.delete("/todos/:id",(req,res)=>{
        try {
        const query = db
            .prepare("DELETE FROM users WHERE id= ?")
            .run(id)

        if (query.changes ===0) return res
            .status(404) 
            .json({error:"User not found"})

        return res.status(200).json({message: "User deleted"})   
 } catch(error){
        console.error(error)
        res 
            .status(500)
            .json({error: "Something went wrong"})
    }
})



app.delete("/users/:id",(req,res)=>{
        try {
        const query = db
            .prepare("DELETE FROM users WHERE id= ?")
            .run(id)

        if (query.changes ===0) return res
            .status(404) 
            .json({error:"User not found"})

        return res.status(200).json({message: "User deleted"})   
 } catch(error){
        console.error(error)
        res 
            .status(500)
            .json({error: "Something went wrong"})
    }
})


app.delete("/registration",(req,res)=>{
      try{
        const{email, name, password} = req.body

        if(!email || !name || !password)
            return res
        .status(400)
        .json({error: "Missing fields"})
        const info =db.prepare('INSERT INTO users (email, name, password) VALUES(?, ?, ?)')
                    .run(email, name, hash)
        const salt = bcr.genSaltSync(10)
        const hash = bcr.hashSync(password, salt)
        const user = db
        .prepare("SELECT * FROM users id= ?" )
        .run(info.lastInsertRowid)            

        const {password:_, ...safeUser} = user
         return res.status(201).json(safeUser)  
    } catch(error){
        console.error(error)
        res
            .status(500)
            .json({error: "something went wrong "})
    }
    
})

app.listen(3000)