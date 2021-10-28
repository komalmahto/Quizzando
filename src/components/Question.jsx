import React, { useState, useEffect } from "react";
import "../styles/components/Questions.css";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Button,
} from "@mui/material";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import music from "../music.mp3";
import wrong_answer from "../Wrong-answer.mp3";
import correct_answer from "../Correct-answer.mp3";
import axios from "axios";
import DelayComponent from "./DelayComponent";
import radial from "../radial_ray2.mp4";
const useAudio = (url, userToken) => {
  const [audio] = useState(new Audio(url));
  const [playing, setPlaying] = useState(userToken);

  const toggle = () => setPlaying(!playing);

  useEffect(() => {
    playing ? audio.play() : audio.pause();
  }, [playing, audio]);

  useEffect(() => {
    audio.addEventListener("ended", () => setPlaying(false));
    return () => {
      audio.removeEventListener("ended", () => setPlaying(false));
    };
  }, [audio]);

  return [playing, toggle];
};
function Question({
  question,
  ResultId,
  setQuestionIdx,
  questionIdx,
  setNextQues,
}) {
  console.log(setNextQues, typeof setNextQues);
  const userToken = JSON.parse(localStorage.getItem("user")) || null;
  //console.log(userToken.token);
  const [playing, toggle] = useAudio(music, userToken);
  const [color, setColor] = useState(false);
  const [check, setcheck] = useState(-1);
  const [score, setScore] = useState(0);
  const [questionRem, setQuestionRem] = useState(25);
  const [timer, setTimer] = useState(10000);
  const [points, setPoints] = useState(0);
  const [load, setLoad] = useState(null);
  const [selected, setSelected] = useState(null);
  const [classs, setClasss] = useState("");
  const [show, setShow] = useState(false);
  const [showNext, setNext] = useState(false);
  const [correctOption, setCorrectOption] = useState(null);
  const [button, setButton] = useState({
    one: "",
    two: "",
    three: "",
    four: "",
  });
  if (!show && !showNext) {
    setTimeout(function () {
      setShow(true);
    }, 14000);
  }
  if (showNext) {
    setTimeout(function () {
      setNext(false);
      setShow(true);
    }, 3000);
  }
  // const [button1, setButton1] = useState(null);
  // const [button2, setButton2] = useState(null);
  // const [button3, setButton3] = useState(null);
  // const [button4, setButton4] = useState(null);
  // function timeout(ms) {
  //   return new Promise((resolve) => setTimeout(resolve, ms));
  // }

  // useEffect(() => {
  //   if (showNext === true || show) {
  //     setTimeout(() => {
  //       if (timer > 0) setTimer(timer - 1);
  //     }, 1);
  //   }
  // }, [show, timer, showNext]);

  // const handleSelect = async (i) => {
  //   let URL = `http://13.233.83.134:8010/common/quiz/submitAnswer?resultId=${ResultId}&quesId=${question._id}&answer=${i}&score=${points}`;
  //   const res = await axios.post(URL);
  //   setCorrectOption(res.data.payload.correctOption);

  //   if (selected && correctOption) {
  //     console.log(i, selected, correctOption);
  //     if (selected === i && selected === correctOption) {
  //       return "select";
  //     } else if (selected === i && selected !== correctOption) {
  //       return "wrong";
  //     } else if (i === correctOption) {
  //       return "select";
  //     }
  //   }
  // };

  const next = async (e) => {
    setPoints(timer);
    setTimer(11500);
    e.preventDefault();
    setSelected(null);
    setClasss(null);
    setButton({ one: "", two: "", three: "", four: "" });
    if (setNext === true) setQuestionIdx((prev) => ++prev);
    setPoints(timer);

    setShow(false);
    setNext(true);

    // async function sleep(fn, ...args) {
    //   return fn(...args);
    // }
    // const x = async () => {

    //   await setTimeout(async function () {}, 3000);
    // };
    // x();
  };

  const handleSelectOption = async (x, type) => {
    let URL = `http://13.233.83.134:8010/common/quiz/submitAnswer?resultId=${ResultId}&quesId=${question._id}&answer=${x}&score=${points}`;
    try {
      const res = await axios.post(URL);
      setCorrectOption(res.data.payload.correctOption);
      setSelected(x);
      console.log(res.data);
      console.log(x);
      console.log(res.data.payload.correctOption);
      console.log(res.data.payload.isCorrect);
      if (x == res.data.payload.correctOption) {
        setButton((prev) => ({ ...prev, [type]: "select" }));
        // const audioTune = new Audio(correct_answer);
        // audioTune.play();
        setColor(true);
        setcheck(1);
        setScore(res.data.payload.total);
        setClasss("select");
        console.log(classs);
        //document.getElementById(e.target.name).classList.add("green");
      } else {
        setButton((prev) => ({ ...prev, [type]: "wrong" }));
        // const audioTune = new Audio(wrong_answer);
        // audioTune.play();
        console.log(x);
        console.log(res.data.payload.correctOption);
        setColor(false);
        setClasss("wrong");
        console.log(classs);
        //document.getElementById(e.target.name).classList.add("red");
      }
      //console.log(res.data);
      setQuestionRem(25 - questionIdx - 1);

      //setQuestionIdx((prev) => ++prev);
    } catch (error) {
      console.log(error);
    }
  };

  return question ? (
    <div>
      <div className="question__Container">
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
        <FormControl component="fieldset">
          {/* <RadioGroup
            aria-label="gender"
            defaultValue="female"
            name="radio-buttons-group"
            onChange={handleSelectOption}
            required
          > */}

          <div>
            {/* <div className="board__container__answers"> */}
            {!show && !showNext ? (
              <>
                {/* <div id="bounce-in" className="bounce-in">
                    <h1 className="bounce-in-text">Get Ready</h1>
                  </div> */}
              </>
            ) : showNext ? (
              <div id="bounce-in" className="bounce-in">
                <h1 className="bounce-in-text">Next Question</h1>
              </div>
            ) : (
              <div style={{ marginTop: "25%" }}>
                <h3> {question.content.question}</h3>
                <div className="board__container__answers">
                  <div className="board">
                    <div className={`fade-in one `} id="one">
                      <button
                        className={`singleOption ${button.one}`}
                        value={question.options[0]._id}
                        // control={<Radio />}
                        key={0}
                        onClick={() =>
                          handleSelectOption(question.options[0]._id, "one")
                        }
                        style={{ width: "100%" }}
                      >
                        {question.options[0].text}
                      </button>
                    </div>
                  </div>
                  <div className="board">
                    <div className={`fade-in two `} id="two">
                      <button
                        className={`singleOption ${button.two}`}
                        value={question.options[0]._id}
                        // control={<Radio />}
                        key={1}
                        name="two"
                        onClick={() =>
                          handleSelectOption(question.options[1]._id, "two")
                        }
                        style={{ width: "100%" }}
                      >
                        {question.options[1].text}
                      </button>
                    </div>
                  </div>

                  <div className="board">
                    <div className={`fade-in three `} id="three">
                      <button
                        className={`singleOption ${button.three}`}
                        value={question.options[2]._id}
                        // control={<Radio />}
                        key={2}
                        onClick={() =>
                          handleSelectOption(question.options[2]._id, "three")
                        }
                        style={{ width: "100%" }}
                      >
                        {question.options[2].text}
                      </button>
                    </div>
                  </div>
                  <div className="board">
                    <div className={`fade-in four `} id="four">
                      <button
                        className={`singleOption ${button.four}`}
                        value={question.options[3]._id}
                        // control={<Radio />}
                        key={3}
                        name="four"
                        onClick={() =>
                          handleSelectOption(question.options[3]._id, "four")
                        }
                        style={{ width: "100%" }}
                      >
                        {question.options[3].text}
                      </button>
                    </div>
                  </div>
                  {setNextQues === true ? (
                    <Button
                      variant="contained"
                      onClick={next}
                      endIcon={<NavigateNextIcon sx={{ color: "#ffff" }} />}
                    >
                      Next
                    </Button>
                  ) : (
                    " "
                  )}
                </div>
              </div>
            )}
            {/* <div
                id="bounce-in"
                className="bounce-in"
                style={{
                  visibility: "hidden",
                  border: "none",
                }}
              >
                <h1 className="bounce-in-text">Get Ready</h1>
              </div> */}
          </div>
          {/* {["one", "two", "three", "four"].map((item, idx) => {
            return (
              <div className="board">
                <div
                  style={{
                    backgroundColor:
                      color === false && check === -1
                        ? "white"
                        : color == true && check === 1
                        ? "green"
                        : "red",
                  }}
                  className={`fade-in ${item} `}
                  id={item}
                >
                  <button
                    className={`singleOption ${
                      selected && handleSelect(question.options[idx]._id)
                    }`}
                    value={question.options[idx]._id}
                    control={<Radio />}
                    key={idx}
                    name={item}
                    onClick={() =>
                      handleSelectOption(question.options[idx]._id)
                    }
                    style={{ width: "100%" }}
                  >
                    {question.options[idx].text}
                  </button>

                  <FormControlLabel
                        value={question.options[idx]._id}
                        control={<Radio />}
                        label={question.options[idx].text}
                        key={idx}
                        name={item}
                      />
                </div>
              </div>
            );
          })} */}

          {/* </RadioGroup> */}
        </FormControl>
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
      <div className="question__footer">
        <div className="question__footer__sub">
          <h2>{score}</h2>
          <p>Your Current Score</p>
        </div>
        <div className="question__footer__sub">
          <h2>{questionRem}/25</h2>
          <p>Questions Remaining</p>
        </div>
        <div className="question__footer__sub">
          {timer > 10000 ? <h2>10000</h2> : <h2>{timer}</h2>}

          <p>Points</p>
        </div>
        <div className="question__footer__sub">
          <h2>0</h2>
          <p>Your Best Score</p>
        </div>
        <div className="question__footer__sub">
          <h2>0</h2>
          <p>Leaderboard First Place</p>
        </div>
      </div>
    </div>
  ) : null;
}
// setTimeout(function () {
//   document.getElementById("hide").style.visibility = "visible";
// }, 3000);
export default Question;
