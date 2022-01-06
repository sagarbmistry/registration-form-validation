import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from "react-router-dom";
import '../Form.css';
import logo from '../assets/logo.svg';
let projectID = "storedataassignment"
let collection = "datamaticsassignment"

var api = "https://firestore.googleapis.com/v1beta1/projects/" + projectID + "/databases/(default)/documents/" + collection;
let isError = {
  fullname: "",
  dob: "",
  gender: "",
  email: "",
  mnumber: ""
}

function Congrats(props) {
  const navigate = useNavigate();
  const [getDetails, setDetails] = useState(isError)
  const queryParams = new URLSearchParams(window.location.search);
  const id = queryParams.get('id');

  const getfromDB = async () => {
    let url = api + "/" + id;

    console.log(url)
    await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .then(response => {

        const { fields } = response;
        console.log(response, fields)
        setDetails(fields)
      })
      .catch(error => { console.error('Error:', error);navigate(-1); });
  }
  useEffect(() => {
    document.title = "Congratulation"
    if (id) {
      getfromDB();
    } else {
      navigate(-1);
    }
  }, []);

  const showValue = (val) => {
    return val ? val : ''
  }
  return (
    <div className="container">
      <div className="congrats">
      <img src={logo} className="App-logo" alt="logo" />
        <h1>Congratulations</h1>
        <p>Congratulation <strong>{showValue(getDetails.fullname.stringValue)}</strong> your information is saved with us, same details are mailed to your personal email id i.e <strong>{showValue(getDetails.email.stringValue)}</strong></p>
      </div>
    </div>

  )
}

export default Congrats;
