import { REACT_ELEMENT } from "./utils"

function render(VNode, containerDOM) {
  // 将虚拟 DOM 转化成真实 DOM
  // 将得到的真实 DOM 挂载到 containerDOM 中
  mount(VNode, containerDOM)
}

function mount(VNode, containerDOM) {
  let newDOM = createDOM(VNode)
  newDOM && containerDOM.appendChild(newDOM)
}

function createDOM(VNode) {
  // 1.创建元素 2.处理元素 3.处理属性值
  const { type, props } = VNode
  let dom

  if (typeof type === "function" && VNode.$$typeof === REACT_ELEMENT) {
    return getDomByFunctionComponent(VNode)
  }
  if (type && VNode.$$typeof === REACT_ELEMENT) {
    dom = document.createElement(type)
  }

  if (props) {
    if (typeof props.children === "object" && props.children.type) {
      mount(props.children, dom)
    } else if (Array.isArray(props.children)) {
      mountArray(props.children, dom)
    } else if (typeof props.children === "string") {
      dom.appendChild(document.createTextNode(props.children))
    }
  }

  setPropsForDOM(dom, props)
  return dom
}

function getDomByFunctionComponent(VNode) {
  let { type, props } = VNode
  let renderVNode = type(props)
  if (!renderVNode) return null
  return createDOM(renderVNode)
}

function setPropsForDOM(dom, VNodeProps = {}) {
  if (!dom) return
  for (let key in VNodeProps) {
    if (key === "children") continue
    if (/^on[A-Z].*/.test(key)) {
      // TODO: 事件时再去处理
    } else if (key === "style") {
      Object.keys(VNodeProps[key]).forEach((styleName) => {
        dom.style[styleName] = VNodeProps[key][styleName]
      })
    } else {
      dom[key] = VNodeProps[key]
    }
  }
}

function mountArray(children, parent) {
  if (!Array.isArray(children)) return
  for (let i = 0; i < children.length; i++) {
    if (typeof children[i] === "string") {
      parent.appendChild(document.createTextNode(children[i]))
    } else {
      mount(children[i], parent)
    }
  }
}

const ReactDOM = {
  render,
}
export default ReactDOM
