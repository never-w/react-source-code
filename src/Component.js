export let updaterQueue = {
  isBatch: false,
  updaters: new Set(),
}

export function flushUpdaterQueue() {
  updaterQueue.isBatch = true
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

  launchUpdate() {
    const { ClassComponentInstance, pendingStates } = this
    if (pendingStates.length === 0) return

    ClassComponentInstance.state = this.pendingStates.reduce((preState, newState) => {
      return {
        ...preState,
        ...newState,
      }
    }, ClassComponentInstance.state)

    this.pendingStates.length = 0
    ClassComponentInstance.update()
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

  update() {
    // 1. 获取重新执行render函数后的虚拟DOM 新虚拟DOM
    // 2. 根据新虚拟DOM生成新的真实DOM
    // 3. 将真实DOM挂载到页面上
  }
}
