# Registration Form Validation
## What is the use of this Repo
This Project is a registration with validation ReactJS Project which demonstrates the following
1) Full Name field
2) DOB field (Age should be more than 18 years of age).
3) Male  Female (at least one radio button should be selected)
4) Email Address (email pattern should be mandatory)
4) Mobile number (only Indian standard, on focus +91 should appear with eg: +91 9999999999, only "+" and number's should be allowed in the field, max length 13 including +91 )
5) Submit button (on click validate all the above fields)

Appropriate error message to be displayed below the input text field with border red.


Task a) 1 to 5 points should have proper validation on blur (i.e empty field, wrong pattern etc)

Task b) On submit click the validation should take place for each field and then redirect to different page called "Confirm your details" will the same fields displayed again without any edit option i.e READ ONLY

Task c) Page 02 "Confirm your details" page once user clicks on confirm button redirect it to "Congratulation" page with AJAX call to post data on the server. (Create a dummy ajax call to store data in object and pass it)

Task d) Page 03 "Congratulation" page consist of below data to be displayed.

 

logo

Congratulation "<<Full Name>>" your information is saved with us, same details are mailed to your personal email id i.e "<<Email Address>>"


## Live Application URL

### https://sagarbmistry.github.io/registration-form-validation
This URL has the application deployed in

## Prerequisites
### Install Node JS
Refer to https://nodejs.org/en/ to install nodejs

### Install create-react-app
Install create-react-app npm package globally. This will help to easily run the project and also build the source files easily. Use the following command to install create-react-app

```bash
npm install -g create-react-app
```

## Cloning and Running the Application in local

Clone the project into local
```bash
git clone https://github.com/sagarbmistry/registration-form-validation.git
cd registration-form-validation
```

Install all the npm packages. Go into the project folder and type the following command to install all npm packages

```bash
npm install
```

In order to run the application Type the following command

```bash
npm start
```

The Application Runs on **localhost:3000**