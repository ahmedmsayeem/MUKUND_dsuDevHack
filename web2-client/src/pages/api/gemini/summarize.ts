import type{ NextApiRequest,NextApiResponse } from "next";
import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    

    const genAI = new GoogleGenerativeAI(process.env.PUBLIC_GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const {medicalRecords} = req.body;

    // console.log(medicalRecords)

    const prompt = "I want you to give me a brief summary of patient history from the below data, 50 words is sufficient: "+ JSON.stringify(medicalRecords);

    const result = await model.generateContent(prompt);
    // console.log(result.response.text());
    const finalText= result.response.text()

    res.send({data:finalText})
  }
  