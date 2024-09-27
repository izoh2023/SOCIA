import { NextRequest, NextResponse } from "next/server";
import run from "../lib/testingDb";
// import { ResultSetHeader } from "mysql2";
// import { NextRequest, NextResponse } from "next/server";

// interface myError {
//     message: string;
//     code: string;
//     errno: number;
//     sql: string;
//     sqlState: string;
// }

// API logic for all the CRUD operations
const handler = async (req: NextRequest) => {
    try {
        const schoolDb =await run();
        const studentDoc = schoolDb.collection('students')
        switch (req.method) {
            case 'GET': {
                const student = await studentDoc.find().toArray();
                if(!student){
                    return NextResponse.json(
                        'no student in the student document',
                        {status:404}
                    )
                }
                return NextResponse.json(
                    student,
                    {status: 200}
                )
            }

            case 'POST': {
                const body = await req.json();
                const { ID, fname, sname, telNumber } = body;
            
                // Check for missing required fields
                if (!ID || !fname || !sname || !telNumber) {
                    return NextResponse.json(
                        { message: 'Missing required fields' },
                        { status: 400 } // Use 400 for Bad Request
                    );
                }
            
                try {
                    // Check if a record with the same ID already exists
                    const existingStudent = await studentDoc.findOne({ _id: ID });
                    if (existingStudent) {
                        return NextResponse.json(
                            { message: 'ID already exists, choose a different ID' },
                            { status: 409 } // Conflict status code
                        );
                    }
            
                    // Insert the new record with the provided ID
                    const newStudent = {
                        _id: ID, // Use the provided ID as the unique identifier
                        fname,
                        sname,
                        telNumber,
                    };
            
                    await studentDoc.insertOne(newStudent); // Ensure this is awaited
                    return NextResponse.json(
                        { message: 'Record added successfully' },
                        { status: 201 } // Created status code
                    );
                } catch (error) {
                    console.error('Database insertion error:', error);
                    return NextResponse.json(
                        { message: 'Failed to add record' },
                        { status: 500 } // Server error
                    );
                }
            }
            

            case 'PUT': {
                const body = await req.json();
                const { ID, fname, sname, telNumber } = body;
                if (!ID || !fname || !sname || !telNumber) {
                    return NextResponse.json('Missing required fields', { status: 404 });
                }
                const query = { _id: ID }; // Use the ID as the query to find the document
                const update = {
                    $set: { 
                        fname: fname, 
                        sname: sname, 
                        telNumber: telNumber 
                    }
                };

                const result = await studentDoc.updateOne(query, update);

                if (result.matchedCount > 0) {
                    console.log('Document updated successfully');
                    return NextResponse.json(
                        'Document updated successfully',
                        {status: 200}
                    )
                } else {
                    console.log('No document matches the provided ID');
                    return NextResponse.json(
                        'No document matches the provided ID',
                        {status: 404}
                    )
                }

            }

            case 'DELETE': {
                const body = await req.json();
                const { ID } = body;
                if (!ID) {
                    return NextResponse.json('Missing ID field', { status: 404 });
                }
                const query = { _id: ID }; // Use the ID as the query to find the document

                const result = await studentDoc.deleteOne(query);
        
                if (result.deletedCount > 0) {
                    console.log('Document deleted successfully');
                    return NextResponse.json(
                        'Document deleted successfully',
                        {status: 200}
                    )
                } else {
                    console.log('No document matches the provided ID');
                    return NextResponse.json(
                        'No document matches the provided ID',
                        {status: 404}
                    )
                }
            }

            default:
                return NextResponse.json(
                    'Method not allowed', 
                    { status: 405 });
        }
    } catch (error) {
        return NextResponse.json(
            'Failed to connect to the database', 
            { status: 500 }
        );
    } 
    
};

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
