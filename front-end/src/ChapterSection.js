import "./style/section.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { Button } from "react-bootstrap";

const ChapterSection = () =>{
    const [chapterList, setchapterList] = useState([]);
    const [videoData, setVideoData] = useState(false);

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
        getChapter();
    },[]);


    const deleteEachChapter = (id) => {
        // axios.delete(`http://localhost:3001/video/${id}`);
        axios.delete(`http://localhost:3001/lesson/${id}`).then(()=>{
            // const chapterList = [...this.state.chapterList];

            // // Filter out the course with the given id
            // const updatedList = chapterList.filter((chapter) => {
            //     return chapter.id !== id;
            // });

            // // Update the state with the new list of courses
            // this.setState({ chapterList: updatedList });
            console.log(chapterList);
            setchapterList(chapterList.filter((val)=>{
                return val.id !== id;
            }));
            refreshPage();
        })
    }

    const switchVideoName = async(id) =>{
        localStorage.setItem('chapterID', id);
        const res2 =await axios.get(`http://localhost:3001/getvideo/${id}`);
        const isDataAvailable = res2.data && res2.data.length;
        if (!isDataAvailable) {
            setVideoData(false);
        }else{
            setVideoData(true);
        }
    }

    return(
        <div>
            {chapterList.map((props, index)=>{
                return(
                    <section key={index}>
                        {/* mt-xl-5 */}
                        <div className ="dropdown">
                            <button 
                                className="dropbtn"
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
                                
                            >{props.chapter_name}</button>
                            <section style ={{marginBottom:'10%'}}>
                            <div className="dropdown-content"
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
                                    {videoData?<Link to="/updatevideo">Edit Video</Link>:<Link to="/addvideo">Create Video</Link>}
                                    {/* <Link to="/addvideo">Video</Link> */}
                                    <Link to="/addfile">Add File</Link>
                                    <Link to="/managequiz">Manage Quiz</Link>
                                    <Button 
                                        className="btn  mx-auto d-flex align-items-center"
                                        variant="danger" 
                                        onClick={(e)=>{deleteEachChapter(props.chapter_ID)}}>
                                        Delete
                                    </Button>
                            </div></section>
                        </div>
                    </section>
                    
                    
                );
            })}
        </div>
    );
    
}

export { ChapterSection }