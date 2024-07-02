import { errors } from "@/constants/errors";
import axios from "axios";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const CHARACTER_NAME = "슭틔";
    const LOA_TOKEN = process.env.TEST_LOA_TOKEN as string;

    const req1 = axios.get(
      `https://developer-lostark.game.onstove.com/characters/${CHARACTER_NAME}/siblings`,
      {
        headers: {
          Authorization: `Bearer ${LOA_TOKEN}`,
          Accept: "application/json",
        },
      },
    );

    // console.log("res", res1.data);

    const req2 = axios.get(
      `https://developer-lostark.game.onstove.com/armories/characters/${CHARACTER_NAME}`,
      {
        headers: {
          Authorization: `Bearer ${LOA_TOKEN}`,
          Accept: "application/json",
        },
      },
    );

    const [res1, res2] = await Promise.all([req1, req2]);

    return NextResponse.json(
      {
        characters: res1.data,
        avatars: res2.data,
      },
      {
        status: 200,
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
