import express from 'express';
import mysql from 'mysql2';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'se3309',
    database: 'se3309_assignment3'
  });


app.use(express.json());
app.use(express.static(__dirname + '/client'));
app.use(express.static(path.join(__dirname, "client")));

app.listen(3000, () => {    
    console.log('Server is running');
});

app.post('/api/createAccount', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const username = req.body.username;
    const phone = req.body.phone;
    const address = req.body.address;
    let payment = req.body.payment;
    if (payment === "") {
        payment = null;
    }
    db.query("INSERT INTO individual VALUES()", (err, result) => {
        if (err){
            console.log(err);
            res.status(404).send("Error");
        }
        else {
            const newId = result.insertId;
            const q = "INSERT INTO clt (userId, email, nme, username, address, phoneNumber, paymentInfo) VALUES ?";
            const values = [[newId, email, name, username, address, phone, payment]]
            db.query(q, [values], (err, results) => {
                if (err){
                    console.log(err);
                    res.status(404).send("Error");
                } else {
                    console.log(result);
                    res.send("Success");
                }
            })
        }
    })
});

app.get("/api/getClient/:email", (req, res) => {
    const email = req.params.email;
    db.query(`SELECT * FROM clt WHERE email = '${email}'`, (err, result) => {
        if (err){
            console.log(err);
            res.status(404).send("Error");
        } else {
            res.send(result[0])
        }
    })
});

// For this example use dlittle@example.org
app.get("/api/getPropertyByEmail/:email", (req, res) => {
    const email = req.params.email;
    db.query(`SELECT nme, email, propertyforsale.address, sellingPrice, buildingFeatures FROM propertyForSale
        INNER JOIN clt ON userId = creatorId
        WHERE isAvailable = 1
        AND email = '${email}'`, (err, result) => {
            if (err){
                console.log(err);
                res.status(404).send("Error");
            } else {
                res.send(result)
            }
        })
});

app.get("/api/getPropertyByPrice/:maxPrice/:minPrice", (req, res) => {
    const maxPrice = req.params.maxPrice;
    const minPrice = req.params.minPrice;
    db.query(`SELECT address, datePosted, sellingPrice, annualPropertyTax, buildingFeatures 
        FROM propertyForSale WHERE sellingPrice <= ${maxPrice} AND sellingPrice >= ${minPrice}
        ORDER BY sellingPrice DESC`, (err, result) => {
            if (err){
                console.log(err);
                res.status(404).send("Error");
            } else {
                res.send(result)
            }
        })
});

app.get("/api/searchPropertyByAddress/:searchString", (req, res) => {
    const searchString = req.params.searchString;
    db.query(`SELECT address, datePosted, monthlyRent, buildingFeatures 
        FROM propertyforrent WHERE address LIKE '%${searchString}%'`, (err, result) => {
            if (err){
                console.log(err);
                res.status(404).send("Error");
            } else {
                res.send(result);
            }
        })
});

app.put("/api/updateEmail/:currentEmail", (req, res) => {
    const currentEmail = req.params.currentEmail;
    const newEmail = req.body.newEmail;
    db.query(`UPDATE clt SET email = "${newEmail}" WHERE email = "${currentEmail}"`, (err, result) => {
        if (err){
            console.log(err);
            res.status(404).send("Error");
        } else {
            res.send(result);
        }
    })
});

app.get("/api/getEmail/:email", (req, res) => {
    const email = req.params.email;
    db.query(`SELECT * FROM clt WHERE email = '${email}'`, (err, result) => {
        if (err){
            console.log(err);
            res.status(404).send("Error");
        } else {
            res.send(result);
        }
    })
})