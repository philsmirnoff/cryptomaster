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

  const handleClick = (a) => {
    setSelectedAnswer(a);
    setClassName("answer active");
    setTimeout(() => {
        setClassName(a.correct ? "answer correct" : "answer wrong");
    }, 3000);
  };

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
