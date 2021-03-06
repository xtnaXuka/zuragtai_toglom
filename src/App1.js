import React, { useEffect, useState } from "react";
import "./App.css";
import Item from "./Components/Item";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar} from "react-bootstrap";

export default function App1() {
  const [array1, setArray1] = useState([
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "0"],
  ]);
  const [isTrue, setIsTrue] = useState(false);
  const [winPos, setWinPos] = useState();
  const [changed, setChanged] = useState(false);
  const [round, setRound] = useState(1)
  function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
  }
  const [pos, setPos] = useState();

  useEffect(() => {
    setWinPos([
      ["1", "2", "3"],
      ["4", "5", "6"],
      ["7", "8", "0"],
    ]);
    let array2 = array1.map((row) => shuffle(row));
    let shuflledArray = shuffle(array2)
    setArray1(shuflledArray);
    setPos(findZeroClicked());
    // eslint-disable-next-line
  }, []);

  function handleChange(id, rowIndex, colIndex) {
    if (validation(id, rowIndex, colIndex)) {
      let temp = array1;
      let temp1 = temp[pos[0]][pos[1]];
      temp[pos[0]][pos[1]] = temp[rowIndex][colIndex];
      temp[rowIndex][colIndex] = temp1;

      setPos([rowIndex, colIndex]);
      setArray1(temp);
      setChanged(!changed);
    }
    checkWinning();
  }

  function findZeroClicked() {
    let row = array1.length;
    let col = array1[0].length;
    for (let i = 0; i < row; i++) {
      for (let j = 0; j < col; j++) {
        if (array1[i][j] === "0") {
          return [i, j];
        }
      }
    }
  }

  function validation(id, row, col) {
    if (
      Math.abs(row - pos[0]) > 1 ||
      Math.abs(col - pos[1]) > 1 ||
      (row !== pos[0] && col !== pos[1])
    ) {
      return false;
    }
    return true;
  }

  function checkWinning() {
    for (let i = 0; i < array1.length; i++) {
      for (let j = 0; j < array1[1].length; j++) {
        if (array1[i][j] !== winPos[i][j]) {
          return false;
        }
      }
    }
    setTimeout(() => {
      alert("yalla");
      setRound(round+1)
    }, 500);
  }

  return (
    <div>
      <Navbar variant="dark" bg="dark">
        <header>
        <Navbar.Brand href="#home" className="header">Zuragtai-Togloom</Navbar.Brand>
        <Navbar.Brand href="#home" className="header">{`Round${round}`}</Navbar.Brand>

        </header>
        <Navbar.Toggle aria-controls="navbar-dark-example" />
        <Navbar.Collapse id="navbar-dark-example"></Navbar.Collapse>
      </Navbar>

      <div className="board">
        {array1.map((row, rowIndex) =>
          row.map((col, i) => (
            <Item
              key={i}
              data={col}
              rowIndex={rowIndex}
              colIndex={i}
              func={handleChange}
              round = {round}
            />
          ))
        )}
      </div>
      <img
        className="blind-img"
        onClick={() => setIsTrue(!isTrue)}
        src={`images/${isTrue ? "blind" : "view"}.png`}
        alt=""
      />

      {isTrue ? (
        <img className="game-obj" src={`images/round${round}/banner.jpg`} alt="" />
      ) : null}

      <div className="btns">
        <button onClick={()=>setRound(round-1)}>Back</button>
        <button onClick={()=>setRound(round+1)}>Skip</button>
      </div>
    </div>
  );
}
