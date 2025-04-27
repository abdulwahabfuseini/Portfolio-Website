/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { IncomingForm, Files, File } from "formidable";
import { Readable } from "stream";
import type { IncomingMessage } from "http";
import prisma from "@/libs/Prismadb";

// Helper function to convert NextRequest to Node.js IncomingMessage
const toIncomingMessage = async (
  req: NextRequest
): Promise<IncomingMessage> => {
  // Handle cases where the request body might be null or empty
  const arrayBuffer = await req.arrayBuffer().catch(() => null);
  const bodyBuffer = arrayBuffer ? Buffer.from(arrayBuffer) : Buffer.alloc(0);

  const stream = new Readable();
  stream.push(bodyBuffer);
  stream.push(null); // Signal end of stream

  // Create a mock IncomingMessage compatible object
  return Object.assign(stream, {
    headers: Object.fromEntries(req.headers),
    method: req.method,
    url: req.url,
    // Add socket property required by some versions of formidable
    socket: { remoteAddress: req.ip ?? "unknown" } as any,
  }) as IncomingMessage;
};

// Allowed origins for CORS
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
      "Content-Type, Authorization"
    );
    response.headers.set("Access-Control-Allow-Credentials", "true");
  } else if (!origin && process.env.NODE_ENV === "development") {
    // Allow requests with no origin in development (e.g., server-side requests, tools)
    response.headers.set("Access-Control-Allow-Origin", "*"); // Be cautious with "*" in production
  }
  // Add Vary header to prevent caching issues with different origins
  response.headers.set("Vary", "Origin");
};

// OPTIONS handler for CORS preflight requests
export async function OPTIONS(req: NextRequest) {
  const origin = req.headers.get("origin");
  const response = new NextResponse(null, { status: 204 });
  setCorsHeaders(response, origin);
  return response;
}

// Helper function to parse form data using formidable
async function parseFormData(
  req: NextRequest
): Promise<{ fields: Record<string, string[]>; files: Files<string> }> {
  // Initialize formidable - disable file uploads if not needed for this route
  const form = new IncomingForm({
    multiples: true,
    keepExtensions: true,
    maxFileSize: 0,
  });
  const nodeReq = await toIncomingMessage(req);

  return new Promise((resolve, reject) => {
    form.parse(nodeReq, (err, fields, files) => {
      if (err) {
        console.error("Formidable Parsing Error:", err);
        // Provide a more specific error message
        reject(
          new Error(
            `Form data parsing failed: ${err.message}. Check request Content-Type and format.`
          )
        );
        return;
      }

      // Ensure all field values are string arrays for consistency
      const processedFields: Record<string, string[]> = {};
      for (const key in fields) {
        // Use hasOwnProperty for safety
        if (Object.prototype.hasOwnProperty.call(fields, key)) {
          const value = fields[key];
          // Convert single values to array and ensure all elements are strings
          processedFields[key] = (Array.isArray(value) ? value : [value]).map(
            String
          );
        }
      }
      resolve({ fields: processedFields, files });
    });
  });
}

