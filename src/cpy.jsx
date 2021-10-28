import React from "react";
import "./rough.css";
import { Button } from "@mui/material";
function rough() {
  return (
    <div>
      <div className="detail__question">
        <div className="detail__wrapper">
          <div className="detail__wrapper2">
            <div className="detail__wrapper3">
              <div className="answer__section detail__content">
                <p className="question animated dts fadeInDown">
                  <span className="classic__question">what does it threw</span>
                </p>
                <div className="question_image_container">
                  <div className="answer__container">
                    <button className="answer_animated animated flipInX">
                      <p className="answer_number">1</p>
                      <p className="answer__text hoverAnswer">
                        <span className="ng_content"> answerrr</span>
                      </p>
                    </button>
                    <button className="answer_animated animated flipInX">
                      <p className="answer_number">1</p>
                      <p className="answer__text hoverAnswer">
                        <span className="ng_content"> answerrr</span>
                      </p>
                    </button>
                    <button className="answer_animated animated flipInX">
                      <p className="answer_number">1</p>
                      <p className="answer__text hoverAnswer">
                        <span className="ng_content"> answerrr</span>
                      </p>
                    </button>
                    <button className="answer_animated animated flipInX">
                      <p className="answer_number">1</p>
                      <p className="answer__text hoverAnswer">
                        <span className="ng_content"> answerrr</span>
                      </p>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="wrapper_sound__on__off">
          <div className="sound__on__off">
            {/* {playing ? <VolumeUpIcon /> : <VolumeOffIcon />}
                    {toggle} */}
            <Button style={{ color: "var(--light)" }}>Soun On</Button>
          </div>
        </div>
        <div className="quiz_landing_container">
          <div className="quiz_landing_info">
            <div className="quiz_item_info">
              <div className="inner_div">
                <div className="text_large">0</div>
                <div className="subtext">Your Current Score</div>
              </div>
            </div>
            <div className="quiz_item_info">
              <div className="inner_div">
                <div className="text_large">0</div>
                <div className="subtext">Questions Remaining</div>
              </div>
            </div>
            <div className="quiz_item_info">
              <div className="inner_div">
                <div className="text_large">0</div>
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
  );
}

export default rough;
// .detail__question {
//     position: relative;
//     width: 80%;
//     padding-right: 15px;
//     padding-left: 15px;
//     margin-right: auto;
//     margin-left: auto;
//     margin-top: 0;

//     margin: 25px auto;

