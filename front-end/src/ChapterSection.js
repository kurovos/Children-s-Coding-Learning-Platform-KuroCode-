import "./style/section.css";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { Button } from "react-bootstrap";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { AiFillDelete, AiFillFilePdf } from "react-icons/ai";
import { MdOutlinePlayLesson,  MdOutlineQuiz} from "react-icons/md";

const ChapterSection = () =>{
    const [chapterList, setchapterList] = useState([]);
    const [videoList, setVideoList] = useState([]);
    const [videoData, setVideoData] = useState(false);
    const [fileData, setFileData] = useState(false);
    let DataVideo = [];
    let dVideo = [];
    let count = 0;

    const navigate = useNavigate();

    const refreshPage = () =>{
        window.location.reload();
    }

    useEffect(()=>{
        const getChapter = async()=>{
            try{
                const courseID = localStorage.getItem('courseID');
                const res = await axios.get(`http://localhost:3001/chapter/${courseID}`);
                console.log(res);
                setchapterList(res.data);
                return res.data;
            }catch(err){
                console.log(err);
                return err;
            }
        };
        // const getVideo = () =>{
        //     try{
        //         chapterList.map(async(props)=>{
        //             axios.get(`http://localhost:3001/getvideo/${props.chapter_ID}`).then(res2=>{
        //                 console.log(res2.data);
        //                 const isDataAvailable = res2.data && res2.data.length;
        //                 if (!isDataAvailable) {
        //                     // setVideoData(false);
        //                     DataVideo.push(false);
        //                     return false;
        //                 }else{
        //                     // setVideoData(true);
        //                     DataVideo.push(true);
        //                     return true;
        //                 }
        //             })
        //         })
        //     }catch(err){
        //         console.log(err);
        //     }
        //     setVideoList(DataVideo);
        //     // localStorage.setItem('chapterID', id);
        // };

        getChapter();
        // getVideo();
    },[]);


    const deleteEachChapter = (id) => {
        // axios.delete(`http://localhost:3001/video/${id}`);
        axios.delete(`http://localhost:3001/lesson/${id}`).then(()=>{
            console.log(chapterList);
            setchapterList(chapterList.filter((val)=>{
                return val.id !== id;
            }));
            refreshPage();
        })
    }

    const submit = (id) => {

        confirmAlert({
          title: 'Confirm to delete?',
          message: 'Are you sure to do this.',
          buttons: [
            {
              label: 'Yes',
              onClick: () => deleteEachChapter(id)
            },
            {
              label: 'No',
              //onClick: () => alert('Click No')
            }
          ]
        });
    }

    // const getVideo = async() =>{
    //     try{
    //         chapterList.map(async(props)=>{
    //             const res2 = await axios.get(`http://localhost:3001/getvideo/${props.chapter_ID}`);
    //             console.log(res2.data);
    //             const isDataAvailable = res2.data && res2.data.length;
    //             if (!isDataAvailable) {
    //                 // setVideoData(false);
    //                 DataVideo.push(false);
    //                 return false;
    //             }else{
    //                 // setVideoData(true);
    //                 DataVideo.push(true);
    //                 return true;
    //             }
    //         })
    //     }catch(err){
    //         console.log(err);
    //     }
    //     // localStorage.setItem('chapterID', id);
    //     setVideoList(DataVideo);
    // };
    // getVideo();
    // console.log(DataVideo);

    const switchVideoName = async(id) =>{
        try{
            const res2 = await axios.get(`http://localhost:3001/getvideo/${id}`);
            console.log(res2.data);
            const isDataAvailable = res2.data && res2.data.length;
            if (!isDataAvailable) {
                setVideoData(false);
                // DataVideo.push(false);
                // return false;
            }else{
                setVideoData(true);
                // DataVideo.push(true);
                // return true;
            }
            const res4 =await axios.get(`http://localhost:3001/getfile/${id}`);
            const isFileAvailable = res4.data && res4.data.length;
            if(!isFileAvailable){
                setFileData(false);
            }else{
                setFileData(true);
            }
            
        }catch(err){
            console.log(err);
        }
        // localStorage.setItem('chapterID', id);
        
    }

    return(
        <div>
            {chapterList.map((props, index)=>{
                return(
                    <section key={index}>
                        {/* mt-xl-5 */}
                        
                        <div className ="dropdown" onMouseOver = {()=>{
                            localStorage.setItem('chapterID', props.chapter_ID);
                        }}>
                            <div 
                                className="dropbtn d-flex justify-content-between align-items-center"
                                onClick = {(e)=>{
                                    localStorage.setItem('chapterID', props.chapter_ID);
                                    // handleClick();
                                }}
                                onMouseOver = {async()=>{
                                    // localStorage.setItem('chapterID', props.chapter_ID);
                                    // const res2 =await axios.get(`http://localhost:3001/getvideo/${props.chapter_ID}`);
                                    // const isDataAvailable = res2.data && res2.data.length;
                                    // if (!isDataAvailable) {
                                    //     setVideoData(false);
                                    // }else{
                                    //     setVideoData(true);
                                    // }
                                    switchVideoName(props.chapter_ID);
                                    // console.log(videoData);
                                    // console.log(res2.data);
                                }}
                            >
                                <p style={{marginLeft:"40%"}}>{props.chapter_name}</p>
                                <Button
                                    className="btn btn-danger float-right align-self-end d-flex align-items-center"
                                    style = {{height: '50px', width: '50px'}} 
                                    onClick={(e)=>{submit(props.chapter_ID)}}>
                                    <AiFillDelete title="Delete" style={{width: "30px", height: "30px", margin: "auto"}}/>
                                    {/* deleteEachChapter(props.chapter_ID) */}
                                </Button>
                            </div>
                            <section style ={{marginBottom:'10%'}}>
                            {/* className="dropdown-content" */}
                            <div 
                                style={{
                                    width: '100%',
                                    height: '150px',
                                    position: 'absolute',
                                    backgroundColor: '#f9f9f9',
                                    minWidth: '160px',
                                    boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
                                    zIndex: '1'
                                }}
                                className="d-flex justify-content-around"
                                onMouseOver = {async()=>{
                                    // localStorage.setItem('chapterID', props.chapter_ID);
                                    // const res2 =await axios.get(`http://localhost:3001/getvideo/${props.chapter_ID}`);
                                    // const isDataAvailable = res2.data && res2.data.length;
                                    // if (!isDataAvailable) {
                                    //     setVideoData(false);
                                    // }else{
                                    //     setVideoData(true);
                                    // }
                                    switchVideoName(props.chapter_ID);
                                    // console.log(videoData);
                                    // console.log(res2.data);
                                }}
                            >
                                
                                {/* videoData */}
                                {/* {switchVideoName(props.chapter_ID) === true ?DataVideo.push(true):DataVideo.push(false)} */}
                                {/* {switchVideoName(props.chapter_ID)} */}
                                {/* {console.log(switchVideoName(props.chapter_ID))} */}
                                {/* {console.log(videoList)} */}
                                {/* {console.log(DataVideo)} */}
                                {videoData?<Link 
                                    style={{
                                        padding: '12px 16px',
                                        textAlign: 'center',
                                        textDecoration: 'none'
                                    }} 
                                    to="/updatevideo"><MdOutlinePlayLesson title="Video" style={{width: "80px", height: "80px", marginRight: "10px"}}/><br/>Video</Link>:
                                    <Link 
                                    style={{
                                        padding: '12px 16px',
                                        textAlign: 'center',
                                        textDecoration: 'none'
                                    }} 
                                    to="/addvideo"><MdOutlinePlayLesson title="Video" style={{width: "80px", height: "80px", marginRight: "10px"}}/><br/>Video</Link>
                                }
                                
                                {/* <MdOutlinePlayLesson title="Video" style={{width: "30px", height: "30px", marginRight: "10px"}} onClick={(e)=>{navigate("/addvideo");}}/> */}
                                {/* <Link to="/addvideo">Video</Link> */}
                                {
                                    fileData?
                                    <Link
                                    style={{
                                        padding: '12px 16px',
                                        textAlign: 'center',
                                        textDecoration: 'none'
                                    }} 
                                    to="/updatefile">
                                        <AiFillFilePdf title="File" style={{width: "80px", height: "80px", marginRight: "10px"}}/><br/>File
                                    </Link>
                                    :
                                    <Link
                                    style={{
                                        padding: '12px 16px',
                                        textAlign: 'center',
                                        textDecoration: 'none'
                                    }} 
                                    to="/addfile"
                                    >
                                        <AiFillFilePdf title="File" style={{width: "80px", height: "80px", marginRight: "10px"}}/><br/>File
                                    </Link>
                                }
                                
                                {/* <Link to="/addfile">Add File</Link> */}
                                <Link
                                    style={{
                                        padding: '12px 16px',
                                        textAlign: 'center',
                                        textDecoration: 'none'
                                    }} 
                                    to="/managequiz"
                                >
                                    <MdOutlineQuiz title="Quiz" style={{width: "80px", height: "80px", marginRight: "10px"}}/><br/>Quiz
                                </Link>
                                {/* <MdOutlineQuiz title="Quiz" style={{width: "80px", height: "80px", marginRight: "10px"}} onClick={(e)=>{navigate("/managequiz");}}/> */}
                                {/* <Link to="/managequiz">Manage Quiz</Link> */}
                                
                            </div>
                            </section>
                        </div>
                    </section>
                    
                    
                );
            })}
        </div>
    );
    
}

export { ChapterSection }