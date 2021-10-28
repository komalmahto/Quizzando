import React from "react"
import CommonFreeClassic from "./CommonFreeClassic"
import "./Classic_Quiz.css"
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
]

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
  )
}

export default ClassicQuiz
