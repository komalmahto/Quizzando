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
  const [question, setQuestion] = useState()
  const [newQuestion, setNewQuestion] = useState(false)
  const [quesId, setQuesId] = useState("")

  console.log(user.user._id)
  useEffect(() => {
    socket.off("joinRoom").emit("joinRoom", {
      userId: user?.user._id,
      roomId: quizId,
    })
    socket.off("startQuiz").on("startQuiz", async (questionData) => {
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

  const handleDisconnect = () => {
    history.push("/")
    socket.emit("end", function () {
      console.log("disconnected")
      socket.disconnect(true)
    })
  }

  console.log("live")

  return (
    <>
      {
        <>
          <Rough
            question={question}
            questionIdx={0}
            setNextQues="false"
            socket={socket}
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
