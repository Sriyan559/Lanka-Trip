import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const excludedRequestHeaders = new Set([
  "connection",
  "content-length",
  "expect",
  "host",
  "transfer-encoding",
]);

const excludedResponseHeaders = new Set([
  "connection",
  "content-encoding",
  "content-length",
  "transfer-encoding",
]);

async function forward(request: NextRequest, context: { params: { path: string[] } }) {
  const apiRoot = (process.env.BACKEND_API_URL || "http://127.0.0.1:8000/api").replace(/\/$/, "");
  const path = context.params.path.map(encodeURIComponent).join("/");
  const target = `${apiRoot}/${path}${request.nextUrl.search}`;
  const headers = new Headers();

  request.headers.forEach((value, key) => {
    if (!excludedRequestHeaders.has(key.toLowerCase())) headers.set(key, value);
  });

  try {
    const hasBody = request.method !== "GET" && request.method !== "HEAD";
    const upstream = await fetch(target, {
      method: request.method,
      headers,
      body: hasBody ? await request.arrayBuffer() : undefined,
      cache: "no-store",
      redirect: "manual",
    });
    const responseHeaders = new Headers();
    upstream.headers.forEach((value, key) => {
      if (!excludedResponseHeaders.has(key.toLowerCase())) responseHeaders.set(key, value);
    });

    return new NextResponse(upstream.body, {
      status: upstream.status,
      statusText: upstream.statusText,
      headers: responseHeaders,
    });
  } catch (error) {
    const cause = error instanceof Error && error.cause instanceof Error
      ? {
          message: error.cause.message,
          code: "code" in error.cause ? String(error.cause.code) : undefined,
        }
      : undefined;

    console.error("API gateway request failed", {
      target,
      message: error instanceof Error ? error.message : "Unknown gateway error",
      cause,
    });
    return NextResponse.json(
      { message: "The backend API is currently unavailable." },
      { status: 502 },
    );
  }
}

export const GET = forward;
export const POST = forward;
export const PUT = forward;
export const PATCH = forward;
export const DELETE = forward;
export const OPTIONS = forward;
