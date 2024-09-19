import pool from "@/app/lib/testingDb";
import { ResultSetHeader } from "mysql2";
import {NextRequest, NextResponse } from "next/server";

interface myError  {
    message: string,
    code: string,
    errno: number,
    sql: string,
    sqlState: string

}

//Api logic for all the CRUD application
const handler = async (req:NextRequest)=> {
    switch(req.method) {
        case 'GET': {
            try {
                const con = await pool.getConnection();
                const [rows] = await con.execute('SELECT * FROM person');
                // console.log(rows);
                return NextResponse.json(
                    rows,
                    { status: 200 }
                );
                con.release()
            } catch (error) {
                return NextResponse.json(
                    { error: 'Failed to reach the database' },
                    { status: 500 }
                );
            }
        }
        case 'POST' : {
            const body = await req.json();
            // console.log(body);
        
            const {ID,fname, sname, telNumber}= body//de-structure the single keys in the json data so you can use them separately in the sql
             if(!ID || !fname || !sname || !telNumber) {
                return NextResponse.json(
                    'mising required fields',
                    {status: 404}
                )
             }
        
        
            try {
                const con = await pool.getConnection();
                const [results] = await con.execute<ResultSetHeader>(
                    'INSERT INTO `person` (`ID`, `fname`, `sname`, `telNumber`) VALUES (?,?,?,?)',
                    [ID,fname,sname,telNumber]
        
                )
                if (results.affectedRows<1) {
                    return NextResponse.json(
                        'failed to create record',
                        {status: 201}
                    )
                }
                return NextResponse.json(
                    'record created successfully',
                    {status: 200}
                )
                con.release()

                
            } catch (error) {
                const err = error as myError
                if (err.errno===1062) {
                    return NextResponse.json(
                        'This id exists in the system',
                        {status: 201}
                    )
                }else{
                    return NextResponse.json(
                        'failed to connect to the database',
                        {status: 500}
                    )
                }
            }
        }
        case 'PUT': {
            const body = await req.json();
            const {ID, fname, sname, telNumber} =body;
            if (!ID || !fname || !sname || !telNumber) {
                return NextResponse.json(
                    'missing required fields'
                )   
            }
            try {
                const con = await pool.getConnection();
                const [results] =  await con.execute<ResultSetHeader>(
                    'UPDATE `person` SET `fname` = ?, `sname` = ?, `telNumber` = ? WHERE `person`.`ID` = ?',
                    [fname, sname, telNumber,ID]
                );
                if (results.affectedRows==0) {
                    return NextResponse.json(
                        'ID does not exist',
                        {status: 404}
                    )
                }
                return NextResponse.json(
                    'record updated succcessfully',
                    {status:200}
                )   
                con.release()

            } catch (error) {
                return NextResponse.json(
                    'failed to reach the database',
                    {status:500}
                )
                
            }
        }
        case 'DELETE': {
            const body = await req.json()
            const {ID, fname, sname, telNumber} =body
            if (!ID ||!fname ||!sname ||!telNumber) {
                return NextResponse.json(
                    'missing required fields',
                    {status: 404}
                )
            }
            try {
                const con = await pool.getConnection();
                const [results] = await con.execute<ResultSetHeader>(
                    'DELETE FROM person WHERE ID = ?',
                    [ID]
                )
                if (results.affectedRows==0) {
                    return NextResponse.json(
                        'ID does not exist',
                        {status: 404}
                    )
                }
                return NextResponse.json(
                    'record deleted successfully',
                    {status: 200}
                );
                con.release()

            } catch (error) {
                console.log(error);
            }
        }
    }
}

export async function GET(req:NextRequest) {
    return handler(req);
    
}

export async function POST(req:NextRequest) {
    return handler(req);
    
}

export async function PUT(req:NextRequest) {
    return handler(req);
    
}

export async function DELETE(req:NextRequest) {
    return handler(req);
    
}