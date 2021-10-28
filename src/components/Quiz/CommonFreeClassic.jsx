import React, { useState, useEffect } from "react"
import { USER_SERVER } from "../../config"
import QuizCard from "./QuizCard"
import axios from "axios"
function CommonFreeClassic(props) {
  const [fetchQues, setfetchQues] = useState("")
  useEffect(() => {
    const fetchQuiz = async () => {
      const res = await axios.get(`${USER_SERVER}/quiz/${props.link}`)
      setfetchQues(res.data.payload.quizzes)
    }
    fetchQuiz()
  }, [])
  return (
    <>
      <div className="games__cards">
        {fetchQues &&
          fetchQues.map((item, idx) => {
            return <QuizCard quizDetail={item} />
          })}
      </div>
    </>
  )
}

export default CommonFreeClassic