//   }
//   .detail__wrapper {
//     position: relative;
//     height: 550px;
//     display: -webkit-box;
//     display: flex;
//     -webkit-box-orient: horizontal;
//     -webkit-box-direction: normal;
//     flex-direction: row;
//     -webkit-box-pack: center;
//     justify-content: center;
//     background: #000;
//     font-family: "Titillium Web", sans-serif;
//     font-size: 2em;
//     border-radius: 5px 5px 0 0;
//     overflow: hidden;
//   }
//   .detail__wrapper2 {
//     display: -webkit-box;
//     display: flex;
//     -webkit-box-flex: 0;
//     flex: 0 0 100%;
//     position: relative;
//     background-color: #333;
//     overflow: hidden;
//     -webkit-box-pack: center;
//     justify-content: center;
//   }
//   .detail__wrapper3 {
//     position: absolute;
//     width: 100%;
//     height: 100%;
//     z-index: 9999;
//     background: rgba(0, 0, 0, 0.5);
//     overflow: hidden;
//   }
//   .detail__content {
//     position: absolute;
//     width: 100%;
//     height: 100%;
//     z-index: 9999;
//     background: rgba(0, 0, 0, 0.5);
//     overflow: hidden;
//   }
//   .answer__section {
//     -webkit-box-flex: 0;
//     flex: 0 0 50%;
//     display: -webkit-box;
//     display: flex;
//     display: -webkit-flex;
//     -webkit-box-orient: vertical;
//     -webkit-box-direction: normal;
//     flex-direction: column;
//     -webkit-box-pack: center;
//     justify-content: center;
//     -webkit-box-align: center;
//     align-items: center;
//     margin: 0 auto;
//     -webkit-box-flex: 100%;
//     flex: 100%;
//     -webkit-box-flex: 0;
//     flex: 0 0 100%;
//     -webkit-box-pack: start;
//     justify-content: flex-start;
//   }
//   .quiz__info {
//     border-left: none;
//     text-align: center;
//     border-left: 2px solid #b3b3b3;
//     -webkit-box-pack: center;
//     justify-content: center;
//   }
//   .question {
//     display: -webkit-box;
//     display: flex;
//     -webkit-box-orient: vertical;
//     -webkit-box-direction: normal;
//     flex-direction: column;
//     -webkit-box-pack: center;
//     justify-content: center;
//     -webkit-box-align: center;
//     align-items: center;
//     text-align: center;
//     color: #fff;
//     font-size: 24px;
//     width: 80%;
//     line-height: 1em;
//     min-height: 55px;
//     margin-bottom: 20px;
//     margin-top: 20px;
//   }
//   .animated {
//     -webkit-animation-duration: 1s;
//     animation-duration: 1s;
//     -webkit-animation-fill-mode: both;
//     animation-fill-mode: both;
//     -webkit-animation-duration: 1s;
//     animation-duration: 1s;
//     -webkit-animation-fill-mode: both;
//     animation-fill-mode: both;
//   }
//   .dts {
//     -webkit-touch-callout: none;
//     -webkit-user-select: none;
//     -moz-user-select: none;
//     -ms-user-select: none;
//     user-select: none;
//   }
//   .animated {
//     -webkit-animation-duration: 1s;
//     -webkit-animation-fill-mode: both;
//     animation-duration: 1s;
//     animation-fill-mode: both;
//   }
//   .fadeInDown {
//     -webkit-animation-name: fadeInDown;
//     animation-name: fadeInDown;
//   }
//   .classic__question {
//   }
//   .question_image_container {
//     display: -webkit-box;
//     display: flex;
//     -webkit-box-align: center;
//     align-items: center;
//     -webkit-box-pack: center;
//     justify-content: center;
//     width: 90%;
//     margin-top: 20px;
//   }
//   .answer__container {
//   }
//   .answer_animated {
//     -webkit-animation-delay: 0s;
//     animation-delay: 0s;
//     width: 480px;
//     display: -webkit-box;
//     display: flex;
//     -webkit-box-align: stretch;
//     align-items: stretch;
//     font-weight: 600;
//     margin-bottom: 15px;
//     padding: 0;
//     border: none;
//     font-size: 22px;
//     -webkit-animation-duration: 0.5s;
//     animation-duration: 0.5s;
//     line-height: 1em;
//   }
//   .animated {
//     -webkit-animation-duration: 1s;
//     animation-duration: 1s;
//     -webkit-animation-fill-mode: both;
//     animation-fill-mode: both;
//   }
//   .animated {
//     -webkit-animation-duration: 1s;
//     animation-duration: 1s;
//     -webkit-animation-fill-mode: both;
//     animation-fill-mode: both;
//   }
//   .animated {
//     -webkit-animation-duration: 1s;
//     -webkit-animation-fill-mode: both;
//     animation-duration: 1s;
//     animation-fill-mode: both;
//   }
//   .flipInX {
//     -webkit-animation-name: flipInX;
//     -webkit-backface-visibility: visible !important;
//     animation-name: flipInX;
//     backface-visibility: visible !important;
//   }
//   button {
//     appearance: auto;
//     -webkit-writing-mode: horizontal-tb !important;
//     text-rendering: auto;
//     color: -internal-light-dark(black, white);
//     letter-spacing: normal;
//     word-spacing: normal;
//     line-height: normal;
//     text-transform: none;
//     text-indent: 0px;
//     text-shadow: none;
//     display: inline-block;
//     text-align: center;
//     align-items: flex-start;
//     cursor: default;
//     box-sizing: border-box;
//     background-color: -internal-light-dark(rgb(239, 239, 239), rgb(59, 59, 59));
//     margin: 0em;
//     padding: 1px 6px;
//     border-width: 2px;
//     border-style: outset;
//     border-color: -internal-light-dark(rgb(118, 118, 118), rgb(133, 133, 133));
//     border-image: initial;
//   }
//   button:disabled {
//     background-color: -internal-light-dark(
//       rgba(239, 239, 239, 0.3),
//       rgba(19, 1, 1, 0.3)
//     );
//     color: -internal-light-dark(rgba(16, 16, 16, 0.3), rgba(255, 255, 255, 0.3));
//     border-color: -internal-light-dark(
//       rgba(118, 118, 118, 0.3),
//       rgba(195, 195, 195, 0.3)
//     );
//   }
//   .answer_number {
//     padding: 1.1em 1.3em;
//     background-color: #4d4d4d;
//     color: #fff;
//     margin-bottom: 0;
//   }
//   p {
//     display: block;
//     margin-block-start: 1em;
//     margin-block-end: 1em;
//     margin-inline-start: 0px;
//     margin-inline-end: 0px;
//   }
//   .answer__text {
//     background-color: #b3b3b3;
//     cursor: pointer;
//     text-align: left;
//     width: 100%;
//     padding: 0 0.9em;
//     background-color: #f2f2f2;
//     color: #333;
//     margin-bottom: 0;
//     display: -webkit-box;
//     display: flex;
//     -webkit-box-flex: 1;
//     flex: 1;
//     padding: 5px 10px;
//   }
//   .ng_content {
//     cursor: pointer;
//     text-align: left;
//     width: 100%;
//     padding: 0 0.9em;
//     background-color: #f2f2f2;
//     color: #333;
//     margin-bottom: 0;
//     display: -webkit-box;
//     display: flex;
//     -webkit-box-flex: 1;
//     flex: 1;
//     align-self: center;
//     width: 100%;
//     max-width: 360px;
//     font-size: 15px;
//     margin: 0 auto 10px;
//   }
//   .sound__on__off {
//     height: auto;

