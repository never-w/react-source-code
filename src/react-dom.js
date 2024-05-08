import { REACT_ELEMENT, REACT_FORWARD_REF, REACT_TEXT, CREATE, MOVE } from "./utils"
import { addEvent } from "./event"

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
  const { type, props, ref } = VNode
  let dom

  if (type && type.$$typeof === REACT_FORWARD_REF) {
    return getDomByForwardRefFunction(VNode)
  }
  if (typeof type === "function" && VNode.$$typeof === REACT_ELEMENT && type.IS_CLASS_COMPONENT) {
    return getDomByClassComponent(VNode)
  }
  if (typeof type === "function" && VNode.$$typeof === REACT_ELEMENT) {
    return getDomByFunctionComponent(VNode)
  }

  if (type === REACT_TEXT) {
    // 处理文本节点
    dom = document.createTextNode(props.text)
  } else if (type && VNode.$$typeof === REACT_ELEMENT) {
    dom = document.createElement(type)
  }

  if (props) {
    if (typeof props.children === "object" && props.children.type) {
      mount(props.children, dom)
    } else if (Array.isArray(props.children)) {
      mountArray(props.children, dom)
    }
  }

  setPropsForDOM(dom, props)
  VNode.dom = dom
  ref && (ref.current = dom)
  return dom
}

function getDomByClassComponent(VNode) {
  let { type, props, ref } = VNode
  let instance = new type(props)
  let renderVNode = instance.render()
  instance.oldVNode = renderVNode
  // 绑定ref
  ref && (ref.current = instance)
  if (!renderVNode) return null
  return createDOM(renderVNode)
}

function getDomByForwardRefFunction(VNode) {
  const { type, props, ref } = VNode
  const renderVNode = type.render(props, ref)
  if (!renderVNode) return null
  return createDOM(renderVNode)
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
      addEvent(dom, key.toLocaleLowerCase(), VNodeProps[key])
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
    children[i].index = i
    mount(children[i], parent)
  }
}

export function findDomByVNode(VNode) {
  if (!VNode) return
  if (VNode.dom) return VNode.dom
}

export function updateDomTree(oldVNode, newVNode, oldDOM) {
  // const parentNode = oldDOM.parentNode
  // 新节点，旧节点都不存在
  // 新节点存在，旧节点不存在
  // 新节点不存在，旧节点存在
  // 新节点存在，旧节点也存在，但是类型不一样
  // 新节点存在，旧节点也存在，类型也一样 ---> 值得我们进行深入的比较，探索复用相关节点的方案
  const typeMap = {
    NO_OPERATE: !oldVNode && !newVNode,
    ADD: !oldVNode && newVNode,
    DELETE: oldVNode && !newVNode,
    REPLACE: oldVNode && newVNode && oldVNode.type !== newVNode.type,
  }
  const UPDATE_TYPE = Object.keys(typeMap).filter((key) => typeMap[key])[0]
  switch (UPDATE_TYPE) {
    case "NO_OPERATE":
      break
    case "DELETE":
      removeVNode(oldVNode)
      break
    case "ADD":
      oldDOM.parentNode.appendChild(createDOM(newVNode))
      break
    case "REPLACE":
      removeVNode(oldVNode)
      oldDOM.parentNode.appendChild(createDOM(newVNode))
      break
    default:
      deepDOMDiff(oldVNode, newVNode)
      break
  }
}

function removeVNode(VNode) {
  const currentDOM = findDomByVNode(VNode)
  if (currentDOM) currentDOM.remove()
}

