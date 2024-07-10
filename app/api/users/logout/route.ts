import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  revalidatePath("/");
  return NextResponse.redirect(new URL("/", req.nextUrl));
}
