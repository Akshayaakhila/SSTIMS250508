import React, { useState, useRef, useEffect } from 'react'
import './Quiz.css'
import { data } from '../../assets/data';

const Quiz = () => {
    const[currentQuestion, setCurrentQuestion] = useState(0);
    const [timeLeft, setTimeLeft] = useState(15);
    const[score, setScore] = useState(0);
    const[showResult, setShowResult] = useState(false);
    
    let [index,setIndex] = useState(0);
    let [question,setQuestion] = useState(data[0]);
    let [lock,setLock] =useState(false);
    let [result,setResult] = useState(false);

    let option1 = useRef(null);
    let option2 = useRef(null);
    let option3 = useRef(null);
    let option4 = useRef(null);

     let option_array = [option1,option2,option3,option4];

    useEffect(() => {
        if (timeLeft === 0) {
            next();
            return;
        }

        const timer = setTimeout(()=>
            setTimeLeft(timeLeft-1),1000);
            return ()=> clearTimeout(timer);
    },[timeLeft]);

    // const handleAnswerClick = option => {
    //     if (option === question[currentQuestion].answer){
    //         setScore(score = 1);
    //     }
    //     handleNextQuestion();
    // }

    // const handleNextQuestion = () => {
    //     if (currentQuestion = 1 < questions.length) {
    //         setCurrentQuestion(currentQuestion + 1);
    //         setTimeLeft(15);
    //     }else{
    //         setShowResult(true);
    //     }
    // };    

    const checkAns = (e,ans) => {
        if (!lock) {
            if (question.ans===ans) {
                e.target.classList.add("correct");
                setLock(true);
                setScore(prev=>prev+1);
            }
            else{
                 e.target.classList.add("wrong"); 
                 setLock(true);
                 option_array[question.ans-1].current.classList.add("correct");
            }
        }
    }

    const next = () => {
        if(lock) {
            if (index === data.length -1){
                setResult(true);
                return;
            }
            const nextIndex=index+1;
            setIndex(nextIndex);
            setQuestion(data[nextIndex]);
            setLock(false);
            setTimeLeft(15);
            option_array.forEach((option)=>{
                option.current.classList.remove("correct");
                option.current.classList.remove("wrong");
                // return null;
            });
        }
    };

    const reset = () => {
        setIndex(0);
        setQuestion(data[0]);
        setScore(0);
        setLock(false);
        setResult(false);
        setTimeLeft(15);
    }

  return (
    <div className='container'>
      <h1>Quiz App</h1>
      <hr />
      {!result?(<>
      <h2>{index+1}. {question.question}</h2>
      <ul>
        <li ref={option1} onClick={(e)=>{checkAns(e,1)}}>{question.option1}</li>
        <li ref={option2} onClick={(e)=>{checkAns(e,2)}}>{question.option2}</li>
        <li ref={option3} onClick={(e)=>{checkAns(e,3)}}>{question.option3}</li>
        <li ref={option4} onClick={(e)=>{checkAns(e,4)}}>{question.option4}</li>
      </ul>
      {/* <button key={index} onClick={() => handleAnswerClick(option)}></button> */}
      <button onClick={next}>Next</button>
      <p>Time left: {timeLeft} seconds</p>
      <div className="index">{index+1} of {data.length} questions</div>
      </>):(
      <>
      <h2>You Scored {score} out of {data.length}</h2>
      <button onClick={reset}>Reset</button>
      </>)}
      
      </div>
  );
};

export default Quiz;