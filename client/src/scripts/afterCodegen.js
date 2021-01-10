// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs')

const generatedPath = './src/generated/graphql.tsx'
const logRows = fs.readFileSync(generatedPath).toString().split('\n')

logRows.unshift('//@ts-nocheck')
logRows.unshift('// eslint-disable-next-line @typescript-eslint/ban-ts-comment')
fs.writeFileSync(generatedPath, logRows.join('\n'))
