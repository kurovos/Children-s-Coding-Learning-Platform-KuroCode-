import React, { useState, useMemo } from "react";
import { BrowserRouter as Router,Routes, Route } from "react-router-dom";
import About from './component/About';
import Home from './component/Home';
import Leaderboard from './component/Leaderboard';
import Course from './component/Course';
import Navbar from './Navbar';
import { AddCourse } from './AddCourse';
import { AddVideo } from './AddVideo';
import { RegForm, LogForm } from './Form';
import 'bootstrap/dist/css/bootstrap.css';
import { ChapterSection } from './ChapterSection';
import Lesson from "./component/Lesson";
import UpdateVideo from "./UpdateVideo";

function App() {
  // const [user, setUser ] = useState(null);
  // const value = useMemo(()=> ({ user, setUser }), [user, setUser]);

  return (
    <Router>
      <nav>
        <Navbar />
      </nav>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/course" element={<Course />}/>
        <Route path="/leaderboard" element={<Leaderboard />}/>
        <Route path="/about" element={<About />}/>
        <Route path="/register" element={<RegForm />}/>
        <Route path="/login" element={<LogForm />}/>
        <Route path="/addcourse" element={<AddCourse />}/>
        <Route path="/addvideo" element={<AddVideo />}/>
        <Route path="/updatevideo" element={<UpdateVideo />}/>
        <Route path="/chaptersection" element={<ChapterSection />}/>
        <Route path="/lesson" element={<Lesson />}/>
      </Routes>
    </Router>
    
  );
}

export default App;
