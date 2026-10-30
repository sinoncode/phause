import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const configuredUrl = process.env.ORGANIZATION_API_BASE_URL?.trim();

  if (!configuredUrl) {
    return NextResponse.json(
      { message: "Organization API is not configured. Set ORGANIZATION_API_BASE_URL." },
      { status: 503 },
    );
  }

  const payload = await request.json().catch(() => null);
  if (!payload) {
    return NextResponse.json({ message: "Invalid request body." }, { status: 400 });
  }

  const apiKey = process.env.ORGANIZATION_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { message: "Organization API authentication is not configured. Set ORGANIZATION_API_KEY." },
      { status: 503 },
    );
  }

  const headers: HeadersInit = { "Content-Type": "application/json" };
  headers.Authorization = `${"Bearer"} ${apiKey}`;

  let endpoint: URL;
  try {
    const baseUrl = new URL(configuredUrl);
    endpoint = baseUrl.pathname.replace(/\/+$/, "").endsWith("/api/organizations")
      ? baseUrl
      : new URL(`/api/organizations`, baseUrl.origin);
  } catch {
    return NextResponse.json(
      { message: "ORGANIZATION_API_BASE_URL must be a valid absolute URL." },
      { status: 503 },
    );
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    const data = await response.json().catch(() => null);
    if (!response.ok) {
      return NextResponse.json(
        data ?? { message: "The organization service rejected the request." },
        { status: response.status },
      );
    }

    return NextResponse.json(data ?? { success: true }, { status: response.status });
  } catch {
    return NextResponse.json(
      { message: "The organization service is unavailable. Please try again." },
      { status: 502 },
    );
  }
}
