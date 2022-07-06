import React from 'react'
import {NavLink} from 'react-router-dom'

const Home = () => {


    return (
    <>
        <div className="home-container">
            <div className="logo-quiz"></div>
            <NavLink 
            exact to="/selectquiz" 
            activeClassName="active" 
            className="startLink">Start</NavLink>
        </div>
        
    </>)
}

export default Home