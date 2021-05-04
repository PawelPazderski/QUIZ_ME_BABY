import React, {useState, useEffect} from 'react'
import {NavLink} from 'react-router-dom'

const Home = () => {
    const [quiz, setQuiz] = useState([])

    useEffect(()=>{
        fetch("https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple")
        .then(res => res.json())
        // .then(data => console.log(data))
        .then(data => setQuiz(data))
        
    },[])

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