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
    rightContainerThing 
} from './style/Navbar.style'
import KuroCodeLogo from "./picture/logo_image.png";
import { Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom'
import { LogForm } from "./Form.js";
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
            return "/about"; 
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
                        <NavbarLink to = "/course">Course</NavbarLink>
                        <NavbarLink to="/leaderboard">Leaderboard</NavbarLink>
                        <NavbarLink to="/about">About Us</NavbarLink>
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
                    
                    
                </RightContainer>
            </NavbarInnerContainer>
            {extendNavbar && (
                <NavbarExtendedContainer>
                    <NavbarLinkExtended to="/">KuroCode</NavbarLinkExtended>
                    <NavbarLinkExtended to="/course">Course</NavbarLinkExtended>
                    <NavbarLinkExtended to="/leaderboard">Leaderboard</NavbarLinkExtended>
                    <NavbarLinkExtended to="/about">About Us</NavbarLinkExtended>
                </NavbarExtendedContainer>
            )}
        </NavbarContainer>
    )
}

export default Navbar;