// Импорты

import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import {Validation} from '../validation/auth.js';
import { validationResult } from 'express-validator';
import UserSchema from '../models/user.js';
import http from 'http';
import { createServer } from "http";
import { Server } from "socket.io";
import bodyParser from 'body-parser'
import checkAuth from '../middlevares/checkAuth.js';

const urlencodedParser = express.urlencoded({extended: false});

// Настройка базы данных
const DB_URI = 'mongodb+srv://kaliboba:kalib000baa@cluster0.extoz4g.mongodb.net/?retryWrites=true&w=majority';
const DB_SETTINGS = 
{
    autoIndex: true,
};
mongoose
.connect(DB_URI,DB_SETTINGS)
.then(() => console.log('ookkkk'))
.catch((err) => console.log('db error',err));

//app

const app = new express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('static'));

const server = createServer(app);

// socket.io

const io = new Server(server, {
    // ...
  });


// Ещё не придумал

const players = [];
let count = 1;
io.on("connect", (socket) =>
{
    try
    {
        socket.on("server", () => {
            players.push(
                    {
                    id: socket.id,
                    count: count,
                    });
                count++;
                // io.sockets.emit("state", (err) => {console.log(err)});
                io.sockets.emit("state",players);
            console.log(players);

            });
            socket.on("disconnect", () => {
                delete players[socket.id];
                io.sockets.emit("state", players);
                console.log(players);

                count--;
                });
         
    }
    catch(err)
    {
        console.log(err);
    }
 
});

// Роутер

app.get('/auth/me', checkAuth, async (req,res) => {
    try{
        const user = await UserSchema.findById(req.userid);
        
        if(!user)
        {
            res.status(404).json(
                {
                    message: 'Пользователь не найден'
                });
        }
        
        res.status(200).json
        ({
            ...user
        });
    }
    catch(err)
    {
        console.log(err);
    }
    });
    app.post('/',Validation, urlencodedParser, async (req,res) =>
    {   
        try
        {
        const errors = validationResult(req);
        
        if(!errors.isEmpty())
        {
            return res.status(420).json(errors.array());
            
        }
    
        const salt = await bcrypt.genSalt()
        const HashPassword = await bcrypt.hash(`${req.body.passwordREG}`,salt)
    
        const doc = new UserSchema({
            email: `${req.body.emailREG}`,
            name: `${req.body.name}`,
            password: HashPassword,
        });
    
        const user = await doc.save();
        const token = jwt.sign(
            {
                _id: user._id,
            },'secret1234')
        res.json({...user, token});
        } 
        catch(err)
        {   
            console.log(err);
            res.status(500).json(
                {
                message: "Не удалось зарегистрироваться:("
            });
        };
    });
app.post('/', urlencodedParser, async (req, res) => 
{
    try
    {
        const user = await UserSchema.findOne({email: `${req.body.email}`});

        if (!user)
        {
            return res.status(404).json({
                message: 'Ошибка авторизации',
            });
        }
        const isValidPass = await bcrypt.compare(`${req.body.password}`, user._doc.password);
        if(!isValidPass){
            return res.status(400).json({
                message: 'Неверный логин или пароль',
            });
        }
        
        const token = jwt.sign(
            {
                _id: user._id,
            },'secret1234')
        res.json({user});
        
    
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json(
            {
            message: "Не удалось авторизоваться:("
        });
    }
})

app.get('/',(req,res) => 
{
    
    res.sendFile(__dirname + '/index.html');
    
});

app.get('/socket.io/socket.io.js', (req, res) => {
    res.sendFile(__dirname + '/node_modules/socket.io/client-dist/socket.io.js');
  });

server.listen(1234);