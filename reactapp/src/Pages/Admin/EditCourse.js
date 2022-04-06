import React,{useState,useEffect} from 'react'
import {useNavigate,useParams} from 'react-router-dom'
import * as ReactBootStarp from 'react-bootstrap';
import AdminService from './AdminService';


const UpdateComponent=()=>{
    const[coursename,setCoursename]=useState('')
    const[courseDescription,setCourseDescription]=useState('')
    const[courseDuration,setCourseDuration]=useState('')
    const navigate = useNavigate();
    const{courseid}=useParams();


    const UpdateCourse = (e)=>{
        e.preventDefault();
        const course = {coursename,courseDescription,courseDuration}
        if(courseid){
            AdminService.updateCourse(courseid,course).then((response)=>{
                navigate('/admin/courseadmin')
            }).catch(error=>{
                console.log(error)
            })
        }else{
            AdminService.addCourse(course).then((response)=>{
                console.log(response.data)
                navigate('/admin/addCourse')
            }).catch(error=>{
                console.log(error)
            })
        }
    }
    const logOut=()=>{
        sessionStorage.clear()
        localStorage.clear();
        navigate('/');

    }


    useEffect(()=>{
        AdminService.getCourseById(courseid).then((response)=>{
            setCoursename(response.data.coursename)
            setCourseDescription(response.data.courseDescription)
            setCourseDuration(response.data.courseDuration)
        }).catch(error=>{
            console.log(error)
        })
    },[])


    return(
        <div className='area'>
        <ReactBootStarp.Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
    <ReactBootStarp.Container>
        <ReactBootStarp.Navbar.Brand href="/admin/dashboard">PG_Admission</ReactBootStarp.Navbar.Brand>
        <ReactBootStarp.Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <ReactBootStarp.Navbar.Collapse id="responsive-navbar-nav">
        <ReactBootStarp.Nav className="me-auto">
        <ReactBootStarp.Nav.Link className="gradient" href="/admin/academyadmin">Academy</ReactBootStarp.Nav.Link>
        <ReactBootStarp.Nav.Link className="gradient active" href="/admin/courseadmin">Course</ReactBootStarp.Nav.Link>
        <ReactBootStarp.Nav.Link className="gradient" href="/admin/studentadmin">Students</ReactBootStarp.Nav.Link>
        
        <ReactBootStarp.Nav.Link className="gradient" href="/admin/news">News Feed</ReactBootStarp.Nav.Link>
    </ReactBootStarp.Nav>
    <ReactBootStarp.Nav>
      <ReactBootStarp.NavDropdown className="gradient" title="More Info" id="collasible-nav-dropdown">
        <ReactBootStarp.NavDropdown.Item href="/admin/Profile">Profile</ReactBootStarp.NavDropdown.Item>
        <ReactBootStarp.NavDropdown.Item href="#action/3.2">Help&Support</ReactBootStarp.NavDropdown.Item>
        <ReactBootStarp.NavDropdown.Item href="/admin/moreinfo">About</ReactBootStarp.NavDropdown.Item>
        <ReactBootStarp.NavDropdown.Divider />
        <ReactBootStarp.NavDropdown.Item onClick={() =>logOut()}>LogOut</ReactBootStarp.NavDropdown.Item>
        </ReactBootStarp.NavDropdown>
      </ReactBootStarp.Nav>
      </ReactBootStarp.Navbar.Collapse>
    </ReactBootStarp.Container>
    </ReactBootStarp.Navbar>


    <div>
        <ReactBootStarp.Form>
    <ReactBootStarp.Row className="mb-3">
        <ReactBootStarp.Form.Group as={ReactBootStarp.Col} controlId="formGridEmail">
        <ReactBootStarp.Form.Label>CourseName</ReactBootStarp.Form.Label>
            <ReactBootStarp.Form.Control type="text" id="coursename" value={coursename}
            onChange={(e)=>setCoursename(e.target.value)} placeholder="Enter Course Name" />
        </ReactBootStarp.Form.Group>

        <ReactBootStarp.Form.Group as={ReactBootStarp.Col} controlId="formGridPassword">
        <ReactBootStarp.Form.Label>Course Duration</ReactBootStarp.Form.Label>
            <ReactBootStarp.Form.Control type="text" id="courseDuration" value={courseDuration}
            onChange={(e)=>setCourseDuration(e.target.value)} placeholder="Years/Months" />
        </ReactBootStarp.Form.Group>
    </ReactBootStarp.Row>

        <ReactBootStarp.Form.Group as={ReactBootStarp.Col} controlId="exampleForm.ControlTextarea1">
            <ReactBootStarp.Form.Label>Course Description</ReactBootStarp.Form.Label>
            <ReactBootStarp.Form.Control as="textarea" rows={3} id="courseDescription" value={courseDescription}
            onChange={(e)=>setCourseDescription(e.target.value)} placeholder="Description" />
        </ReactBootStarp.Form.Group>



        <div className="text-center">
            <ReactBootStarp.Button variant="success" size="lg" type="submit" onClick={(e)=>UpdateCourse(e)} >
                Submit
            </ReactBootStarp.Button>
        </div>
        </ReactBootStarp.Form>
        </div>


    </div>
    )




}

export default UpdateComponent