const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

const db = mysql.createPool({    
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: 'dataatecnologia',
    database: 'db_pessoal'   
});

app.use(express.json());
app.use(cors());

app.use(cors());
app.use(express.json());

app.post("/register", (req,res)=> {    
    const name = req.body.name;
    const cost = req.body.cost;
    const category = req.body.category;
    
    let SQL  = "INSERT INTO games (name,cost,category) VALUES ( ?, ?, ? )";

    db.query(SQL, [name,cost,category], (error, result) => {
        if (error) {
            console.log(error);
          } else {
            console.log("Registro salvo no banco.");
            res.send(result);
          }
    })
});

app.post("/search", (req, res) => {  
    const { name } = req.body;
    const { cost } = req.body;
    const { category } = req.body;
  
    let SQL =
      "SELECT * from games WHERE name = ? AND cost = ? AND category = ?";
    db.query(SQL, [name, cost, category], (error, result) => {
      if (error) { 
          console.log(error);
          res.send(error);
      } else {  
          res.send(result);
      }
    });
});

app.get("/getCards", (req,res)=> {
    const idgames  = req.body.idgames;
    const name     = req.body.name;
    const cost     = req.body.cost;
    const category = req.body.category;
    
    let SQL  = "SELECT * FROM games";

    db.query(SQL, (error, result) => {
        if (error) {
            console.log(error);
            res.send(result);
        } else {
            console.log("Registro encontrado.");
            res.send(result);
        }
    });
});

app.put("/edit", (req, res) => {
    const { idgames }  = req.body;
    const { name }     = req.body;
    const { cost }     = req.body;
    const { category } = req.body;
    
    let SQL = "UPDATE games SET name = ?, cost = ?, category = ? WHERE idgames = ?";
    
    db.query(SQL, [name, cost, category, idgames], (error, result) => {      
      if (error) {
          console.log(error);
          res.send(error);          
      } else {
          console.log("Registro editado com sucesso.");
          res.send(result);
      }
    });
});
  
app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  let SQL = "DELETE FROM games WHERE idgames = ?";
  db.query(SQL, id, (error, result) => {
    if (error) {      
        console.log(error);
        res.send(error);          
    } else {
        console.log("Registro deletado com sucesso.");
        res.send(result);
    }
  });
});

app.listen(3001, () => {
    console.log("Servidor executado com sucesso.");
});