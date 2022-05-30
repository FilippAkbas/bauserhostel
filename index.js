const express = require('express')
const mongoose = require('mongoose')
const mysql = require('mysql')
const router = require('./routes/routes')
const createPath = require('./helpers/creater-path')

const PORT = process.env.PORT || 3000

const app = express()

app.set('view engine', 'ejs')

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "nodemysql"
})

db.connect((err)=> {
  if(err) {
    throw err
  } 
  console.log("Connection done")
})

app.use(express.json())
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }));
app.use(router)

app.get("/createdb", (req,res)=> {
  let sql = "CREATE DATABASE nodemysql"
  db.query(sql, (err, result)=> {
    if(err) throw err
    console.log("result")
    res.send("Database Created")
  })
})

app.get("/createreservestable", (req, res) => {
  let sql = 
    "CREATE TABLE reserves(id int AUTO_INCREMENT, fullname VARCHAR(255), phone VARCHAR(255), pasaporID VARCHAR(255), pasaporDate VARCHAR(255), PRIMARY KEY(id))"
  db.query(sql, (err, result) => {
    if (err) throw err
    console.log("result")
    res.send("Reserve table created")
  })
})

app.get("/createuserstable", (req, res) => {
  let sql = 
    "CREATE TABLE users(id int AUTO_INCREMENT, email VARCHAR(255), password VARCHAR(255), isenter BOOLEAN, PRIMARY KEY(id))"
  db.query(sql, (err, result) => {
    if (err) throw err
    console.log("result")
    res.send("Users table created")
  })
})

app.post("/add-reserve", (req, res) => {
  let reserve = 
    { fullname: req.body.fullname, phone: req.body.phone, pasaporID: req.body.pasaporID, pasaporDate: req.body.pasaporDate }
  let sql = "INSERT INTO reserves SET ?"
  let query = db.query(sql, reserve, (err, result) => {
    if (err) throw err
    console.log("result")
    res.redirect('/reserves')
  })
})

app.get("/reserves", (req,res) => {
  let title = "Reserves"
  let sql = "SELECT * FROM reserves"
  let query = db.query(sql, (err, result) => {
    if (err) throw err
    res.render(createPath('reserves'), {title, reserves:result})
  })
})

app.get("/reserve/:id", (req, res) => {
  let title = "Reserve"
  let sql = `SELECT * FROM reserves WHERE id= ${req.params.id}`
  let query = db.query(sql, (err, result) => {
    if (err) throw err
    console.log(result)
    res.render(createPath('reserve'), {title, reserve:result})
  });
});

app.post("/registration", (req, res) => {
  let reserve = 
    { email: req.body.email, password: req.body.password }
  let sql = "INSERT INTO users SET ?"
  let query = db.query(sql, reserve, (err, result) => {
    if (err) throw err
    console.log("result")
    res.redirect('/login')
  })
})

app.post("/login", (req, res) => {
  let email = req.body.email
  let isenter = ""
  let sql = `UPDATE users SET isenter= '${isenter}' WHERE id=1`
  let query = db.query(sql, (err, result) => {
    if (err) throw err
    const title = 'Login';
    let sql = `SELECT * FROM users WHERE id=1`
    let query = db.query(sql, (err, result) => {
      if (err) throw err
      if(result.length > 0) { 
        result.forEach(function(data) { 
          if (data.email === email) {
            res.render(createPath('account'), {title})
          } else {
            res.render(createPath('login'), {title})
          }
        })
      } else {
        console.log("not data")
      }
    })
  })
})

app.get('/login', (req, res) => {
  const title = 'Login';
  let sql = `SELECT * FROM users WHERE id=1`
  let query = db.query(sql, (err, result) => {
    if (err) throw err
    if(result.length > 0) { 
      result.forEach(function(data) { 
        if (data.isenter === 0) {
          res.render(createPath('account'), {title})
        } else {
          res.render(createPath('login'), {title})
        }
      })
    } else {
      console.log("not data")
    }
  })
})

app.get('/registration', (req, res) => {
  const title = 'Registration'
  let sql = `SELECT * FROM users WHERE id=1`
  let query = db.query(sql, (err, result) => {
    console.log(result)
    if (err) throw err
    if(result.length > 0) { 
      result.forEach(function(data) { 
        if (data.isenter === 0) {
          res.render(createPath('account'), {title})
        } else {
          res.render(createPath('registration'), {title})
        }
      })
    } else {
      console.log("not data")
    }
  })
})

app.get('/logout', (req, res) => {
  let sql = `SELECT * FROM users WHERE id=1`
  let query = db.query(sql, (err, result) => {
    if (err) throw err
    if(result.length > 0) { 
      result.forEach(function(data) { 
        if (data.isenter === 0) {
          let isenter = 1
          let sql = `UPDATE users SET isenter= '${isenter}' WHERE id=1`
          let query = db.query(sql, (err, result) => {
            if (err) throw err
            console.log(result)
            res.redirect('/login')
          })
        } else {
          res.render(createPath('login'))
        }
      })
    } else {
      console.log("not data")
    }
  })
})



const start = async () => {
  try {
    app.listen(PORT, () => console.log(`server started on port ${PORT}`))
  } catch (e) { 
    console.log(e)
  }
}

start()