import React, {useState, useEffect} from 'react'

import Result from '../Result'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const Quiz = ({endQuiz, level, questions, category, categories}) => {

    // console.log(handleClick)
    // console.log(level)
    // console.log(questions)
    // console.log(category)
    // console.log(categories)
    // quiz.forEach(q => q.choices.sort(() => Math.random() - .5));

    const [responseCode, setResponseCode] = useState(0)
    const [quiz, setQuiz] = useState([])
    const [ind, setInd] = useState(0)
    const [start, setStart] = useState(false)
    const [finish, setFinish] = useState(false)
    const [score, setScore] = useState(0)
    const [select, setSelect] = useState([])
    const [showResult, setShowResult] = useState(false)
    const [record, setRecord] = useState([])

    const quizID = categories.filter(el => el.name === category)[0].id.toString()

    // quiz.forEach(el=>{
    //     el.answers = [el.correct_answer, ...el.incorrect_answers].sort(()=> Math.random() - .5)
    // })
    // console.log(quizID)
    

    useEffect(()=>{
        fetch(`https://opentdb.com/api.php?amount=${questions}&category=${quizID}&difficulty=${level.toLowerCase()}&type=multiple`)
            .then(res => res.json())
            .then(data => {
                    data.results.forEach(el=>{
                        el.answers = [el.correct_answer, ...el.incorrect_answers].sort(()=> Math.random() - .5)
                    })
                    setResponseCode(data.response_code)
                    setQuiz(data.results)
                })
                
            .catch(err=>console.log(err))
    },[])

    const startQuiz = () => {
        setStart(true)
        setRecord([])
    } 

    const finishQuiz = () => {
        if(select[0] === quiz[ind].correct_answer ) {
            setScore(prev => prev + 1)
        }
        setRecord(prev=> [...prev, {
            question: quiz[ind].question,
            answers: quiz[ind].answers,
            correct: quiz[ind].correct_answer,
            selected: select[0]
        }])

        setShowResult(true)
        setFinish(true)

    }


    const nextQuestion = () => {
        setInd(prev => prev + 1)

        if(select[0] === quiz[ind].correct_answer ) {
            setScore(prev => prev + 1)
        }

        setRecord(prev=> [...prev, {
            question: quiz[ind].question,
            answers: quiz[ind].answers,
            correct: quiz[ind].correct_answer,
            selected: select[0]
        }])
        setSelect([])

    }

    return (
        
        <>
        {console.log(quiz)}
        <div className="main-quiz-container">
        {!finish && <Container className="quiz-container">
            <Row>
                <Col xs={12} md={8}>
                <h3 style={{textAlign:"center"}}>Category: {category} / Level: {level}</h3>
                </Col>
            </Row>
            {responseCode > 0 && (
                <>
                <h2>Oops, looks like we don't have this many questions in this category...</h2>
                <button className="btn-primary" onClick={endQuiz}>Go back</button>
                </>)}
            {responseCode === 0 && (
            <>

            {!start && (
                <>
                <div>
                    <button className="btn-primary" onClick={startQuiz}>Begin</button>
                    <button className="btn-primary" onClick={endQuiz}>Go back</button>
                </div>
                    
                </>
            )}
            {start && (
            <>
                <h2 className="question-number">#{ind+1}</h2>
                <h2>{quiz[ind].question.replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/&shy;/g, "-").replace(/&oacute;/g, "ó").replace(/&iacute;/g,"í")}</h2>
                <Row>
                    <Col xs={12} md={6}>
                    <select className="answer-options" value={[select]} onChange={e => setSelect([e.target.value])} multiple="multiple">
                    {quiz[ind].answers.map((el, i)=> {
                        return <option className="option-answer" key={i}>{el.replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/&shy;/g, "-").replace(/&amp;/g, "&")}</option>
                    })}
                </select>
                    </Col>
                </Row>
            </>
            )}
            <div className="quiz-buttons">
                {(ind !== quiz.length - 1 && start) && <button className="btn-primary" onClick={nextQuestion}>Next</button>}
                {(!showResult && start) && <button className="btn-primary" onClick={finishQuiz}>Finish</button>}
            </div>
            
            </>)}
            
            </Container>}
            {(showResult && finish) && (
            <>
                <Result score={score} endQuiz={endQuiz} length={quiz.length} record={record}/>
                
            </>
            )}
            </div>
        </>
    )
}

export default Quiz