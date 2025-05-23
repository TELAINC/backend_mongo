const mongoose = require('mongoose');
const conexion =  async()=>{
    try{
        await mongoose.connect("mongodb://mongodb:27017/miblog");
       console.log("Conectado a la base de datos mi blog!!");
    }catch(error)
    {
        console.log(error);
        throw new Error("No se puede conectar a la  base de datos")
    }
}
module.exports = {
    conexion
}