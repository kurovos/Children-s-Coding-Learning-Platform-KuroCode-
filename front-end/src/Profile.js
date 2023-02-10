import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button, Row, Col, Container, Breadcrumb, Modal, Form } from "react-bootstrap";
import CourseImage from "./picture/course1.jpg"
const Profile = ()=>{
    const[img, setImg] = useState(false);
    const[prof, setProf] = useState(false);
    const[pass, setPass] = useState(false);
    const userType = localStorage.getItem('userType');
    const userID = localStorage.getItem('userID');
    const[userimg, setUserImg] = useState("");

    const[username, setUsername] =useState("");
    const[fname, setFname] = useState("");
    const[lname, setLname] = useState("");
    const[email, setEmail] = useState("");
    const[pwd, setPwd] = useState("");
    const[cpwd, setCpwd] = useState("");

    const handleClose = () => setImg(false);
    const handleShow = () => setImg(true);

    const profClose = () => setProf(false);
    const profShow = () => setProf(true);

    const pwdClose = () => setPass(false);
    const pwdShow = () => setPass(true);

    useEffect(()=>{
        const getUser = async()=>{
            try{
                if(userType === "teacher"){
                    const res = await axios.get(`http://localhost:3001/teacherprofile/${userID}`);
                    if(res.data[0].teacher_img == null){
                        setUserImg("https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp")
                    }else{
                        setUserImg(res.data[0].teacher_img);
                    }
                    const username = res.data[0].teacher_fname + " " + res.data[0].teacher_lname;
                    setUsername(username);
                    setFname(res.data[0].teacher_fname);
                    setLname(res.data[0].teacher_lname);
                    setEmail(res.data[0].teacher_email);
                    console.log(res);
                    return res.data;
                }else if(userType === "student"){
                    const res2 = await axios.get(`http://localhost:3001/studentprofile/${userID}`);
                    if(res2.data[0].stu_img == null){
                        setUserImg("https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp")
                    }else{
                        setUserImg(res2.data[0].stu_img);
                    }
                    const username = res2.data[0].stu_fname + " " + res2.data[0].stu_lname;
                    setUsername(username);
                    setFname(res2.data[0].stu_fname);
                    setLname(res2.data[0].stu_lname);
                    setEmail(res2.data[0].stu_email);
                    console.log(res2.data);
                    // setUserImg(res.data[0].stu_img);
                    console.log(res2);
                    return res2.data;
                }
            }catch(err){
                console.log(err);
                return err;
            }
        };
        getUser();
    },[]);

    const updateImage = async(e)=>{
        e.preventDefault();

        if (!userimg.type.startsWith("image/")) {
            window.alert("Please select an image file to upload");
            return;
        }

        var formData =new FormData();
        formData.append("user_img",userimg);
        formData.append("user_type", userType);
        formData.append("user_ID", userID);
        console.log(formData);
        const config = {
            headers:{
                "Content-Type":"multipart/form-data"
            }
        }
        
        try{
            const res = await axios.put("http://localhost:3001/updateavatar",formData,config);
            if(res.data.status == 201){
                window.alert("Profile Image Update Success!");
                window.location.reload();
            }
            console.log(res);
        }catch(error){
            console.log(error);
        }
    }

    const updateProfile = () =>{
        axios.defaults.withCredentials = true;
        
        axios.put(`http://localhost:3001/updateprofile/${userID}`,{
            fname : fname,
            lname : lname,
            email : email,
            user_type : userType
                
        }).then((response) =>{
            console.log(response);
            window.location.reload();
        }).catch((error)=>{
            console.log(error);
        });
        
    }

    const updatePassword = () =>{
        axios.defaults.withCredentials = true;
            if(pwd === cpwd && pwd.length > 8){
                axios.put(`http://localhost:3001/updatepassword/${userID}`,{
                password : pwd,
                user_type : userType
                    
                }).then((response) =>{
                    console.log(response);
                    window.location.reload();
                }).catch((error)=>{
                    console.log(error);
                });
            }else{
                window.alert("Invalid Password! & The password minimum length must be 8");
            }
    }

    return(
            <section style={{ backgroundColor: '#eee', height: "100vh" }}>
                <Container className="py-5 h-100" style={{marginLeft: "20%"}}>
                    <Row>
                        <Col>
                            <Card className="justify-content-center align-items-center mb-4" style={{ borderRadius: '.5rem', width: "200px", height: "50px" }}>
                                <Breadcrumb style={{ fontSize: "24px", margin: "20px", marginTop: "30px"}}>
                                    <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                                    <Breadcrumb.Item active>Profile</Breadcrumb.Item>
                                </Breadcrumb>
                            </Card>
                        </Col>
                    </Row>
                    <Row className="justify-content-center align-items-start h-100">
                        <Col lg="4" className="mb-4 mb-lg-0">
                            <Card className="justify-content-center align-items-center mb-4" style={{ borderRadius: '.5rem', width: "400px", height: "400px" }}>
                                    <Card.Img
                                        src={userimg}
                                        alt="avatar"
                                        className="rounded-circle m-2"
                                        style={{ width: '150px' }}
                                        fluid
                                    />
                                    <h5 className="text-muted mb-1">{username}</h5>
                                    <p className="text-muted mb-4">{userType}</p>
                                    <Button className="m-2" onClick={handleShow}>Edit Profile Image</Button>
                            </Card>
                        </Col>
                        <Col lg="8">
                            <Card className="mb-4" style={{ borderRadius: '.5rem', width: "600px", height:"400px" }}>
                                <Card.Body >
                                    <Row className="m-3">
                                        <Col sm="3">
                                            <Card.Text style={{fontSize: "18px", marginLeft:"20px"}}>First Name</Card.Text>
                                        </Col>
                                        <Col sm="9">
                                            <Card.Text className="text-muted" style={{fontSize: "18px"}}>{fname}</Card.Text>
                                        </Col>
                                    </Row>
                                    <hr />
                                    <Row className="m-3">
                                        <Col sm="3">
                                            <Card.Text style={{fontSize: "18px", marginLeft:"20px"}}>Last Name</Card.Text>
                                        </Col>
                                        <Col sm="9">
                                            <Card.Text className="text-muted" style={{fontSize: "18px"}}>{lname}</Card.Text>
                                        </Col>
                                    </Row>
                                    <hr />
                                    <Row className="m-3">
                                        <Col sm="3">
                                            <Card.Text style={{fontSize: "18px", marginLeft:"20px"}}>Email</Card.Text>
                                        </Col>
                                        <Col sm="9">
                                            <Card.Text className="text-muted" style={{fontSize: "18px"}}>{email}</Card.Text>
                                        </Col>
                                    </Row>
                                    <hr />
                                    <Row className="m-3">
                                        <Col sm="3">
                                            <Card.Text style={{fontSize: "18px", marginLeft:"20px"}}>Password</Card.Text>
                                        </Col>
                                        <Col sm="9">
                                            <Card.Text className="text-muted" style={{fontSize: "18px"}}>*******</Card.Text>
                                        </Col>
                                    </Row>
                                    <hr />
                                    <Button variant='danger' style={{float: "right", marginRight: "40%", margin:"10px", marginTop: "50px"}} onClick={pwdShow} >Change Password</Button>
                                    <Button style={{float: "right", margin:"10px", marginTop: "50px"}} onClick={profShow}>Edit Profile</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                        {userType === "student"?
                            <Col lg="8">
                                <Card className="mb-4" style={{ borderRadius: '.5rem', width: "600px", height:"300px" }}>
                                    <div style={{backgroundColor: "#74992e", width: "200px", height: "50px"}}>
                                        <h4 className='text-center' style={{color: "white"}}>Achievement</h4>
                                    </div>
                                    <div style={{marginLeft: "20px"}}>
                                        <img className = "rounded-circle m-2 border border-secondary border-5" style={{width: "100px", height: "100px"}} src={CourseImage} />
                                        <p className="text-muted" style={{marginLeft: "25px"}}>Badge 1</p>
                                    </div>
                                </Card>
                            </Col>:<></>
                        }
                        
                    </Row>
                    <Row>
                    </Row>
                </Container>
                
                <Modal 
                    show={img} 
                    onHide={handleClose}
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Update User Image</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group className='mb-3' controlId="formProfileImage">
                        <Form.Label>Upload Profile Image</Form.Label>
                        <Form.Control type="file" name="user_img" accept="image/*"
                            onChange = {(e)=> {
                                setUserImg(e.target.files[0]);
                            }}
                        />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" 
                            onClick={(e)=>{
                                updateImage(e);
                                handleClose();
                            }}
                        >
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Modal
                    show={prof} 
                    onHide={profClose}
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Edit User Profile</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group className='mb-3' controlId='formFName'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control 
                                type="text" 
                                name="email" 
                                placeholder="Email" 
                                value = {email}
                                onChange = {(e)=> {
                                    setEmail(e.target.value);
                                }}
                            />
                        </Form.Group>
                        <Form.Group className='mb-3' controlId='formFName'>
                            <Form.Label>First Name</Form.Label>
                            <Form.Control 
                                type="text" 
                                name="fname" 
                                placeholder="First Name" 
                                value = {fname}
                                onChange = {(e)=> {
                                    setFname(e.target.value);
                                }}
                            />
                        </Form.Group>
                        <Form.Group className='mb-3' controlId='formFName'>
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control 
                                type="text" 
                                name="lname" 
                                placeholder="Last Name" 
                                value = {lname}
                                onChange = {(e)=> {
                                    setLname(e.target.value);
                                }}
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={profClose}>
                            Close
                        </Button>
                        <Button variant="primary" 
                            onClick={(e)=>{
                                updateProfile();
                                profClose();
                            }}
                        >
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Modal
                    show={pass} 
                    onHide={pwdClose}
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Change Password</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group className='mb-3' controlId='formFName'>
                            <Form.Label>New Password</Form.Label>
                            <Form.Control 
                                type="password" 
                                name="newpassword" 
                                placeholder="New Password" 
                                onChange = {(e)=> {
                                    setPwd(e.target.value);
                                }}
                            />
                        </Form.Group>
                        <Form.Group className='mb-3' controlId='formFName'>
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control 
                                type="password" 
                                name="confirmpassword" 
                                placeholder="Confrim Password" 
                                onChange = {(e)=> {
                                    setCpwd(e.target.value);
                                }}
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={pwdClose}>
                            Close
                        </Button>
                        <Button variant="primary" 
                            onClick={(e)=>{
                                updatePassword();
                                pwdClose();
                            }}
                        >
                            Confirm
                        </Button>
                    </Modal.Footer>
                </Modal>
            </section>
    );
}

export default Profile;