import React, { useState } from 'react'
import io from 'socket.io-client'
const socket = io.connect(`http://localhost:3001`)
const App = () => {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const joinRoom = () => {
    if(username !== "" && room !== "")
    {
      socket.emit("join_room",room)
    }
  }
  return (
    <div className='App'>
      So first we need to install a library in react which allow us to connect with socket io
      <h3>Join A Chat</h3>
      <input type="text" placeholder='John...' onChange={(e) => {setUsername(e.target.value)}}/>
      <input type="text" placeholder='Room ID...' onChange={(e)=>{setRoom(e.target.value)}} />
      <button onClick={joinRoom}>Join A Room</button>
    </div>
  )
}

export default App