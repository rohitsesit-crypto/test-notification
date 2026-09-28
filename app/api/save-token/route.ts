import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest
) {

  try {

    const { token } =
      await request.json();

    if (!token) {

      return NextResponse.json(
        {
          success: false,
          message: "Token missing"
        },
        { status: 400 }
      );

    }

    const response = await fetch(
      process.env.APPS_SCRIPT_URL!,
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json"
        },

        body: JSON.stringify({
          token
        }),

        cache: "no-store"
      }
    );

    const result =
      await response.text();

    return NextResponse.json({
      success: true,
      result
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to save token"
      },
      { status: 500 }
    );

  }
}