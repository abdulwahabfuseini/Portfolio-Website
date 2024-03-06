import { NextResponse } from "next/server";

export const GetReviews = async () => {
  try {
    const res = await fetch("/api/comment", {
      cache: "no-store",
      method: "GET",
    });
    const reviews = await res.json();
    return reviews.data;
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch data" },
      { status: 500 }
    );
  }
};
