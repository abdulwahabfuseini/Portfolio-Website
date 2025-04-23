/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/Prismadb"; // Assuming this path and export are correct in your project
// import { readFile } from "fs/promises"; // readFile is unused, can be removed if not needed later
import { IncomingForm, Files } from "formidable"; // File as FormidableFile is unused
import { Readable } from "stream";
import type { IncomingMessage } from "http";

// Helper function to convert NextRequest to Node.js IncomingMessage
const toIncomingMessage = async (
  req: NextRequest
): Promise<IncomingMessage> => {
  const bodyBuffer = Buffer.from(await req.arrayBuffer());
  const stream = new Readable();
  stream.push(bodyBuffer);
  stream.push(null);

  // Create a mock IncomingMessage compatible object
  return Object.assign(stream, {
    headers: Object.fromEntries(req.headers), // Convert Headers object to plain object
    method: req.method,
    url: req.url,
    // Add other properties if needed by formidable, like httpVersion, connection etc.
    // socket: {}, // Example: May need a mock socket
  }) as IncomingMessage;
};

// Define allowed origins for CORS
const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(",") || [
  "http://localhost:3000",
  "https://international-trade-properties.vercel.app",
];

// Helper function to set CORS headers
const setCorsHeaders = (response: NextResponse, origin: string | null) => {
  if (origin && allowedOrigins.includes(origin)) {
    response.headers.set("Access-Control-Allow-Origin", origin);
    response.headers.set(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
    response.headers.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization" // Add other headers if needed
    );
    response.headers.set("Access-Control-Allow-Credentials", "true");
  }
};

// OPTIONS handler for CORS preflight requests
export async function OPTIONS(req: NextRequest) {
  const origin = req.headers.get("origin");
  const response = new NextResponse(null, { status: 204 }); // Use 204 No Content for OPTIONS
  setCorsHeaders(response, origin); // Apply CORS headers conditionally based on origin
  return response;
  // Removed the 405 check here - OPTIONS should generally return allowed methods via headers.
  // Let the browser handle disallowed methods based on the absence of the origin in Allow-Origin.
}

// Helper function to parse form data using formidable
async function parseFormData(
  req: NextRequest
): Promise<{ fields: Record<string, string[]>; files: Files<string> }> {
  const form = new IncomingForm({ multiples: true });
  const nodeReq = await toIncomingMessage(req);

  return new Promise((resolve, reject) => {
    form.parse(nodeReq, (err, fields, files) => {
      if (err) {
        console.error("Formidable Parsing Error:", err);
        // It's often better to reject with an Error object
        reject(new Error(`Form parsing failed: ${err.message}`));
        return;
      }

      // Ensure all field values are string arrays
      const processedFields: Record<string, string[]> = {};
      for (const key in fields) {
        if (Object.prototype.hasOwnProperty.call(fields, key)) {
          const value = fields[key];
          processedFields[key] = Array.isArray(value)
            ? value.map(String) // Ensure elements are strings
            : [String(value)]; // Wrap single value in array
        }
      }
      resolve({ fields: processedFields, files });
    });
  });
}

