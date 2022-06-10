const fs = require('fs')
const objectParse = require('./objectParse')

const createJson = (data) => {
  const json = JSON.stringify(data, null, 2)

  fs.writeFile('./src/assets/word.json', json, 'utf8', (error) => {
    if (error) throw error
    console.log('🎨 Custom properties created!')
  })
}

createJson(objectParse)
