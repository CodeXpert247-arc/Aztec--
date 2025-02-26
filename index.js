require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.post("/chat", async (req, res) => {
    try {
        const userMessage = req.body.message;

        if (!userMessage) {
            return res.status(400).json({ error: "Message is required" });
        }

        const response = await axios.post(
            "https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill",
            { inputs: userMessage },
            {
                headers: { Authorization: `Bearer ${process.env.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}` },
            }
        );

        const botReply = response.data.generated_text || "I'm not sure how to respond.";
        res.json({ reply: botReply });

    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
