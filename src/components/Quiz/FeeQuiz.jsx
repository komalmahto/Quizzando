import React, { useState, useEffect } from "react";
import { USER_SERVER } from "../../config";
import axios from "axios";
import QuizCard from "./QuizCard";
import CommonFreeClassic from "./CommonFreeClassic";
import { AuthContext } from "../../Context/AuthContext";
import { useContext } from "react";
import Header_Quiz from "../Header_Quiz";
function FeeQuiz() {
  const { user } = useContext(AuthContext);
  console.log(user);
  return (
    <>
      <div _ngcontent-iqk-c26="" class="header-wrapper --quizzes">
        <div _ngcontent-iqk-c26="" class="info-text-con">
          <h1 _ngcontent-iqk-c26="" class="title">
            <img
              _ngcontent-iqk-c26=""
              src="	https://www.quizando.com/assets/logo_notokens.png"
            />
            Free <span _ngcontent-iqk-c26="">Games</span>
          </h1>
          <div _ngcontent-iqk-c26="" class="text">
            Your place for all our free games - live, classic and sponsored!
          </div>
        </div>
      </div>
      <CommonFreeClassic link="fetch" />
    </>
  );
  //   const [fetchQues, setfetchQuiz] = useState("");
  //   useEffect(() => {
  //     const fetchQuiz = async () => {
  //       const res = await axios.get(`${USER_SERVER}/quiz/fetch`);
  //       setfetchQuiz(res.data.payload.quizzes);
  //       console.log(res.data.payload.quizzes);
  //     };
  //     fetchQuiz();
  //   }, []);

  //   return (
  //     <div className="games__cards">
  //       {fetchQues &&
  //         fetchQues.map((item, idx) => {
  //           return <QuizCard quizDetail={item} />;
  //         })}
  //     </div>
  //   );
}

export default FeeQuiz;