// POST handler to create a new property/product entry
export async function POST(req: NextRequest): Promise<NextResponse> {
  console.log("API POST /api/properties called");
  const origin = req.headers.get("origin");

  // Main try block for the entire request processing
  try {
    const { fields, files } = await parseFormData(req); // files object is available if needed

    // Extract fields - use nullish coalescing for safety
    const fullName = fields.fullName?.[0] ?? "";
    const email = fields.email?.[0] ?? "";
    const phoneNumber = fields.phoneNumber?.[0] ?? "";
    const budget = fields.budget?.[0] ?? "";
    const companyName = fields.companyName?.[0] ?? "";
    const companyAddress = fields.companyAddress?.[0] ?? ""; // Corrected typo: companyAddress
    const detail = fields.detail?.[0] ?? "";

    // --- Validation ---
    const requiredFields = {
      fullName,
      email,
      phoneNumber,
      budget,
      detail,
    };
    const missingFields = Object.entries(requiredFields)
      .filter(([, value]) => !value) // Check for empty strings or undefined
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

    // *** CORRECTED BUDGET VALIDATION ***
    const allowedBudgetValues = [
      "GH₵ 2,000.00 - GH₵ 5,000.00",
      "GH₵ 5,000.00 - GH₵ 10,000.00",
      "GH₵ 10,000.00 And Above",
    ];
    if (!allowedBudgetValues.includes(budget)) {
      console.error("Validation Error - Invalid budget:", budget);
      const response = NextResponse.json(
        { message: "Invalid budget value provided." },
        { status: 400 }
      );
      setCorsHeaders(response, origin);
      return response;
    }

    // *** Removed the misplaced closing brace here ***

    // Inner try block specifically for the database operation
    try {
      const product = await prisma.products.create({
        data: {
          // These variables are now in scope
          fullName,
          email,
          budget,
          companyName,
          companyAddress, // Corrected typo
          detail,
          phoneNumber,
        },
      });

      console.log("Product created successfully in DB:", product.id);

      const response = NextResponse.json(
        {
          success: true,
          data: product,
          message: "Product Created Successfully",
        },
        { status: 201 } // 201 Created is more appropriate
      );
      setCorsHeaders(response, origin);
      return response;

    } catch (prismaError: any) {
      console.error("Prisma Database Error:", prismaError);
      let errorMessage = "Database error occurred while creating the product.";
      let statusCode = 500; // Default to internal server error

      // Check for specific Prisma errors
      if (prismaError.code === "P2002" && prismaError.meta?.target) {
        // Unique constraint violation
        errorMessage = `Database Error: An entry with this information might already exist (duplicate field: ${prismaError.meta.target.join(
          ", "
        )}).`;
        statusCode = 409; // Conflict status code
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
  // Catch block for the main try (e.g., parsing errors)
  } catch (error: any) {
    console.error("Overall POST Request Error:", error);
    // Distinguish between parsing errors and others if needed
    const message = error.message.startsWith("Form parsing failed:")
     ? `Failed to process request data: ${error.message}`
     : "An internal server error occurred.";

    const response = NextResponse.json(
      { message: message, error: error.message || "Unknown error" },
      { status: error.message.startsWith("Form parsing failed:") ? 400 : 500 } // Bad Request for parsing errors
    );
    setCorsHeaders(response, origin);
    return response;
  }
  // *** Removed the extra closing brace here ***
}

// GET handler to retrieve all products
export const GET = async (req: NextRequest) => {
  const origin = req.headers.get("origin");
  try {
    const allProducts = await prisma.products.findMany({
      orderBy: { createdAt: "desc" }, // Order by creation date, newest first
    });
    const response = NextResponse.json(
      {
        success: true,
        data: allProducts,
        message: "Products Retrieved Successfully",
      },
      { status: 200 }
    );
    setCorsHeaders(response, origin);
    return response;
  } catch (error: any) { // Added type annotation
    console.error("GET Products Error:", error);
    const response = NextResponse.json(
      { message: "Database Error Retrieving Products", error: error.message },
      { status: 500 }
    );
    setCorsHeaders(response, origin);
    return response;
  }
};

// DELETE handler to remove ALL products (Use with caution!)
export const DELETE = async (req: NextRequest) => {
  const origin = req.headers.get("origin");
  try {
    // Consider adding authentication/authorization here before deleting all data
    console.warn("Executing DELETE request to remove all products!");
    const { count } = await prisma.products.deleteMany({}); // Delete all records
    console.log(`Deleted ${count} products.`);
    const response = NextResponse.json(
      {
        success: true,
        data: { deletedCount: count },
        message: `${count} Products Deleted Successfully`,
      },
      { status: 200 }
    );
    setCorsHeaders(response, origin);
    return response;
  } catch (error: any) { // Added type annotation
    console.error("DELETE Products Error:", error);
    const response = NextResponse.json(
      { message: "Database Error Deleting Products", error: error.message },
      { status: 500 }
    );
    setCorsHeaders(response, origin);
    return response;
  }
};