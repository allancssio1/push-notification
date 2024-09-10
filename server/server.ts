import express from 'express'
import { Expo } from 'expo-server-sdk'
import cors from 'cors'

const server = express()

server.use(cors({}))
server.use(express.json())

server.get('/', async (req, res) => {
  console.log('rota get')
  return res.send('Achou a rota')
})

server.post('/', async (req, res) => {
  const { token, title, body, sound } = req.body

  console.log('acessou a rota', { token, title, body, sound })
  if (!token || !title || !body || !sound)
    throw new Error('Erro no envio de notificação')

  const expo = new Expo()

  expo.sendPushNotificationsAsync([
    {
      to: token,
      badge: 1,
      title,
      body,
      sound,
    },
  ])

  return res.send('Achou a rota')
})

server.listen(3333, () => console.log('server runnig'))
