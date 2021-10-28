// import "../styles/components/PlayNow.css";
import React, { useState, useEffect } from "react";
import { USER_SERVER } from "../../config";
import QuizCard from "./QuizCard";
import axios from "axios";
import CommonFreeClassic from "./CommonFreeClassic";
import "./Classic_Quiz.css";
const quizes = [
  {
    id: 2,
    title: "komal",
    time: "4 pm",
  },
  {
    id: 3,
    title: "koaml Mahto",
    time: "3 pm",
  },
  {
    id: 4,
    title: "komal",
    time: "2 pm",
  },
  {
    id: 4,
    title: "komal",
    time: "2 pm",
  },
];

function ClassicQuiz() {
  return (
    <>
      {" "}
      <div className="header-wrapper ">
        <div className="info-text-con">
          <h1 className="title --icon">
            Quizando
            <span style={{ color: "#ff3f5f", marginLeft: "2px" }}>
              <span className="absoluteicon-container">
                <img
                  className="classicsicon"
                  src="	https://www.quizando.com/assets/logo_classics.png"
                  alt=""
                />
                C
              </span>
              lassics
            </span>
          </h1>
          <div className="text">
            Battle it out to top the leaderboard and win a share of the cash
            prize!
          </div>
        </div>
      </div>
      <CommonFreeClassic link="fetch?type=classic" />
    </>
  );
  // const [fetchQues, setfetchQues] = useState();
  // useEffect(() => {
  //   const fetchQuiz = async () => {
  //     const res = await axios.get(`${USER_SERVER}/quiz/fetch?type=classic`);
  //     console.log(res.data.payload);
  //   };
  //   fetchQuiz();
  // }, []);
  // return (
  //   <div className="games__cards">
  //     <h1>hello</h1>
  //     {/* {quizes.map((item, idx) => {
  //       return (
  //         <QuizCard
  //           id={item._id}
  //           title={item.title}
  //           price={25}
  //           dateAndTime={item.time}
  //           key={idx}
  //         />
  //       );
  //     })} */}
  //   </div>
  // );
}

export default ClassicQuiz;
