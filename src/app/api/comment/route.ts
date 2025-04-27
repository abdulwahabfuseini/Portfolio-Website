/* eslint-disable @typescript-eslint/no-explicit-any */



import { NextRequest, NextResponse } from "next/server";
import { IncomingForm, Files } from "formidable";
import { Readable } from "stream";
import type { IncomingMessage } from "http";
import prisma from "@/libs/Prismadb"; 

const toIncomingMessage = async (
  req: NextRequest
): Promise<IncomingMessage> => {
  const bodyBuffer = Buffer.from(await req.arrayBuffer());
  const stream = new Readable();
  stream.push(bodyBuffer);
  stream.push(null); 

  
  return Object.assign(stream, {
    headers: Object.fromEntries(req.headers), 
    method: req.method,
    url: req.url,
  }) as IncomingMessage;
};

// --- CORS Configuration ---
const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(",") || [
  "http://localhost:3000",
  "https://portfolio-website-two-tau-94.vercel.app/", 
 
];

// Helper function to add CORS headers to a response
const setCorsHeaders = (response: NextResponse, origin: string | null) => {
  // Only set CORS headers if the origin is in the allowed list
  if (origin && allowedOrigins.includes(origin)) {
    response.headers.set("Access-Control-Allow-Origin", origin);
    response.headers.set(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS" // Allowed methods
    );
    response.headers.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization" // Allowed headers
    );
    response.headers.set("Access-Control-Allow-Credentials", "true"); // If you need to handle credentials (cookies, auth headers)
  }
};

// --- OPTIONS Request Handler (for CORS preflight) ---
export async function OPTIONS(req: NextRequest) {
  const origin = req.headers.get("origin");
  // Respond with 204 No Content for OPTIONS requests
  const response = new NextResponse(null, { status: 204 });
  // Set CORS headers based on the request origin
  setCorsHeaders(response, origin);
  return response;
}

// --- Helper function to parse FormData using Formidable ---
async function parseFormData(
  req: NextRequest
): Promise<{ fields: Record<string, string[]>; files: Files<string> }> {
  const form = new IncomingForm({ multiples: true }); // Allow multiple files/fields with the same name
  const nodeReq = await toIncomingMessage(req); 

  return new Promise((resolve, reject) => {
    form.parse(nodeReq, (err, fields, files) => {
      if (err) {
        console.error("Formidable Parsing Error:", err);
        reject(new Error(`Form parsing failed: ${err.message}`)); 
        return;
      }

      // Ensure all field values are consistently string arrays
      const processedFields: Record<string, string[]> = {};
      for (const key in fields) {
        // Check own properties to avoid iterating prototype chain
        if (Object.prototype.hasOwnProperty.call(fields, key)) {
          const value = fields[key];
          // Convert single values to arrays and ensure all array elements are strings
          processedFields[key] = Array.isArray(value)
            ? value.map(String)
            : [String(value)];
        }
      }
      resolve({ fields: processedFields, files }); // Resolve with processed fields and files
    });
  });
}

