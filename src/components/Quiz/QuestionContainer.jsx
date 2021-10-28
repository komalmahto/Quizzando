import React, { useState, useEffect } from "react"
import "./rough.css"
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Button,
} from "@mui/material"
import CountUp, { useCountUp } from "react-countup"
import music from "../../music.mp3"
import { Link, useParams } from "react-router-dom"
import VolumeUpIcon from "@mui/icons-material/VolumeUp"
import VolumeOffIcon from "@mui/icons-material/VolumeOff"
import wrong_answer from "../../Wrong-answer.mp3"
import correct_answer from "../../Correct-answer.mp3"
import axios from "axios"
import radial from "../../radial_ray2.mp4"
import NavigateNextIcon from "@mui/icons-material/NavigateNext"
import { useContext } from "react"
import { AuthContext } from "../../Context/AuthContext"
import io from "socket.io-client"
var socket = io("ws://13.233.83.134:8080/", { transports: ["websocket"] })

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
  ResultId,
  setQuestionIdx,
  questionIdx,
  setNextQues,
  setchangeQuestion,
}) {
  const countUpRef = React.useRef(null)

  console.log(countUpRef?.current?.innerHTML)
  let { quizId } = useParams()
  const userToken = JSON.parse(localStorage.getItem("user")) || null
  const { user } = useContext(AuthContext)
  //console.log(user.user._id);
  const [playing, toggle] = useAudio(music, userToken)
  const [color, setColor] = useState(false)
  const [check, setcheck] = useState(-1)
  const [score, setScore] = useState(0)
  const [questionRem, setQuestionRem] = useState(25)
  const [timer, setTimer] = useState(10000)
  const [points, setPoints] = useState(0)
  const [load, setLoad] = useState(null)
  const [selected, setSelected] = useState(null)
  const [classs, setClasss] = useState("")
  const [show, setShow] = useState(false)
  const [showNext, setNext] = useState(false)
  // const [userId, setuserId] = useState(null);
  // const [questionId, setQuestionId] = useState(null);
  const [correctOption, setCorrectOption] = useState(null)
  const [button, setButton] = useState({
    one: "",
    two: "",
    three: "",
    four: "",
  })
  if (!show && !showNext) {
    setTimeout(function () {
      setShow(true)
    }, 14000)
  }
  if (showNext) {
    setTimeout(function () {
      setNext(false)
      setShow(true)
    }, 3000)
  }
  let userId = user?.user._id
  let roomId = quizId
  useEffect(() => {})
  // useEffect(() => {
  //   if (showNext === true || show) {
  //     setTimeout(() => {
  //       if (timer > 0) setTimer(timer - 1);
  //     }, 100);
  //   }
  // }, [show, timer, showNext]);

  const next = async (e) => {
    setTimer(11500)
    //e.preventDefault();
    setSelected(null)
    setClasss(null)
    setButton({ one: "", two: "", three: "", four: "" })
    setQuestionIdx((prev) => ++prev)

    setPoints(countUpRef?.current?.innerHTML)
    setShow(false)
    setNext(true)
  }

  const handleSelectOption = async (x, type) => {
    console.log(countUpRef?.current?.innerHTML)
    let answer = x
    let questionId = question?._id
    let URL
    if (setNextQues === true) {
      URL = `http://13.233.83.134:8010/common/quiz/submitAnswer?resultId=${ResultId}&quesId=${question._id}&answer=${x}&score=${points}`

      try {
        const res = await axios.post(URL)
        setCorrectOption(res.data.payload.correctOption)
        setSelected(x)
        //console.log(res.data);
        //console.log(x);
        //console.log(res.data.payload.correctOption);
        //console.log(res.data.payload.isCorrect);
        if (x == res.data.payload.correctOption) {
          setButton((prev) => ({ ...prev, [type]: "select" }))
          const audioTune = new Audio(correct_answer)
          audioTune.play()
          setColor(true)
          setcheck(1)
          setScore(res.data.payload.total)

          //setClasss("select");
          //console.log(classs);
        } else {
          setButton((prev) => ({ ...prev, [type]: "wrong" }))
          const audioTune = new Audio(wrong_answer)
          audioTune.play()
          //console.log(x);
          //console.log(res.data.payload.correctOption);
          setColor(false)
          setClasss("wrong")
          //console.log(classs);
        }

        setQuestionRem(25 - questionIdx - 1)
      } catch (error) {
        console.log(error)
      }
    } else {
      //console.log("submitAnswer");

      socket.emit("submitAnswer", { userId, roomId, answer, questionId })

      socket.on("submitAnswerResponse", (data) => {
        //console.log(data);
        if (data.isCorrect === true) {
          //setButton((prev) => ({ ...prev, [type]: "select" }));
          const audioTune = new Audio(correct_answer)
          //audioTune.play();
          setScore((prev) => prev + data.points)
          //etClasss("select");
        } else {
          //setButton((prev) => ({ ...prev, [type]: "wrong" }));
          const audioTune = new Audio(wrong_answer)
          //audioTune.play();
          setScore((prev) => prev + data.points)
          //setClasss("wrong");
        }
      })
      // setButton({ one: "", two: "", three: "", four: "" });
      // setClasss(null);
    }
  }
  const { start, pauseResume, reset, update } = useCountUp({
    ref: countUpRef,
    duration: 15,
    start: 10000,
    end: 0,
    delay: 4,
  })
  // if (question) {
  //   update(20000);
  // }
  return (
    <div>
      <div className="detail__question">
        <div className="detail__wrapper">
          <div className="detail__wrapper2">
            <div className="detail__wrapper3">
              {!show && !showNext ? (
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
                {!show && !showNext ? (
                  <>
                    <div id="bounce-in" className="bounce-in">
                      <h1 className="bounce-in-text">Get Ready</h1>
                    </div>
                  </>
                ) : showNext ? (
                  <div id="bounce-in" className="bounce-in">
                    <h1 className="bounce-in-text">Next Question</h1>
                  </div>
                ) : (
                  <>
                    <p className="question animated dts fadeInDown">
                      <span className="classic__question">
                        {question.content.question}
                      </span>
                    </p>
                    <div className="question_image_container">
                      <div className="answer__container">
                        <div className={`fade-in one `} id="one">
                          <button
                            className={`answer_animated animated flipInX ${button.one}`}
                            value={question.options[0]._id}
                            // control={<Radio />}
                            key={0}
                            onClick={() => {
                              pauseResume()
                              handleSelectOption(question.options[0]._id, "one")
                            }}
                          >
                            <p className="answer_number">1</p>
                            <p
                              className={`answer__text hoverAnswer ${button.one} `}
                            >
                              <span className={`ng_content ${button.one}`}>
                                {" "}
                                {question.options[0].text}
                              </span>
                            </p>
                          </button>
                        </div>
                        <div className={`fade-in two `} id="two">
                          <button
                            value={question.options[1]._id}
                            // control={<Radio />}
                            key={1}
                            name="two"
                            onClick={() => {
                              pauseResume()
                              handleSelectOption(question.options[1]._id, "two")
                            }}
                            className="answer_animated animated flipInX"
                          >
                            <p className="answer_number">2</p>
                            <p
                              className={`answer__text hoverAnswer ${button.two} `}
                            >
                              <span className={`ng_content ${button.two}`}>
                                {question.options[1].text}
                              </span>
                            </p>
                          </button>
                        </div>
                        <div className={`fade-in three `} id="three">
                          <button
                            className={`${button.three} answer_animated animated flipInX`}
                            value={question.options[2]._id}
                            key={2}
                            onClick={() => {
                              pauseResume()
                              handleSelectOption(
                                question.options[2]._id,
                                "three"
                              )
                            }}
                          >
                            <p className="answer_number">3</p>
                            <p
                              className={`answer__text hoverAnswer ${button.three} `}
                            >
                              <span className={`ng_content ${button.three}`}>
                                {" "}
                                {question.options[2].text}
                              </span>
                            </p>
                          </button>
                        </div>
                        <div className={`fade-in four `} id="four">
                          <button
                            className={`${button.four} answer_animated animated flipInX`}
                            value={question.options[3]._id}
                            key={3}
                            name="four"
                            onClick={() => {
                              pauseResume()
                              handleSelectOption(
                                question.options[3]._id,
                                "four"
                              )
                            }}
                          >
                            <p className="answer_number">4</p>
                            <p
                              className={`answer__text hoverAnswer ${button.four} `}
                            >
                              <span className={`ng_content ${button.four}`}>
                                {" "}
                                {question.options[3].text}
                              </span>
                            </p>
                          </button>
                        </div>
                      </div>
                    </div>
                    {setNextQues === true ? (
                      <Button
                        variant="contained"
                        onClick={() => {
                          next()
                          start()
                        }}
                        endIcon={<NavigateNextIcon sx={{ color: "#ffff" }} />}
                      >
                        Next
                      </Button>
                    ) : (
                      " "
                    )}
                  </>
                )}
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
