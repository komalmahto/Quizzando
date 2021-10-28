import "./App.css"
import { Switch, Route, Redirect } from "react-router-dom"
import { useContext } from "react"
import ClassicQuiz from "./components/Quiz/ClassicQuiz"
import StartQuiz from "./components/Quiz/StartQuiz"
import PlayQuiz from "./components/Quiz/playQuiz"
import SignUp from "./components/Auth/SignUp"
import LogIn from "./components/Auth/Login"
import Navbar from "./components/Navbar/Navbar"
import Footer from "./components/Footer/Footer"
import MyAccount from "./components/Account/MyAccount"
import { AuthContext } from "./Context/AuthContext"
import NotAuth from "./NoAuth"
import FreeQuiz from "./components/Quiz/FeeQuiz"
import RegisterQuiz from "./components/registerQuiz"
import Live from "./components/Quiz/Live"
import LiveQuiz from "./components/Quiz/LiveQuiz"
import Home from "./components/Home/Home"

function App() {
  const { user } = useContext(AuthContext)

  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={LogIn} />

        {/* Fetch Quiz */}
        <Route path="/quiz/fetch/live" component={LiveQuiz} />
        <Route path="/quiz/fetch/classic" component={ClassicQuiz} />
        <Route path="/quiz/fetch" component={FreeQuiz} />

        {/* Start Quiz */}
        <Route path="/start/live/:quizId">
          <StartQuiz freeQuiz="true" liveQuiz="true" />
        </Route>
        <Route path="/start/free/:quizId">
          <StartQuiz freeQuiz="true" liveQuiz="false" />
        </Route>
        <Route path="/start/classic/:quizId">
          <StartQuiz freeQuiz="false" liveQuiz="false" />
        </Route>

        {/* Play Quiz */}
        <Route path="/playQuiz/live/:quizId">
          <Live />
        </Route>
        <Route path="/playQuiz/free/:quizId">
          <PlayQuiz />
        </Route>
        <Route path="/playQuiz/classic/confirm/:quizId">
          {user?.token ? <RegisterQuiz /> : <NotAuth />}
        </Route>
        <Route path="/playQuiz/classic/:quizId">
          {user?.token ? <PlayQuiz /> : null}
        </Route>
        <Route path="/myaccount">
          {user?.token ? <MyAccount /> : <NotAuth />}
        </Route>

        <Redirect to="/" />
      </Switch>

      <Footer />
    </>
  )
}

export default App
