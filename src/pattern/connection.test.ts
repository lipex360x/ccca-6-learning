import { Connection } from './connection'

test('deve retornar dados do banco de dados', async () => {
  const connection = new Connection()
  const items = await connection.query('select * from items', [])
  expect(items).toHaveLength(3)
})
