import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const auth = req.headers.get("Authorization");
  if (!auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const [authScheme, authParams] = auth.split(" ");
  if (authScheme !== "Bearer") {
    return NextResponse.json(
      { error: "Invalid authorization scheme" },
      { status: 401 },
    );
  }

  console.log("your token: ", authParams);

  return NextResponse.json("hello world!");
}
