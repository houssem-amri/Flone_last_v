import React, { useEffect, useState } from 'react'
import Cbot from '../chatbot.js/Cbot'

export default function Icon() {
    const [act,setAct]=useState(false)
    useEffect(()=>{
            console.log("actbot",act)
    },[act])
  return (
    <div>
    <a
      style={{ position: "fixed", bottom: "3%", left: 0 , zIndex:"100" }}
      onClick={()=>setAct(!act)}
    >
      <img
      style={{width:'70px',borderRadius:'100%'}}
      src="https://static.vecteezy.com/system/resources/previews/004/226/520/original/chatbot-message-color-icon-chat-bot-artificial-conversational-entity-virtual-assistant-digital-support-service-artificial-intelligence-isolated-illustration-vector.jpg" 
      // src="https://res.cloudinary.com/socila-marketing/image/upload/v1650208223/istockphoto-1073043572-612x612_e3mpom.jpg" 
      />
    </a>
    {act && <Cbot closer = {setAct}/>}
  </div>
  
  )
}
