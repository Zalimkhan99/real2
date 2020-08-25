const mysql = require('mysql');


const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "real2",
    password: ""
})
conn.connect(err=>{
    if(err){
        console.log(err);
        return err;
    }
    else{
        console.log('Database ------ OK');
    }
});
var s = '3333331'
const sql =  `INSERT INTO userstelegram(ChartID) VALUES( ${s} )`;
let query = "SELECT * FROM userstelegram";
conn.query(sql, (err,result, field)=>{
    console.log(err);
    console.log(result);
})

conn.end(err=>{
    if(err){
        console.log(err);
        return err;
    }
    else{
        console.log('Database ------ close');
    }
})