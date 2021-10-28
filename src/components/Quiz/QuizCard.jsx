import "./QuizCard.css"

import React from "react"
import { Link } from "react-router-dom"
import moment from "moment"

function quizCard(props) {
  return (
    <>
      {props.quizDetail && (
        <div className="card" style={{ borderRadius: "7px" }}>
          <div className="card__fix__block">
            <img
              className="card__logo"
              src="https://www.quizando.com/assets/quizando_host_icon.png"
              alt="card"
            />
            <div
              className=""
              n
              style={{
                marginTop: "-20px",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <span className="span_logo">Quizando</span>
              <span className="s_span "></span>
            </div>
          </div>

          <h1>{props.quizDetail?.title}</h1>

          <div className="card__bottom">
            {props.quizDetail?.isFreebie ? <h2>PLay For Free!</h2> : " "}

            <h6 style={{ fontSize: "1.8em", fontWeight: "600" }}>
              Special Prizes!{" "}
            </h6>
            {props.quizDetail?.isFreebie === true &&
            props.quizDetail?.liveQuiz === true ? (
              <Link
                className="card__bottom__btn"
                to={`/start/live/${props.quizDetail?._id}`}
              >
                Play Now!
              </Link>
            ) : props.quizDetail?.isFreebie === true ? (
              <Link
                className="card__bottom__btn"
                to={`/start/free/${props.quizDetail?._id}`}
              >
                Play Now!
              </Link>
            ) : (
              <Link
                className="card__bottom__btn"
                to={`/start/classic/${props.quizDetail?._id}`}
              >
                Play Now!
              </Link>
            )}

            <p
              style={{
                fontSize: "1.5em",
                fontWeight: "400",
                fontFamily: "Titillium Web",
              }}
            >
              Closes :
              {moment
                .utc(props.quizDetail?.endDate)
                .format(" MMMM Do YYYY,h:mm:ss a")}
            </p>
          </div>
        </div>
      )}
    </>
  )
}
export default quizCard
