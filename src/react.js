import { Component } from "./Component"
import { REACT_ELEMENT, REACT_FORWARD_REF, toVNode, shallowCompare } from "./utils"

function createElement(type, properties, children) {
  const ref = properties.ref || null
  const key = properties.key || null
  ;["key", "ref", "__self", "__source"].forEach((key) => {
    delete properties[key]
  })
  const props = { ...properties }

  if (arguments.length > 3) {
    props.children = Array.prototype.slice.call(arguments, 2).map(toVNode)
  } else {
    props.children = toVNode(children)
  }

  return {
    $$typeof: REACT_ELEMENT,
    type,
    key,
    ref,
    props,
  }
}

function createRef() {
  return {
    current: null,
  }
}

function forwardRef(render) {
  return {
    $$typeof: REACT_FORWARD_REF,
    render,
  }
}

class PureComponent extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return !shallowCompare(this.props, nextProps) || !shallowCompare(this.state, nextState)
  }
}

const React = {
  createElement,
  Component,
  createRef,
  forwardRef,
  PureComponent,
}
export default React
