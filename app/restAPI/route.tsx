
import { collection } from "../lib/testingDb";
// import { ResultSetHeader } from "mysql2";
import { NextRequest, NextResponse } from "next/server";

interface myError {
    message: string;
    code: string;
    errno: number;
    sql: string;
    sqlState: string;
}

// API logic for all the CRUD operations
const handler = async (req: NextRequest) => {
    // let con;
    try {
        // con = await collection.getConnection(); // Connect to the database

        switch (req.method) {
            case 'GET': {
                const jsonObjects = collection.find()
                return NextResponse.json(jsonObjects, { status: 200 });
            }

            // case 'POST': {
            //     const body = await req.json();
            //     const { ID, fname, sname, telNumber } = body;
            //     if (!ID || !fname || !sname || !telNumber) {
            //         return NextResponse.json('Missing required fields', { status: 404 });
            //     }
            //     const [results] = await con.execute<ResultSetHeader>(
            //         'INSERT INTO person (ID, fname, sname, telNumber) VALUES (?, ?, ?, ?)',
            //         [ID, fname, sname, telNumber]
            //     );
            //     if (results.affectedRows < 1) {
            //         return NextResponse.json('Failed to create record', { status: 201 });
            //     }
            //     return NextResponse.json('Record created successfully', { status: 200 });
            // }

            // case 'PUT': {
            //     const body = await req.json();
            //     const { ID, fname, sname, telNumber } = body;
            //     if (!ID || !fname || !sname || !telNumber) {
            //         return NextResponse.json('Missing required fields', { status: 404 });
            //     }
            //     const [results] = await con.execute<ResultSetHeader>(
            //         'UPDATE person SET fname = ?, sname = ?, telNumber = ? WHERE ID = ?',
            //         [fname, sname, telNumber, ID]
            //     );
            //     if (results.affectedRows === 0) {
            //         return NextResponse.json('ID does not exist', { status: 404 });
            //     }
            //     return NextResponse.json('Record updated successfully', { status: 200 });
            // }

            // case 'DELETE': {
            //     const body = await req.json();
            //     const { ID } = body;
            //     if (!ID) {
            //         return NextResponse.json('Missing ID field', { status: 404 });
            //     }
            //     const [results] = await con.execute<ResultSetHeader>(
            //         'DELETE FROM person WHERE ID = ?',
            //         [ID]
            //     );
            //     if (results.affectedRows === 0) {
            //         return NextResponse.json(
            //             'ID does not exist',
            //             { status: 404 });
            //     }
            //     return NextResponse.json('Record deleted successfully', { status: 200 });
            // }

            default:
                return NextResponse.json('Method not allowed', { status: 405 });
        }
    } catch (error) {
        const err = error as myError;
        console.error(err);
        if (err.errno === 1062) {
            return NextResponse.json('This ID already exists in the system', { status: 409 });
        }
        return NextResponse.json('Failed to connect to the database', { status: 500 });
    } 
    // finally {
    //     if (con) {
    //         con.release(); // Ensure the connection is released
    //     }
    // }
};

export async function GET(req: NextRequest) {
    return handler(req);
}

// export async function POST(req: NextRequest) {
//     return handler(req);
// }

// export async function PUT(req: NextRequest) {
//     return handler(req);
// }

// export async function DELETE(req: NextRequest) {
//     return handler(req);
// }
