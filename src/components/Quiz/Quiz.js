import React, {useState, useEffect} from 'react'

const Quiz = (props) => {

    const [responseCode, setResponseCode] = useState(0)
    const [quiz, setQuiz] = useState([])

    const quizData = props.location.quizProps

    const quizID = quizData.categories.categories.filter(el => el.name === quizData.category.category)
    const level = quizData.level.level.toLowerCase()
    const category = quizID[0].id.toString()
    const questions = quizData.questions.questions

    // console.log(quizData)
    // console.log(quizData.category.category)
    // console.log(level)
    // console.log(quizID[0].id)
    // console.log(category)
    // console.log(quizData.questions.questions)

    useEffect(()=>{
        fetch(`https://opentdb.com/api.php?amount=${questions}&category=${category}&difficulty=${level}&type=multiple`)
            .then(res => res.json())
            .then(data => {
                    setResponseCode(data.response_code)
                    // setQuizData(props.location.quizProps)
                    setQuiz(data.results)
                })
            .catch(err=>console.log(err))
    },[])

    return (
        
        <>
            {console.log(quiz)}
            {console.log(quizData)}
            {responseCode > 0 && <h1>Oops, looks like we don't have this many questions in this category...</h1>}
            {responseCode === 0 && (
            <>
            <h1>Go baby</h1>
            <ul>
                {quiz.map((el, i)=> <li key={i}>{
                el.question.replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/&shy;/g, "-")
               
                }</li>)}
            </ul>
            </>)}
        </>
    )
}

export default Quiz