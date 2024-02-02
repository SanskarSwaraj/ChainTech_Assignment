import React, { Component } from 'react'

// Class component for Login functionality
export default class Login extends Component {
  constructor(props){
    super(props)
    // Initialize state to hold email and password
    this.state={
      email:"",
      password:"",
    };
    // Bind handleSubmit function to the class instance
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  // Function to handle form submission
  handleSubmit(e){
    e.preventDefault(); // Prevent default form submission behavior
    const { email, password } = this.state; // Destructure email and password from state
    console.log(email,password); // Log email and password
    // Make a POST request to login endpoint with email and password
    fetch("http://localhost:5000/login-user", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })
      .then((res)=> res.json()) // Parse response as JSON
      .then((data)=>{
        console.log(data,"userRegister"); // Log response data
        // If login is successful, show alert, set token and loggedIn flag in localStorage,
        // and redirect to userDetails page
        if(data.status === "ok"){
          alert("login successful");
          window.localStorage.setItem("token",data.data);
          window.localStorage.setItem("loggedIn",true);
          window.location.href = "./userDetails";
        }
      });
  }
  
  // Render the login form
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h3>Sign In</h3>

        {/* Email input field */}
        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            onChange={(e)=> this.setState({email: e.target.value})}
          />
        </div>

        {/* Password input field */}
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            onChange={(e)=> this.setState({password: e.target.value})}
          />
        </div>

        {/* Remember me checkbox */}
        <div className="mb-3">
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customCheck1"
            />
            <label className="custom-control-label" htmlFor="customCheck1">
              Remember me
            </label>
          </div>
        </div>

        {/* Submit button */}
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
        
        {/* Link to Sign Up page */}
        <p className="forgot-password text-right">
          <a href="/sign-up">Sign Up</a>
        </p>
      </form>
    )
  }
}
