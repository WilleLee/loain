import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { errors } from "@/constants/errors";

// GET 회원 정보 조회

export async function POST(req: NextRequest) {
  // 회원가입
  try {
    const JWT_SECRET = process.env.JWT_SECRET as string;
    const loginToken = cookies().get("login-token")?.value;
    const { username, apiKey } = (await req.json()) as {
      username: string;
      apiKey: string;
    };

    if (!username) {
      return NextResponse.json(
        {
          error: {
            message: errors.USERS.NO_USERNAME.message,
            code: errors.USERS.NO_USERNAME.code,
          },
        },
        { status: errors.USERS.NO_USERNAME.status },
      );
    }

    if (!apiKey) {
      return NextResponse.json(
        {
          error: {
            message: errors.USERS.NO_APIKEY.message,
            code: errors.USERS.NO_APIKEY.code,
          },
        },
        { status: errors.USERS.NO_APIKEY.status },
      );
    }

    if (username.length < 2 || username.length > 15) {
      return NextResponse.json(
        {
          error: {
            message: errors.USERS.USERNAME_PATTERN.message,
            code: errors.USERS.USERNAME_PATTERN.code,
          },
        },
        { status: errors.USERS.USERNAME_PATTERN.status },
      );
    }

    if (!loginToken) {
      return NextResponse.json(
        {
          error: {
            message: errors.USERS.NO_LOGIN_TOKEN.message,
            code: errors.USERS.NO_LOGIN_TOKEN.code,
          },
        },
        {
          status: errors.USERS.NO_LOGIN_TOKEN.status,
        },
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
        {
          status: errors.USERS.NO_LOGIN_TOKEN.status,
        },
      );
    }

    /*
    s2s 통신 (회원가입) <- email, username, apiKey
    */

    return NextResponse.json(
      "", // access-token
      {
        status: 201,
      },
    );
  } catch (err) {
    return NextResponse.json(
      {
        error: {
          message: errors.COMMON.SERVER.message,
          code: errors.COMMON.SERVER.code,
        },
      },
      {
        status: errors.COMMON.SERVER.status,
      },
    );
  }
}

// PATCH 회원 정보 수정

// DELETE 회원 탈퇴
