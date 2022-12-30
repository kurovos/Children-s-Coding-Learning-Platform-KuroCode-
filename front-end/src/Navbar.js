import React, { useState} from "react";
import { 
    NavbarContainer, 
    LeftContainer, 
    RightContainer, 
    NavbarInnerContainer, 
    NavbarExtendedContainer, 
    NavbarLinkContainer, 
    NavbarLink,
    Logo,
    OpenLinksButton,
    NavbarLinkExtended,
    RightContainerThing 
} from './style/Navbar.style'
import KuroCodeLogo from "./picture/logo_image.png";
import { Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

const Navbar = ()=>{
    const [extendNavbar, setExtendNavbar] = useState(false);
    // const { user, setUser } = useContext(UserContext);
    const [user, setUser] = useState(localStorage.getItem('username'));
    const [userType, setUserType] = useState(localStorage.getItem('userType'));
    // const getUser = async ()=>{
    //     const response = await axios.get(`http://localhost:3001/${id}`);
    // }
    const navigate = useNavigate();

    const refreshPage = () =>{
        window.location.reload();
    }

    const logout = () =>{
        localStorage.clear();
        navigate("/login");
        refreshPage();
    }

    const coursePage = (userType) =>{
        if(userType === "student"){
            return "/course"; 
        }else if(userType === "teacher"){
            return "/course";
        }else{
            return "/login"
        }
    }

    return (
        <NavbarContainer extendNavbar={extendNavbar}>
            <NavbarInnerContainer>
                
                <LeftContainer>
                    <Logo src= {KuroCodeLogo}></Logo>
                    <NavbarLinkContainer>
                        <NavbarLink to="/">KuroCode</NavbarLink>
                        {/* {coursePage(userType)} */}
                        <NavbarLink to = {coursePage(userType)}>Course</NavbarLink>
                        <NavbarLink to="/leaderboard">Leaderboard</NavbarLink>
                        <NavbarLink to="/quiz">About Us</NavbarLink>
                        <OpenLinksButton
                            onClick={() =>{
                                setExtendNavbar((curr) => !curr);
                            }}
                        >
                            {extendNavbar ? <> &#10005;</> : <>&#8801;</>}
                        </OpenLinksButton>
                    </NavbarLinkContainer>
                </LeftContainer>
                <RightContainer>
                    <RightContainerThing>
                    {user? 
                        <div  className="row mt-3 mb-3 d-flex">
                            <h4 className="text-white col-lg mr-3">{ user }</h4>
                            <Button className ="btn btn-danger col-lg" 
                            onClick = {logout}
                            >logout</Button>
                        </div>: 
                        <NavbarLink to="/login">
                        <Button className="btn btn-secondary">Login</Button>
                        </NavbarLink>
                    }
                    </RightContainerThing>
                    
                </RightContainer>
            </NavbarInnerContainer>
            {extendNavbar && (
                <NavbarExtendedContainer>
                    <NavbarLinkExtended to="/">KuroCode</NavbarLinkExtended>
                    <NavbarLinkExtended to="/course">Course</NavbarLinkExtended>
                    <NavbarLinkExtended to="/leaderboard">Leaderboard</NavbarLinkExtended>
                    <NavbarLinkExtended to="/about">About Us</NavbarLinkExtended>
                    {user? 
                        <div  className="row mt-3 mb-3">
                            <h4 className="text-white col-lg mr-3">{ user }</h4>
                            <Button className ="btn btn-danger col-lg" 
                            onClick = {logout}
                            >logout</Button>
                        </div>: 
                        <NavbarLink to="/login">
                        <Button className="btn btn-secondary">Login</Button>
                        </NavbarLink>
                    }
                </NavbarExtendedContainer>
            )}
        </NavbarContainer>
    )
}

export default Navbar;