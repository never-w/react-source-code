export const REACT_ELEMENT = Symbol("react.element")
export const REACT_FORWARD_REF = Symbol("react.forward_ref")
export const REACT_TEXT = Symbol("react.text")

export const CREATE = Symbol("react.dom.diff.create")
export const MOVE = Symbol("react.dom.diff.move")

export const toVNode = (node) => {
  if (typeof node === "string" || typeof node === "number") {
    return {
      type: REACT_TEXT,
      props: {
        text: node,
      },
    }
  }

  return node
}

export function deepClone(data) {
  const type = getType(data)
  let resultValue

  if (type !== "array" && type !== "object") return data

  if (type === "array") {
    resultValue = []
    data.forEach((item) => {
      resultValue.push(deepClone(item))
    })
    return resultValue
  }

  if (type === "object") {
    resultValue = {}
    for (const key in data) {
      if (Object.hasOwnProperty.call(data, key)) {
        const element = data[key]
        resultValue[key] = deepClone(element)
      }
    }
    return resultValue
  }
}

export function getType(obj) {
  const typeMap = {
    "[Object Boolean]": "boolean",
    "[Object Number]": "number",
    "[Object String]": "string",
    "[Object Function]": "function",
    "[Object Array]": "array",
    "[Object Date]": "date",
    "[Object RegExp]": "regExp",
    "[Object Undefined]": "undefined",
    "[Object Null]": "null",
    "[Object Object]": "object",
  }
  return typeMap[Object.prototype.toString.call(obj)]
}
