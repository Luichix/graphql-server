import { transformToStyle } from '../script'
const { decisions } = require('./tokens')

describe('Transform Tokens to Styles', () => {
  it('Style property return values', () => {
    const result = transformToStyle(null, decisions)
    expect(result).toContain('color')
  })
})
