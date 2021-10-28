import React, { useEffect, useState } from "react"
import "./LeaderBoard.css"
import axios from "axios"
import { USER_SERVER } from "../../config"
import { styled } from "@mui/material/styles"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell, { tableCellClasses } from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}))

function createData(position, name, plays, points) {
  return { position, name, plays, points }
}

export default function Leaderboard(props) {
  const [leaderBoard, setLeaderBoard] = useState("")
  useEffect(() => {
    const leaderboard = async () => {
      const leaderData = await axios.get(
        `${USER_SERVER}/quiz/${props.id}/leaderboard`
      )
      setLeaderBoard(leaderData.data.payload.result)
    }
    leaderboard()
  }, [])
  let rows = []
  leaderBoard &&
    leaderBoard.map((item, idx) => {
      rows &&
        rows.push(
          createData(
            idx + 1,
            item.userId[0] && item.userId[0].firstName,
            6,
            item.score
          )
        )
    })

  return (
    <>
      <div className="leaderboard__title">
        <img
          alt=""
          src="https://www.quizando.com/assets/leaderboard_icon.png"
        />
        <h1 style={{ fontSize: "30px", fontFamily: "Paytone One" }}>
          Current Leaderboard
        </h1>
      </div>
      <div class="center">
        <div class="top3">
          <div class="two item">
            <div class="pos">2</div>
            <div
              class="pic"
              style={{
                backgroundImage:
                  "url(https://cdn1.vectorstock.com/i/1000x1000/78/80/young-woman-head-avatar-cartoon-face-character-vector-21787880.jpg)",
              }}
            ></div>
            <div class="name">{rows[1]?.name}</div>
            <div class="score">{rows[1]?.points}</div>
          </div>
          <div class="one item">
            <div class="pos">1</div>
            <div
              class="pic"
              style={{
                backgroundImage:
                  "url(https://cdn1.vectorstock.com/i/1000x1000/78/80/young-woman-head-avatar-cartoon-face-character-vector-21787880.jpg)",
              }}
            ></div>
            <div class="name">{rows[0]?.name}</div>
            <div class="score">{rows[0]?.points}</div>
          </div>
          <div class="three item">
            <div class="pos">3</div>
            <div
              class="pic"
              style={{
                backgroundImage:
                  "url(https://cdn1.vectorstock.com/i/1000x1000/78/80/young-woman-head-avatar-cartoon-face-character-vector-21787880.jpg)",
              }}
            ></div>
            <div class="name">{rows[2]?.name}</div>
            <div class="score">{rows[2]?.points}</div>
          </div>
        </div>
        <div class="list">
          {rows.map((item, idx) => {
            return idx > 2 && idx < 10 ? (
              <div class="item">
                <div class="pos">4</div>
                <div
                  class="pic"
                  style={{
                    backgroundImage:
                      "url(https://cdn1.vectorstock.com/i/1000x1000/78/80/young-woman-head-avatar-cartoon-face-character-vector-21787880.jpg)",
                  }}
                ></div>
                <div class="name">{item?.name}</div>
                <div class="score">{item?.points}</div>
              </div>
            ) : (
              ""
            )
          })}
        </div>
      </div>
      <div className="leaderboard">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell style={{ fontSize: "22px" }} align="center">
                  Position
                </StyledTableCell>
                <StyledTableCell style={{ fontSize: "22px" }}>
                  Name
                </StyledTableCell>
                <StyledTableCell style={{ fontSize: "22px" }} align="center">
                  Plays
                </StyledTableCell>
                <StyledTableCell style={{ fontSize: "22px" }} align="center">
                  Points
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows &&
                rows.map((row, idx) => {
                  return idx > 9 ? (
                    <StyledTableRow key={row.name}>
                      <StyledTableCell align="center">
                        {row.position}
                      </StyledTableCell>
                      <StyledTableCell component="th" scope="row">
                        {row.name}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.plays}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.points}
                      </StyledTableCell>
                    </StyledTableRow>
                  ) : (
                    ""
                  )
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  )
}
