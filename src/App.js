import './App.css';
import {useEffect, useState} from "react";
import useEvent from "./hooks/useWindowEvent";
import Popup from "./components/Popup";
import ChangeLevel from "./components/ChangeLevel";

function App() {
  const [board, setBoard] = useState([])
  const [snake, setSnake] = useState([0,1,2])
  const [cookie, setCookie] = useState(null)
  const [currentArrowClick, setCurrentArrowClick] = useState(null)
  const [intervalId, setIntervalId] = useState(null)
  const [gameLost, setGameLost] = useState(false)
  const [speed, setSpeed] = useState(50)
  const [points, setPoints] = useState(0)

  useEvent("keydown", (e)=>handleArrowClick(e))

  //update board whenever snake array changes (every 0.2s)
  useEffect(()=>{
    setBoard((prev)=>{
      return prev.map((el)=>{
        if (snake.includes(el.id)){
          return {...el, snake: true}
        }else return  {...el, snake:false}
      })
    })
  },[snake])

  //handle game lost - when snake hits its own tail
      useEffect(()=>{
        snake.some(element => {
          if (snake.indexOf(element) !== snake.lastIndexOf(element)) {
            if (!gameLost){
              setGameLost(true)
              clearInterval(intervalId)

            }
          }
      },[snake])})


  //handle cookie eat
  useEffect(()=>{

    if (snake[snake.length-1]===cookie){
    setPoints((prevState)=> {
      console.log(prevState, prevState++)
      return prevState++
    } )


      let newCookieId = Math.floor(Math.random()*400)
      while(snake.includes(newCookieId)){
        newCookieId = Math.floor(Math.random()*400)
        console.log("cookie in the nail")
      }
      setCookie(newCookieId)
      setBoard((prev)=>{
        return prev.map((el)=>{
          if (el.id===newCookieId){
            return {...el, cookie: true}
          }else return  {...el, cookie: false}
        })
      })
    }
  },[snake])

  //initialize game
  useEffect(()=>{
    initializeGame()
  },[])
  
  const chooseLevel = (level) => {
    if (level === "easy"){
      setSpeed(200)
    }
    if (level === "medium"){
      setSpeed(90)
    }
    if (level === "hard"){
      setSpeed(60)

    }
    if (level === "extreme"){
      setSpeed(25)
    }
  }

  const initializeGame = () => {
    setPoints(0)
    setSnake([0,1])
    setGameLost(false)
    setCurrentArrowClick(null)



    //create cookie
    let cookie = Math.floor(Math.random()*400)
    setCookie(cookie)



    //create board
    let board = []
    for (let i = 0; i < 400; i++) {
      board.push({
        id: i,
        snake: snake.includes(i),
        cookie: cookie === i
      })
    }
    setBoard(board)
  }

  const handleArrowClick = (e) => {
    //game is  over
    if (gameLost){
      return;
    }

    //make sure user clicks arrows

    if (e.key !== "ArrowDown"
    && e.key !=="ArrowUp"
    && e.key !=="ArrowLeft"
    && e.key !=="ArrowRight"
    )return;

    //make sure user does not click the same arrow more than once in a row
    if (currentArrowClick && e.key === currentArrowClick)return;
    setCurrentArrowClick(e.key)

    //make sure user cant go opposite direction - if snake is going up, it cannot go down etc
    if ((currentArrowClick === "ArrowDown" && e.key === "ArrowUp") ||
        (currentArrowClick === "ArrowUp" && e.key === "ArrowDown")||
        (currentArrowClick === "ArrowLeft" && e.key === "ArrowRight") ||
        ( currentArrowClick === "ArrowRight" && e.key === "ArrowLeft")){
      return;
    }


    //clear interval id so snake can move i different direction
    if (intervalId){
      clearInterval(intervalId)
    }


  //move the snake

    //Arrow Down
    if (e.key === "ArrowDown"){
      const moveDown = () => {
        setSnake((prevState)=>{
          let snakeArray = [...prevState]
          //if below handles cookie eat. when snakes it the cookie, we dont remove the last element of the snake
         if (snakeArray[snakeArray.length-1]!==cookie){
           snakeArray.shift()
         }
          if (snakeArray[snakeArray.length-1] < 380){
            snakeArray.push(snakeArray[snakeArray.length-1]+20)
          }else {
            snakeArray.push(snakeArray[snakeArray.length-1]-380)
          }
          return snakeArray
        })
      }
      moveDown()
     let iId =  setInterval(()=>{
       moveDown()
      },speed)
      setIntervalId(iId)
    }

    //Arrow Up
    if (e.key === "ArrowUp"){
      const moveUp = () => {
        setSnake((prevState)=>{
          let snakeArray = [...prevState]
          //if below handles cookie eat. when snakes it the cookie, we dont remove the last element of the snake
          if (snakeArray[snakeArray.length-1]!==cookie){
            snakeArray.shift()
          }
          if (snakeArray[snakeArray.length-1] > 20){
            snakeArray.push(snakeArray[snakeArray.length-1]-20)
          }else {
            snakeArray.push(snakeArray[snakeArray.length-1]+380)
          }
          return snakeArray
        })
      }
      moveUp()
      let iId =  setInterval(()=>{
        moveUp()
      },speed)
      setIntervalId(iId)
    }

    //Arrow Left
    if (e.key === "ArrowLeft"){
      const moveLeft = () => {
        setSnake((prevState)=>{
          let snakeArray = [...prevState]
          //if below handles cookie eat. when snakes it the cookie, we dont remove the last element of the snake
          if (snakeArray[snakeArray.length-1]!==cookie){
            snakeArray.shift()
          }
          if (snakeArray[snakeArray.length-1]%20!==0){
            snakeArray.push(snakeArray[snakeArray.length-1]-1)
          }else {
            snakeArray.push(snakeArray[snakeArray.length-1]+19)
          }
          return snakeArray
        })
      }
      moveLeft()
      let iId =  setInterval(()=>{
        moveLeft()
      },speed)
      setIntervalId(iId)
    }

    //Arrow Right
    if (e.key === "ArrowRight"){
      const moveRight = () => {
        setSnake((prevState)=>{
          let snakeArray = [...prevState]
          //"if" below handles cookie being eaten. When snake ate the cookie, we don't remove the last element of the snake
          if (snakeArray[snakeArray.length-1]!==cookie){
            snakeArray.shift()
          }
          if ((snakeArray[snakeArray.length-1]+1)%20!==0){
            snakeArray.push(snakeArray[snakeArray.length-1]+1)
          }else {
            snakeArray.push(snakeArray[snakeArray.length-1]-19)
          }
          return snakeArray
        })
      }
      moveRight()
      let iId =  setInterval(()=>{
        moveRight()
      },speed)
      setIntervalId(iId)
    }
  }

  return (
    <div className="App">
      <h2>Points: {points}</h2>
      <ChangeLevel chooseLevel={chooseLevel}/>
      <div className="board">
        {board.length > 0 && board.map((el)=>{
          return <div className={`element ${el.cookie ? "cookie": ""} ${el.snake ? "snake" : ""}`} key={el.id}></div>
        })}
      </div>
      {gameLost && <Popup handleNewGame={initializeGame}/>}
    </div>
  );
}

export default App;
