require('dotenv').config();
const express=require("express");
const app=new express();
const mongoose=require("mongoose");
const bodyParser=require("body-parser");
const cors=require("cors");
const {formModel}=require("./db");


app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
mongoose.connect(process.env.Mongo_url)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB connection error:", err));
app.post("/about-form",async function(req,res){
    try {
        const form = new formModel(req.body);
        await form.save();
        res.status(200).send('Form submitted successfully!');
    } catch (error) {
        res.status(500).send('Error saving form data');
    }
})

const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});