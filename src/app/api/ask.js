import axios from "axios";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    const { message } = req.body;
    if (!message) {
        return res.status(400).json({ error: "Message is required" });
    }

    try {
        const response = await axios.post(
            "https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent",
            { contents: [{ parts: [{ text: message }] }] },
            { params: { key: process.env.GEMINI_API_KEY } }
        );

        const geminiResponse = response.data.candidates?.[0]?.content?.parts?.[0]?.text || "No response";

        res.status(200).json({ message: geminiResponse });
    } catch (error) {
        console.error("Gemini API Error:", error.response?.data || error.message);
        res.status(500).json({ error: "Failed to connect to Gemini AI" });
    }
}
