import React, { Component } from "react";

export default class UserDetails extends Component {
    
    constructor(props) {
        super(props);
        // Initialize state to hold user data
        this.state = {
            userData:"",
        }
    }
    
    componentDidMount(){
        // Fetch user data from server upon component mount
        fetch("http://localhost:5000/userData", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        // Include token from local storage in the request body
        body: JSON.stringify({
          token: window.localStorage.getItem("token"),
        }),
      })
      .then((res)=> res.json())
      .then((data)=>{
        console.log(data,"userData"); // Log user data
        // Set user data in component state
        this.setState({userData: data.data})
        // If the token is expired, alert user, clear local storage, and redirect to sign-in page
        if(data.data=='token expired'){
            alert("token expired! Login again");
            window.localStorage.clear();
            window.location.href = "./sign-in"
        }
      });
    }

    // Function to handle logout
    logout=()=>{
        // Clear local storage and redirect to sign-in page
        window.localStorage.clear();
        window.location.href = "./sign-in"
    }

    render() {
        return (
            <div>
                {/* Display user's name and email */}
                Name<h1>{this.state.userData.fname}</h1>
                Email<h1> {this.state.userData.email}</h1><br/>
                {/* Button to trigger logout */}
                <button onClick={this.logout} className="btn btn-primary">Log Out</button>
            </div>
        )
    }
}
