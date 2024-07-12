import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { errors } from "@/constants/errors";
import { MainCharacter } from "@libs/types";
import { revalidatePath } from "next/cache";

// GET 회원 정보 조회

export async function POST(req: NextRequest) {
  // 회원가입
  try {
    const JWT_SECRET = process.env.JWT_SECRET as string;
    const auth = req.headers.get("Authorization");
    const { apiKey, mainCharacter, characters } = (await req.json()) as {
      apiKey: string;
      mainCharacter: MainCharacter;
      characters: string[];
    };
    if (!apiKey || !mainCharacter || !characters) {
      return NextResponse.json(
        {
          error: {
            message: "정상적 접근이 아닙니다.",
            code: "00001",
          },
        },
        {
          status: 500,
        },
      );
    }
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
        {
          status: errors.USERS.NO_LOGIN_TOKEN.status,
        },
      );
    }

    /*
    s2s 통신 (회원가입) <- email, username, apiKey
    */

    revalidatePath("/");

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
