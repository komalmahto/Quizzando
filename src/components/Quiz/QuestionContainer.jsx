import React, { useState, useEffect } from "react"
import "./rough.css"
import { Button } from "@mui/material"
import { useCountUp } from "react-countup"
import music from "../../music.mp3"
import { useParams } from "react-router-dom"
import VolumeUpIcon from "@mui/icons-material/VolumeUp"
import VolumeOffIcon from "@mui/icons-material/VolumeOff"
import wrong_answer from "../../Wrong-answer.mp3"
import correct_answer from "../../Correct-answer.mp3"
import radial from "../../radial_ray2.mp4"
import { useContext } from "react"
import { AuthContext } from "../../Context/AuthContext"

let current
const useAudio = (url, userToken) => {
  const [audio] = useState(new Audio(url))
  const [playing, setPlaying] = useState(userToken)

  const toggle = () => setPlaying(!playing)

  useEffect(() => {
    playing ? audio.play() : audio.pause()
  }, [playing, audio])

  useEffect(() => {
    audio.addEventListener("ended", () => setPlaying(false))
    return () => {
      audio.removeEventListener("ended", () => setPlaying(false))
    }
  }, [audio])

  return [playing, toggle]
}

function Rough({
  question,
  questionIdx,
  setNextQues,
  socket,
  showLoader,
  setNewQuestion,
  isLive,
}) {
  console.log(question)
  const countUpRef = React.useRef(null)

  let { quizId } = useParams()
  const userToken = JSON.parse(localStorage.getItem("user")) || null
  const { user } = useContext(AuthContext)
  let userId = user?.user._id
  let roomId = quizId

  const [playing, toggle] = useAudio(music, userToken)
  const [score, setScore] = useState(0)
  const [questionRem, setQuestionRem] = useState(25)
  const [points, setPoints] = useState(0)
  const [classs, setClasss] = useState("")
  const [show, setShow] = useState(false)
  const [showNext, setNext] = useState(false)
  const [disable, setDisable] = useState(false)
  const [live, setLive] = useState(false)
  const [button, setButton] = useState({
    one: "",
    two: "",
    three: "",
    four: "",
  })

  useEffect(() => {
    if (!show && !showNext) {
      setTimeout(() => {
        setShow(true)
        if (isLive === false) update(0)
      }, 14000)
    }
  }, [])

  useEffect(() => {
    const HandleTimerLive = () => {
      if (showLoader === true) {
        update(0)
      }
    }
    HandleTimerLive()
  }, [showLoader])

  const nextLive = async (e) => {
    pauseResume()
    setClasss(null)
    setButton({ one: "", two: "", three: "", four: "" })
    setPoints(countUpRef?.current?.innerHTML)
    setShow(false)
    setDisable(false)
    setLive(true)
  }

  const handleSelectOption = async (x, type) => {
    setDisable(true)
    current = countUpRef?.current?.innerHTML
    let answer = x
    let questionId = question?._id
    console.log(question._id, x, current)

    if (setNextQues === true) {
    } else {
      console.log("data")

      socket.emit("submitAnswer", { userId, roomId, answer, questionId })

      if (question?.answer === answer) {
        setButton((prev) => ({ ...prev, [type]: "select" }))
        const audioTune = new Audio(correct_answer)
        audioTune.play()

        setScore((prev) => prev + Number(current))
        setClasss("select")
        setTimeout(() => {
          nextLive()
          setQuestionRem(25 - questionIdx - 1)
          start()
          setNewQuestion(false)
        }, 3000)
      } else {
        setButton((prev) => ({ ...prev, [type]: "wrong" }))
        const audioTune = new Audio(wrong_answer)
        audioTune.play()
        setScore((prev) => prev + 0)
        setClasss("wrong")
        setTimeout(() => {
          nextLive()
          setQuestionRem(25 - questionIdx - 1)
          start()
          setNewQuestion(false)
        }, 3000)
      }
    }
  }

  const { start, pauseResume, update } = useCountUp({
    ref: countUpRef,
    duration: 60,
    start: 10000,
    end: 10000,
  })

  return (
    <div>
      <div className="detail__question">
        <div className="detail__wrapper">
          <div className="detail__wrapper2">
            <div className="detail__wrapper3">
              {!show && !showNext && !live ? (
                <div>
                  <video controls width="100%" height="100%" autoPlay={true}>
                    <source src={radial} type="video/mp4" />
                    <source src={radial} type="video/ogg" />
                  </video>
                </div>
              ) : (
                ""
              )}
              <div className="answer__section detail__content">
                {!show && !showNext && !live ? (
                  <>
                    <div id="bounce-in" className="bounce-in">
                      <h1 className="bounce-in-text">Get Ready</h1>
                    </div>
                  </>
                ) : showNext === true || showLoader === false ? (
                  showLoader === false ? (
                    <div class="main">
                      <p
                        style={{
                          fontSize: "30px",
                          fontFamily: "Paytone One",
                          color: "var(--light)",
                        }}
                      >
                        {" "}
                        Loading Question
                      </p>
                      <div className="one_load"></div>
                      <div className="two_load"></div>
                      <div class="three_load"></div>
                    </div>
                  ) : (
                    <div id="bounce-in" className="bounce-in">
                      <h1 className="bounce-in-text">Next Question</h1>
                    </div>
                  )
                ) : showLoader === true ? (
                  <>
                    <p className="question animated dts fadeInDown">
                      <span className="classic__question">
                        {question?.content?.question}
                      </span>
                    </p>
                    <div className="question_image_container">
                      <div className="answer__container">
                        <div className={`fade-in one `} id="one">
                          <button
                            disabled={disable}
                            className={`answer_animated animated flipInX ${button.one}`}
                            value={question?.options[0]?._id}
                            key={0}
                            onClick={() => {
                              if (disable === false) {
                                pauseResume()
                                handleSelectOption(
                                  question?.options[0]._id,
                                  "one"
                                )
                              }
                            }}
                          >
                            <p className="answer_number">1</p>
                            <p
                              className={`answer__text hoverAnswer ${button.one} `}
                            >
                              <span className={`ng_content ${button.one}`}>
                                {" "}
                                {question?.options[0].text}
                              </span>
                            </p>
                          </button>
                        </div>
                        <div className={`fade-in two `} id="two">
                          <button
                            value={question?.options[1]._id}
                            key={1}
                            name="two"
                            onClick={() => {
                              if (disable === false) {
                                pauseResume()
                                handleSelectOption(
                                  question?.options[1]._id,
                                  "two"
                                )
                              }
                            }}
                            className="answer_animated animated flipInX"
                          >
                            <p className="answer_number">2</p>
                            <p
                              className={`answer__text hoverAnswer ${button.two} `}
                            >
                              <span className={`ng_content ${button.two}`}>
                                {question?.options[1].text}
                              </span>
                            </p>
                          </button>
                        </div>
                        <div className={`fade-in three `} id="three">
                          <button
                            className={`${button.three} answer_animated animated flipInX`}
                            value={question?.options[2]._id}
                            key={2}
                            onClick={() => {
                              if (disable === false) {
                                pauseResume()
                                handleSelectOption(
                                  question?.options[2]._id,
                                  "three"
                                )
                              }
                            }}
                          >
                            <p className="answer_number">3</p>
                            <p
                              className={`answer__text hoverAnswer ${button.three} `}
                            >
                              <span className={`ng_content ${button.three}`}>
                                {" "}
                                {question?.options[2].text}
                              </span>
                            </p>
                          </button>
                        </div>
                        <div className={`fade-in four `} id="four">
                          <button
                            className={`${button.four} answer_animated animated flipInX`}
                            value={question?.options[3]._id}
                            key={3}
                            name="four"
                            onClick={() => {
                              if (disable === false) {
                                pauseResume()
                                handleSelectOption(
                                  question?.options[3]._id,
                                  "four"
                                )
                              }
                            }}
                          >
                            <p className="answer_number">4</p>
                            <p
                              className={`answer__text hoverAnswer ${button.four} `}
                            >
                              <span className={`ng_content ${button.four}`}>
                                {" "}
                                {question?.options[3].text}
                              </span>
                            </p>
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                ) : null}
              </div>
            </div>
          </div>
        </div>
        <div className="wrapper_sound__on__off">
          <div className="sound__on__off">
            {playing ? <VolumeUpIcon /> : <VolumeOffIcon />}
            {toggle}
            <Button style={{ color: "var(--light)" }} onClick={toggle}>
              {playing ? "Sound on" : "Sound off"}
            </Button>
          </div>
        </div>
        <div className="quiz_landing_container">
          <div className="quiz_landing_info">
            <div className="quiz_item_info">
              <div className="inner_div">
                <div className="text_large">{score}</div>
                <div className="subtext">Your Current Score</div>
              </div>
            </div>
            <div className="quiz_item_info">
              <div className="inner_div">
                <div className="text_large">{questionRem}/25</div>
                <div className="subtext">Questions Remaining</div>
              </div>
            </div>
            <div className="quiz_item_info">
              <div className="inner_div ">
                <div ref={countUpRef} className="text_large"></div>
                <div className="subtext">Points</div>
              </div>
            </div>
            <div className="quiz_item_info">
              <div className="inner_div">
                <div className="text_large">0</div>
                <div className="subtext">Your Best Score</div>
              </div>
            </div>
            <div className="quiz_item_info">
              <div className="inner_div">
                <div className="text_large">0</div>
                <div className="subtext">LeaderBoard First Place</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Rough
