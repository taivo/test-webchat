"use client"

import {useMemo} from 'react'
import ReactWebChat, {createDirectLine } from 'botframework-webchat'
import webchatStore from '@/store'

export default function BotChat() {
   // NOTE: to get token directly from our site, see this
  // https://learn.microsoft.com/en-us/azure/bot-service/bot-service-channel-directline-extension-webchat-client?view=azure-bot-service-4.0
  
  const directLineToken = process.env.NEXT_PUBLIC_DIRECTLINE_TOKEN

   const directLine = useMemo(async () => {
   return createDirectLine({
      token: directLineToken
    })
  }, [directLineToken])

  console.log('webchatStore', webchatStore.getState())

  if(!directLineToken){
   return <div>Directline token not set</div>
  }

 return <ReactWebChat directLine={directLine} />
}