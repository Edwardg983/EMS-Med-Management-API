import http from 'http';
import express from 'express';
import bodyparser from 'body-parser';
import mongoose from 'mongoose';
import config from './config';
import routes from './routes';
import passport from 'passport';
const LocalStrategy = require('passport-local').Strategy;

// const http = require('http');
// const express = require('express');
// const bodyparser = require('body-parser');
// const mongoose = require('mongoose');
// const config = require('./config');
// const routes = require('./routes');
// const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;

let app = express();
app.server = http.createServer(app);

// middleware
app.use(bodyparser.json({
  limit:config.bodyLimit
}));
// passport config
app.use(passport.initialize());
let Account = require('./model/account');
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
},
  Account.authenticate()
));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());
// api routes v1
app.use('/api/v1', routes);

app.server.listen(config.port);
console.log(`Started on port ${app.server.address().port}`);

export default app;
