import { errors } from "@/constants/errors";
import { delay } from "@libs/delay";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { hello } = await req.json();
    await delay(500);
    if (typeof hello !== "string" || hello !== "world") {
      return NextResponse.json(
        {
          error: {
            message: "잘못된 요청입니다.",
            code: "22222",
          },
        },
        {
          status: 400,
        },
      );
    }
    return NextResponse.json("hello world", {
      status: 200,
    });
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
