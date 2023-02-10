import React, { useState, useEffect } from 'react';
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import axios from 'axios';
import { Button, Breadcrumb } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";


const File = ()=>{
    const chapterID = localStorage.getItem("chapterID");
    const[name, setName] = useState("");
    const[cname, setCName] = useState("");
    const[description, setDescription] = useState("");
    const[path, setPath] = useState("");
    const chpID = localStorage.getItem('chapterID');
    const userID = localStorage.getItem('userID');
    const userType = localStorage.getItem('userType');
    const courseID = localStorage.getItem('courseID');
    const [checkpoint, setCheckPoint] = useState(true);

    const navigate =useNavigate();

    useEffect(()=>{
        const getActivity = async()=>{
            if(userType === "student"){
                try{
                    //check acitvity
                    const res = await axios.get(`http://localhost:3001/getactivity/${userID}/${chpID}`);
                    console.log(res.data.length);
                    if(res.data.length === 0 ){
                        console.log(checkpoint);
                        //create new activity
                        axios.post("http://localhost:3001/activity",{
                            activity_file : checkpoint,
                            chapter_ID : chpID,
                            stu_ID : userID
                        }).then((response) =>{
                                console.log(response);
                            }
                        ).catch((error)=>{
                                console.log(error);
                            }
                        );
                    }else{
                        //if got data set the file activity into checkpoint *(need?)
                        setCheckPoint(res.data.activity_file);
                    }
                    console.log(checkpoint);
                }catch(err){
                    console.log(err);
                    return err;
                }

                try{
                    axios.put(`http://localhost:3001/ua_file/${chpID}`,{
                        activity_file : checkpoint,
                        stu_ID : userID
                    }).then((response) =>{
                        console.log(response);
                    }).catch((error)=>{
                        console.log(error);
                    });
                }catch(err){
                    console.log(err);
                    return err;
                }
                console.log(checkpoint);
            }
        };
        const getFile = async() =>{
            const res = await axios.get(`http://localhost:3001/getfile/${chapterID}`);
            setName(res.data[0].file_name);
            setDescription(res.data[0].file_description);
            setPath(res.data[0].file_path);
            return res.data;
        };
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
        getActivity();
        getFile();
    },[])

    const docs = [{ uri: path }];

    // const completeFile = async() =>{
    //     if(userType === "student" && checkpoint !== true){
    //         console.log(checkpoint);
    //         try{
    //             setCheckPoint(true);
    //             axios.put(`http://localhost:3001/ua_file/${chpID}`,{
    //                 activity_file : checkpoint,
    //                 stu_ID : userID
    //             }).then((response) =>{
    //                 console.log(response);
    //             }).catch((error)=>{
    //                 console.log(error);
    //             });
    //         }catch(err){
    //             console.log(err);
    //             return err;
    //         }
    //         console.log(checkpoint);
    //         return true;
    //     }
    // };
    // completeFile();

    return(
        <div style = {{backgroundColor: "#88BDBC", paddingTop: '5px', paddingBottom: '5px'}}>
            <Breadcrumb style={{marginLeft: "150px", marginTop: "50px", fontSize: "24px"}}>
                <Breadcrumb.Item href="/course">Course</Breadcrumb.Item>
                <Breadcrumb.Item href="/courseinfo">{cname}</Breadcrumb.Item>
                <Breadcrumb.Item active>{name}</Breadcrumb.Item>
            </Breadcrumb>
            <section style={{ width: '75%', height:'50%', textAlign:'center', margin:"auto", marginTop:"100px"}}>
                {/* <div className="text-start" style={{marginLeft: "-100px", marginTop: '-60px'}}>
                    <Button variant="danger" onClick={(e)=>{navigate(-1)}}>Back</Button>
                </div> */}
                <div style={{ marginBottom: "50px", marginLeft: "1160px" }}>
                    <Button variant="danger" onClick={(e)=>{navigate("/videopage")}}>Back</Button> 
                    <Button style = {{ marginLeft: "50px"}} onClick={(e)=>{navigate("/quiz")}}>Next</Button>
                </div>
                <section className='bg-light rounded' style={{width: "1400px"}}>
                    <h1 style={{ marginBottom:"50px"}}>{name}</h1>
                    <p style={{ paddingBottom: '50px'}}>Description: {description}</p>
                </section>
                <div>
                    <DocViewer
                    sandbox="allow-scripts"
                    style = {{width: "1400px"}}
                    documents={docs} 
                    pluginRenderers={DocViewerRenderers} 
                    />
                </div>
            </section>
        </div>
    );
}

export default File;