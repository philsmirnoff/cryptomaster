import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'

function Trivia({data, setStop, questionNumber, setQuestionNumber}) {
  const [question, setQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [className, setClassName] = useState("answer");

  // fetching data from data.js
  useEffect(() => {
    setQuestion(data[questionNumber - 1])
  }, [data, questionNumber]);

  const delay = (duration, callback) => {
    setTimeout(() => {
      callback();
    }, duration);
  }

  const handleClick = (a) => {
    setSelectedAnswer(a);
    setClassName("answer active");
    delay(2000, () =>
        setClassName(a.correct ? "answer correct" : "answer wrong")
        );
   delay(4000, () => {
     if (a.correct) {
       setQuestionNumber((prev) => prev + 1);
       setSelectedAnswer(null);
     } else {
       setStop(true);
     }
   })
  }

  return (
    <div className="trivia">
      <div className="question">{question?.question}</div>
      <div className="answers">
        {question?.answers.map((a) => (
         <div className={selectedAnswer === a ? className : "answer"} onClick={() => handleClick(a)}>
         {a.text}
         </div>))}
         </div>
      </div>
  )
}

export default Trivia
