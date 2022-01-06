import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from "react-router-dom";
import '../Form.css';
import CustomizedInputs from '../Utils/inputType'
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

function ShowDetails(props) {
  const { search } = useLocation();
  const navigate = useNavigate();
  const [getDetails, setDetails] = useState(isError)
  const [getShine, setShine] = useState(false)
  const queryParams = new URLSearchParams(window.location.search);
  const id = queryParams.get('id');

  const getfromDB = async (val) => {
    let url = api + "/" + id;
    setShine(true)
    console.log(url)
    await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .then(response => {
        setShine(false)
        const { fields } = response;
        console.log(response, fields)
        setDetails(fields)
      })
      .catch(error => { setShine(true); console.error('Error:', error); navigate(-1); });
  }
  useEffect(() => {
    document.title = "Confirm your details"
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
      <div className="hero">
        <img src={logo} className="App-logo" alt="logo" />
        <span className='wrap'>
          <p>Welcome to</p>
          <h1>React Form</h1>
        </span>
      </div>

      <div className="box-form" >

        <div className="box-title">
          <span>Start for free</span>
          <h2>Confirm your details</h2>
        </div>

        <div className="box-inputs" >

          <div className="inputs-wrap">
            <CustomizedInputs type="text" name="fullname" id="fullname" className={"textbox"} placeHolder="Full Name" disabled value={showValue(getDetails.fullname.stringValue)} isShine={getShine} />
          </div>
          <div className="inputs-wrap">
            <CustomizedInputs type="date" name="dob" id="dob" className={"textbox"} placeHolder="DOB" disabled value={showValue(getDetails.dob.stringValue)} isShine={getShine} />
          </div>
          <div className="inputs-wrap gender ">
            <label className={`radiowrap ${showValue(getDetails.gender.stringValue) !== "male" ? "disabled" : 'active'}`}>Male

              <CustomizedInputs type="radio" name="gender" value="male" disabled checked={showValue(getDetails.gender.stringValue) === "male"} isShine={getShine} />
            </label>
            <label className={`radiowrap ${showValue(getDetails.gender.stringValue) !== "female" ? "disabled" : 'active'}`}>Female
              <CustomizedInputs type="radio" name="gender" value="female" disabled checked={showValue(getDetails.gender.stringValue) === "female"} isShine={getShine} />
            </label>
          </div>

          <div className="inputs-wrap">
            <CustomizedInputs type="email" name="email" id="email" className={"textbox"} placeHolder="Email Address" disabled value={showValue(getDetails.email.stringValue)} isShine={getShine} />
          </div>
          <div className="inputs-wrap">
            <CustomizedInputs type="text" name="mnumber" id="mnumber" className={"textbox"} placeHolder="Mobile Number" disabled value={showValue(getDetails.mnumber.stringValue)} isShine={getShine} />
          </div>

          <button className="btn blue" value="enter" onClick={() => navigate({
            pathname: '/congrats',
            search: `?id=${id}`,
          })}>Confirm</button>
        </div>
      </div>
    </div>

  )
}

export default ShowDetails;
