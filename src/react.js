import { REACT_ELEMENT } from "./utils"

function createElement(type, properties, children) {
  const ref = properties.ref || null
  const key = properties.key || null
  ;["key", "ref", "__self", "__source"].forEach((key) => {
    delete properties[key]
  })
  const props = { ...properties }

  if (arguments.length > 3) {
    props.children = Array.prototype.slice.call(arguments, 2)
  } else {
    props.children = children
  }

  return {
    $$typeof: REACT_ELEMENT,
    type,
    key,
    ref,
    props,
  }
}

const React = { createElement }
export default React