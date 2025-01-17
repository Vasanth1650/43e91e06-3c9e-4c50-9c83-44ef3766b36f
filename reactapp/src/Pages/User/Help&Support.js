import React,{useState} from 'react';
import { Button, Container } from 'react-bootstrap';
import * as ReactBootStarp from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {fetchUserData} from '../../Api/AuthenticationService';
import '../Style.css'


const MainWrapper=styled.div`
    padding-top:40px;
`;

export const Help=()=>{
    const usenavigate = useNavigate();
    
    const [data,setData]=useState({});

    React.useEffect(()=>{
        fetchUserData().then((response)=>{
            setData(response.data);
        }).catch((e)=>{
            localStorage.clear();
           
        })
    },[])

    const handleSubmit=(id)=>{
        usenavigate("/user/enrolledCourse/"+id)
    }

    const logOut=()=>{
        sessionStorage.clear()
        localStorage.clear();
        usenavigate('/');

    }

    return (
        <div className="area" >
            
            <ReactBootStarp.Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
    <ReactBootStarp.Container>
        <ReactBootStarp.Navbar.Brand href="/user/dashboard">PG_Admission</ReactBootStarp.Navbar.Brand>
        <ReactBootStarp.Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <ReactBootStarp.Navbar.Collapse id="responsive-navbar-nav">
        <ReactBootStarp.Nav className="me-auto">
        <ReactBootStarp.Nav.Link href="/user/viewInstitute">Institute</ReactBootStarp.Nav.Link>
        <ReactBootStarp.Nav.Link onClick={()=>handleSubmit(data.id)}>Enrolled Courses</ReactBootStarp.Nav.Link>        
        <ReactBootStarp.Nav.Link href="/user/news">News Feed</ReactBootStarp.Nav.Link>
    </ReactBootStarp.Nav>
    <ReactBootStarp.Nav>
      <ReactBootStarp.NavDropdown title="More Info" id="collasible-nav-dropdown">
        <ReactBootStarp.NavDropdown.Item href="/user/profile">Profile</ReactBootStarp.NavDropdown.Item>
        <ReactBootStarp.NavDropdown.Item href="/user/help">Help&Support</ReactBootStarp.NavDropdown.Item>
        <ReactBootStarp.NavDropdown.Item href="/user/moreinfo">About</ReactBootStarp.NavDropdown.Item>
        <ReactBootStarp.NavDropdown.Divider />
        <ReactBootStarp.NavDropdown.Item onClick={() =>logOut()}>Logout</ReactBootStarp.NavDropdown.Item>
        </ReactBootStarp.NavDropdown>
      </ReactBootStarp.Nav>
      </ReactBootStarp.Navbar.Collapse>
    </ReactBootStarp.Container>
    </ReactBootStarp.Navbar>

<br></br>

<div>
    <div class="container">
	<div class="row">
		<form action="" method="post" class="smart-green">
    <h1>Enquiry
        <span>Please fill all the texts in the fields.</span>
    </h1>
    <label>
        <span>Your Name :</span>
        <input id="name" type="text" name="name" placeholder="Your Full Name" />
       
    </label>
   
    <label>
        <span>Your Email :</span>
        <input id="email" type="email" name="email" placeholder="Valid Email Address" />
         
    </label>
    
    <label>
        <span>Your Phone :</span>
        <input id="Phone" type="email" name="Phone" placeholder="Valid Phone Number" />
    </label>
    
    <label>
        <span>Subject :</span><input id="Subject" type="text" name="Subject" placeholder="Your Full Subject" />
    </label>  
    
    <label>
        <span>Message :</span>
        <textarea id="message" name="message" placeholder="Your Message to Us"></textarea>
    </label>
       
     <label>
        <span> </span>
        <input type="button" class="button" value="Send" />
    </label>    
</form>
</div>

</div>

</div>


        
        </div>
    )
}

export default Help;