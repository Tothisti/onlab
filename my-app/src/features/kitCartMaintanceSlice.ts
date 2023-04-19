/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'
import { type RootState } from '../app/store'
import myAxios from '../app/api/axiosInstance'
import { type ProductionLine } from '../models/api/ProductionLine'
import { type AxiosResponse } from 'axios'
import GenerateHeaders from '../app/api/GenerateApiHeaders'
import { type DashboardData } from '../models/api/DashboardData'

interface IinitialState {
  isEditFormOpen: boolean
}

const initialState: IinitialState = {
  isEditFormOpen: false
}

export const kitCartMaintanceSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setStateOfEditForm (state, action: PayloadAction<boolean>) {
      state.isEditFormOpen = action.payload
    }
  }
})

export default kitCartMaintanceSlice.reducer

export const { setStateOfEditForm } = kitCartMaintanceSlice.actions

// selectors
export const selectIsEditFormOpen = (state: RootState): boolean => {
  return state.kitCartMaintance.isEditFormOpen
}
