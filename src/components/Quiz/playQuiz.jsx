import React, { useState, useEffect } from "react"
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material"
import axios from "axios"
import { useParams } from "react-router-dom"
import { useHistory } from "react-router"
import Leaderboard from "../LeaderBoard/LeaderBoard"
import Rough from "./QuestionContainer"
import { AuthContext } from "../../Context/AuthContext"
import { useContext } from "react"
import { LocalConvenienceStoreOutlined } from "@material-ui/icons"
function PlayQuiz() {
  const { user } = useContext(AuthContext)
  console.log(user.token)
  let { quizId } = useParams()
  const history = useHistory()
  const [open, setOpen] = useState(false)

  const handleClickOpen = async () => {
    const URL = `http://13.233.83.134:8010/quiz/end?resultId=${resultId}`
    try {
      const response = await fetch(URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
      })
      const res = await response.json()
      console.log(res)
      setResult(res.data)
      setEnded(true)
    } catch (error) {
      console.log(error)
    }
    setOpen(true)
  }

  const handleClose = () => {
    history.push("/")
    setOpen(false)
  }

  const [start, setStart] = useState(false)
  const [questionIdx, setQuestionIdx] = useState(0)
  const [questions, setQuestions] = useState([])
  const [resultId, setResultId] = useState()
  const [result, setResult] = useState(null)
  const [end, setEnded] = useState(false)

  const handleEnd = async () => {
    const URL = ` http://13.233.83.134:8010/quiz/end?resultId=${resultId}`
    try {
      const res = await fetch(URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
      })
      const response = await res.json()
      setResult(response.data)
      setEnded(true)
    } catch (error) {
      console.log(error)
    }
  }

  // const Fetch = async () => {
  //   const res = await fetch(
  //     `${USER_SERVER}/quiz/register?apiKey=93183bfbec25fe370ee6d69163ca9f1b5c1d57ed1352261007c35c63d32a8e43&quizId=${quizId}`,
  //     {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${user?.token}`,
  //       },
  //     }
  //   )
  //   const response = await res.json()
  //   console.log(response)
  // }
  // Fetch()

  useEffect(() => {
    const handleStart = async () => {
      const URL = ` http://13.233.83.134:8010/quiz/start?quizId=${quizId}`

      try {
        const response = await fetch(URL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
        })
        const res = await response.json()
        console.log(res)
        console.log("startdata")
        console.log(res.payload.data.questions)
        const Questions = res?.payload?.data?.questions
        const ResultId = res?.payload?.data?.resultId

        setQuestions(Questions)
        setStart(true)
        setResultId(ResultId)
      } catch (error) {
        console.log(error)
      }
    }

    handleStart()
  }, [])

  return (
    <>
      <div className="" style={{ display: "flex", flexDirection: "column" }}>
        <div>
          {questionIdx < 10 ? (
            <Rough
              setQuestionIdx={setQuestionIdx}
              question={questions[questionIdx]}
              ResultId={resultId}
              questionIdx={questionIdx}
              setNextQues={true}
            />
          ) : null}
        </div>
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
              onClick={handleClickOpen}
            >
              Quit Game
            </button>
          </div>
        </div>
      </div>
      <Leaderboard id={quizId} />
      {end ? (
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Your result of the quiz is  "}
          </DialogTitle>
          <DialogContent style={{ height: "400px", width: "400px" }}>
            <DialogContentText id="alert-dialog-description">
              {/* <p>Correct Answered : {result.payload.countCorrect}</p>
              <p>Total Question : {result.payload.maxQuestions}</p>
              <p>Your Score : {result.payload.score}</p> */}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} autoFocus>
              OK
            </Button>
          </DialogActions>
        </Dialog>
      ) : null}
    </>
  )
}

export default PlayQuiz
