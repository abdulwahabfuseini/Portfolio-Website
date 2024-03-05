
import { connectMongoDB } from "@/libs/mongodb";
import Review from "@/model/Review";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    await connectMongoDB();
    const { fullname, email, description } = await req.json();

    const reviews = new Review({
      fullname,
      email,
      description,
    });

    await reviews.save();

    return new NextResponse("Thanks for your cmoment", { status: 201 });
  } catch (error) {
    return new NextResponse("Database Error", { status: 500 });
  }
};

export const GET = async (req: NextRequest) => {
  try {
    await connectMongoDB();
    const reviews = await Review.find();
    return new NextResponse(JSON.stringify(reviews), { status: 201 });
  } catch (error) {
    return new NextResponse("Database Error! Failed to get all reviews", {
      status: 500,
    });
  }
};
