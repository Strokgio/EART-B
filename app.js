


const express = require("express");
const cors = require('cors');
const mysql = require("mysql");

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors())

var credenciales = ({
    user: 'sergio',
    host: 'localhost',
    password: 'sergio',
    database: 'elizabeth'
});


app.get('./',(req,res)=>{
    res.send('Hola desde tu primera ruta de la api')
})

app.post('/api/login',(req,res) =>{
    const {username, password} =req.body
    const values = [username, password]
    var conexion = mysql.createConnection(credenciales)
    conexion.query("select * from usuario where codigo = ? and contrasena = ?", values, (err,result)=>{
        if(err){
            res.status(500).send(err)
        } else{
            if(result.length > 0){
                res.status(200).send(result[0])
            } else{
                res.status(400).send('Usuario no existe')
            }
        }
    })
    conexion.end()
})

app.listen(PORT, ()=>{
    console.log("running server");
})