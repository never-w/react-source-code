// import ReactDOM from 'react-dom'
// import React from 'react'

// 自己实现的
import ReactDOM from "./react-dom"
import React from "./react"

// class ClassComponent extends React.Component {
//   counter = 0
//   constructor(props) {
//     super(props)
//     this.state = { count: "0" }
//   }

//   updateShowText(newText) {
//     this.setState({
//       count: newText + "",
//     })
//     this.setState({
//       count: newText + "",
//     })
//   }

//   render() {
//     return (
//       <div
//         style={{
//           color: "red",
//           cursor: "pointer",
//           border: "1px solid gray",
//           borderRadius: "6px",
//           display: "inline-block",
//           padding: "6px 12px",
//         }}
//         onClick={() => this.updateShowText(++this.counter)}
//       >
//         hello world {this.state.count}
//       </div>
//     )
//   }
// }

// const ForwardRefFunctionComponent = React.forwardRef((props, ref) => {
//   return <input ref={ref}>MyForwardRefFunctionComponent</input>
// })

// function FunctionComponent(props) {
//   const forwardRef = React.createRef()
//   const classRef = React.createRef()
//   const elementRef = React.createRef()

//   const changeInput = () => {
//     forwardRef.current.value = "ForwardRef...."
//     classRef.current.updateShowText("100")
//     elementRef.current.value = "..."
//   }

//   return (
//     <div>
//       <ForwardRefFunctionComponent ref={forwardRef} />
//       <br />
//       <input ref={elementRef} />
//       <br />
//       <input type="button" onClick={changeInput} value={"点击加省略号"} />
//       <br />
//       <ClassComponent ref={classRef} />
//     </div>
//   )
// }

// 测试 DIFF 算法
class MyClassComponent extends React.Component {
  isReset = false
  oldArr = ["A", "B", "C", "D", "E"]
  newArr = ["C", "B", "E", "F", "A"]
  constructor(props) {
    super(props)
    this.state = { arr: this.oldArr }
  }

  updateShowArr() {
    this.setState({
      arr: this.isReset ? this.oldArr : this.newArr,
    })
    this.isReset = !this.isReset
  }

  render() {
    return (
      <div>
        <div
          className="test=class"
          onClick={() => this.updateShowArr()}
          style={{
            color: "red",
            cursor: "pointer",
            border: "1px solid gray",
            borderRadius: "6px",
            display: "inline-block",
            padding: "6px 12px",
          }}
        >
          Change The Text
        </div>
        <div>
          {this.state.arr.map((item) => {
            return <div key={item}> {item}</div>
          })}
        </div>
      </div>
    )
  }
}

ReactDOM.render(<MyClassComponent />, document.getElementById("root"))
