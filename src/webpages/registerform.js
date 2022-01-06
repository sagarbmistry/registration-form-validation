import React, { useEffect, useState } from 'react'
import '../Form.css';
import logo from '../assets/logo.svg';
import moment from "moment";
import { v4 as uuid } from 'uuid';
import ErrorSpan from '../Utils/error'
import { useNavigate, createSearchParams } from "react-router-dom";

const emailRegExp = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
const phonenoRegExp = /^((\+91))[789]{1}\d{9}$/;
let projectID = "storedataassignment"
let collection = "datamaticsassignment"

var api = "https://firestore.googleapis.com/v1beta1/projects/" + projectID + "/databases/(default)/documents/" + collection;

const validationDictionary = {
  fullname: {
    required: "This is required",
    success: "Looks good!"
  },
  dob: {
    required: "This is required",
    valid: "Age should be more than 18 years of age",
    success: "Looks good!"
  },
  gender: {
    required: "This is required",
    success: "Looks good!"
  },
  email: {
    required: "This is required",
    valid: "Email address must be valid",
    success: "Looks good!"
  },
  mnumber: {
    required: "This is required",
    valid: "Mobile number must be valid",
    success: "Looks good!"
  },
}

let isError = {
  fullname: { message: '', status: true, length: '' },
  dob: { message: '', status: true, length: '' },
  gender: { message: '', status: true, length: '' },
  email: { message: '', status: true, length: '' },
  mnumber: { message: '', status: true, length: '' }
}

