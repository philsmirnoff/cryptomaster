import React from 'react'
import { useState, useEffect } from 'react'

function Timer() {
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
  })

  return timer;
}

export default Timer
