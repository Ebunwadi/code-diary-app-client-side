import * as React from 'react';
import { useState } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import Cookie from 'js-cookie'
import { useSelector } from "react-redux";



export default function CodeDocsForm({fetchFormData, updateForm, firstName}) {
  const token = Cookie.get('token')
    const initialForm = {
        day : '',
        description : '',
        date : new Date()
    }
    const [form, setForm] = useState(initialForm)

    function handleChange(event){
        setForm({
            ...form,
            [event.target.name] : event.target.value
        })
    }

    React.useEffect(() => {
        if(updateForm.edit===true) {
            setForm(updateForm.row)
        }
    },[updateForm])

    function handleDate(newValue) {
        setForm({ ...form, date: newValue });
      }

      async function handleSubmit(e) {
        e.preventDefault();
        updateForm.edit === false ? create() : update();
      }
    
      function reload(res) {
        if (res.ok) {
          setForm(initialForm);
          fetchFormData();
        }
      }
      
      async function create () {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/code`, {
            method: "POST",
            body: JSON.stringify(form),
            headers: {
               Authorization: `Bearer ${token}`,
               "content-type": "application/json",
            }
        })
        reload(res)
      }

      async function update() {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/code/${updateForm.row._id}`,
          {
            method: "PATCH",
            body: JSON.stringify(form),
            headers: {
              "content-type": "application/json",
               Authorization: `Bearer ${token}`,
            },
          });
        reload(res);
        updateForm.edit = false
      }
      const person = useSelector((state) => state.auth.user)
      // const user = person.firstName

  return (
    <Card sx={{ minWidth: 275, marginTop: 7 }}>
      <CardContent>
      <Typography sx={{ marginBottom: 2 }} variant="h6" color="text.secondary" gutterBottom>
          {/* Welcome {user}, */}
          Welcome {person},
        </Typography>
        <Typography sx={{ marginBottom: 7 }} variant="h6" color="text.secondary" gutterBottom>
          This is a simple app you can use to keep track of your daily code writeup.
          For beginners, you can use this to document your 100 days of code.
        </Typography>
        <form onSubmit = {handleSubmit}>
            <TextField 
                required
                sx={{ marginRight: 5 }}
                id="outlined-basic" 
                label="day" 
                variant="outlined"  
                type = "number"
    	        name = "day"
                onChange = {handleChange}
                value = {form.day}
            />
            <TextField sx={{ marginRight: 5 }}
                 required
                id="outlined-basic" 
                label="description" 
                type = 'text'
                variant="outlined"
                name = 'description' 
                onChange = {handleChange}
                value = {form.description}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                    label=""
                    name = "date"
                    inputFormat="MM/DD/YYYY"
                    value={form.date}
                    onChange={handleDate}
                    renderInput={(params) => <TextField sx={{ marginRight: 5 }} {...params} />}
                />
            </LocalizationProvider>
            {/* <Button variant="contained" type = 'submit'>Submit</Button> */}

            {updateForm.edit === true && (
            <Button type="submit" variant="contained">
              Update
            </Button>
          )}

          {updateForm.edit === false && (
            <Button type="submit" variant="contained">
              Submit
            </Button>
          )}
        </form>
      </CardContent>
    </Card>
  );
}

