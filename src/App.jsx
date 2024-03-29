import React, { useEffect, useState } from "react";

import './app.scss'

export default () => {
  const [isConnected, setIsConnected] = useState(false)
  useEffect(() => {
    const socketProtocol = 'ws' + (location.protocol === 'https:' ? 's' : '')
    const ws = new WebSocket(`${socketProtocol}://${location.host}`)
    ws.onopen = () => {
      console.log('Connected')
      ws.send('Ololo')
      setIsConnected(true)
    }

    ws.onmessage = e => {
      console.log(e.data)
    }

    ws.onclose = () => {
      console.log('Disconnected')
      setIsConnected(false)
    }
  }, [])

  return <div>
    <h1>Hello world!</h1>
    <p>{isConnected ? 'Connected' : 'Disconnected'}</p>
  </div>
}