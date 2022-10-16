import React, { useEffect, useState } from 'react'
import CodeDocsForm from '../components/CodeDocsForm'
import CodeDocsDisplay from '../components/CodeDocsDisplay'
import Cookie from 'js-cookie'

function Home() {
  
    const [formData, setFormData] = useState([])
    const [updateForm, setUpdateForm] = useState({
        row: {},
        edit: false
    })
    
    const formUpdate = (row) => {
        setUpdateForm({
            row,
            edit: true
        })
    }
    
    useEffect(() => {
        fetchFormData()
    },[])

    const fetchFormData = async () => {
      const token = Cookie.get('token')
    const res = await fetch(`${process.env.REACT_APP_API_URL}/code`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const {data} = await res.json();
    setFormData(data);
 }
  return (
    <div>
      <CodeDocsForm 
        fetchFormData = {fetchFormData}
        updateForm = {updateForm}
        />
      <CodeDocsDisplay 
        formData = {formData}
        fetchFormData = {fetchFormData}
        editData = {formUpdate}
        />
    </div>
  )
}

export default Home
