const express = require('express')
const cors = require('cors')
const mysql = require('mysql')

const port = 3001
const app = express()

app.use(cors())

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "baza"
})

con.connect(function(err){
    if(err){ 
        console.log(err)
    }
    console.log("Połączono")
})

app.get("/", function(req, res){
    res.send("ok")
})

app.get("/select", function(req, res){
    const sql = "SELECT * FROM zadania"
    con.query(sql,function(err,result,fields){
        if(err) console.log(err)
        console.log(fields)
        res.send(result)
    })
})

app.get("/add/:nazwa/:czywykonane/:termin", function (req, res){
    const nazwa = req.params.nazwa
    const czywykonane = req.params.czywykonane
    const termin = req.params.termin

    const sql = `INSERT INTO zadania (nazwa,czywykonane,termin) VALUES ('${nazwa}','${czywykonane}','${termin}')`
    con.query(sql, function(err,results,fields){
        if(err){
            console.log(err)
            res.send("nie dodano")
        }
        else{
            console.log("dodano zadanie")
            res.send("dodano")
        }
    })
})


app.get("/remove/:nazwa", function(req,res){
    const nazwa = req.params.nazwa

    const sql = `DELETE FROM zadania WHERE nazwa = "${nazwa}"`
    con.query(sql, function(err, result, fields){
        if(err){
            console.log(err)
            res.send("nie usunięto")
        }
        else{
            console.log("usunięto")
            res.send("usunięto")
        }
    } )
})

app.get("/updatetrue/:nazwa",function(req,res){
    const nazwa = req.params.nazwa

    const sql = `UPDATE zadania SET czywykonane = 1 WHERE nazwa = "${nazwa}"`

    con.query(sql, function(err, result, fields){
        if(err){
            console.log(err)
            res.send("nie zmieniono")
        }
        else{
            console.log("zmieniono")
            res.send("zmieniono")
        }
    } )
})
app.get("/updatefalse/:nazwa",function(req,res){
    const nazwa = req.params.nazwa

    const sql = `UPDATE zadania SET czywykonane = 0 WHERE nazwa = "${nazwa}"`

    con.query(sql, function(err, result, fields){
        if(err){
            console.log(err)
            res.send("nie zmieniono")
        }
        else{
            console.log("zmieniono")
            res.send("zmieniono")
        }
    } )
})

app.listen(port)
