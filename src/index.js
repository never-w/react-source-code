// import ReactDOM from 'react-dom'
// import React from 'react'

// 自己实现的
import ReactDOM from "./react-dom"
import React, { useState, useEffect, useLayoutEffect, useRef } from "./react"

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

// class Greeting extends React.PureComponent {
//   render() {
//     console.log("Greeting render")

//     return (
//       <h3>
//         Hello {this.props.name && "，"} {this.props.name}
//       </h3>
//     )
//   }
// }

// memo 测试
// const Greeting = React.memo(function Greeting({ name }) {
//   console.log("Greeting render")
//   return (
//     <h3>
//       Hello{name && "，"}
//       {name}!
//     </h3>
//   )
// })

// class MyClassComponent extends React.Component {
//   constructor(props) {
//     super(props)
//     this.state = { name: "", address: "" }
//   }

//   componentDidUpdate() {
//     console.log("MyClassComponent  componentDidUpdate")
//   }

//   setName(newName) {
//     this.setState({ name: newName })
//   }

//   setAddress(newAddress) {
//     this.setState({ address: newAddress })
//   }

//   render() {
//     return (
//       <div>
//         <label>
//           Name:
//           <input onInput={(e) => this.setName(e.target.value)} />
//         </label>
//         <br />
//         <label>
//           Address:
//           <input onInput={(e) => this.setAddress(e.target.value)} />
//         </label>
//         <Greeting name={this.state.name} />
//       </div>
//     )
//   }
// }

// 测试 useReducer
// function reducer(state, action) {
//   if (action.type === "incremented_age") {
//     return {
//       age: state.age + 1,
//     }
//   }

//   throw Error("Unknown action.")
// }

// function Counter() {
//   const [state, dispatch] = useReducer(reducer, { age: 42 })

//   return (
//     <div>
//       <button
//         onClick={() => {
//           dispatch({ type: "incremented_age" })
//         }}
//       >
//         Increment age
//       </button>
//       <p>Hello! You are {state.age}</p>
//     </div>
//   )
// }

// 测试 useEffect
// function createConnection(serverUrl, roomId) {
//   // 真正的实现会实际连接到服务器
//   return {
//     connect() {
//       console.log('✅ Connecting to "' + roomId + '" room at ' + serverUrl + "...")
//     },
//     disconnect() {
//       console.log('❌ Disconnected from "' + roomId + '" room at ' + serverUrl)
//     },
//   }
// }

// function ChatRoom({ roomId }) {
//   const [serverUrl, setServerUrl] = useState("https://localhost:1234")

//   useLayoutEffect(() => {
//     const connection = createConnection(serverUrl, roomId)
//     connection.connect()
//     return () => {
//       connection.disconnect()
//     }
//   }, [roomId, serverUrl])

//   return (
//     <div>
//       <label>
//         Server URL: <input value={serverUrl} onInput={(e) => setServerUrl(e.target.value)} />
//       </label>
//       <h1>Welcome to the {roomId} room!</h1>
//     </div>
//   )
// }

// function App() {
//   const [roomId, setRoomId] = useState("general")
//   const [show, setShow] = useState(false)

//   return (
//     <div>
//       <label>
//         Choose the chat room:{" "}
//         <select value={roomId} onChange={(e) => setRoomId(e.target.value)}>
//           <option value="general">general</option>
//           <option value="travel">travel</option>
//           <option value="music">music</option>
//         </select>
//       </label>
//       <button onClick={() => setShow(!show)}>{show ? "Close chat" : "Open chat"}</button>
//       {show && <hr />}
//       {show && <ChatRoom roomId={roomId} />}
//     </div>
//   )
// }

function Counter() {
  let ref = useRef(0)

  function handleClick() {
    ref.current = ref.current + 1
    alert("You clicked " + ref.current + " times!")
  }

  return <button onClick={handleClick}>点击！</button>
}

ReactDOM.render(<Counter />, document.getElementById("root"))
