'use strict';

//import http from 'http';
// import express from 'express';
// import bodyparser from 'body-parser';
// import mongoose from 'mongoose';
// import config from './config';
// import routes from './routes';
// import passport from 'passport';
// const LocalStrategy = require('passport-local').Strategy;

var http = require('http');
var express = require('express');
var bodyparser = require('body-parser');
var mongoose = require('mongoose');
var config = require('./config');
var routes = require('./routes');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var app = express();
app.server = http.createServer(app);

// middleware
app.use(bodyparser.json({
  limit: config.bodyLimit
}));
// passport config
app.use(passport.initialize());
var Account = require('./model/account');
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());
// api routes v1
app.use('/api/v1', routes);

app.server.listen(config.port);
console.log('Started on port ' + app.server.address().port);

//export default app;
//# sourceMappingURL=index.js.map