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
  counter = 0
  constructor(props) {
    super(props)
    this.state = { count: "0" }
  }

  updateShowText(newText) {
    this.setState({
      count: newText + "",
    })
  }

  render() {
    return (
      <div
        style={{
          color: "red",
          cursor: "pointer",
          border: "1px solid gray",
          borderRadius: "6px",
          display: "inline-block",
          padding: "6px 12px",
        }}
        onClick={() => this.updateShowText(++this.counter)}
      >
        hello world {this.state.count}
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

console.log(element, "++++")
