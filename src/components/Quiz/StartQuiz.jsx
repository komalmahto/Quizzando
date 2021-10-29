import React, { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { connect, useSelector } from "react-redux"
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite"
import "./StartQuiz.css"
import Leaderboard from "../LeaderBoard/LeaderBoard"
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material"
function StartQuiz(props) {
  let { quizId } = useParams()

  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  useEffect(() => {}, [])

  return (
    <div>
      <div className="outer_game_div"></div>
      <div
        className="game__info"
        style={{
          backgroundColor: "#025955",
        }}
      >
        <div className="current__prize">
          <h5>Current Prize</h5>
          <h1>€25.00!</h1>
        </div>
        <h2 className="header_bought">Brought to you by...</h2>

        <div className="">
          <div className="image-outer">
            <div className="quizando__logo__img"></div>

            <div className="quizando__text">
              <span>Quizando</span>
            </div>
          </div>
        </div>

        {props.freeQuiz === "true" && props.freeQuiz === "true" ? (
          <Link
            to={`/playQuiz/live/${quizId}`}
            style={{ textDecoration: "none" }}
          >
            <button className="play_quiz_button">
              <span className="">
                <PlayCircleFilledWhiteIcon
                  style={{
                    width: "57px",
                    height: "57px",
                    backgroundPosition: "56px 56px",

                    display: "inline-block",
                    marginRight: "10px",
                    verticalAlign: "middle",
                  }}
                  className="icon_button_play_quiz"
                />
              </span>
              <span className="text_play_quiz">
                Play Quiz!{" "}
                <span className="text_token_play_quiz">No Tokens Needed</span>
              </span>
            </button>
          </Link>
        ) : props.freeQuiz === "true" ? (
          <Link
            to={`/playQuiz/free/${quizId}`}
            style={{ textDecoration: "none" }}
          >
            <button className="play_quiz_button">
              <span className="">
                <PlayCircleFilledWhiteIcon
                  style={{
                    width: "57px",
                    height: "57px",
                    backgroundPosition: "56px 56px",

                    display: "inline-block",
                    marginRight: "10px",
                    verticalAlign: "middle",
                  }}
                  className="icon_button_play_quiz"
                />
              </span>
              <span className="text_play_quiz">
                Play Quiz!{" "}
                <span className="text_token_play_quiz">No Tokens Needed</span>
              </span>
            </button>
          </Link>
        ) : (
          <Link
            to={`/playQuiz/classic/confirm/${quizId}`}
            style={{ textDecoration: "none" }}
          >
            <button className="play_quiz_button">
              <span className="">
                <PlayCircleFilledWhiteIcon
                  style={{
                    width: "57px",
                    height: "57px",
                    backgroundPosition: "56px 56px",

                    display: "inline-block",
                    marginRight: "10px",
                    verticalAlign: "middle",
                  }}
                  className="icon_button_play_quiz"
                />
              </span>
              <span className="text_play_quiz">
                Play Quiz!{" "}
                <span className="text_token_play_quiz">No Tokens Needed</span>
              </span>
            </button>
          </Link>
        )}

        {/* <Link to="/playQuiz" style={{ textDecoration: "none" }}>
          <div id="play__quiz">
            <h1>Play Quiz!</h1>
            <p>No Tokens Needed!</p>
          </div>
        </Link> */}
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
        <h3 className="game__text" style={{ color: "black" }}>
          Lara Croft, Solid Snake, Pacman, and more are in this 10 question quiz
          on video game characters. The top 10 players split the prize pool.
        </h3>
        <div className="final__entry__btns">
          <button>View Prize Split</button>
          <button>Share quiz</button>
          <button>
            {" "}
            <PlayCircleFilledWhiteIcon
              style={{
                width: "30px",
                height: "30px",
                backgroundPosition: "56px 56px",

                display: "inline-block",
                marginRight: "10px",
                verticalAlign: "middle",
              }}
            />
            Play Quiz!
          </button>
        </div>
      </div>
      {props.freeQuiz === "true" && props.freeQuiz === "true" ? (
        ""
      ) : (
        <>
          <Leaderboard id={quizId} />

          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Your result of tthe quiz is  "}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                <p>Correct Answered : </p>
                <p>Total Question : </p>
                <p>Your Score : </p>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} autoFocus>
                OK
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </div>
  )
}

export default StartQuiz
