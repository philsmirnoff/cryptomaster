import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'

function Trivia({data, setTimeOut, questionNumber, setQuestionNumber}) {
  const [question, setQuestion] = useState(null);

  // fetching data from data.js
  useEffect(() => {
    setQuestion(data[questionNumber - 1])
  }, [data, questionNumber]);
  return (
    <div className="trivia">
      <div className="question">{question?.question}</div>
      <div className="answers">
        {question?.answers.map((answer) => (
         <div className="answer">{answer.text}</div>))}
         </div>
      </div>
  )
}

export default Trivia
