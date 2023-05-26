import React, { useEffect, useState } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import useAxios from '../../hooks/useAxios'
import { type ProductionLine } from '../../models/api/ProductionLine'
import MyDropDown from '../../components/kittingDashboard/MyDropDown'
import { type PreparationAreas } from '../../models/api/PreparationArea'
import { useAppDispatch } from '../../app/store'
import { selectPrepArea, selectProdLine, selectPreparationArea, selectProductionLine } from '../../features/dashboardSlice'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import useSignalR from '../../hooks/useSignalR'
import SignalRConnectionWrapper from '../../app/signalR/SignalRConnectionWrapper'
import * as signalR from '@microsoft/signalr'

const SearchingPanel: React.FC = () => {
  const dispatch = useAppDispatch()
  const { i18n, t } = useTranslation()
  const selectedProdLine = useSelector(selectProdLine)
  const selectedPrepArea = useSelector(selectPrepArea)
  const [prodLineData, prodLineLoadingState] = useAxios<ProductionLine[]>({
    resourcePath: 'AssemblyManufacturing/Kitting/KittingDashboard/GetProductionLines',
    HTTPMethod: 'GET'
  })

  // singalR magic
  const { connectSignalR, disconnectSignalR } = useSignalR()

  // useEffect(() => {
  //   connectSignalR([{
  //     groupName: 'DashboardHubGroup',
  //     id: '47910'
  //   }], [{
  //     methodName: 'RefreshKittingDashboard',
  //     callback: () => console.log('SIGNAL R CALLBACK LEFUTOTT'),
  //     onReconnected: () => console.log('reconnected')
  //   }])

  //   return () => {
  //     disconnectSignalR()
  //   }
  // }, [])

  useEffect(() => {
    // const connection = new SignalRConnectionWrapper('https://localhost:5001/signalr')
    const connection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:5001/signalr')
      .configureLogging(signalR.LogLevel.Debug)
      // .withAutomaticReconnect([0, 2000, 10000, 30000, 60000, 300000])
      .build()
    // connection.keepAliveIntervalInMilliseconds = 60 * 1000
    // connection.serverTimeoutInMilliseconds = 2 * 60 * 1000
    connection.start()
      .then(() => {
        console.debug(`connectionId: ${connection.connectionId}`)
        console.debug(connection.state)
        connection.invoke('JoinGroup', {
          groupName: 'PaintStationHubGroup',
          id: 'LOAD01'
          // groupName: 'DashboardHubGroup',
          // id: '47910'
        })
          .catch((error) => {
            console.warn('Connecting to SignalR failed.!!!!! ', error)
            console.debug(connection.state)
          })
        connection.on('RefreshPaintStationState', () => {
          console.debug('SignalR method called by the backend', 'RefreshPaintStationState')
        })
        // connection.on('ReceiveMessage', function (user, message) {
        //   console.log('aaaaa')
        //   console.log(user, message)
        // })
        // connection.invoke('SendMessagee', 'useralma', 'ez egy alma').catch(function (err) {
        //   return console.error(err.toString())
        // })
      })
      .catch((exception) => console.warn('Connecting to SignalR failed. ', exception))
    // connection.startConnection().then(() => {
    //   connection.connection.invoke('JoinGroup', {
    //     groupName: 'DashboardHubGroup'
    //   })
    //     .then(() => console.debug('siker'))
    //     .catch((error) => {
    //       console.log(error)
    //       console.debug('hiba')
    //     })
    // })
  }, [])

  let prodLineDropDown
  if (prodLineLoadingState === 'loading') prodLineDropDown = <CircularProgress />
  if (prodLineLoadingState === 'succeeded' && prodLineData !== null) {
    prodLineDropDown = (
      <MyDropDown
        label={t('prodLine')}
        items={prodLineData.map((item) => item.productionLineCode)}
        onSelectedItem={(selectedItem) => { dispatch(selectProductionLine(selectedItem)) }}
        defaultValue={selectedProdLine}
      />)
  }

  const [prepAreaData, prepAreaLoadingState] = useAxios<PreparationAreas[]>({
    resourcePath: 'Administration/PreparationArea/GetPreparationAreas',
    HTTPMethod: 'POST',
    headers: {
      language: i18n.language
    }
  })
  let prepAreaDropDown
  if (prepAreaLoadingState === 'loading') prepAreaDropDown = <CircularProgress />
  if (prepAreaLoadingState === 'succeeded' && prepAreaData !== null) {
    prepAreaDropDown = (
      <MyDropDown
        label={t('preparationArea')}
        items={prepAreaData.map((item) => item.areaCode)}
        onSelectedItem={(selectedItem) => { dispatch(selectPreparationArea(selectedItem)) }}
        defaultValue={selectedPrepArea}
      />)
  }
  return (
    <div>
      {prodLineDropDown}
      {prepAreaDropDown}
    </div>
  )
}

export default SearchingPanel
