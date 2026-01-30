// app/api/analyze/route.ts

import { NextResponse } from "next/server";
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { evidence, context } = await req.json();
    console.log("Received bundle from client:", { evidence, context });
    const files = evidence || [];
    const narrative = context || "";

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are a forensic accident reconstructionist.
          Your task is to extract every possible detail for a California SR-1 form.
          
          SPECIFIC CONTEXT:
          - The user is the FRONT vehicle in a multi-car accident.
          - If multiple "Other Party" vehicles are identified via license plates or VINs, categorize them as other_party_1 (the car that hit the user) and other_party_2 (the car that hit party 1).
          - If no images are provided, rely strictly on the User Narrative
          
          REQUIRED JSON STRUCTURE:
          {
            "accident_summary": "string",
            "date_time": "ISO string if found",
            "location": "string",
            "subject_vehicle": { "make": "", "model": "", "damage": "" },
            "other_parties": [
              { "id": 1, "name": "", "make": "", "model": "", "plate": "", "insurance_co": "", "policy": "", "damage_desc": "" }
            ]
          }`
        },
        {
          role: "user",
          content: [
            { type: "text", text: `User Narrative: ${narrative}` },
            ...files.map((file: any) => ([
              { type: "text", text: `Labels: ${file.primary} - ${file.secondary?.join(', ')}. User Notes: ${file.notes}` },
              { type: "image_url", image_url: { url: file.base64 } }
            ])).flat()
          ]
        }
      ],
      response_format: { type: "json_object" },
    });

    const aiContent = JSON.parse(response.choices[0].message.content || "{}");
    return NextResponse.json(aiContent);


    // const mockSR1Data = {
    //   accident_details: {
    //     date: "2024-05-20",
    //     location: "I-5 North, California",
    //     description: narrative || "3-car rear-end accident.",
    //   },
    //   your_vehicle: {
    //     make: "Tesla",
    //     model: "Model 3",
    //     damage_description: "Rear bumper and trunk lid indentation.",
    //   },
    //   other_party_1: {
    //     driver_name: "John Doe",
    //     vehicle_make: "Honda",
    //     vehicle_model: "Civic",
    //     insurance_company: "State Farm",
    //     policy_number: "SF-99223344",
    //     damage_description: "Front-end crumple, radiator leak.",
    //   },
    //   other_party_2: {
    //     driver_name: "Jane Smith",
    //     vehicle_make: "Ford",
    //     vehicle_model: "F-150",
    //     insurance_company: "Geico",
    //     policy_number: "G-00112233",
    //     damage_description: "Minor front bumper scratches.",
    //   }
    // };

    // return NextResponse.json(mockSR1Data);

  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Failed to parse data" }, { status: 500 });
  }
}