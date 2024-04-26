// import ReactDOM from 'react-dom'
// import React from 'react'

// 自己实现的
import ReactDOM from "./react-dom"
import React from "./react"

const element = (
  <div style={{ color: "red" }}>
    hello world
    <span>xxxx</span>
    <p>fsdfs</p>
  </div>
)

ReactDOM.render(element, document.getElementById("root"))

console.log(element, "++++")
