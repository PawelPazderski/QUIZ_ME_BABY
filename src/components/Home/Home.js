import React from 'react'
import {NavLink} from 'react-router-dom'

const Home = () => {


    return (
    <>
        <div className="home-container">
            <div className="logo-quiz"></div>
            <NavLink 
            to="/selectquiz" 
            activeclassname="active" 
            className="startLink startlink-pulse">Start</NavLink>
        </div>
        
    </>)
}

export default Home