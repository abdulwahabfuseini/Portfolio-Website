/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/Prismadb";



// --- CORS Configuration ---
const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(",") || [
  "http://localhost:3000",
  "https://portfolio-website-two-tau-94.vercel.app", // Ensure no trailing slash if not intended
  // Add any other specific origins if needed
];

// Helper function to add CORS headers to a response
const setCorsHeaders = (response: NextResponse, origin: string | null) => {
  if (origin && allowedOrigins.includes(origin)) {
    response.headers.set("Access-Control-Allow-Origin", origin);
    response.headers.set(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
    response.headers.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );
    response.headers.set("Access-Control-Allow-Credentials", "true");
  } else if (!origin && process.env.NODE_ENV === "development") {
    // Allow requests with no origin in development (e.g., from tools like Postman)
    response.headers.set("Access-Control-Allow-Origin", "*"); // Or specific dev origin
  }
  // Add Vary header is good practice for CORS
  response.headers.set("Vary", "Origin");
};

// --- OPTIONS Request Handler (for CORS preflight) ---
export async function OPTIONS(req: NextRequest) {
  const origin = req.headers.get("origin");
  const response = new NextResponse(null, { status: 204 });
  setCorsHeaders(response, origin);
  return response;
}

// --- POST Request Handler (Create a new comment entry - Accepts JSON) ---
export async function POST(req: NextRequest): Promise<NextResponse> {
  console.log("API POST /api/comments called (expecting JSON)");
  const origin = req.headers.get("origin");

  try {
    // --- Parse JSON Body ---
    let body;
    try {
      body = await req.json(); // Directly parse the JSON body
    } catch (parseError: any) {
      console.error("JSON Parsing Error:", parseError);
      const response = NextResponse.json(
        { message: "Invalid JSON payload provided." },
        { status: 400 }
      );
      setCorsHeaders(response, origin);
      return response;
    }

    // --- Extract Data from JSON Body ---
    const { fullName, email, occupation, rate, description } = body;

    console.log("Received data:", {
      fullName,
      email,
      occupation,
      rate,
      description,
    }); // Log received data

    // --- Server-Side Validation ---
    const requiredFields = { fullName, email, occupation, rate, description };
    const missingFields = Object.entries(requiredFields)
      .filter(
        ([, value]) => value === undefined || value === null || value === ""
      ) // Check for undefined, null, or empty string
      .map(([key]) => key);

    if (missingFields.length > 0) {
      console.error("Validation Error - Missing fields:", missingFields);
      const response = NextResponse.json(
        { message: `Missing required fields: ${missingFields.join(", ")}.` },
        { status: 400 }
      );
      setCorsHeaders(response, origin);
      return response;
    }

    // --- Rate Validation ---
    const allowedRateValues = [
      "1 - Very Poor",
      "2 - Poor",
      "3 - Average",
      "4 - Good",
      "5 - Excellent",
    ];
    if (!allowedRateValues.includes(rate)) {
      console.error(
        `Validation Error - Invalid rate value received: '${rate}'`
      );
      const response = NextResponse.json(
        {
          message: `Invalid rate value provided. Received: '${rate}'. Expected one of: ${allowedRateValues.join(
            ", "
          )}`,
        },
        { status: 400 }
      );
      setCorsHeaders(response, origin);
      return response; 
    }

    // Basic Email Validation (optional but recommended)
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      console.error("Validation Error - Invalid email format:", email);
      const response = NextResponse.json(
        { message: "Invalid email format provided." },
        { status: 400 }
      );
      setCorsHeaders(response, origin);
      return response;
    }

    // --- Database Interaction ---
    try {
      const newComment = await prisma.comments.create({
        data: {
          fullName,
          email,
          occupation,
          rate, // Use the validated rate
          description,
        },
      });

      console.log("Comment created successfully in DB:", newComment.id);

      const response = NextResponse.json(
        {
          success: true,
          data: newComment, 
          message: "Review Submitted Successfully",
        },
        { status: 201 }
      );
      setCorsHeaders(response, origin);
      return response;
    } catch (prismaError: any) {
      console.error("Prisma Database Error:", prismaError);
      let errorMessage = "Database error occurred while saving the review.";
      let statusCode = 500;

      if (prismaError.code === "P2002" && prismaError.meta?.target) {
        errorMessage = `Database Error: An entry with this information might already exist (field: ${prismaError.meta.target.join(
          ", "
        )}).`;
        statusCode = 409; 
      } else if (prismaError.message) {
        errorMessage = `Database Error: ${prismaError.message}`;
      }

      const response = NextResponse.json(
        {
          message: errorMessage,
          error: prismaError.code || "Unknown DB Error",
        },
        { status: statusCode }
      );
      setCorsHeaders(response, origin);
      return response;
    }
  } catch (error: any) {
    // Catch unexpected errors during the process
    console.error("Overall POST Request Error:", error);
    const response = NextResponse.json(
      { message: "An internal server error occurred.", error: error.message },
      { status: 500 }
    );
    setCorsHeaders(response, origin);
    return response;
  }
}

// --- GET Request Handler ---
export const GET = async (req: NextRequest) => {
  const origin = req.headers.get("origin");
  try {
    const allComments = await prisma.comments.findMany({
      orderBy: { createdAt: "desc" },
    });
    const response = NextResponse.json(
      {
        success: true,
        data: allComments,
        message: "Comments Retrieved Successfully",
      },
      { status: 200 }
    );
    setCorsHeaders(response, origin);
    return response;
  } catch (error: any) {
    console.error("GET Comments Error:", error);
    const response = NextResponse.json(
      { message: "Database Error Retrieving Comments", error: error.message },
      { status: 500 }
    );
    setCorsHeaders(response, origin);
    return response;
  }
};

// --- DELETE Request Handler  ---
export const DELETE = async (req: NextRequest) => {
  const origin = req.headers.get("origin");
  // Add Authentication/Authorization checks here!
  try {
    console.warn("Executing DELETE request to remove all comments!");
    const { count } = await prisma.comments.deleteMany({});
    console.log(`Deleted ${count} comments.`);
    const response = NextResponse.json(
      {
        success: true,
        data: { deletedCount: count },
        message: `${count} Comments Deleted Successfully`,
      },
      { status: 200 }
    );
    setCorsHeaders(response, origin);
    return response;
  } catch (error: any) {
    console.error("DELETE Comments Error:", error);
    const response = NextResponse.json(
      { message: "Database Error Deleting Comments", error: error.message },
      { status: 500 }
    );
    setCorsHeaders(response, origin);
    return response;
  }
};