function RegisterForm(props) {
  let navigate = useNavigate();
  const [state, setState] = useState({
    fullname: '',
    dob: '',
    gender: '',
    email: '',
    mnumber: ''
  });
  useEffect(() => {
    document.title = "Register Form"

  }, []);

  const postInDB = (val, id) => {
    let url = api + "?documentId=" + id;
    let data = {
      "fields": {
        "fullname": {
          "stringValue": val.fullname
        },
        "dob": {
          "stringValue": val.dob
        },
        "gender": {
          "stringValue": val.gender
        },
        "email": {
          "stringValue": val.email
        },
        "mnumber": {
          "stringValue": val.mnumber
        }
      }
    };

    fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .then(response => {
        console.log(response)
      })
      .catch(error => console.error('Error:', error));
  }

  const handleSubmit = (e) => {
    const { fullname, dob, gender, email, mnumber } = state;
    console.log('triggered');
    e.preventDefault();
    var birthday = moment(dob);
    isError = {
      fullname: fullname.length !== 0 ? { message: validationDictionary.fullname.success, status: true, length: 1 } : { message: validationDictionary.fullname.required, status: false, length: 0 },
      dob: dobvalidate(dob),
      gender: gender.length !== 0 ? { message: validationDictionary.gender.success, status: true, length: 1 } : { message: validationDictionary.gender.required, status: false, length: 0 },
      email: email.length !== 0 ? { message: validationDictionary.email.success, status: true, length: 1 } : { message: validationDictionary.email.required, status: false, length: 0 },
      mnumber: mNumberValidate(mnumber)
    }

    if (isError.fullname.length === 1 && isError.dob.length === 1 && isError.gender.length === 1 && isError.email.length === 1 && isError.mnumber.length === 1) {
      console.log("Form is valid!", isError, state)
      const id = uuid();
      postInDB(state, id)
      navigate({
        pathname: '/showdetails',
        search: `?id=${id}`,
      });
    } else {
      setState({
        ...state,
        fullname: fullname.length !== 0 ? fullname : isErrorvalue('fullname'),
        dob: !birthday.isValid() ? dob : isErrorvalue('dob'),
        gender: gender.length !== 0 ? gender : isErrorvalue('gender'),
        email: email.length !== 0 ? email : isErrorvalue('email'),
        mnumber: mnumber.length !== 0 ? mnumber : isErrorvalue('mnumber')
      })
      console.log("Form is invalid!", isError, state);
    }

  }

  const dobvalidate = (date) => {
    var eighteenYearsAgo = moment().subtract(18, "years");
    var birthday = moment(date);
    var years = moment().diff(date, 'years', false);
    if (!birthday.isValid()) {
      return { message: validationDictionary.dob.required, status: false, length: 0 };
    }
    else if (eighteenYearsAgo.isAfter(birthday)) {
      return { message: `${validationDictionary.dob.success} age:${years}`, status: true, length: 1 };
    }
    else {
      return { message: validationDictionary.dob.valid, status: false, length: 2 };
    }
  }

  const mNumberValidate = (inputtxt) => {
    if (inputtxt.length === 3 || inputtxt.length === 0) {
      return { message: validationDictionary.dob.required, status: false, length: 0 };
    }
    else if (phonenoRegExp.test(inputtxt)) {
      return { message: validationDictionary.mnumber.success, status: true, length: 1 };

    }
    else {
      return { message: validationDictionary.mnumber.valid, status: false, length: 2 };
    }
  }
  const addIndianCode = () => {
    const { mnumber } = state;
    if (mnumber.length === 0) {
      setState({
        ...state,
        mnumber: '+91'
      })
    } else if (mnumber.length === 3) {
      setState({
        ...state,
        mnumber: ''
      })
    } else {
      setState({
        ...state,
        mnumber
      })
    }
  }


  const onInputChange = (e) => {
    const { name, value, id } = e.target;
    switch (name) {
      case "fullname":
        isError.fullname = value.length < 0 ? { message: validationDictionary.fullname.required, status: false, length: 0 }
          : { message: validationDictionary.fullname.success, status: true, length: 1 };
        break;
      case "email":
        isError.email = value.length < 0 ?
          { message: validationDictionary.email.required, status: true }
          : emailRegExp.test(value)
            ? { message: validationDictionary.email.success, status: true, length: 1 }
            : { message: validationDictionary.email.valid, status: false, length: 2 };
        break;
      case "dob":
        isError.dob = dobvalidate(value);
        break;
      case "gender":
        isError.gender = value.length === 0 ? { message: validationDictionary.gender.required, status: false, length: 0 } : { message: validationDictionary.gender.success, status: true, length: 1 };
        break;
      case "mnumber":
        isError.mnumber = mNumberValidate(value);
        break;
    }
    setState(() => ({ ...state, [name]: value }));
  }

  const isErrorvalue = (val) => {
    return (
      !isError[val].status ? '' : state[val]
    )
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

      <form className="box-form" onSubmit={handleSubmit} noValidate autoComplete="off">

        <div className="box-title">
          <span>Start for free</span>
          <h2>Sign up to Register form.</h2>
        </div>

        <div className="box-inputs" >

          <div className="inputs-wrap">
            <input type="text" name="fullname" id="fullname" className={isError.fullname.status ? "textbox" : 'not-valid textbox'} placeholder="Full Name" onChange={onInputChange} autoComplete="off" />

            {ErrorSpan(isError, 'fullname')}
          </div>
          <div className="inputs-wrap">
            <input type="date" name="dob" id="dob" className={isError.dob.status ? "textbox" : 'not-valid textbox'} placeholder="DOB" onChange={onInputChange} autoComplete="off" />
            {ErrorSpan(isError, 'dob')}
          </div>
          <div className="inputs-wrap gender" onChange={onInputChange}>
            <label className="radiowrap">Male
              <input type="radio" name="gender" value="male" />
              <span className={isError.gender.status ? "checkmark" : 'not-valid checkmark'} ></span>
            </label>
            <label className="radiowrap">Female
              <input type="radio" name="gender" value="female" />
              <span className={isError.gender.status ? "checkmark" : 'not-valid checkmark'}></span>
            </label>
            {ErrorSpan(isError, 'gender')}
          </div>

          <div className="inputs-wrap">
            <input type="email" name="email" id="email" className={isError.email.status ? "textbox" : 'not-valid textbox'} placeholder="Email Address" onChange={onInputChange} autoComplete="off" />
            {ErrorSpan(isError, 'email')}
          </div>
          <div className="inputs-wrap">
            <input type="text" name="mnumber" id="mnumber" className={isError.mnumber.status ? "textbox" : 'not-valid textbox'} placeholder="Mobile Number" onFocus={addIndianCode} onChange={onInputChange} value={state.mnumber} maxLength={13} onBlur={addIndianCode} autoComplete="off" />
            {ErrorSpan(isError, 'mnumber')}
          </div>

          <button className="btn blue" type="submit" value="enter">Next</button>
        </div>

      </form>

    </div>
  )
}

export default RegisterForm;
