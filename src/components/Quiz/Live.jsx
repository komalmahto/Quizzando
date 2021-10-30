import React, { useState, useEffect } from "react"
import io from "socket.io-client"
import { useHistory } from "react-router"
import Rough from "./QuestionContainer"
import { useParams } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../../Context/AuthContext"

var socket = io("ws://13.233.83.134:8080/", {
  transports: ["websocket"],
})

function Live() {
  let { quizId } = useParams()
  const history = useHistory()
  const { user } = useContext(AuthContext)
  console.log(user.user._id)
  // setQuestionIdx={setQuestionIdx}
  //           question={questions[questionIdx]}
  //           ResultId={resultId}
  //           questionIdx={questionIdx}

  //   userId, roomId, answer, questionId

  // export const socketServer = async (io:any) => {
  //   io.on("connection", (socket: Socket) => {
  //       console.log("a user connected");
  //       let task: any;
  //       let questionCounter = 0;
  //       let totalQuestion = 25;
  //       socket.on("message", msg => {
  //         io.emit('welcome', "welcome to the live quiz");
  //       });

  //     socket.on('joinRoom', async ({ userId, roomId }) => {
  //       console.log(userId, roomId);
  //       const user = await liveQuizModel.joinRoom(socket.id, userId, roomId);

  //       totalQuestion = await liveQuizModel.getQuestionCount(roomId, userId);
  //       // connecting user to roomId
  //       console.log(totalQuestion);
  //       console.log(roomId);
  //       socket.join(roomId);

  //       const liveQuiz = await liveQuizModel.getLiveQuiz(roomId);
  //       console.log(liveQuiz);
  //       io.to(user.roomId).emit("totalPlayers", `${liveQuiz.users.length}`);

  //       if (liveQuiz.users.length == 1) {
  //           task = schedule('* * * * *', async () => {
  //             if (questionCounter == totalQuestion) {
  //               task.stop();
  //               const data = await liveQuizModel.endQuiz(roomId);
  //               io.to(roomId).emit("endQuiz", data);
  //               const transaction = await liveQuizModel.addToWallet(roomId);
  //               console.log(transaction);
  //             } else {
  //               console.log(questionCounter, roomId);
  //               const quesion = await liveQuizModel.getQuestions(roomId);
  //               io.to(roomId).emit("startQuiz", quesion);
  //               questionCounter++;
  //             }
  //           });
  //       }
  //     });

  //       socket.on('submitAnswer', async ({ userId, roomId, answer, questionId }) => {
  //         const data = await liveQuizModel.resultCalc(questionId, answer, userId, roomId);
  //         socket.to(roomId).emit("submitAnswerResponse", data);
  //       });

  //     socket.on('end', async function () {
  //       const user = await liveQuizModel.getUser(socket.id);
  //         task.stop();
  //         io.to(user.roomId).emit("userLeft",`user has left the chat`);
  //         socket.disconnect(true);
  //       });
  //     });
  // }
  const [question, setQuestion] = useState()
  const [changeQuestion, setchangeQuestion] = useState(0)
  const [connected, setConnected] = useState(false)
  const [correct, setCorrect] = useState("")
  const [newQuestion, setNewQuestion] = useState(false)
  const [quesId, setQuesId] = useState("")

  //const [num, setNum] = useState()
  let num
  useEffect(() => {
    const eventHandler = () => {
      console.log("aya event")
      setConnected(true)
    }
    socket.on("message", (data) => {
      num = data
      console.log(num)
    })

    socket.off("joinRoom").emit("joinRoom", {
      userId: user?.user._id,
      roomId: quizId,
    })
    socket.off("startQuiz").on("startQuiz", async (questionData) => {
      setCorrect(questionData[0].question.answer)
      setQuestion(questionData[0].question)
      console.log(questionData[0].question)
      if (question?._id !== quesId) {
        setQuesId(question?._id)
        setNewQuestion(true)
      }
    })
    socket.off("totalPlayers").on("totalPlayers", async (data) => {
      console.log(data)
    })

    return () => {
      socket.off("message")
    }
  }, [])

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
    history.push("/")
    socket.emit("end", function () {
      console.log("disconnected")
      socket.disconnect(true)
    })
    //history.push("/");
  }

  console.log("live")

  return (
    <>
      {
        <>
          <Rough
            setNextQues="false"
            setQuestionIdx={0}
            question={question}
            ResultId="22"
            questionIdx={0}
            setchangeQuestion={setchangeQuestion}
            socket={socket}
            correctOption={correct}
            showLoader={newQuestion}
            setNewQuestion={setNewQuestion}
            isLive={true}
          />
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
              A 10 question quiz on the films of The Hobbit. Top 10 players
              split the prize pool.
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
              </button>
            </div>
          </div>
        </>
      }
    </>
  )
}

export default Live
