import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { NavLink, useNavigate, Link } from "react-router-dom";
import axios from 'axios';
import "./style/cardStyle.css";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const LeaderboardCourse = ()=>{
    const [courselist, setCourseList] = useState([]);
    const userID = localStorage.getItem('userID');
    const userType = localStorage.getItem('userType');

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
                    const res = await axios.get(`http://localhost:3001/getenrollcourse/${userID}`);
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
    },[])

    const refreshPage = () =>{
        window.location.reload();
    }

    
    return(
        <div style={{backgroundColor: "#FFF5EE", width: '100%', minHeight: '100vh', height: '100%', paddingTop: '5px'}}>
        <div className="container  mt-2">
            <h1 className="text-center mt-2" style={{fontFamily: 'Times New Roman'}}>Leaderboard</h1>
           <div className = "row card-deck d-flex align-items-center mt-5">
           {courselist.map((props, index)=>{ 
             return(
                <section key={index} className="col-lg-4 col-md-6 py-3 d-flex" onClick = {(e)=>{
                    localStorage.setItem('courseID', props.course_ID);
                }}>
                    <Link to="/leaderboard" style={{ color: 'black', textDecoration: 'none' }}>
                    <Card style={{ width: '24rem', height:'24rem'}} className="card mb-3 col-lg-3 col-md-6">
                        <Card.Img variant="top" src={props.course_img} style={{ width: '50%', height:'50%', textAlign:'center', margin:"auto", borderRadius: '50%'}} className="mt-2"/>
                        <Card.Body className="text-center">
                            <Card.Title style={{color:'#191970', fontWeight: 'bold'}}>
                                {props.course_name}
                            </Card.Title>
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

export default LeaderboardCourse;