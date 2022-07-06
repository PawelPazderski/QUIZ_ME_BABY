import React, {useState} from 'react'

const Result = ({record, score, length, endQuiz}) => {

    const [details, setDetails] = useState(false)

    // console.log(record)

    const showDetails = () => {
        setDetails(true)
    }

    return (
        <>
        <div className="quiz-results">
            <h1>Your result - {score} / {length}</h1>
            <br />
            {details && (
                <>
                    <div className="quiz-list">
                        <ul>
                            {record.map((el, i) => <li key={i}>
                                <h3>{el.question.replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/&shy;/g, "-").replace(/&oacute;/g, "ó").replace(/&iacute;/g,"í")}</h3>
                                {el.answers.map((el, i) => <p key={i}>{el}</p>)}
                                <div className="answers-check" style={(el.selected === el.correct) ? {border:"1px solid green"} : {border:"1px solid red"}}>
                                    <div><p className="correct-answer">Correct answer: {el.correct.replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/&shy;/g, "-").replace(/&amp;/g, "&")}</p></div>
                                    <div><p>Your answer: {el.selected != undefined ? el.selected.replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/&shy;/g, "-").replace(/&amp;/g, "&") : "You didn't choose any.."}</p></div>
                                </div>
                                <br/>
                            </li>)}
                        </ul>

                    </div>
                </>
            )}
            <div style={{marginTop:"1rem"}}>
                <button className="btn-primary" onClick={showDetails}>Details</button>
                <button className="btn-primary" onClick={endQuiz}>Back</button>
            </div>
        </div>
        </>
    )
}

export default Result