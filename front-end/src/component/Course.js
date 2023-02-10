import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { NavLink, useNavigate, Link } from "react-router-dom";
import Background from "../picture/course1.jpg";
import { getCourse } from "../apiCalls.js";
import axios from 'axios';
import "../style/cardStyle.css";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { AiOutlineSearch } from "react-icons/ai";

const Course = ()=>{
    const [courselist, setCourseList] = useState([]);
    const userID = localStorage.getItem('userID');
    const userType = localStorage.getItem('userType');
    const [editVisible, setEditVisible] = useState(false);
    const [deleteVisible, setDeleteVisible] = useState(false);
    const [filteredList, setFilteredList] = new useState(courselist);
    const [query, setQuery] = useState("")
    // const [cardVisible, setCardVisible] = useState(false);
    // const [deleteChapterList, setDeleteChapterList] = useState([]);

    const navigate = useNavigate();
    
    useEffect(()=>{
        const getCourse = async()=>{
            try{
                if(userType === "teacher" && userID === "1"){
                    const res = await axios.get("http://localhost:3001/course");
                    console.log(res);
                    setCourseList(res.data);
                    return res.data;
                }else if(userType === "teacher" && userID !== "1"){
                    const res = await axios.get(`http://localhost:3001/course/${userID}`);
                    console.log(res);
                    setCourseList(res.data);
                    return res.data;
                }else{
                    const res = await axios.get("http://localhost:3001/course");
                    console.log(res);
                    setCourseList(res.data);
                    return res.data;
                }
                
            }catch(err){
                console.log(err);
                return err;
            }
        };
        getCourse();
        checkUserType(userID, userType);
    },[])

    const refreshPage = () =>{
        window.location.reload();
    }

    const checkUserType = (userId, usertype)=>{
        if(usertype === "student"){
            setEditVisible(false);
            setDeleteVisible(false);
        }else if(usertype === "teacher"){
            if(userID === "1"){
                setEditVisible(true);
                setDeleteVisible(true);
            }else{
                setEditVisible(true);
                setDeleteVisible(false);
            }
        }
    }

    const deleteChapter = (id) => {
        axios.delete(`http://localhost:3001/chapter/${id}`);
    }

    const deleteCourse = async(id) =>{
        // try{
        //     console.log(id);
        //     const res3 = await axios.get(`http://localhost:3001/chapter/${id}`);
        //     console.log(res3.data);
        //     res3.data.forEach((props)=>{
        //         axios.delete(`http://localhost:3001/video/${props.chapter_ID}`);
        //         axios.delete(`http://localhost:3001/lesson/${props.chapter_ID}`)
        //     });
        //     // console.log(deleteChapterList);
        // }catch(error){
        //         console.log(error);
        // }
        // deleteChapter(id);
        axios.delete(`http://localhost:3001/course/${id}`)
        .then( ()=>{
            // // Get the current list of courses
            // const courselist = [...this.state.courselist];

            // // Filter out the course with the given id
            // const updatedList = courselist.filter((course) => {
            //     return course.id !== id;
            // });

            // // Update the state with the new list of courses
            // setCourseList(updatedList);
            console.log(courselist);
            setCourseList(courselist.filter((val)=>{
                return val.id !== id;
            }));
            refreshPage();
        });
    }

    const submit = (id) => {

        confirmAlert({
          title: 'Confirm to delete?',
          message: 'Are you sure to do this.',
          buttons: [
            {
              label: 'Yes',
              onClick: () => deleteCourse(id)
            },
            {
              label: 'No',
              //onClick: () => alert('Click No')
            }
          ]
        });
    }

    const limitWord = (description)=>{
        if (description.length > 60) {
            description = description.substring(0, 60) + "...";
        }
        return description;
    }
    
    const editCourseContent = (id) =>{
        localStorage.setItem('courseID', id);
        navigate("/lesson");
    }

    const filterCourse = (event) =>{
        const input = event.target.value;
        var updatedList = [...courselist];
        updatedList = updatedList.filter((item)=>{
            return item.course_name.toLowerCase().includes(input.toLowerCase());
        });
    }
    
    return(
        <div style={{backgroundColor: "#FFF5EE", width: '100%', minHeight: '100vh', height: '100%', paddingTop: '5px'}}>
        <div className="container  mt-2">
            {editVisible?<h1 className="text-center mt-2" style={{fontFamily: 'Times New Roman'}}>Course Management</h1>:<h1 className="text-center mt-2" style={{fontFamily: 'Times New Roman'}}>Course</h1>}
            {/* <h1 className="text-center mt-2">Course Management</h1> */}
            {/* {<div className="text-start" style={{marginLeft: "-100px"}}>
                <Button variant="danger" onClick={(e)=>{navigate(-1)}}>Back</Button>
            </div>} */}
            {editVisible?
            <div className="text-end" style={{marginTop: "40px", marginRight: "35px", marginBottom: "-40px"}}>
                <Button variant="primary"><NavLink to="/addcourse" className="text-decoration-none text-light">Add Course</NavLink></Button>
            </div>:<></>}
            {/* <div className="text-end">
                <Button variant="primary"><NavLink to="/addcourse" className="text-decoration-none text-light">Add Course</NavLink></Button>
            </div> */}
           <div className="input-group justify-content-end" style={{width:'50%', marginTop: '50px', marginLeft: '25%'}}>
                <input
                    type="text"
                    className="form-control" 
                    placeholder="Find Course" 
                    onChange={event => setQuery(event.target.value)} 
                />
                <div className="input-group-text"><AiOutlineSearch /></div>
           </div>
           <div className = "row card-deck d-flex align-items-center mt-3">
           {courselist
           .filter(props => {
                if (query === '' || query === " ") {
                return props;
                } else if (props.course_name.toLowerCase().includes(query.toLowerCase())) {
                return props;
                }
            })
           .map((props, index)=>{ 
             return(
                <section key={index} className="col-lg-4 col-md-6 py-3 d-flex" onClick = {(e)=>{
                    localStorage.setItem('courseID', props.course_ID);
                }}>
                    <Link to="/courseinfo" style={{ color: 'black', textDecoration: 'none' }}>
                    <Card style={{ width: '24rem', height:'24rem'}} className="card mb-3 col-lg-3 col-md-6">
                        <Card.Img variant="top" src={props.course_img} style={{ width: '50%', height:'50%', textAlign:'center', margin:"auto", borderRadius: '50%'}} className="mt-2"/>
                        <Card.Body className="text-center">
                            <Card.Title style={{color:'#191970', fontWeight: 'bold'}}>
                                {props.course_name}
                            </Card.Title>
                            <Card.Text style={{ height:'40%', color:'#191970', fontWeight: 'bold'}}>
                                {limitWord(props.course_description)}
                            </Card.Text>
                            {editVisible?<Button variant="primary" 
                                className="col-lg-6 text-center"
                                style={{ width:'45%', marginRight: '10px'}}
                                onClick={(e)=>{
                                    e.preventDefault();
                                    editCourseContent(props.course_ID);
                                }}
                            >
                                Edit
                            </Button>:<></>}
                            {deleteVisible?<Button variant="danger" 
                                className="col-lg-6 text-center" 
                                style={{ width:'45%', marginLeft: '10px'}}
                                type="submit"
                                onClick={(e)=>{
                                    e.preventDefault();
                                    submit(props.course_ID);
                                    // deleteCourse(props.course_ID)
                                }}
                            >Delete</Button>:<></>}
                        </Card.Body>
                    </Card>
                    </Link>
                </section>
                ); 
            }
           )}
           </div>
    </div>
    </div>
    )
}

export default Course;