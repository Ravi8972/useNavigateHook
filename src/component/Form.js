import React from 'react';
import axios from 'axios';
import { useEffect, useState } from "react";
import {useNavigate}  from 'react-router-dom'

const Forms = () => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [countryArray, setCountryArray] = useState([]);
    const [country, setCountry] = useState("");
    const [errors, setErrors] = useState({});
    const navigate =  useNavigate();
  
    const fetchData = async () => {
        try {
          const options = {
            url: 'https://countriesnow.space/api/v0.1/countries/iso',
          };
          const response = await axios.request(options);
          console.log(response.data.data);
      
          // Check if response data is an array and extract country names
          if (Array.isArray(response.data.data)) {
            const countryNames = response.data.data.map((item) => item.name);
            setCountryArray(countryNames);
          } else {
            console.error('Response data is not an array:', response.data);
            // Handle the response structure accordingly
          }
        } catch (error) {
          console.error('Error fetching data:', error);
          // Handle error state or display error message to the user
        }
      };
      
    
    useEffect(() => { // Use useEffect hook for async operation
         // set our variable to true
    let isApiSubscribed = true;
      fetchData(); // Call the async function immediately
      
       return () => {
        //    https://blog.logrocket.com/understanding-react-useeffect-cleanup-function/
             // Cleanup function to clear memory
            // Perform any necessary cleanup tasks here, such as clearing intervals or subscriptions
            isApiSubscribed =  false;
       };
    }, []); // Empty dependency array to run effect only once on component mount
    

    const handleSubmit = (event) => {
      event.preventDefault();
      let errors = {};
  
      // Validate Name
      if (!name.trim()) {
        errors.name = 'Name is required';
      }
  
      // Validate Age
      if (isNaN(age)) {
        errors.age = 'Age must be a number';
      }
  
      // Validate Country
      if (!country.trim()) {
        errors.country = 'Country is required';
      }
  
      if (Object.keys(errors).length === 0) {
        // Form is valid, proceed to Thank you page
        navigate('/Thankyou');
      } else {
        // Update errors state to display validation errors
        setErrors(errors);
      }
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          {errors.name && <span>{errors.name}</span>}
        </div>
        <div>
          <label>Age</label>
          <input type="number" value={age} onChange={(e) => setAge(e.target.value)} />
          {errors.age && <span>{errors.age}</span>}
        </div>
        <div>
          <label>Country</label>
          <select value={country} onChange={(e) => setCountry(e.target.value)} > 
            <option value=''>Select...</option> 
             {
                     countryArray.map((name) => (
                 <option key={name} value={name}>{name}</option>
             ))
             }
            </select>

          {errors.country && <span>{errors.country}</span>}
        </div>
        <button type="submit">Submit</button>
      </form>
    );
}

export default Forms



