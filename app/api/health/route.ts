import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({
    ok: true,
    service: "tellus-gateway-v003",
    network: process.env.NEXT_PUBLIC_CARDANO_NETWORK || "preprod-demo"
  });
}
