import { Client, TDLib } from '../../index'

import {
  error as Td$error,
  Chat as Td$Chat,
  User as Td$User,
  Update as Td$Update
} from '../../types/tdlib'

const cl = new Client({
  apiId: 2234,
  apiHash: 'abcdef',
  useTestDc: false
})

const client = cl

;(async () => {
  await cl.connect()

  await cl.login(() => ({
    type: 'user',
    phoneNumber: '+000',
    getAuthCode: () => Promise.resolve('str')
  }))

  cl.pause()
  cl.resume()
})()

cl.on('update', u => {
  console.log(u)
})

cl
  .on('error', e => {
    console.log(e)
  })
  .on('destroy', () => {})
  .on('response', r => {})


cl.emit('error', { _: 'error', code: 1235, message: 'MSG', })
cl.emit('destroy')
cl.emit('auth-needed')

const { on } = cl

on('destroy', () => {})

const tdlib = new TDLib('str')

;(async () => {
  const tdclient = await tdlib.create()

  const { destroy } = tdlib

  destroy(tdclient)

  tdlib.destroy({ _TDLibClientBrand: undefined })
})()

const pp: Promise<Td$User> = cl.invoke({ _: 'getMe' })

cl.invokeFuture({
  _: 'searchPublicChat',
  username: 'username'
})
  .map(chat => `Chat: ${chat.title}, id: ${chat.id}`)
  .mapRej(err => `Error: ${err.message}`)
  .fork(console.error, console.log)

client.invokeFuture({
  _: 'searchPublicChat',
  username: 'username'
})
  .map((e: Td$Chat) => e.title)
  .mapRej((e: Td$error) => e)
  .fork(console.error, (e: string) => console.log(e))
