import React, {useState, useEffect} from 'react'

import Quiz from '../Quiz'

import {NavLink} from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Spinner from 'react-bootstrap/Spinner'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const Select = () => {
    const [categories, setCategories] = useState([])
    const [category, setCategory] = useState("General Knowledge")
    const [level, setLevel] = useState("Easy")
    const [questions, setQuestions] = useState("5")
    const [test, setTest] = useState(false)

    useEffect(()=>{
        fetch("https://opentdb.com/api_category.php")
            .then(res => res.json())
            // .then(categories => console.log(categories))
            .then(categories => setCategories(categories.trivia_categories))
    },[])

    const startQuiz = () => {
        setTest(true)
    }

    const endQuiz = () => {
        setTest(false)
    }

    return (
        <>
        {(test === false) ? (
        <div className="select-container">
        <a href="/"><div className="logo-quiz logo-quiz-small"></div></a>
        
        {categories.length
        ?
        <Container>
                <Row>
                    <Col>
                    <h1 style={{textAlign:"center"}}>Define your quiz</h1>
                    </Col>
                </Row>
                <Row>
                        <Col xs={12} md={4}>
                            <label>Category</label>
                            <select className="select-category" value={category} onChange={ e => setCategory(e.target.value)}>
                                {categories.map((el, i)=>{
                                    return <option key={i} data-id={el.id}>{el.name}</option>
                                })}
                            </select>
                        </Col>
                        <Col xs={12} md={4}>
                        <label>Level</label>
                        <select className="select-category" value={level} onChange={ e => setLevel(e.target.value)}>
                            <option>Easy</option>
                            <option>Medium</option>
                            <option>Hard</option>
                        </select>
                        </Col>
                        <Col xs={12} md={4}>
                        <label>Questions</label>
                            <select className="select-category" value={questions} onChange={ e => setQuestions(e.target.value)}>
                            <option>5</option>
                            <option>10</option>
                            <option>15</option>
                        </select></Col>
                </Row>
        </Container>
        :
        <div>
            <Spinner animation="border" variant="success" />
        </div>
        
        }
        {categories.length && <button className="startLink" onClick={startQuiz}>OK, let's go!</button>}
        </div>
        ) : <Quiz endQuiz={endQuiz} level={level} category= {category} questions= {questions} categories= {categories} />}
        </>
    )
} 


export default Select