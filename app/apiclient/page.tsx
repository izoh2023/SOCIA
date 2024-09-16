'use client'
import { NextResponse } from 'next/server'
import React, { useEffect, useState } from 'react'

interface person {
  ID: number,
  fname: string,
  sname: string,
  telNumber: string
}

const Page = () => {
  const [IDValue, setID] = useState<number>(0)
  const [fnameValue, setFname] = useState("")
  const [snameValue, setSname] = useState('')
  const [telNumberValue, setTelNumber] = useState('')
  const [rows, setRows] = useState<person[]>([]) // Use state for rows
  const [arrayState, setArrayState] = useState<number[]>([]);
  const [isClicked, setIsClicked] = useState(false);

  let count = 0;

  const data = {
    ID: IDValue,
    fname: fnameValue,
    sname: snameValue,
    telNumber: telNumberValue
  }

  //handle the when the update icon button in a row is clicked 
   document.querySelectorAll<HTMLButtonElement>('.get-row-data').forEach(button => {
    button.addEventListener('click', function() {
      // Get the closest table row (tr) for the clicked button
      const row = this.closest('tr') as HTMLTableRowElement;
      
      if (row) {
        // Get all the cell values in that row
        const cells = row.getElementsByTagName('td');
        const rowData: person = {
          ID: parseInt(cells[1]?.textContent || "0"), // Convert ID to number
          fname: cells[2]?.textContent || "",         // First name as string
          sname: cells[3]?.textContent || "",         // Second name as string
          telNumber: cells[4]?.textContent || ""      // Tel number as string
        }
        setID(rowData.ID);
        setFname(rowData.fname);
        setSname(rowData.sname);
        setTelNumber(rowData.telNumber)
        
        const idField = (document.getElementById('ID') as HTMLInputElement);
        idField.valueAsNumber = rowData.ID || 0;
        idField.readOnly = true;
        (document.getElementById('fname') as HTMLInputElement).value =rowData.fname || '';
        (document.getElementById('sname') as HTMLInputElement).value = rowData.sname || '';     
        (document.getElementById('telNumber') as HTMLInputElement).value = rowData.telNumber || ''; 
        setIsClicked(true);
        
      }
    });
  });

  function clearInputs(){
    (document.getElementById('ID') as HTMLInputElement).valueAsNumber = NaN;
    (document.getElementById('fname') as HTMLInputElement).value ='';
    (document.getElementById('sname') as HTMLInputElement).value = '';    
    (document.getElementById('telNumber') as HTMLInputElement).value ='';
  }

  //use effect to handle data retrival from the database
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch('http://localhost:3000/restAPI')
        const data: person[] = await res.json();
        console.log(data);
        setRows(data); // Update state to trigger re-render
        console.log(data)
      } catch (error) {
        console.log(Error('api not reached'));
      }
    }
    getData()
  }, [arrayState])

  // Function to handle form submission and post the request to the database
  const handleClick = async (e: { preventDefault: () => void }) => {
    e.preventDefault(); // Prevent form from submitting and refreshing the page
    try {
      const res = await fetch('http://localhost:3000/restAPI', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      const result = await res.json();
      console.log(result); // Handle the response
      alert(result)
    } catch (error) {
      console.error('API not working correctly', error);
    }
    clearInputs();
    setArrayState(prevArray => [...prevArray, count++]);
  }

//handle PUT operation
const handleUpdate =async ()=>{
  try {
    const res = await fetch('http://localhost:3000/restAPI', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })

    const result = await res.json();
    console.log(result); // Handle the response
    alert(result)
  } catch (error) {
    console.error('API not working correctly', error);
  }
  clearInputs();
  setArrayState(prevArray => [...prevArray, count++]);
  setIsClicked(false);


}

//handle DELETE operation
const handleDelete = async () => {
  try {
    const ApiResponse = await fetch('http://localhost:3000/restAPI',{
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)

    })
    const ApiResponseJson = await ApiResponse.json()
    alert(ApiResponseJson)


  } catch (error) {
    return NextResponse.json(
      error,
      {status: 404}
    )
  } 
  clearInputs();
  setArrayState(prevArray => [...prevArray, count++]);
  setIsClicked(false);


}


  return (
    <div className='max-w-screen h-screen flex space-x-3'>
      {/* this is the front end for the form part*/}
      <form onSubmit={handleClick} className='bg-emerald-300 flex space-x-5 p-6 w-[50%]'>
        <div className="labels w-auto h-auto flex flex-col space-y-6">
          <label htmlFor="ID">ID number</label>
          <label htmlFor="fname">First Name</label>
          <label htmlFor="sname">Second Name</label>
          <label htmlFor="telNumber">Telephone Number</label>
        </div>
        <div className="input w-auto h-auto flex flex-col space-y-6">
          <input type="number" id="ID" onChange={(e) => setID(e.target.valueAsNumber)} className='text-center' />
          <input type="text" id="fname" onChange={(e) => setFname(e.target.value)} className='text-center'/>
          <input type="text" id="sname" onChange={(e) => setSname(e.target.value)} className='text-center'/>
          <input type="text" id="telNumber" onChange={(e) => setTelNumber(e.target.value)} className='text-center'/>
          <div className="buttons h-auto flex flex-wrap gap-4">
            <button type="submit" id='submit' disabled = {isClicked}  className={`w-[45%] self-center rounded-lg ${isClicked? 'bg-emerald-200' : 'bg-emerald-600'}`}>Submit</button>
            <button id='update' type='button' onClick={handleUpdate} className={`bg-emerald-600 w-[45%] self-center rounded-lg ${isClicked? '' : 'hidden'}`}>Update</button>
            <button id='deleteButton' type='button' onClick={handleDelete} className={`bg-emerald-600 w-[45%] self-center rounded-lg ${isClicked? '' : 'hidden'}`}>Delete</button>

          </div>
        </div>
      </form>

      {/* this is the table in front end to display the data */}
      <table border={2} className='w-[50%] h-auto bg-emerald-100'>
        <thead>
          <tr className='border-t-2 border-b-2 border-l-2 border-r-2 border-black text-center'>
            <th className='border-r-2 border-black'></th>
            <th className='border-r-2 border-black'>ID</th>
            <th className='border-r-2 border-black'>First Name</th>
            <th className='border-r-2 border-black'>Second Name</th>
            <th className='border-r-2 border-black'>Telephone Number</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row)=>(
            <tr key={row.ID} className='border-t-2 border-b-2 border-l-2 border-r-2 border-black text-center' >
              <td className='w-12 h-12 border-t-2 border-b-2 border-l-2 border-r-2 border-black'>
                <button className='get-row-data w-6 h-6'>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="-5 -5 30 30" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="23 4 23 10 17 10"></polyline>
                    <polyline points="1 20 1 14 7 14"></polyline>
                    <path d="M3.51 9a9 9 0 0114.4-3.36L23 10"></path>
                    <path d="M20.49 15a9 9 0 01-14.4 3.36L1 14"></path>
                  </svg>
                </button>
              </td>
              <td className='border-t-2 border-b-2 border-l-2 border-r-2 border-black'>{row.ID}</td>
              <td className='border-t-2 border-b-2 border-l-2 border-r-2 border-black'>{row.fname}</td>
              <td className='border-t-2 border-b-2 border-l-2 border-r-2 border-black'>{row.sname}</td>
              <td className='border-t-2 border-b-2 border-l-2 border-r-2 border-black'>{row.telNumber}</td>
            </tr>
          ))}
        </tbody>

      </table>
      
    </div>
    
  )
}

export default Page;
