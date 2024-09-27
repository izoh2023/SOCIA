import { NextRequest, NextResponse } from "next/server";
import run from "../lib/testingDb";

// CORS configuration
const setCorsHeaders = (res:NextResponse) => {
    res.headers.set('Access-Control-Allow-Origin', 'https://socia-dun.vercel.app'); // Replace with your front-end URL
    res.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.headers.set('Access-Control-Allow-Headers', 'Content-Type');
};

const handler = async (req: NextRequest) => {
    const res = NextResponse.next(); // Create a NextResponse object

    setCorsHeaders(res); // Set CORS headers

    try {
        const schoolDb = await run();
        const studentDoc = schoolDb.collection('students');

        switch (req.method) {
            case 'GET': {
                const students = await studentDoc.find().toArray();
                if (!students.length) {
                    return NextResponse.json(
                        { message: 'No students found' },
                        { status: 404 }
                    );
                }
                return NextResponse.json(students, { status: 200 });
            }

            case 'POST': {
                const body = await req.json();
                const { ID, fname, sname, telNumber } = body;

                if (!ID || !fname || !sname || !telNumber) {
                    return NextResponse.json(
                        { message: 'Missing required fields' },
                        { status: 400 }
                    );
                }

                const existingStudent = await studentDoc.findOne({ _id: ID });
                if (existingStudent) {
                    return NextResponse.json(
                        { message: 'ID already exists, choose a different ID' },
                        { status: 409 }
                    );
                }

                const newStudent = { _id: ID, fname, sname, telNumber };
                await studentDoc.insertOne(newStudent);
                return NextResponse.json(
                    { message: 'Record added successfully' },
                    { status: 201 }
                );
            }

            case 'PUT': {
                const body = await req.json();
                const { ID, fname, sname, telNumber } = body;

                if (!ID || !fname || !sname || !telNumber) {
                    return NextResponse.json(
                        { message: 'Missing required fields' },
                        { status: 400 }
                    );
                }

                const query = { _id: ID };
                const update = { $set: { fname, sname, telNumber } };

                const result = await studentDoc.updateOne(query, update);
                if (result.matchedCount > 0) {
                    return NextResponse.json(
                        { message: 'Document updated successfully' },
                        { status: 200 }
                    );
                } else {
                    return NextResponse.json(
                        { message: 'No document matches the provided ID' },
                        { status: 404 }
                    );
                }
            }

            case 'DELETE': {
                const body = await req.json();
                const { ID } = body;

                if (!ID) {
                    return NextResponse.json(
                        { message: 'Missing ID field' },
                        { status: 400 }
                    );
                }

                const query = { _id: ID };
                const result = await studentDoc.deleteOne(query);
                if (result.deletedCount > 0) {
                    return NextResponse.json(
                        { message: 'Document deleted successfully' },
                        { status: 200 }
                    );
                } else {
                    return NextResponse.json(
                        { message: 'No document matches the provided ID' },
                        { status: 404 }
                    );
                }
            }

            default:
                return NextResponse.json(
                    { message: 'Method not allowed' },
                    { status: 405 }
                );
        }
    } catch (error) {
        console.error('Database connection error:', error);
        return NextResponse.json(
            { message: 'Failed to connect to the database' },
            { status: 500 }
        );
    }
};

// Export the functions for each HTTP method
export async function GET(req: NextRequest) {
    return handler(req);
}

export async function POST(req: NextRequest) {
    return handler(req);
}

export async function PUT(req: NextRequest) {
    return handler(req);
}

export async function DELETE(req: NextRequest) {
    return handler(req);
}
