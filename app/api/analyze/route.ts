// app/api/analyze/route.ts

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // 1. Still parse the body to ensure your client-side fetch is correct
    const body = await req.json();
    console.log("Received bundle from client:", body);

    // 2. Wait 2 seconds to simulate "Thinking" time
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // 3. Hardcoded Mock SR-1 Data
    const mockSR1Data = {
      accident_details: {
        date: "2024-05-20",
        location: "I-5 North, California",
        description: body.narrative || "3-car rear-end accident.",
      },
      your_vehicle: {
        make: "Tesla",
        model: "Model 3",
        damage_description: "Rear bumper and trunk lid indentation.",
      },
      other_party_1: {
        driver_name: "John Doe",
        vehicle_make: "Honda",
        vehicle_model: "Civic",
        insurance_company: "State Farm",
        policy_number: "SF-99223344",
        damage_description: "Front-end crumple, radiator leak.",
      },
      other_party_2: {
        driver_name: "Jane Smith",
        vehicle_make: "Ford",
        vehicle_model: "F-150",
        insurance_company: "Geico",
        policy_number: "G-00112233",
        damage_description: "Minor front bumper scratches.",
      }
    };

    return NextResponse.json(mockSR1Data);

  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Failed to parse data" }, { status: 500 });
  }
}