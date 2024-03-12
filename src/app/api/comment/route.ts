import { connectMongoDB } from "@/libs/mongodb";
import Review from "@/model/Review";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const { fullName, email, occupation, description } = body;
  try {
    await connectMongoDB();

    if (!fullName || !email || !occupation || !description) {
    }

    const review = new Review({
      fullName,
      email,
      occupation,
      description,
    });

    await review.save();

    return new NextResponse("Thanks for your comment", {
      status: 201,
      headers: {
        "content-Type": "application/json",
      },
    });
  } catch (error) {
    return new NextResponse("Oops! Failed to create review", { status: 500 });
  }
};

export const GET = async (req: NextRequest) => {
  try {
    await connectMongoDB();

    const reviews = await Review.find();

    if (!reviews) {
      return NextResponse.json(
        { message: "Reviews Not Found" },
        { status: 404 }
      );
    }
    return new NextResponse(JSON.stringify(reviews), { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Oops! Failed to get all reviews" },
      {
        status: 500,
      }
    );
  }
};