function deepDOMDiff(oldVNode, newVNode) {
  const diffTypeMap = {
    // 普通标签比如 div
    ORIGIN_NODE: typeof oldVNode.type === "string",
    CLASS_COMPONENT: typeof oldVNode.type === "function" && oldVNode.type.IS_CLASS_COMPONENT,
    FUNCTION_COMPONENT: typeof oldVNode.type === "function",
    TEXT: oldVNode.type === REACT_TEXT,
  }

  const DIFF_TYPE = Object.keys(diffTypeMap).filter((key) => diffTypeMap[key])[0]
  switch (DIFF_TYPE) {
    case "ORIGIN_NODE":
      const currentDOM = (newVNode.dom = findDomByVNode(oldVNode))
      setPropsForDOM(currentDOM, newVNode.props)
      updateChildren(currentDOM, oldVNode.props.children, newVNode.props.children)
      break
    case "CLASS_COMPONENT":
      updateClassComponent(oldVNode, newVNode)
      break
    case "FUNCTION_COMPONENT":
      updateFunctionComponent(oldVNode, newVNode)
      break
    case "TEXT":
      newVNode.dom = findDomByVNode(oldVNode)
      newVNode.dom.textContent = newVNode.props.text
      break
    default:
      break
  }
}

function updateClassComponent(oldVNode, newVNode) {
  const classInstance = (newVNode.classInstance = oldVNode.classInstance)
  classInstance.updater.launchUpdate()
}

function updateFunctionComponent(oldVNode, newVNode) {
  const oldDOM = findDomByVNode(oldVNode)
  if (!oldDOM) return
  const { type, props } = newVNode
  const newRenderVNode = type(props)
  updateDomTree(oldVNode.oldRenderVNode, newRenderVNode, oldDOM)
  newVNode.oldRenderVNode = newRenderVNode
}

// DOM DIFF 算法的核心
function updateChildren(parentDOM, oldVNodeChildren, newVNodeChildren) {
  oldVNodeChildren = Array.isArray(oldVNodeChildren) ? oldVNodeChildren : [oldVNodeChildren]
  newVNodeChildren = Array.isArray(newVNodeChildren) ? newVNodeChildren : [newVNodeChildren]

  let lastNotChangedIndex = -1
  const oldKeyChildMap = {}
  oldVNodeChildren.forEach((oldVNode, index) => {
    const oldKey = oldVNode && oldVNode.key ? oldVNode.key : index
    oldKeyChildMap[oldKey] = oldVNode
  })

  // 遍历新的子虚拟DOM数组，找到可以复用但需要移动的节点，需要重新创建的节点，需要删除的节点，剩下的就是
  const actions = []
  newVNodeChildren.forEach((newVNode, index) => {
    newVNode.index = index
    const newKey = newVNode.key ? newVNode.key : index
    const oldVNode = oldKeyChildMap[newKey]
    if (oldVNode) {
      deepDOMDiff(oldVNode, newVNode)
      if (oldVNode.index < lastNotChangedIndex) {
        actions.push({
          type: MOVE,
          newVNode,
          oldVNode,
          index,
        })
      }

      delete oldKeyChildMap[newKey]
      lastNotChangedIndex = Math.max(lastNotChangedIndex, oldVNode.index)
    } else {
      actions.push({
        type: CREATE,
        newVNode,
        index,
      })
    }
  })

  const VNodeToMove = actions.filter((action) => action.type === MOVE).map((action) => action.oldVNode)
  const VNodeToDelete = Object.values(oldKeyChildMap)
  VNodeToMove.concat(VNodeToDelete).forEach((oldVNode) => {
    const currentDOM = findDomByVNode(oldVNode)
    currentDOM.remove()
  })

  actions.forEach((action) => {
    const { type, oldVNode, newVNode, index } = action
    const childNodes = parentDOM.childNodes
    const childNode = childNodes[index]
    const getDomForInsert = () => {
      if (type === CREATE) {
        return createDOM(newVNode)
      }
      if (type === MOVE) {
        return findDomByVNode(oldVNode)
      }
    }
    if (childNode) {
      console.log(childNode)
      console.log(getDomForInsert())
      parentDOM.insertBefore(getDomForInsert(), childNode)
    } else {
      parentDOM.appendChild(getDomForInsert())
    }
  })
}

const ReactDOM = {
  render,
}
export default ReactDOM
