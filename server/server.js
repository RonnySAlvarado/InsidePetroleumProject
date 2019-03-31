const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const mongoose = require("mongoose");
const db = require("./mongodbconnect");
const Post = require("./postSchema");

const server = express();

server.use(cors());
server.use(express.json());
server.use(helmet());

/*http://localhost:5000/
get -> return stuff from db
post -> add to db
put -> updates the db
delete -> removes from the db*/

server.get("/", async (req, res) => {
  //Retrieve all posts
  try {
    const posts = await Post.find({}).exec(); //Empty object to find every post, returns an array. Exec covers any promise issues.
    res.status(200).json(posts); //If posts are located, return an 'ok' status code and the json format of posts.
  } catch (err) {
    res
      .status(500)
      .json({ message: "Something went wrong retrieving the posts." });
    //If the find promise rejects, provide an error message to the user.
  }
});

server.post("/", async (req, res) => {
  const post = req.body; //Define what the post to be added is

  if (!post.title || !post.description) {
    res.status(400).json({
      message: "Please provide a title and description for the post."
    });
    //Let the user know if they are missing some required fields
  } else {
    try {
      const newPost = await Post.create(post); //Try to create a new post and save the returned post info
      res.status(201).json(newPost); //Let the user know that the post was added by sending back the info
    } catch (err) {
      res
        .status(500)
        .json({ message: "Something went wrong adding the new post." });
      //Catch any errors, need a handler for if the record already exists. Sends back on err.errmsg
    }
  }
});

server.put("/:id", async (req, res) => {
  const { id } = req.params; //destructure id from params
  const post = req.body;
  if (!post.title || !post.description) {
    res.status(400).json({
      message: "Please provide a title and description in your update."
    });
  } else {
    try {
      const updatedPost = await Post.findByIdAndUpdate(id, post, {
        new: true
      }).exec();

      if (updatedPost) {
        res.status(200).json(updatedPost);
      } else {
        res.status(404).json({ message: "The post could not be located." });
      }
    } catch (err) {
      res
        .status(500)
        .json({ message: "Something went wrong updating the post.", err });
    }
  }
});

server.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Post.findByIdAndDelete(id).exec();
    res.status(200).end();
  } catch (err) {
    res
      .status(500)
      .json({ message: "Something went wrong trying to delete the post." });
  }
});

module.exports = server;
