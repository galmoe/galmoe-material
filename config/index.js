const host = 'https://galmoe.github.io/galmoe'
const backEnd = process.env.NODE_ENV === 'production'
  ? 'http://47.94.16.206:3000'
  : 'http://localhost:3000'

export {
  host,
  backEnd
}
