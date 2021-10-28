import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { useHistory } from "react-router";
import Rough from "./QuestionContainer";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
var socket = io("ws://13.233.83.134:8080/", { transports: ["websocket"] });

// setInterval(() => {
//   const start = Date.now();
//   socket.emit("ping", () => {
//     console.log(`pong (latency: ${Date.now() - start} ms)`);
//   });
// }, 1000);
function Live() {
  let { quizId } = useParams();
  const history = useHistory();
  const { user } = useContext(AuthContext);
  console.log(user.user._id);
  // setQuestionIdx={setQuestionIdx}
  //           question={questions[questionIdx]}
  //           ResultId={resultId}
  //           questionIdx={questionIdx}

  //   userId, roomId, answer, questionId
  const [question, setQuestion] = useState();
  const [changeQuestion, setchangeQuestion] = useState(0);
  socket.on("connect", () => {
    console.log("connected");
    socket.emit("joinRoom", {
      userId: user?.user._id,
      roomId: quizId,
    });
    socket.on("startQuiz", (questionData) => {
      console.log(questionData[0].question.content);
      setQuestion(questionData[0].question);
    });
  });

  //   useEffect(() => {
  //     socket.on("startQuiz", (questionData) => {
  //       console.log(questionData[0].question);
  //       setQuestion(questionData[0].question);
  //     });
  //   }, []);
  //   socket.on("disconnect", function () {
  //     console.log("Got disconnect!");
  //   });
  const handleDisconnect = () => {
    socket.emit("end", function () {
      console.log("disconnected");
      socket.disconnect(true);
    });
    //history.push("/");
  };

  console.log("live");
  return (
    <>
      {question ? (
        <Rough
          setNextQues="false"
          setQuestionIdx={0}
          question={question}
          ResultId="22"
          questionIdx={0}
          setchangeQuestion={setchangeQuestion}
        />
      ) : (
        ""
      )}
      <div className="final__entry">
        <h2 className="final__entry__title">
          Final Entry:
          <span style={{ color: "var(--red)", fontFamily: "Paytone One" }}>
            60m 00s
          </span>
        </h2>
        <hr style={{ width: "80%", margin: " 2% auto" }} />
        <div className="description__btns">
          <h4>Entry Fee:0 tokens</h4>
          <h4>Prize Pool:€25.00</h4>
          <h4>Questions:10</h4>
          <h4>Global Plays:225</h4>
          <h4>Max Plays per Player:7</h4>
          <h4>Free Plays: 7</h4>
        </div>
        <h3 className="game__text" style={{ color: "var(--dark)" }}>
          A 10 question quiz on the films of The Hobbit. Top 10 players split
          the prize pool.
        </h3>
        <div className="final__entry__btns">
          <button>View Prize Split</button>
          <button>Share quiz</button>
          <button
            className="submmit"
            variant="outlined"
            onClick={handleDisconnect}
          >
            {" "}
            Quit Game
            {/* <a
              className="final__entry__btns"
              style={{ textDecoration: "none", color: "var(--light)" }}
              href="/quiz/fetch/live"
            ></a> */}
          </button>
          {/* <a href="/quiz/fetch/live">end</a> */}
        </div>
      </div>
    </>
  );
}

export default Live;
