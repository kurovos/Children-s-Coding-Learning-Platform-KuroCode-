import React, { useState, useEffect } from "react";
import Axios from "axios";
import {Button, Form, Col, Alert} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FormContainer } from "./style/Form.style"


const RegForm = ()=>{
    const [fnameReg, setFnameReg] = useState('');
    const [lnameReg, setLnameReg] = useState('');
    const [emailReg, setEmailReg] = useState('');
    const [pwdReg, setPwdReg] = useState('');
    const [userType, setUserType] = useState('');
    const [registerStatus, setRegisterStatus] = useState('');

    Axios.defaults.withCredentials = true;

    const register = ()=>{
            if(userType === "student"){
                Axios.post('http://localhost:3001/studentregister',{
                stu_fname: fnameReg,
                stu_lname: lnameReg,
                stu_email: emailReg,
                stu_pwd: pwdReg
                }).then((response)=>{
                    console.log(response);
                    setRegisterStatus(response.data.message);
                }).catch(err=>{
                    console.log(err);
                    alert("Account exist!");
                    return err;
                });
            }
            else if(userType === "teacher"){
                Axios.post('http://localhost:3001/teacherregister',{
                teacher_fname: fnameReg,
                teacher_lname: lnameReg,
                teacher_email: emailReg,
                teacher_pwd: pwdReg
                }).then((response)=>{
                    console.log(response);
                    setRegisterStatus(response.data.message);
                }).catch(err=>{
                    console.log(err);
                    alert("Account exist!");
                    return err;
                });
            }
    };

    return(
        <FormContainer className= "bg-light rounded">
            <Form className = "registriation">
                <Form.Group className="mb-3 px-3">
                    <h1>Register</h1>
                    <Form.Label>First Name</Form.Label>
                    
                    <Form.Control type="text" placeholder="First Name"
                        onChange = {(e)=> {
                            setFnameReg(e.target.value);
                        }}
                    />
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" placeholder="Last Name"
                        onChange = {(e)=> {
                            setLnameReg(e.target.value);
                        }}
                    />
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter email"
                        onChange = {(e)=> {
                            setEmailReg(e.target.value);
                        }}
                    />
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter password"
                        onChange = {(e)=> {
                            setPwdReg(e.target.value);
                        }}
                    />
                    <Form.Check
                        inline
                        label = "Student" 
                        type = "radio" 
                        name="userType" 
                        value="student"
                        onChange={(e)=>{
                            setUserType(e.target.value);
                        }}
                    />
                    <Form.Check
                        inline
                        label = "Teacher"
                        type = "radio" 
                        name="userType" 
                        value="teacher"
                        onChange={(e)=>{
                            setUserType(e.target.value);
                        }}
                    />
                    <br/>
                    <Button className= "mt-3" onClick ={register}>Register</Button>
                </Form.Group>
            </Form>
            <Link className= "mb-3 px-3" to="/login">Login</Link>
            { registerStatus?<div className="alert alert-secondary">{registerStatus}</div>:<></>}
        </FormContainer>
    );
};

const LogForm = () =>{
    const[email, setEmail] = useState('');
    const[pwd, setPwd] = useState('');
    const[userType, setUserType] = useState('');
    const[loginStatus, setLoginStatus] = useState(false);
    const[isLogin, setisLogin] = useState("");
    const[user, setUser] = useState("");
    const[username, setUsername] = useState("");

    const navigate = useNavigate();

    Axios.defaults.withCredentials = true;

    const login = ()=>{
        if(userType === "student"){
            Axios.post('http://localhost:3001/studentlogin',{
            stu_email: email,
            stu_pwd: pwd
            }).then((response)=>{
                if(response.data.message){
                    setisLogin(false);
                    setLoginStatus(response.data.message)
                }else{
                    setisLogin(true);
                    setUser(response.data[0].email);
                    localStorage.setItem('userID', response.data[0].stu_ID);
                    localStorage.setItem('username', response.data[0].stu_fname);
                    localStorage.setItem('userType', userType);
                    navigate("/");
                    window.location.reload();
                }
                console.log(response);
            });
        }
        else if(userType === "teacher"){
            Axios.post('http://localhost:3001/teacherlogin',{
            teacher_email: email,
            teacher_pwd: pwd
            }).then((response)=>{
                if(response.data.message){
                    setisLogin(false);
                    setLoginStatus(response.data.message)
                }else{
                    setisLogin(true);
                    setUser(response.data[0].email);
                    localStorage.setItem('userID', response.data[0].teacher_ID);
                    localStorage.setItem('username', response.data[0].teacher_fname);
                    localStorage.setItem('userType', userType);
                    navigate("/");
                    window.location.reload();
                }
                console.log(response);
            })
        }
        
    };

    // const logout = () =>{
    //     setisLogin(false);
    //     setEmail("");
    //     setPwd("");
    //     localStorage.clear();
    // };

    // useEffect(()=>{
    //     if(userType === "student"){
    //         Axios.get('http://localhost:3001/studentlogin').then((response)=>{
    //             if (response.data.loggedIn === true) {
    //                 setUsername(response.data.user[0].stu_email);
    //             }

    //         });
    //     }else if(userType === "teacher"){
    //         Axios.get('http://localhost:3001/studentlogin').then((response)=>{
    //             if (response.data.loggedIn === true) {
    //                 setUsername(response.data.email);
    //             } 
    //         });
    //     }
        
    // },[]);
    
    return(
        <FormContainer className="bg-light rounded">
            <Form className = "login">
                <Form.Group className="mb-3 px-3">
                    <h1>Login</h1>
                    <Form.Label>Email </Form.Label>
                    <Form.Control type="email"
                        placeholder="Enter email"
                        onChange = {(e)=> {
                            setEmail(e.target.value);
                        }}
                    />
                    <Form.Label>Password </Form.Label>
                    <Form.Control type="password"
                        placeholder="Password..."
                        onChange = {(e)=> {
                            setPwd(e.target.value);
                        }}
                    />
                    <Form.Check
                        inline
                        label = "Student" 
                        type = "radio" 
                        name="userType" 
                        value="student"
                        onChange={(e)=>{
                            setUserType(e.target.value);
                        }}
                    />
                    <Form.Check
                        inline
                        label = "Teacher"
                        type = "radio" 
                        name="userType" 
                        value="teacher"
                        onChange={(e)=>{
                            setUserType(e.target.value);
                        }}
                    />
                    <br/>
                    <Button className= "mt-3" onClick ={login}>Login</Button>
                </Form.Group>
            </Form>
            <Link className="mb-3 px-3" to="/register">Register</Link>
            { loginStatus?<div className="alert alert-secondary">{loginStatus}</div>:<></>}
        </FormContainer>
    );
};

export {RegForm, LogForm};