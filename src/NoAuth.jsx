import React from "react"

import { Link } from "react-router-dom"
function not_auth() {
  return (
    <div
      style={{
        alignItems: "center",
        textAlign: "center",

        width: "80%",
        margin: "150px auto",
        height: "30%",
        border: "1px solid black",
      }}
    >
      <h1>not authorised.Please Login</h1>
      <br />
      <h1>
        <Link style={{ color: "var(--red)" }} className="anchor" to="/login">
          Login
        </Link>{" "}
      </h1>
    </div>
  )
}

export default not_auth
