import React, {useState, useEffect} from 'react'
import {NavLink} from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const Select = () => {
    const [categories, setCategories] = useState([])
    const [category, setCategory] = useState("General Knowledge")
    const [level, setLevel] = useState("Easy")
    const [questions, setQuestions] = useState("5")

    useEffect(()=>{
        fetch("https://opentdb.com/api_category.php")
            .then(res => res.json())
            // .then(categories => console.log(categories))
            .then(categories => setCategories(categories.trivia_categories))
    },[])



    return (
        <>
        <div className="select-container">
        <div className="logo-quiz logo-quiz-small"></div>
        <Container>
                
            <Row>
                <Col>
                <h1 style={{textAlign:"center"}}>Define your quiz</h1>
                </Col>
            </Row>
            <Row>
                {/* <form> */}
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
                {/* </form> */}
                
            </Row>
        </Container>
        <NavLink to={{
                pathname: "/quiz",
                quizProps: {
                    level:{level},
                    category: {category},
                    questions: {questions},
                    categories: {categories}
                }
            }} 
            activeClassName="active" 
            className="startLink"
            >OK, let's go!
            </NavLink>
        </div>
        
        
        </>
    )
} 


export default Select