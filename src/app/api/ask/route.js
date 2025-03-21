import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req) {
    try {
        const { message } = await req.json();
        if (!message) {
            return NextResponse.json({ error: "Message is required" }, { status: 400 });
        }

        const response = await axios.post(
            "https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent",
            { contents: [{ parts: [{ text: message }] }] },
            { params: { key: process.env.GEMINI_API_KEY } }
        );

        const geminiResponse = response.data.candidates?.[0]?.content?.parts?.[0]?.text || "No response";

        return NextResponse.json({ message: geminiResponse });
    } catch (error) {
        console.error("Gemini API Error:", error.response?.data || error.message);
        return NextResponse.json({ error: "Failed to connect to Gemini AI" }, { status: 500 });
    }
}
