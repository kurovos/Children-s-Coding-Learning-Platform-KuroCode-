import axios from "axios";

const BASE_URL = "http://localhost:3001";


export const getCourse = async()=>{
    try{
        const res = await axios.get(BASE_URL + "/course");
        console.log(res);
        return res.data;
    }catch(err){
        console.log(err);
        return err;
    }
};

export const getCourseById = async(course_ID)=>{
    return axios.get(BASE_URL + '/' + course_ID);
}

export const deleteCourse = async(course_ID)=>{
    return axios.delete(BASE_URL + '/' + course_ID);
}


