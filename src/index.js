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

function MyFunctionComponent(props) {
  return (
    <div style={{ color: "red" }}>
      hello world
      <span>xxxx</span>
      <p>xxxxxxxx</p>
    </div>
  )
}

// 虚拟 DOM 对象
// const ele = {
//   $$typeof: REACT_ELEMENT,
//   key: null,
//   props: { children: "xxx" },
//   ref: null,
//   type: "div",
// }

ReactDOM.render(<MyFunctionComponent />, document.getElementById("root"))

// console.log(<MyFunctionComponent />, "++++")
