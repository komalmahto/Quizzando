import "./PlayNow.css";
import React, { useState, useEffect } from "react";
import { USER_SERVER } from "../../config";
import QuizCard from "./QuizCard";
import axios from "axios";
import CommonFreeClassic from "./CommonFreeClassic";

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
              L
              <span class="absoluteicon-container">
                {/* <img
                  alt="Quizando Live Icon"
                  class="liveicon"
                  src="	https://www.quizando.com/assets/logo_live.png"
                /> */}
                i
              </span>
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
  );
}

export default ClassicQuiz;
