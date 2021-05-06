import React, {useState, useEffect} from 'react'

const Quiz = ({handleClick, level, questions, category, categories}) => {

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

    const quizID = categories.filter(el => el.name === category)[0].id.toString()

    quiz.forEach(el=>{
        el.answers = [el.correct_answer, ...el.incorrect_answers].sort(()=> Math.random() - .5)
    })
    // console.log(quizID)
    

    useEffect(()=>{
        fetch(`https://opentdb.com/api.php?amount=${questions}&category=${quizID}&difficulty=${level.toLowerCase()}&type=multiple`)
            .then(res => res.json())
            .then(data => {
                    setResponseCode(data.response_code)
                    setQuiz(data.results)
                })
            .catch(err=>console.log(err))
    },[])

    const startQuiz = () => {
        setStart(true)
    } 

    const nextQuestion = () => {
        setInd(prev => prev + 1)

    }

    return (
        
        <>
        {/* {console.log(quiz.answers)} */}
        <h1 style={{color:"red"}}>Category: {category} / Level: {level}</h1>
            {console.log(quiz)}
           
            {responseCode > 0 && (
                <>
                <h1>Oops, looks like we don't have this many questions in this category...</h1>
                <button onClick={handleClick}>Go back</button>
                </>)}
            {responseCode === 0 && (
            <>

            {!start && <button onClick={startQuiz}>Begin</button>}
            {start && (
            <>
                <h1>{ind+1}: {quiz[ind].question.replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/&shy;/g, "-")}</h1>
                <ul>
                    {quiz[ind].answers.map((el, i)=> {
                        return <li key={i}>{el}</li>
                    })}
                </ul>
            </>
            )}
            {/* <ul>
                {quiz.map((el, i)=> <li key={i}>{
                el.question.replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/&shy;/g, "-")
               
                }</li>)}
            </ul> */}
            {(ind !== quiz.length - 1 && start) && <button onClick={nextQuestion}>Next</button>}
            <button onClick={handleClick}>Finish</button>
            </>)}
        </>
    )
}

export default Quiz