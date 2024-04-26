// import ReactDOM from 'react-dom'
// import React from 'react'

// 自己实现的
import ReactDOM from "./react-dom"
import React from "./react"

// jsx 组件
const element = (
  <div style={{ color: "red" }}>
    hello world
    <span>xxxx</span>
    <p>fsdfs</p>
  </div>
)

// 函数组件
function MyFunctionComponent(props) {
  return (
    <div style={{ color: "red" }}>
      hello world
      <span>xxxx</span>
      <p>xxxxxxxx</p>
    </div>
  )
}

// 类组件
class MyClassComponent extends React.Component {
  render() {
    return (
      <div style={{ color: "red" }}>
        hello world
        <p>{this.props.xx}</p>
      </div>
    )
  }
}

// 虚拟 DOM 对象
// const ele = {
//   $$typeof: REACT_ELEMENT,
//   key: null,
//   props: { children: "xxx" },
//   ref: null,
//   type: "div",
// }

ReactDOM.render(<MyClassComponent xx="child1" />, document.getElementById("root"))

// console.log(<MyClassComponent />, "++++")
