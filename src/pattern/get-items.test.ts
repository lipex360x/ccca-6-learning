import * as sinon from 'sinon'

import { FakeItemsRepository } from './fake-items.repository'
import { GetItems } from './get-items'
import { ItemsRepository } from './items.repository'

afterEach(() => {
  sinon.restore()
})

it.skip('deve obter os items vindos do banco ', async () => {
  const repository = new ItemsRepository()
  const getItems = new GetItems(repository)
  const items = await getItems.execute()

  expect(items).toHaveLength(3)
  expect(items[0].description).toBe('Guitarra')
  expect(items[0].price).toBe(1000)
})

it('deve obter os items com um fake repository ', async () => {
  const repository = new FakeItemsRepository()
  const getItems = new GetItems(repository)
  const items = await getItems.execute()

  expect(items).toHaveLength(3)
  expect(items[0].description).toBe('Guitarra')
  expect(items[0].price).toBe(1000)
})

it('deve obter os items com um stub ', async () => {
  const repository = new ItemsRepository()
  sinon
    .stub(repository, 'getItems')
    .returns(Promise.resolve([{ description: 'Bola', price: 100 }]))

  const getItems = new GetItems(repository)
  const items = await getItems.execute()

  expect(items).toHaveLength(1)
  expect(items[0].description).toBe('Bola')
  expect(items[0].price).toBe(100)
})

it('deve obter os items com um spy ', async () => {
  const repository = new FakeItemsRepository()
  const spy = sinon.spy(repository, 'getItems')

  const getItems = new GetItems(repository)
  const items = await getItems.execute()

  expect(items).toHaveLength(3)
  expect(items[0].description).toBe('Guitarra')
  expect(items[0].price).toBe(1000)

  sinon.assert.calledOnce(spy)
})

it('deve obter os items com um mock ', async () => {
  const repository = new FakeItemsRepository()

  const getItems = new GetItems(repository)
  const mock = sinon.mock(repository)

  mock
    .expects('getItems')
    .returns(Promise.resolve([{ description: 'Bola', price: 100 }]))

  const items = await getItems.execute()

  expect(items).toHaveLength(1)
  expect(items[0].description).toBe('Bola')
  expect(items[0].price).toBe(100)

  mock.verify()
})
