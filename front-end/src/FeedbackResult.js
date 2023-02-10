import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from "react-apexcharts";
import { Breadcrumb } from 'react-bootstrap';


const FeedbackResult = ()=>{
    const[f1, setF1] = useState([]);
    const[f2, setF2] = useState([]);
    const[cname, setCName] = useState("");
    const courseID = localStorage.getItem('courseID');

    useEffect(()=>{
        const fe1 = [];
        const fe2 = [];
        let f1_0 = 0;let f1_1 = 0;let f1_2= 0;let f1_3= 0;let f1_4 = 0;
        let f2_0= 0;let f2_1= 0;let f2_2= 0;let f2_3= 0;let f2_4 = 0;

        const getFeedback = async() => {
            try{
                const res2 = await axios.get(`http://localhost:3001/getfeedback/${courseID}`);
                console.log(res2.data);
                for(let i=0; i< res2.data.length; i++){
                    if(res2.data[i].feedback_one == 0){
                        f1_0 += 1;
                    }else if(res2.data[i].feedback_one == 1){
                        f1_1 += 1;
                    }else if(res2.data[i].feedback_one == 2){
                        f1_2 += 1;
                    }else if(res2.data[i].feedback_one == 3){
                        f1_3 += 1;
                    }else if(res2.data[i].feedback_one == 4){
                        f1_4 += 1;
                    }

                    if(res2.data[i].feedback_two == 0){
                        f2_0 += 1;
                    }else if(res2.data[i].feedback_two == 1){
                        f2_1 += 1;
                    }else if(res2.data[i].feedback_two == 2){
                        f2_2 += 1;
                    }else if(res2.data[i].feedback_two == 3){
                        f2_3 += 1;
                    }else if(res2.data[i].feedback_two == 4){
                        f2_4 += 1;
                    }
                }
                fe1.push(f1_0);
                fe1.push(f1_1);
                fe1.push(f1_2);
                fe1.push(f1_3);
                fe1.push(f1_4);
                fe2.push(f2_0);
                fe2.push(f2_1);
                fe2.push(f2_2);
                fe2.push(f2_3);
                fe2.push(f2_4);
                setF1(fe1);
                setF2(fe2);
                console.log(fe1);
                return (res2.data);
            }catch(err){
                console.log(err);
                return err;
            }
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
        getFeedback();
    },[]);

    return(
        <section style={{ backgroundColor: '#eee', height: "150vh", paddingTop:"50px" }}>
            <Breadcrumb style={{ marginTop: "5px", fontSize: "24px", marginLeft: "50px"}}>
                <Breadcrumb.Item href="/course">Course</Breadcrumb.Item>
                <Breadcrumb.Item href="/courseinfo">{cname}</Breadcrumb.Item>
                <Breadcrumb.Item active>Feedback Result</Breadcrumb.Item>
            </Breadcrumb>
            <h2 className="text-center mb-4">Feedback Result</h2><br/>
            <Chart 
                type="pie"
                width={1200}
                height={550}
                style={{marginLeft: "20%", marginBottom: "50px"}}

                series={f1}

                options={{
                    title: { text: `Feedback 1: "Do you have fun in this course?"`},

                    labels:['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree']
                }}
            >

            </Chart>
            <Chart 
                type="pie"
                width={1200}
                height={550}
                style={{marginLeft: "20%"}}

                series={f2}

                options={{
                    title: { text: `Feedback 1: "Do you have fun in this course?"`},

                    labels:['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree']
                }}
            >

            </Chart>
        </section>
    );
}

export default FeedbackResult;