const express = require('express');
const path = require("path");
const router = express.Router();
const Form = require("./models/schema");
const axios = require("axios");
require("dotenv").config();

const API_URL=process.env.API_URL;

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

router.post("/submit-form", async (req, res) => {
    const { usermail, password } = req.body;
    console.log(`Username/mail: ${usermail}, Password: ${password}`);

    try {
        const newForm = new Form({ usermail, password });
        await newForm.save();

        const savedForm = await Form.findOne({ usermail, password });
        console.log("Data saved to DB:", savedForm);
        res.redirect("/posts");
    } catch (err) {
        console.log("Error saving data:", err);
        res.status(500).send("Error saving data");
    }
});

router.post("/login-form", async (req, res) => {
    const { usermail, password } = req.body;
    console.log(`Username/mail: ${usermail}, Password: ${password}`);

    try {
        const fetchdata = await Form.findOne({ usermail, password });
        if (fetchdata) {
            res.redirect("/posts");
        } else {
            res.send("No valid credentials");
        }
    } catch (err) {
        console.log("Error fetching data:", err);
        res.status(500).send("Error fetching data");
    }
});

router.get("/posts", async (req, res) => {
    try {
        const response = await axios.get(`${API_URL}/posts`);
        console.log(response);
        res.render("Blog.ejs", { posts: response.data });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get("/new", (req, res) => {
    res.render("modify.ejs", { heading: "New post", submit: "Create post" });
});

router.get("/edit/:id", async (req, res) => {
    try {
        const response = await axios.get(`${API_URL}/posts/${req.params.id}`);
        console.log(response.data);
        res.render("modify.ejs", {
            heading: "Edit Post",
            submit: "Update Post",
            post: response.data,
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching post" });
    }
});

router.post("/api/posts", async (req, res) => {
    try {
        const response = await axios.post(`${API_URL}/posts`, req.body);
        console.log(response.data);
        res.redirect("/posts");
    } catch (error) {
        res.status(500).json({ message: "Error creating post" });
    }
});

router.post("/api/posts/:id", async (req, res) => {
    console.log("called");
    try {
        const response = await axios.patch(
            `${API_URL}/posts/${req.params.id}`,
            req.body
        );
        console.log(response.data);
        res.redirect("/posts");
    } catch (error) {
        res.status(500).json({ message: "Error updating post" });
    }
});


router.get("/api/posts/delete/:id", async (req, res) => {
    try {
        await axios.delete(`${API_URL}/posts/${req.params.id}`);
        res.redirect("/posts");
    } catch (error) {
        res.status(500).json({ message: "Error deleting post" });
    }
});

router.get("/logout",(req,res)=>{
    res.redirect("/");
})

module.exports = router;