//     color: var(--light);
//     position: relative;

//     text-align: center;
//     align-items: center;
//   }
//   .wrapper_sound__on__off {
//     background-color: rgba(0, 0, 0, 0.8);
//   }
//   .quiz_landing_container {
//     border: 2px solid #b3b3b3;
//     border-top: none;
//     border-bottom-left-radius: 5px;
//     border-bottom-right-radius: 5px;
//   }
//   .quiz_landing_info {
//     display: -webkit-box;
//     display: flex;
//     width: 100%;
//   }
//   .quiz_item_info {
//     border-left: none;
//     text-align: center;
//     border-left: 2px solid #b3b3b3;
//     -webkit-box-pack: center;
//     justify-content: center;
//     -webkit-box-flex: 1;
//     flex: 1;
//   }
//   .inner_div {
//     text-align: inherit;
//     color: #4d4d4d;
//     padding: 25px 5px;
//     display: -webkit-box;
//     display: flex;
//     -webkit-box-orient: vertical;
//     -webkit-box-direction: normal;
//     flex-direction: column;
//     -webkit-box-align: center;
//     align-items: center;
//     -webkit-box-pack: center;
//     justify-content: center;
//     height: 100%;
//   }
//   .text_large {
//     font-size: 3em;
//     font-size: 4em;
//     color: inherit;
//     font-family: "Paytone One", sans-serif;
//     font-weight: 400;
//     line-height: 1em;
//     margin-bottom: 0.2em;
//   }
//   .subtext {
//     font-size: 1.5em;
//     color: inherit;
//     font-family: "Titillium Web", sans-serif;
//     font-weight: 400;
//     line-height: 1em;
//     word-break: break-word;
//   }
