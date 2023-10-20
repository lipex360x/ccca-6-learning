// import { ExpressAdapter } from './ExpressAdapter'
// import { HapiAdapter } from './HapiAdapter'
import { ElysiaAdapter } from './ElysiaAdapter'

const books = [
  { title: 'Clean Code' },
  { title: 'Refactoring' },
  { title: 'Domain-Driven Design' },
]

// const http = new ExpressAdapter()
// const http = new HapiAdapter()
const http = new ElysiaAdapter()

http.on('get', '/books', () => {
  return books
})

http.listen(3000)