// --- POST Request Handler (Create a new project entry) ---
export async function POST(req: NextRequest): Promise<NextResponse> {
  console.log("API POST /api/projects called");
  const origin = req.headers.get("origin"); // Get request origin for CORS

  // Main try block for request processing (parsing, validation, DB operation)
  try {
    // Parse the incoming form data
    const { fields, files } = await parseFormData(req); // 'files' object is available if handling uploads

    // Extract required fields from parsed data (using nullish coalescing for safety)
    const fullName = fields.fullName?.[0] ?? "";
    const email = fields.email?.[0] ?? "";
    const phoneNumber = fields.phoneNumber?.[0] ?? "";
    const budget = fields.budget?.[0] ?? "";
    const companyName = fields.companyName?.[0] ?? "";
    const companyAddress = fields.companyAddress?.[0] ?? ""; // Corrected typo from conpanyAddress
    const detail = fields.detail?.[0] ?? "";

    // --- Server-Side Validation ---
    const requiredFields = {
      fullName,
      email,
      phoneNumber,
      budget,
      detail,
    };
    // Find any required fields that are empty or missing
    const missingFields = Object.entries(requiredFields)
      .filter(([, value]) => !value)
      .map(([key]) => key);

    // If validation fails, return a 400 Bad Request response
    if (missingFields.length > 0) {
      console.error("Validation Error - Missing fields:", missingFields);
      const response = NextResponse.json(
        { message: `Missing required fields: ${missingFields.join(", ")}.` },
        { status: 400 }
      );
      setCorsHeaders(response, origin); // Apply CORS headers
      return response;
    }

    // Specific validation for the 'budget' field
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
      setCorsHeaders(response, origin); // Apply CORS headers
      return response;
    }

    // --- Database Operation ---
    // Inner try block specifically for the Prisma database call
    try {
      // Create a new record in the 'projects' table (ensure model name matches schema.prisma)
      const newProject = await prisma.projects.create({
        data: {
          fullName,
          email,
          budget,
          companyName,
          companyAddress, // Use corrected field name
          detail,
          phoneNumber,
          // Prisma automatically handles 'id' and 'createdAt'/'updatedAt' if defined in schema
        },
      });

      console.log("Project created successfully in DB:", newProject.id);

      // Return a success response (201 Created)
      const response = NextResponse.json(
        {
          success: true,
          data: newProject,
          message: "Project Created Successfully",
        },
        { status: 201 }
      );
      setCorsHeaders(response, origin); // Apply CORS headers
      return response;

    } catch (prismaError: any) {
      // Handle potential database errors (e.g., unique constraint violation)
      console.error("Prisma Database Error:", prismaError);
      let errorMessage = "Database error occurred while creating the project.";
      let statusCode = 500; // Default to Internal Server Error

      // Check for specific Prisma error codes
      if (prismaError.code === "P2002" && prismaError.meta?.target) {
        // Unique constraint failed
        errorMessage = `Database Error: An entry with this information might already exist (duplicate field: ${prismaError.meta.target.join(
          ", "
        )}).`;
        statusCode = 409; // Conflict status code
      } else if (prismaError.message) {
        // Use Prisma's error message if available
        errorMessage = `Database Error: ${prismaError.message}`;
      }

      // Return an error response
      const response = NextResponse.json(
        {
          message: errorMessage,
          error: prismaError.code || "Unknown DB Error", // Include error code if available
        },
        { status: statusCode }
      );
      setCorsHeaders(response, origin); // Apply CORS headers
      return response;
    }
  // Catch block for errors during parsing or validation (outside the DB operation)
  } catch (error: any) {
    console.error("Overall POST Request Error:", error);
    // Determine if the error was during form parsing
    const message = error.message.startsWith("Form parsing failed:")
      ? `Failed to process request data: ${error.message}`
      : "An internal server error occurred.";
    // Use 400 for parsing errors, 500 for others
    const status = error.message.startsWith("Form parsing failed:") ? 400 : 500;

    // Return a generic server error response
    const response = NextResponse.json(
      { message: message, error: error.message || "Unknown error" },
      { status: status }
    );
    setCorsHeaders(response, origin); // Apply CORS headers
    return response;
  }
}

// --- GET Request Handler (Retrieve all projects) ---
export const GET = async (req: NextRequest) => {
  const origin = req.headers.get("origin"); // Get request origin for CORS

  // NOTE: The connection error happens here if the DB connection fails.
  // The code below is correct, but depends on a working DB connection.
  try {
    // Fetch all records from the 'projects' table
    // Consider adding 'orderBy: { createdAt: "desc" }' to get newest first
    const allProjects = await prisma.projects.findMany({
       orderBy: { createdAt: "desc" }, // Optional: uncomment to order by creation date
    });

    // Return a success response (200 OK)
    const response = NextResponse.json(
      {
        success: true,
        data: allProjects,
        message: "Projects Retrieved Successfully",
      },
      { status: 200 }
    );
    setCorsHeaders(response, origin); // Apply CORS headers
    return response;

  } catch (error: any) {
    // Handle errors during database retrieval (including the connection error)
    console.error("GET Projects Error:", error);
    // Return an error response
    const response = NextResponse.json(
      // Include the actual error message for debugging (might want to hide in production)
      { message: "Database Error Retrieving Projects", error: error.message },
      { status: 500 }
    );
    setCorsHeaders(response, origin); // Apply CORS headers
    return response;
  }
};

// --- DELETE Request Handler (Remove all projects - USE WITH CAUTION!) ---
export const DELETE = async (req: NextRequest) => {
  const origin = req.headers.get("origin"); // Get request origin for CORS
  // Add Authentication/Authorization checks here before allowing deletion!

  try {
    console.warn("Executing DELETE request to remove all projects!");
    // Delete all records from the 'projects' table
    const { count } = await prisma.projects.deleteMany({});
    console.log(`Deleted ${count} projects.`);

    // Return a success response (200 OK)
    const response = NextResponse.json(
      {
        success: true,
        data: { deletedCount: count }, // Report how many were deleted
        message: `${count} Projects Deleted Successfully`,
      },
      { status: 200 }
    );
    setCorsHeaders(response, origin); // Apply CORS headers
    return response;

  } catch (error: any) {
    // Handle errors during deletion
    console.error("DELETE Projects Error:", error);
    // Return an error response
    const response = NextResponse.json(
      { message: "Database Error Deleting Projects", error: error.message },
      { status: 500 }
    );
    setCorsHeaders(response, origin); // Apply CORS headers
    return response;
  }
};