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
app.get("/club-stats", async (req, res) => {
    try {
        const forms = await formModel.find();
        const stats = {};

        forms.forEach(entry => {
            [entry.clubpref1, entry.clubpref2, entry.clubpref3].forEach(club => {
                if (club) {
                    stats[club] = (stats[club] || 0) + 1;
                }
            });
        });

        res.json(stats);
    } catch (err) {
        console.error("Error fetching stats:", err);
        res.status(500).json({ message: "Error retrieving club stats" });
    }
});


const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});