// POST handler to create a new project entry
export async function POST(req: NextRequest): Promise<NextResponse> {
  console.log(
    `API POST /api/projects called from origin: ${req.headers.get("origin")}`
  );
  const origin = req.headers.get("origin");

  try {
    const { fields } = await parseFormData(req); // files are ignored as per formidable config

    // Extract fields - use nullish coalescing for safety and trim whitespace
    const fullName = fields.fullName?.[0]?.trim() ?? "";
    const email = fields.email?.[0]?.trim() ?? "";
    const phoneNumber = fields.phoneNumber?.[0]?.trim() ?? "";
    const budget = fields.budget?.[0]?.trim() ?? "";
    const companyName = fields.companyName?.[0]?.trim() ?? ""; // Optional
    const companyAddress = fields.companyAddress?.[0]?.trim() ?? ""; // Optional
    const detail = fields.detail?.[0]?.trim() ?? "";

    console.log("Received fields:", {
      fullName,
      email,
      phoneNumber,
      budget,
      companyName,
      companyAddress,
      detail,
    });

    // --- Validation ---
    const requiredFields = { fullName, email, phoneNumber, budget, detail };
    const missingFields = Object.entries(requiredFields)
      .filter(([, value]) => !value)
      .map(([key]) => key);

    if (missingFields.length > 0) {
      console.error(
        "Validation Error - Missing required fields:",
        missingFields
      );
      const response = NextResponse.json(
        { message: `Missing required fields: ${missingFields.join(", ")}.` },
        { status: 400 }
      );
      setCorsHeaders(response, origin);
      return response;
    }

    // *** BUDGET VALIDATION ***

    const allowedBudgetValues = [
      "GH₵ 2,000.00 - GH₵ 5,000.00",
      "GH₵ 5,000.00 - GH₵ 10,000.00",
      "GH₵ 10,000.00 And Above",
    ];
    if (!allowedBudgetValues.includes(budget)) {
      // Log the *actual* received value for debugging
      console.error(
        `Validation Error - Invalid budget value received: '${budget}'`
      );
      const response = NextResponse.json(
        {
          message: `Invalid budget value provided. Received: '${budget}'. Expected one of: ${allowedBudgetValues.join(
            ", "
          )}`,
        },
        { status: 400 }
      );
      setCorsHeaders(response, origin);
      return response;
    }

    // Additional validation (example: email format - basic)
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
      const newProject = await prisma.projects.create({
        data: {
          fullName,
          email,
          phoneNumber,
          budget,
          companyName: companyName || null,
          companyAddress: companyAddress || null,
          detail,
        },
      });

      console.log("Project created successfully in DB:", newProject.id);

      const response = NextResponse.json(
        {
          success: true,
          data: newProject,
          message: "Project Submitted Successfully",
        },
        { status: 201 }
      );
      setCorsHeaders(response, origin);
      return response;
    } catch (prismaError: any) {
      console.error("Prisma Database Error:", prismaError);
      let errorMessage = "Database error occurred while saving the project.";
      let statusCode = 500;

      if (prismaError.code === "P2002" && prismaError.meta?.target) {
        errorMessage = `Database Error: A project with this information might already exist (field: ${prismaError.meta.target.join(
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
    // Catch errors from parseFormData or other unexpected issues
    console.error("Overall POST Request Error:", error);
    const message = error.message.includes("Form data parsing failed")
      ? error.message // Use specific parsing error message
      : "An internal server error occurred processing your request.";

    const statusCode = error.message.includes("Form data parsing failed")
      ? 400
      : 500;

    const response = NextResponse.json(
      { message: message, error: error.message || "Unknown error" },
      { status: statusCode }
    );
    setCorsHeaders(response, origin);
    return response;
  }
}

// GET handler to retrieve all projects
export const GET = async (req: NextRequest) => {
  const origin = req.headers.get("origin");
  try {
    const allProjects = await prisma.projects.findMany({
      orderBy: { createdAt: "desc" },
    });
    const response = NextResponse.json(
      {
        success: true,
        data: allProjects,
        message: "Projects Retrieved Successfully",
      },
      { status: 200 }
    );
    setCorsHeaders(response, origin);
    return response;
  } catch (error: any) {
    console.error("GET Projects Error:", error);
    const response = NextResponse.json(
      { message: "Database Error Retrieving Projects", error: error.message },
      { status: 500 }
    );
    setCorsHeaders(response, origin);
    return response;
  }
};

// DELETE handler to remove all projects
export const DELETE = async (req: NextRequest) => {
  const origin = req.headers.get("origin");

  try {
    console.warn("Executing DELETE request to remove all projects!");
    const { count } = await prisma.projects.deleteMany({});
    console.log(`Deleted ${count} projects.`);
    const response = NextResponse.json(
      {
        success: true,
        data: { deletedCount: count },
        message: `${count} Project(s) Deleted Successfully`,
      },
      { status: 200 }
    );
    setCorsHeaders(response, origin);
    return response;
  } catch (error: any) {
    console.error("DELETE Projects Error:", error);
    const response = NextResponse.json(
      { message: "Database Error Deleting Projects", error: error.message },
      { status: 500 }
    );
    setCorsHeaders(response, origin);
    return response;
  }
};
