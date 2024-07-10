import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { errors } from "@/constants/errors";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  // 로그인
  try {
    const JWT_SECRET = process.env.JWT_SECRET as string;
    const auth = req.headers.get("Authorization");
    if (!auth) {
      return NextResponse.json(
        {
          error: {
            message: errors.USERS.NO_LOGIN_TOKEN.message,
            code: errors.USERS.NO_LOGIN_TOKEN.code,
          },
        },
        { status: errors.USERS.NO_LOGIN_TOKEN.status },
      );
    }

    const [authScheme, loginToken] = auth.split(" ");

    if (authScheme !== "Bearer" || !loginToken) {
      return NextResponse.json(
        {
          error: {
            message: errors.USERS.NO_LOGIN_TOKEN.message,
            code: errors.USERS.NO_LOGIN_TOKEN.code,
          },
        },
        { status: errors.USERS.NO_LOGIN_TOKEN.status },
      );
    }

    const { email } = jwt.verify(loginToken, JWT_SECRET) as { email: string };

    if (!email) {
      return NextResponse.json(
        {
          error: {
            message: errors.USERS.NO_LOGIN_TOKEN.message,
            code: errors.USERS.NO_LOGIN_TOKEN.code,
          },
        },
        { status: errors.USERS.NO_LOGIN_TOKEN.status },
      );
    }

    const accessToken = jwt.sign({ email }, JWT_SECRET, {
      expiresIn: "30d",
    });

    // test response
    return NextResponse.json(accessToken, { status: 200 });

    /*
    s2s 통신 (로그인)
    */

    // return NextResponse.json(
    //   "", //  access-token
    //   { status: 200 },
    // );
  } catch (err) {
    return NextResponse.json(
      {
        error: {
          message: errors.COMMON.SERVER.message,
          code: errors.COMMON.SERVER.code,
        },
      },
      { status: errors.COMMON.SERVER.status },
    );
  }
}
