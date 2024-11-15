import express from "express";
import translate from "google-translate-api-x";
// const translate = require("google-translate-api-x");
import cors from "cors";
const app = express();
app.use(express.json());
app.use(cors()); 
app.post("/translate", async (req, res) => {
    const { text, to } = req.body;
    try {
        const result = await translate(text, { to });
        res.json({ translatedText: result.text });
    } catch (error) {
        console.error("Translation error:", error.stack); // Log the full error stack
        res.status(500).json({ error: error.message });
    }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
