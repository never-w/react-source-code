// import ReactDOM from 'react-dom'
// import React from 'react'

// 自己实现的
import ReactDOM from "./react-dom"
import React from "./react"

// 测试 setState 组件状态变更
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
// class MyClassComponent extends React.Component {
//   isReset = false
//   oldArr = ["A", "B", "C", "D", "E"]
//   newArr = ["C", "B", "E", "F", "A"]
//   constructor(props) {
//     super(props)
//     this.state = { arr: this.oldArr, date: new Date() }
//   }

//   updateShowArr() {
//     this.setState({
//       arr: this.isReset ? this.oldArr : this.newArr,
//     })
//     this.isReset = !this.isReset
//   }

//   componentDidMount() {
//     this.timerID = setInterval(() => this.tick(), 1000)
//     console.log("componentDidMount")
//   }

//   componentWillUnmount() {
//     clearInterval(this.timerID)
//   }

//   componentDidUpdate() {
//     console.log("componentDidUpdate", this.state.date)
//   }

//   shouldComponentUpdate(nextProps, nextState) {
//     console.log("shouldComponentUpdate")
//     return false
//   }

//   tick() {
//     this.setState({
//       date: new Date(),
//     })
//   }

//   render() {
//     return (
//       <div>
//         <div
//           className="test=class"
//           onClick={() => this.updateShowArr()}
//           style={{
//             color: "red",
//             cursor: "pointer",
//             border: "1px solid gray",
//             borderRadius: "6px",
//             display: "inline-block",
//             padding: "6px 12px",
//           }}
//         >
//           Change The Text
//         </div>
//         <div>
//           {this.state.arr.map((item) => {
//             return <div key={item}> {item}</div>
//           })}
//         </div>
//       </div>
//     )
//   }
// }

class DerivedState extends React.Component {
  constructor(props) {
    super(props)
    this.state = { preId: "wyq", email: "wyq@xx.com" }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.userId !== state.preId) {
      return {
        preId: props.userId,
        email: props.userId + "@xx.com",
      }
    }
  }

  render() {
    return (
      <div>
        <h1>Email:</h1>
        <h2>{this.state.email}</h2>
      </div>
    )
  }
}

class ParentClass extends React.Component {
  constructor(props) {
    super(props)
    this.state = { id: "wyq" }
  }

  changeUser() {
    this.setState({ id: "gyf" })
  }

  render() {
    return (
      <div>
        <input type="button" value={"点击改变userId"} onClick={() => this.changeUser()} />
        <DerivedState userId={this.state.id} />
      </div>
    )
  }
}

ReactDOM.render(<ParentClass />, document.getElementById("root"))
