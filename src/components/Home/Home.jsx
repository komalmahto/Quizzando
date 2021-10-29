import "./Home.css"
import React from "react"
import Carousel from "react-bootstrap/Carousel"
import homedata from "./homedata"
import CountUp from "react-countup"
import FreeQuiz from "../Quiz/FeeQuiz"
import ClassicQuiz from "../Quiz/ClassicQuiz"
import LiveQuiz from "../Quiz/LiveQuiz"

export default function Home() {
  return (
    <>
      <div className="home">
        <Carousel>
          {homedata.map((item) => {
            return (
              <Carousel.Item
                className={item.className}
                style={{
                  backgroundImage: `url(${item.bg_image})`,
                  backgroundSize: "cover",
                }}
              >
                <div className="home__content">
                  <div className="home__left">
                    <img
                      alt=""
                      className="home__left__image"
                      src={item.fg_image}
                    />
                  </div>
                  <div className="home__right">
                    <h1>{item.header}</h1>
                    <p>{item.description}</p>
                    <button className="home__top__btn">Click here</button>
                  </div>
                </div>
              </Carousel.Item>
            )
          })}
        </Carousel>
        <div className="home__bottom">
          <h1>Total money won on Quizando</h1>
          <div className="money__won">
            <img
              className="money__img"
              src="https://www.quizando.com/assets/money_won.png"
              alt=""
            />

            <h2>
              <CountUp
                start={0}
                end={149788.94}
                duration={2}
                prefix="€"
                decimals={2}
              />
            </h2>
          </div>
        </div>
      </div>

      <div className="games__btns">
        <h3 className="games__red_button">
          <img alt="" src="https://www.quizando.com/assets/svg/live_icon.svg" />
          Live!
        </h3>

        <h3 className="games__green_button">
          <img
            alt=""
            src="https://www.quizando.com/assets/svg/notokens_icon.svg"
          />
          Free Games
        </h3>
        <h3 className="games__cyan_button">
          <img
            alt=""
            src="https://www.quizando.com/assets/svg/classics_icon.svg"
          />
          Classics
        </h3>
      </div>
      <div className="home_section_title">
        <h2 className="quiz__all">All Quizes</h2>
      </div>
      <FreeQuiz />
      <LiveQuiz />
      <ClassicQuiz />
    </>
  )
}
