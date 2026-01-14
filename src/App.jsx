import { useState } from 'react'
import './App.css'

function App() {
  const [form, setForm] = useState({firstName:"",lastName:"",email:""});
  const [row,setRow] = useState([]);

  const handleChange = (e) =>{
    setForm({
      ...form,
      [e.target.name] : e.target.value,
    })
  }

  const inValidEmail = (email) =>{
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    if(!inValidEmail(form.email)){
      alert("Invalid Email");
      return;
    }
    setRow((prevRow)=>{
    const index = prevRow.findIndex(
      (row)=>row.email == form.email
    );

    if(index !== -1){
      const updatedRows = [...prevRow];
      updatedRows[index].count +=1;
      return updatedRows;
    }

    return [
      ...prevRow,
      {
        firstName : form.firstName,
        lastName : form.lastName,
        email : form.email,
        count : 1,
      }
    ];
  })
  setForm({firstName:"",lastName:"",email:""});
  }

  

  return (
    <div>
     <form onSubmit={handleSubmit}>
      <input type="text" name='firstName' placeholder='FirstName' value={form.firstName} onChange={handleChange} />
      <input type="text" name='lastName' placeholder='LastName' value={form.lastName} onChange={handleChange} />
      <input type="email" name='email' placeholder='Email' value={form.email} onChange={handleChange} />
      <button type='submit'>Submit</button>
    </form>

    <table border="1" cellPadding="8">
      <thead>
        <tr>
          <th>FirstName</th>
          <th>LastName</th>
          <th>Email</th>
          <th>Submissions Count</th>
        </tr>
      </thead>
      <tbody>
        {row.map((r,index)=>(
          <tr key={index}>
            <td>{r.firstName}</td>
            <td>{r.lastName}</td>
            <td>{r.email}</td>
            <td>{r.count}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
    
  )
}

export default App
