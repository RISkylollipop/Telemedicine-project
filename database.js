//LOCATION : INSIDE THE MAIN FOLDER

const sql = require(`mysql2`) //importing the mysql2 that is installed
require(`dotenv`).config()

//Creating a pool connection
const db = sql.createPool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    database: process.env.DATABASE,
    password: process.env.DATABASE_PASS,
    multipleStatements: true
})
// Starting the connection Optional but important 
db.getConnection((err, result)=>{
    if(err){
        console.log(err, `Unable to connect`);
        
    }else{
        console.log(`Database connected`);
        
    }
})


// exporting tht database out to several files 
module.exports = {db} 