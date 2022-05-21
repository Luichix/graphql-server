const toCapitalize = require('./__test__/utils/toCapitalize')
const toPascalCase = require('./__test__/utils/toPascalCase')
const { choices, decisions } = require('./__test__/tokens')
const fs = require('fs')

const cleanLines = (string = '') => string.trim().replace(/^\n\n/gm, '\n')

function transformToStyle(parentKey, object) {
  const objectKeys = Object.keys(object)

  return objectKeys.reduce((transformedTokensCSS, objectKey) => {
    const value = object[objectKey]
    const customProperty = parentKey
      ? `${parentKey}${toCapitalize(objectKey)}`
      : `${objectKey}`

    if (Array.isArray(value)) {
      return `${transformedTokensCSS}\n${value
        .map((val) => `  ${customProperty}${toPascalCase(val)}: '${val}',`)
        .join('\n')}`
    } else if (typeof value === 'object') {
      return `${transformedTokensCSS}\n${transformToStyle(
        customProperty,
        value
      )}`
    }

    const label = `${parentKey}${toCapitalize(objectKey)}`
    if (typeof value === 'string') {
      return `${transformedTokensCSS}\n  ${label}: '${value}',`
    } else if (typeof value === 'number') {
      return `${transformedTokensCSS}\n  ${label}: ${value},`
    }
  }, '')
}

function buildStyles() {
  const transformedChoices = transformToStyle(null, choices)
  const transformedDecisions = transformToStyle(null, decisions)
  const customProperties = `${transformedChoices}${transformedDecisions}`

  const data = `const tokens = {\n  ${cleanLines(
    customProperties
  )}\n}\nexport default tokens`

  fs.writeFile('./tokens.js', data, 'utf8', (error) => {
    if (error) throw error
    console.log('🎨 Custom properties created!')
  })
}

buildStyles()

module.exports = transformToStyle
