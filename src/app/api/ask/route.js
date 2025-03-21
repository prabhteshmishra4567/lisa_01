/**
API file
**/

import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';
export async function POST(req) {
    try {
        
        const genAI = new GoogleGenerativeAI(process.env.GEMINIAI_API_KEY);
        
        const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
        
        const data = await req.json();
        const prompt = data.body;
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const output = await response.text();
        return NextResponse.json({ output: output });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'An error occurred while generating content' }, { status: 500 });
    }
}