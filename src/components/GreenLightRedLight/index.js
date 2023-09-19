import React, { useState, useEffect } from 'react';
import './index.css';

const GreenLightRedLight = () => {
  const [color, setColor] = useState('');
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0); 
  const [gameStarted, setGameStarted] = useState(false);
  const [clickEnabled, setClickEnabled] = useState(false);
  const [user, setUser] = useState({
    name: '',
    email: '',
    mobile: '',
    difficulty: 'Easy', 
  });

  const arr = ['green', 'red'];

  
  function randomColor() {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  
  function updateColor() {
    setColor(randomColor());
  }

  let timer;

  useEffect(() => {
   
    if (user.difficulty === 'Easy') {
      setTimerSeconds(40);
    } else if (user.difficulty === 'Medium') {
      setTimerSeconds(40);
    } else if (user.difficulty === 'Hard') {
      setTimerSeconds(40);
    }
  }, [user.difficulty]);

  useEffect(() => {
    
    if (gameStarted) {
      updateColor(); 
      timer = setInterval(updateColor, 1000 + Math.random() * 1000);
    }

    
    const countdown = setInterval(() => {
      if (gameStarted && timerSeconds > 0 && !gameOver) {
        setTimerSeconds((prevSeconds) => prevSeconds - 1);
      }
    }, 1000);

     
    return () => {
      clearInterval(timer);
      clearInterval(countdown);
    };
  }, [gameStarted, timerSeconds, gameOver]);

  useEffect(() => {
    if (timerSeconds === 0) {
      setGameOver(true);
      setClickEnabled(false); 
      clearInterval(timer);
    }
  }, [timerSeconds]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const startGame = () => {
    setGameStarted(true);
    setClickEnabled(true);
    setScore(0); 
    setWin(false);
    setGameOver(false);
  };

  const colorshandler = (e) => {
    if (clickEnabled) {
      if (e.target.id === 'green') {
        setScore((prevScore) => prevScore + 1);

        if (score + 1 === getWinningScore()) {
          setWin(true);
          setClickEnabled(false); 
          clearInterval(timer);
        }
      } else if (e.target.id === 'red' || timerSeconds === 0) {
        setGameOver(true);
        setClickEnabled(false);
        clearInterval(timer);
      }
    }
  };

  const getWinningScore = () => {
   
    if (user.difficulty === 'Easy') {
      return 10;
    } else if (user.difficulty === 'Medium') {
      return 15;
    } else if (user.difficulty === 'Hard') {
      return 25;
    }
  };

  return (
    <div>
      {!gameStarted ? (
        <div className='form-container'>
          <h2 style={{textAlign:"center",color:"#ffff",fontSize:'25px'}}>User Registration</h2>
          <form>
            <div>
              <label>Name:</label><br/>
              <input type="text" name="name" value={user.name} onChange={handleInputChange} placeholder='Enter your Name' />
            </div>
            <div>
              <label>Email:</label><br/>
              <input type="text" name="email" value={user.email} onChange={handleInputChange}  placeholder='Enter your Email' />
            </div>
            <div>
              <label>Mobile Number:</label><br/>
              <input type="text" name="mobile" value={user.mobile} onChange={handleInputChange}  placeholder='Enter your Number' />
            </div>
            <div>
              <label>Difficulty Level:</label>
              <select name="difficulty" value={user.difficulty} onChange={handleInputChange}>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
            <div className='form-button'>
            <button onClick={startGame} >Start Game</button>

            </div>
            
          </form>
        </div>
      ) : (
        <div>
          {(timerSeconds === 0 || gameOver) && !win && <div className='game-over-container'> Game Over!</div>}
          {win && <div className='game-win'>You Win!</div>}
          {(!gameOver && !win) && color && <div className={color} id={color} onClick={colorshandler}></div>}
          <div>Score: {score}</div>
          {(!gameOver && !win) && <div>Time Left: {timerSeconds} seconds</div>}
          <div>Clicks Required (n): {getWinningScore()}</div>
          {(gameOver || win) && <button onClick={startGame} className='restart-button'>Restart Game</button>}
        </div>
      )}
    </div>
  );
};

export default GreenLightRedLight;
