import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
// import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const CLIENT_ID = process.env.DISCORD_CLIENT_ID as string;
    const CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET as string;
    const TOKEN_API = process.env.DISCORD_TOKEN_API as string;
    const USER_API = process.env.DISCORD_USER_API as string;
    const REDIRECT_URI = process.env.DISCORD_REDIRECT_URI as string;
    const JWT_SECRET = process.env.JWT_SECRET as string;
    const { code } = await req.json();

    const {
      data: { access_token },
    } = await axios.post(
      TOKEN_API,
      new URLSearchParams({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: "authorization_code",
        redirect_uri: REDIRECT_URI,
        code,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      },
    );

    const {
      data: { email },
    } = await axios.get(USER_API, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    const loginToken = jwt.sign(
      {
        email,
      },
      JWT_SECRET,
      {
        expiresIn: "1h",
      },
    );

    return NextResponse.json(loginToken, {
      status: 200,
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "다시 시도해주세요." }, { status: 500 });
  }
}
