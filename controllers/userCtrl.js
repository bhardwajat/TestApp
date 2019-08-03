const mysql = require('mysql');
const jwt = require('jsonwebtoken');

var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'test',
    multipleStatements: true
});

exports.createUser = (req, res, next) => {
    let user = req.body;
    var sql = "INSERT INTO usercredentials(username, password) VALUES (?, ?);"
    mysqlConnection.query(sql, [user.username, user.password], (err, rows, fields)=>{
        if(!err)
            res.send('Insert successful!');
        else
            console.log(err);
    })
}


exports.loginUser = (req, res) => {
    let user = req.body;
    var sql = "SELECT * FROM usercredentials WHERE username = ? AND password = ?;"
    mysqlConnection.query(sql, [user.username, user.password], function(err, rows){
        if(!err){
            const user = {
                id: rows[0].id,
                username: rows[0].username,
                password: rows[0].password
            }
            let token = jwt.sign({user: user}, 'jk23!+!97');
            console.log(user);
            res.status(200).send({token});
        }
        else{
            console.log(err);
        }
    })
}

exports.addEvent = (req, res, next) => {
    let event = req.body;
    var sql = "INSERT INTO appointment(userId, title, description, startTime, endTime, location, isMedication) VALUES(?, ?, ?, ?, ?, ?, ?);"
    mysqlConnection.query(sql, [event.userId, event.title, event.description, event.startTime, event.endTime, event.location, event.isMedication], (err, rows, fields)=>{
        if(!err)
            res.send('Event inserted succesfully');
        else
            console.log(err);
    })

}