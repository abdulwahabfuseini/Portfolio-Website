import { connectMongoDB } from "@/libs/mongodb";
import Review from "@/model/Review";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const { fullName, email, description } = body
  try {
    await connectMongoDB();
 
    if (!fullName || !email || !description) {
      
    }
   
    const review = new Review({
      fullName,
      email,
      description,
    });

    await review.save();

    return NextResponse.json(
      { message: "Thanks for your cmoment", data: review },
      {
        status: 201,
        headers: {
          "content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Oops! Failed to create review" },
      { status: 500 }
    );
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
    return NextResponse.json(
      { message: "All Reviews", data: reviews },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Oops! Failed to get all reviews" },
      {
        status: 500,
      }
    );
  }
};
