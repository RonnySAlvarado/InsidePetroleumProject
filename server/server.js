const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
const db = require('./mongodbconnect');

const server = express();

server.use(cors());
server.use(express.json());
server.use(helmet());


const post = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    }
})

const Post = mongoose.model('post', post);


module.exports = server;