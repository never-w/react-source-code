// import ReactDOM from 'react-dom'
// import React from 'react'

// 自己实现的
import ReactDOM from './react-dom'
import React from './react'

const ele = (
  <div style={{ color: 'red' }}>
    hello world
    <span>xxxx</span>
    <p>fsdfs</p>
  </div>
)

ReactDOM.render(ele, document.getElementById('root'))

console.log(ele, '++++')
