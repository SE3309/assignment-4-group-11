import express from 'express';
import mysql from 'mysql2';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const db = mysql.createPool({
    host: 'localhost',  // your database host
    user: 'root',      // your database username
    password: 'se3309',  // your database password
    database: 'se3309_assignment3'
  });

db.query("SELECT * FROM clt WHERE nme LIKE '%John%'", (err, res) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log(res);
        return;
    }
})

app.use(express.json());
app.use(express.static(__dirname + '/client'));
app.use(express.static(path.join(__dirname, "client")));

app.listen(3000, () => {    
    console.log('Server is running');
  });


