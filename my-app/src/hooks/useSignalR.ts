import React, { useState } from 'react'
import * as signalR from '@microsoft/signalr'
import SignalRConnectionWrapper from '../app/signalR/SignalRConnectionWrapper'

export interface Group {
  groupName: string
  id?: string | number | null
  compositeId?: (string | number)[]
}

interface IdentifiedMethod extends Method {
  id: symbol
}

const URL_SIGNALR = 'https://localhost:5001/signalr'

export interface Method {
  methodName: string
  callback: (...args: any[]) => void
  onReconnected: () => void
}

function groupToString(group: Group) {
  return `${group.groupName}_${group.id}`
}

const useSignalR = () => {
  const [isConnected, setIsConnected] = useState(false)
  const [registeredMethods, setRegisteredMethods] = useState<IdentifiedMethod[]>([])
  const [joinedGroups, setJoinedGroups] = useState<Group[]>([])
  const [closeRequested, setCloseRequested] = useState(false)
  const [activeConnection, setActiveConnection] = useState<signalR.HubConnection | null>(null)

  async function unregisterEverythingFromConnection(
    connection: signalR.HubConnection, keepConnectionAlive?: boolean) {
    registeredMethods.forEach((method) => {
      connection.off(method.methodName, method.callback)
      console.debug('SignalR method', method.methodName, 'removed')
    })
    for (const group of joinedGroups) {
      const fullGroupName = groupToString(group)
      await connection.invoke('LeaveGroup', group)
        .catch((err) => console.error(err))
      console.debug('SignalR left group', fullGroupName)
    }
    setIsConnected(false)
  }

  const connect = async (groupsToJoin: Group[], methodsToRegister: Method[]) => {
    const connection = await createConnection()
    setActiveConnection(connection)
    // join to all groups
    for (const group of groupsToJoin) {
      console.log(group)
      await connection.invoke('JoinGroup', group)
        .catch((err) => {
          console.error('baj van')
          console.error(err)
        })
      console.debug('SignalR joined group', groupToString(group))
    }

    setJoinedGroups(groupsToJoin)
    const idMethodArray = methodsToRegister.map((x) => {
      return {
        id: Symbol('descrption'),
        ...x
      } as IdentifiedMethod
    })

    // register all methods
    for (const method of idMethodArray) {
      connection.on(method.methodName, () => {
        console.debug('SignalR method called by the backend', method.methodName)
        method.callback()
      })
      console.debug('SignalR method registered', method.methodName)
    }
    setRegisteredMethods(idMethodArray)
    setIsConnected(true)
  }

  const createConnection = async (): Promise<signalR.HubConnection> => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl(URL_SIGNALR)
      .configureLogging(signalR.LogLevel.Information)
      .withAutomaticReconnect([0, 2000, 10000, 30000, 60000, 300000])
      .build()
    return await new Promise<signalR.HubConnection>((resolve, reject) => {
      connection.start()
        .then(() => {
          console.debug(`SignalR connected, connection ID=${connection.connectionId}`)
          resolve(connection)
        })
        .catch((exception) => {
          console.debug('Connecting to SignalR failed. ', exception)
          reject(exception)
        })
    })
  }

  async function close() {
    setCloseRequested(true)
    if (activeConnection !== null) {
      await unregisterEverythingFromConnection(activeConnection, true)
    }
  }

  return {
    connectSignalR: connect,
    disconnectSignalR: close
  }
}

export default useSignalR
