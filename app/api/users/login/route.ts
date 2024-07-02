import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { errors } from "@/constants/errors";

export const dynamic = "force-dynamic";

export async function POST() {
  // 로그인
  try {
    const JWT_SECRET = process.env.JWT_SECRET as string;
    const loginToken = cookies().get("login-token")?.value;

    console.log("loginToken", loginToken);

    if (!loginToken) {
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
