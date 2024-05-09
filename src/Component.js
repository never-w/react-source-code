import { findDomByVNode, updateDomTree } from "./react-dom"
import { deepClone } from "./utils"

export let updaterQueue = {
  isBatch: false,
  updaters: new Set(),
}

export function flushUpdaterQueue() {
  updaterQueue.isBatch = false
  for (let updater of updaterQueue.updaters) {
    updater.launchUpdate()
  }
  updaterQueue.updaters.clear()
}

class Updater {
  constructor(ClassComponentInstance) {
    this.ClassComponentInstance = ClassComponentInstance
    this.pendingStates = []
  }

  addState(partialState) {
    this.pendingStates.push(partialState)
    this.preHandleForUpdate()
  }

  preHandleForUpdate() {
    /**
     * 批量更新处理逻辑
     * this.setState(...)
     * this.setState(...)
     */
    if (updaterQueue.isBatch) {
      updaterQueue.updaters.add(this)
    } else {
      // 立即更新
      this.launchUpdate()
    }
  }

  launchUpdate(nextProps) {
    if (this.pendingStates.length === 0 && !nextProps) return
    let isShouldUpdate = true

    let prevProps = deepClone(this.ClassComponentInstance.props)
    let prevState = deepClone(this.ClassComponentInstance.state)

    const nextState = this.pendingStates.reduce((preState, newState) => {
      return {
        ...preState,
        ...newState,
      }
    }, this.ClassComponentInstance.state)
    this.ClassComponentInstance.state = nextState
    if (nextProps) this.ClassComponentInstance.props = nextProps
    this.pendingStates.length = 0
    if (this.ClassComponentInstance.shouldComponentUpdate && !this.ClassComponentInstance.shouldComponentUpdate(nextProps, nextState)) {
      isShouldUpdate = false
    }

    if (isShouldUpdate) this.ClassComponentInstance.update(prevProps, prevState)
  }
}

export class Component {
  static IS_CLASS_COMPONENT = true
  constructor(props) {
    this.updater = new Updater(this)
    this.state = {}
    this.props = props
  }

  setState(partialState) {
    // 1. 合并属性
    // this.state = { ...this.state, ...partialState }
    // 2. 重新渲染进行更新
    // this.update()
    this.updater.addState(partialState)
  }

  update(prevProps, prevState) {
    // 1. 获取重新执行render函数后的虚拟DOM 新虚拟DOM
    // 2. 根据新虚拟DOM生成新的真实DOM
    // 3. 将真实DOM挂载到页面上
    let oldVNode = this.oldVNode
    let oldDOM = findDomByVNode(oldVNode)

    if (this.constructor.getDerivedStateFromProps) {
      const newState = this.constructor.getDerivedStateFromProps(this.props, this.state)
      this.state = { ...this.state, ...newState }
    }

    let snapshot = this.getSnapshotBeforeUpdate && this.getSnapshotBeforeUpdate(prevProps, prevState)
    let newVNode = this.render()
    updateDomTree(oldVNode, newVNode, oldDOM)
    this.oldVNode = newVNode

    if (this.componentDidUpdate) this.componentDidUpdate(this.props, this.state, snapshot)
  }
}
