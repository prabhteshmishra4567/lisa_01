"use client"; // Required in App Router (app/page.js)

import { useState } from "react";

export default function Home() {
    const [message, setMessage] = useState("");
    const [response, setResponse] = useState("");
    const [loading, setLoading] = useState(false);

    const handleAsk = async () => {
        if (!message.trim()) return;
        setLoading(true);
        setResponse("");

        try {
            const res = await fetch("/api/ask", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message }),
            });

            const data = await res.json();
            setResponse(data.message || "No response from AI");
        } catch (error) {
            // console.error("Error fetching AI response:", error);
            setResponse("Something went wrong!");
        }

        setLoading(false);
    };

    return (
        <main className="container">
            <h1>Lisa - Virtual Assistant</h1>
            <input 
                type="text" 
                value={message} 
                onChange={(e) => setMessage(e.target.value)} 
                placeholder="Ask Lisa something..."
            />
            <button onClick={handleAsk} disabled={loading}>
                {loading ? "Thinking..." : "Ask Lisa"}
            </button>
            {response && <p><strong>Lisa:</strong> {response}</p>}
        </main>
    );
}
