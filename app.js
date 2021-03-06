const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const app = express();


const {getHomePage} = require('./routes/index');
const {addWorkspacePage, addWorkspace, deleteWorkspace, editWorkspacePage, editWorkspace} = require('./routes/workspace');

const port = 5000;

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'spaceto'
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database successfully');
});

global.db = db;

app.set('port', process.env.port || port);                                                                                                                                     
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.json()); 
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());


app.get('/', getHomePage);
app.get('/add', addWorkspacePage);
//app.get('/edit/:workspace_id', editWorkspacePage);
//app.get('/delete/:workspace_id', deleteWorkspace);
app.post('/add', addWorkspace);
//app.post('/edit/:workspace_id', editWorkspace);



app.listen(port, ()=> {
    console.log(`Server running on port : ${port}`)
});