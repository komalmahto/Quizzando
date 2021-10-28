import "./PlayNow.css"
import React from "react"
import CommonFreeClassic from "./CommonFreeClassic"

function ClassicQuiz() {
  return (
    <>
      {" "}
      <div class="header-wrapper --quizzes">
        <div class="info-text-con">
          <h1 class="title --icon">
            {" "}
            Quizando
            <span>
              L<span class="absoluteicon-container">i</span>
              ve!
            </span>
          </h1>
          <div class="text">
            Super knock out style quizzes hosted by all your favourite people!
          </div>
        </div>
      </div>
      <CommonFreeClassic link="fetch?type=live" />
    </>
  )
}

export default ClassicQuiz
