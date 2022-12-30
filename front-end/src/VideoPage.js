import React, { useEffect, useState } from "react";
import axios from 'axios';
import ReactPlayer from 'react-player';

const VideoPage = ()=>{
    const [videoName, setVideoName] = useState("");
    const [videoDescription, setVideoDescription] = useState("");
    const [videoUrl, setVideoUrl] = useState("");
    const chpID = localStorage.getItem('chapterID');

    useEffect(()=>{
        const getVideo = async()=>{
            try{
                const res2 = await axios.get(`http://localhost:3001/getvideo/${chpID}`);
                console.log(res2);
                setVideoName(res2.data[0].video_name);
                setVideoDescription(res2.data[0].video_description);
                setVideoUrl(res2.data[0].video_url);
                return res2.data;
            }catch(err){
                console.log(err);
                return err;
            }
        };
        getVideo();
    },[]);

    return(
        <section style={{ width: '50%', height:'50%', textAlign:'center', margin:"auto", borderRadius: '50%', marginTop:"100px", backgroundColor: "#FFE4C4"}}>
            <h1>{videoName}</h1><br/>
            <p style={{fontStyle: "italic"}}>Video Description: {videoDescription}</p><br/>
            <ReactPlayer 
                className='react-player'
                style={{marginLeft:"15%", width: "600px", height: "500px"}}
                url={videoUrl}
                playing={true}
                muted={true}
                controls={true}
                scale={0.5}
                config={{
                    facebook: {
                        appId: "your-facebook-app-id",
                        embed: {
                            width: 600,
                            height: 500
                        }
                    }
                }}
            />
        </section>
    );
}

export default VideoPage;