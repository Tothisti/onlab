/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'
import { type RootState } from '../app/store'
import myAxios from '../app/api/axiosInstance'
import { type ProductionLine } from '../models/api/ProductionLine'
import { type AxiosResponse } from 'axios'
import GenerateHeaders from '../app/api/GenerateApiHeaders'
import { type DashboardData } from '../models/api/DashboardData'

export const GetDashboardData = createAsyncThunk<AxiosResponse<DashboardData[], any>, void, { state: RootState }>(
  'dashboard/getDashboardData',
  async (_, { getState }) => {
    const state = getState()
    const prodLine = state.dashboard.productionLine ?? ''
    const prepArea = state.dashboard.preparationArea
    const query = prepArea !== null && prepArea !== ''
      ? `?PreparationArea=${prepArea}`
      : ''
    return await myAxios.get<DashboardData[]>(
      'AssemblyManufacturing/Kitting/KittingDashboard/GetDashboardData/US10/' + prodLine + query,
      { headers: GenerateHeaders(state.login.token) }
    )
  })

interface IinitialState {
  productionLine: string | null
  preparationArea: string | null
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
}

const initialState: IinitialState = {
  productionLine: null,
  preparationArea: null,
  status: 'idle'
}

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    selectProductionLine (state, action: PayloadAction<string>) {
      state.productionLine = action.payload
    },
    selectPreparationArea (state, action: PayloadAction<string>) {
      state.preparationArea = action.payload
    }
  }
})

export default dashboardSlice.reducer

export const { selectProductionLine, selectPreparationArea } = dashboardSlice.actions

export const selectProdLine = (state: RootState): string | null => {
  return state.dashboard.productionLine
}

export const selectPrepArea = (state: RootState): string | null => {
  return state.dashboard.preparationArea
}
