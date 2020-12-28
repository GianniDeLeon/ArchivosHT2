const sha512 = require('crypto-js/sha512');
const dbconnection = require('../modules/dbconnection');

exports.getUsuarios = async (req, res) => {
    try {
        let sql = "SELECT * FROM USUARIO";
        let result = await dbconnection.open(sql,[],false);
        res.send(JSON.stringify(result.rows));
    }catch (err){
        console.log(err.message);
        res.json({"error":404});
    }
}

exports.registro = async (req, res) => {
    try {
        var {nombre, email, password} = req.body;
        password = sha512(password);
        let sql = 'INSERT INTO USUARIO ("Nombre","Email","Contraseña") VALUES (\''+nombre+'\',\''+email+'\',\''+password+'\')';
        let result = await dbconnection.open(sql,[],true);
        const {lastRowid, rowsAffected } = result;
        if (rowsAffected == 1){
            res.json({"insercion":true,"cantidadInserciones":rowsAffected,"idTransaccion":lastRowid});
        }else{
            res.json({"insercion":false,"error":404});
        }
    }catch (err){
        console.log(err.message);
        res.json({"error":true});
    }
}

exports.login = async (req, res) => {
    try {
        var {email, password} = req.body;
        password = sha512(password);
        let sql = 'SELECT "idUsuario", "Contraseña" FROM USUARIO WHERE "Email"=:email';
        let result = await dbconnection.open(sql,[email],false);
        var resultArray = JSON.parse(JSON.stringify(result));
        var idUsuario = resultArray.rows[0][0];
        var Contraseña = resultArray.rows[0][1];
        if (idUsuario != null && password == Contraseña){
            const respuesta = {
                "auth":true,
                "idUsuario":idUsuario,
                "password":Contraseña
            };
            res.status(200).send(respuesta);
        }else{
            res.json({"auth":false,"error":404});
        }
    }catch (err){
        console.log(err.message);
        res.json({"error":404});
    }
}