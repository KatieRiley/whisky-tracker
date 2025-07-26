import _ from 'lodash'

const snakeToCamel = (str) =>
  str.replace(/_([a-z])/g, (_, char) => char.toUpperCase())

const isPlainObject = (value) =>
  _.isObject(value) && !_.isArray(value) && !_.isFunction(value)

const transformKeys = (input, transformFn) => {
  if (_.isArray(input)) {
    return input.map((item) => transformKeys(item, transformFn))
  }

  if (isPlainObject(input)) {
    return Object.fromEntries(
      Object.entries(input).map(([key, value]) => [
        transformFn(key),
        transformKeys(value, transformFn),
      ])
    )
  }

  return input
}

export const keysToCamelCase = (input) => transformKeys(input, snakeToCamel)
export const keysToSnakeCase = (input) =>
  transformKeys(input, (key) => _.snakeCase(key))
