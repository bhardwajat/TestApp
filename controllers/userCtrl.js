const mysql = require('mysql');

var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'test',
    multipleStatements: true
});

exports.createUser = (req, res, next) => {
    let user = req.body;
    var sql = "INSERT INTO user(email, password) VALUES (?, ?);"
    mysqlConnection.query(sql, [user.email, user.password], (err, rows, fields)=>{
        if(!err)
            res.send('Insert successful!');
        else
            console.log(err);
    })
}


exports.loginUser = (req, res) => {
    let user = req.body;
    var sql = "SELECT id FROM user WHERE email = ? AND password = ?;"
    mysqlConnection.query(sql, [user.email, user.password], function(err, rows){
        if(!err){
            res.json(rows[0].id);
        }
        else{
            console.log(err);
        }
    })
}