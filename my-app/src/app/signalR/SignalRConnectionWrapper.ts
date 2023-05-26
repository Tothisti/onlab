import * as signalR from '@microsoft/signalr'

class SignalRConnectionWrapper {
  connection: signalR.HubConnection

  constructor (connectionUrl: string) {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(connectionUrl, {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets
      })
      .configureLogging(signalR.LogLevel.Debug)
      // .withAutomaticReconnect([0, 2000, 10000, 30000, 60000, 300000])
      .build()
    // this.connection.keepAliveIntervalInMilliseconds = 60 * 1000
    // this.connection.serverTimeoutInMilliseconds = 2 * 60 * 1000
  }

  startConnection = async () => {
    try {
      await this.connection.start()
      console.log('SignalR connection started.')
    } catch (err) {
      console.error('Error starting SignalR connection: ', err)
    }
  }

  stopConnection = async () => {
    try {
      await this.connection.stop()
      console.log('SignalR connection stopped.')
    } catch (err) {
      console.error('Error stopping SignalR connection: ', err)
    }
  }

  subscribeToEvent = (eventName: string, callback: (...args: any[]) => void) => {
    this.connection.on(eventName, callback)
  }
}

export default SignalRConnectionWrapper
