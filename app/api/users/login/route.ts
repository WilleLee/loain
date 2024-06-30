import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export const dynamic = "force-dynamic";

export async function POST() {
  // 로그인
  try {
    const JWT_SECRET = process.env.JWT_SECRET as string;
    const loginToken = cookies().get("login-token")?.value;

    if (!loginToken) {
      return NextResponse.json(
        { error: "정상적인 접근이 아닙니다." },
        { status: 401 },
      );
    }

    const { email } = jwt.verify(loginToken, JWT_SECRET) as { email: string };

    if (!email) {
      return NextResponse.json(
        { error: "정상적인 접근이 아닙니다." },
        { status: 401 },
      );
    }

    // test response
    return NextResponse.json(email, { status: 200 });

    /*
    s2s 통신 (로그인)
    */

    // return NextResponse.json(
    //   "", //  access-token
    //   { status: 200 },
    // );
  } catch (err) {
    return NextResponse.json({ error: "다시 시도해주세요." }, { status: 500 });
  }
}
