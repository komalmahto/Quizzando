import React, { useState, useEffect } from "react"
import "./rough.css"
import { Button } from "@mui/material"
import { useCountUp } from "react-countup"
import music from "../../music.mp3"
import VolumeUpIcon from "@mui/icons-material/VolumeUp"
import VolumeOffIcon from "@mui/icons-material/VolumeOff"
import wrong_answer from "../../Wrong-answer.mp3"
import correct_answer from "../../Correct-answer.mp3"
import radial from "../../radial_ray2.mp4"
import { useContext } from "react"
import { AuthContext } from "../../Context/AuthContext"

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
}) {
  const countUpRef = React.useRef(null)

  const userToken = JSON.parse(localStorage.getItem("user")) || null
  const { user } = useContext(AuthContext)

  const [playing, toggle] = useAudio(music, userToken)
  const [score, setScore] = useState(0)
  const [questionRem, setQuestionRem] = useState(25)
  const [points, setPoints] = useState(0)
  const [classs, setClasss] = useState("")
  const [show, setShow] = useState(false)
  const [showNext, setNext] = useState(false)
  const [disable, setDisable] = useState(false)
  const [correctOption, setCorrectOption] = useState(null)
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
        update(0)
      }, 14000)
    }
  }, [])

  if (showNext) {
    setTimeout(function () {
      setNext(false)
      update(0)

      setShow(true)
    }, 3000)
  }

  const next = async (e) => {
    setClasss(null)
    setButton({ one: "", two: "", three: "", four: "" })
    setQuestionIdx((prev) => ++prev)
    setPoints(countUpRef?.current?.innerHTML)
    setShow(false)
    setNext(true)
    setDisable(false)
  }

  const handleSelectOption = async (x, type) => {
    setDisable(true)
    const current = countUpRef?.current?.innerHTML

    let URL
    console.log(ResultId, question._id, x, current)
    if (setNextQues === true) {
      URL = `http://13.233.83.134:8010/quiz/submitAnswer?resultId=${ResultId}&quesId=${question._id}&answer=${x}&score=${current}`

      try {
        const response = await fetch(URL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
        })
        const res = await response.json()
        console.log(res?.payload?.optionMarked, res?.payload?.correctOption)
        setCorrectOption(res.payload.correctOption)
        if (res?.payload?.optionMarked == res?.payload?.correctOption) {
          setButton((prev) => ({ ...prev, [type]: "select" }))
          const audioTune = new Audio(correct_answer)
          audioTune.play()
          setPoints(current)
          console.log(res)
          setScore(res.payload.total)
          setClasss("select")
          setTimeout(() => {
            next()
            setQuestionRem(25 - questionIdx - 1)
            start()
          }, 3000)
        } else {
          setButton((prev) => ({ ...prev, [type]: "wrong" }))
          const audioTune = new Audio(wrong_answer)
          audioTune.play()
          setClasss("wrong")
          setTimeout(() => {
            next()
            setQuestionRem(25 - questionIdx - 1)
            start()
          }, 3000)
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
  const { start, pauseResume, update } = useCountUp({
    ref: countUpRef,
    duration: 15,
    start: 10000,
    end: 10000,
  })

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
                  <>
                    <div id="bounce-in" className="bounce-in">
                      <h1 className="bounce-in-text">Next Question</h1>
                    </div>
                  </>
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
                            disabled={disable}
                            className={`answer_animated animated flipInX ${button.one}`}
                            value={question.options[0]._id}
                            key={0}
                            onClick={() => {
                              if (disable === false) {
                                pauseResume()
                                handleSelectOption(
                                  question.options[0]._id,
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
                                {question.options[0].text}
                              </span>
                            </p>
                          </button>
                        </div>
                        <div className={`fade-in two `} id="two">
                          <button
                            value={question.options[1]._id}
                            key={1}
                            name="two"
                            onClick={() => {
                              if (disable === false) {
                                pauseResume()
                                handleSelectOption(
                                  question.options[1]._id,
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
                              if (disable === false) {
                                pauseResume()
                                handleSelectOption(
                                  question.options[2]._id,
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
                              if (disable === false) {
                                pauseResume()
                                handleSelectOption(
                                  question.options[3]._id,
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
                                {question.options[3].text}
                              </span>
                            </p>
                          </button>
                        </div>
                      </div>
                    </div>
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
