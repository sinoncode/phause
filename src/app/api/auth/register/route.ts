import { NextResponse } from "next/server";

const REGISTRATION_API_URL =
  "https://phishingsimulation.webandappdevelopmenttech.com/api/auth/register";

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);
  if (!payload) {
    return NextResponse.json({ message: "Invalid request body." }, { status: 400 });
  }

  try {
    const response = await fetch(REGISTRATION_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    const data = await response.json().catch(() => null);
    if (!response.ok) {
      return NextResponse.json(
        data ?? { message: "Registration was rejected by the server." },
        { status: response.status },
      );
    }

    return NextResponse.json(data ?? { success: true }, { status: response.status });
  } catch {
    return NextResponse.json(
      { message: "Registration service is unavailable. Please try again." },
      { status: 502 },
    );
  }
}
