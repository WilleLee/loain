import { errors } from "@/constants/errors";
import { fetcher } from "@libs/server/fetcher";
import { LostarkNotice } from "@libs/types";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const API_URL = "https://developer-lostark.game.onstove.com/news/notices";
    const LOA_TOKEN = process.env.TEST_LOA_TOKEN as string;

    const { isSuccessful, data } = await fetcher<
      {
        Title: string;
        Date: string;
        Link: string;
        Type: string;
      }[]
    >("GET", API_URL, {
      headers: {
        Authorization: `Bearer ${LOA_TOKEN}`,
        Accept: "application/json",
      },
    });

    if (!isSuccessful || !data) {
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

    const filteredData: LostarkNotice[] = data.slice(0, 10).map((item) => ({
      title: item.Title,
      date: item.Date,
      type: item.Type,
      link: item.Link,
    }));

    return NextResponse.json(filteredData, { status: 200 });
  } catch (_) {
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
