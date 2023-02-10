import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Form, Breadcrumb } from 'react-bootstrap';
import "./style/feedback.css";
import { useNavigate } from "react-router-dom";

const Feedback =()=>{
    const[f1, setF1] = useState("");
    const[f2, setF2] = useState("");
    const[cname, setCName] = useState("");
    const courseID = localStorage.getItem("courseID");
    const userType = localStorage.getItem("userType");
    const stuID = localStorage.getItem("userID");
    const navigate = useNavigate();
    useEffect(()=>{
        const getCourse = async()=>{
            try{
                const res = await axios.get(`http://localhost:3001/getcourse/${courseID}`);
                setCName(res.data[0].course_name);
                return res.data;
            }catch(err){
                console.log(err);
                return err;
            }
        };
        getCourse();
    },[])

    const submitFeedback =()=>{
        axios.defaults.withCredentials = true;
        if (!f1 && !f2) {
            window.alert("Please fill all feedback!");
            return; // Stop the function from running
        }

        if(userType === "student"){
            axios.post('http://localhost:3001/submitfeedback',{
                feedback_one : f1,
                feedback_two : f2,
                course_ID: courseID,
                stu_ID : stuID
                }).then((response)=>{
                    console.log(response);
            });
            window.alert("Thank You for your feedback!");
        }else{
            window.alert("Only student can fill the feedback!");
            return;
        }
        navigate("/courseinfo");
        console.log(f1);
        console.log(f2);
    }

    return(
        <div className='container mt-3'>
            <Breadcrumb style={{ marginTop: "50px", fontSize: "24px"}}>
                <Breadcrumb.Item href="/course">Course</Breadcrumb.Item>
                <Breadcrumb.Item href="/courseinfo">{cname}</Breadcrumb.Item>
                <Breadcrumb.Item active>Feedback</Breadcrumb.Item>
            </Breadcrumb>
            <h1 className="text-center m-3">Course Feedback</h1>
            <div style={{ width: '1000px', height:'600px', textAlign:'center', margin:"auto", marginTop:"50px", backgroundColor:'#FFE4E1'}}>
                    <Form>
                    <Form.Group>
                        <label className='box'><h4 style={{marginTop: '50px'}}>Did you have fun in this course?</h4></label>
                        <div className="box">
                            <div className="emoji">
                                <label htmlFor="0">
                                <input className="radio" type="radio" name="feedback" id="0" value="0" 
                                    onChange={(e)=>{
                                        setF1(e.target.value);
                                    }}
                                />
                                
                                <span>😩</span>
                                </label>
                            </div>

                            <div className="emoji">
                                <label htmlFor="1">
                                <input className="radio" type="radio" name="feedback" id="1" value="1" 
                                    onChange={(e)=>{
                                        setF1(e.target.value);
                                    }}
                                />
                                <span>🙁</span>
                                </label>
                            </div>

                            <div className="emoji">
                                <label htmlFor="2">
                                <input className="radio" type="radio" name="feedback" id="2" value="2" 
                                    onChange={(e)=>{
                                        setF1(e.target.value);
                                    }}
                                />
                                <span>😐</span>
                                </label>
                            </div>

                            <div className="emoji">
                                <label htmlFor="3">
                                <input className="radio" type="radio" name="feedback" id="3" value="3" 
                                    onChange={(e)=>{
                                        setF1(e.target.value);
                                    }}
                                />
                                <span>😄</span>
                                </label>
                            </div>

                            <div className="emoji">
                                <label htmlFor="4">
                                <input className="radio" type="radio" name="feedback" id="4" value="4" 
                                    onChange={(e)=>{
                                        setF1(e.target.value);
                                    }}
                                />
                                <span>😍</span>
                                </label>
                            </div>
                        </div>
                    </Form.Group>
                    <Form.Group>
                        <label className='box'><h4 style={{marginTop: '50px'}}>How well did you understand the course?</h4></label>
                        <div className="box">
                            <div className="emoji">
                                <label htmlFor="5">
                                <input className="radio" type="radio" name="feedback2" id="5" value="0" 
                                    onChange={(e)=>{
                                        setF2(e.target.value);
                                    }}
                                />
                                <span>😩</span>
                                </label>
                            </div>

                            <div className="emoji">
                                <label htmlFor="6">
                                <input className="radio" type="radio" name="feedback2" id="6" value="1" 
                                    onChange={(e)=>{
                                        setF2(e.target.value);
                                    }}
                                />
                                <span>🙁</span>
                                </label>
                            </div>

                            <div className="emoji">
                                <label htmlFor="7">
                                <input className="radio" type="radio" name="feedback2" id="7" value="2" 
                                    onChange={(e)=>{
                                        setF2(e.target.value);
                                    }}
                                />
                                <span>😐</span>
                                </label>
                            </div>

                            <div className="emoji">
                                <label htmlFor="8">
                                <input className="radio" type="radio" name="feedback2" id="8" value="3" 
                                    onChange={(e)=>{
                                        setF2(e.target.value);
                                    }}
                                />
                                <span>😄</span>
                                </label>
                            </div>

                            <div className="emoji">
                                <label htmlFor="9">
                                <input className="radio" type="radio" name="feedback2" id="9" value="4" 
                                    onChange={(e)=>{
                                        setF2(e.target.value);
                                    }}
                                />
                                <span>😍</span>
                                </label>
                            </div>
                        </div>
                    </Form.Group>
                    <Button variant="primary" type="submit" style={{marginTop:'50px'}} onClick={ submitFeedback }>
                    Confirm
                </Button>
                </Form>
            </div>
        </div>
    );
}

export default Feedback;