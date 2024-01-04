const express = require('express');

const path = require('path');

const sequelize = require('./util/database');

const userRoutes = require('./routes/expense');

const signupRoute = require('./routes/user');

const loginRoute = require('./routes/login');

const port = 3000;

const app = express();

app.use(express.json());

app.use(express.static('public'))

app.use(signupRoute);

app.use(loginRoute);

app.use(userRoutes);
//for testing purpose
// app.use('/',(req, res)=>{
//     //res.send('Hi');
//     res.sendFile('index.html',{root:'views'});
// });

app.use(express.static(path.join(__dirname,'views')));

sequelize.sync()
    .then(()=> {
        app.listen(port, ()=>{
            console.log(`Server is running on ${port}`);
        });
    })
    .catch(err => console.log(err));
