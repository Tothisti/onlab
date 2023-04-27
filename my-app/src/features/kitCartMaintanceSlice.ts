/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { type RootState } from '../app/store'
import myAxios from '../app/api/axiosInstance'
import { type AxiosResponse } from 'axios'
import GenerateHeaders from '../app/api/GenerateApiHeaders'
import { type KitCartRecord } from '../models/api/KitCartRecord'

export const getKitCartDataRows = createAsyncThunk<AxiosResponse<KitCartRecord[], any>, void, { state: RootState }>(
  'kitCartMaintance/getDashboardData',
  async (_, { getState }) => {
    const state = getState()
    return await myAxios.get<KitCartRecord[]>(
      'Administration/KitCart/GetKitCartRecords',
      { headers: GenerateHeaders(state.login.token) }
    )
  })

interface IinitialState {
  data: KitCartRecord[] | null
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
}

const initialState: IinitialState = {
  data: null,
  status: 'idle'
}

export const kitCartMaintanceSlice = createSlice({
  name: 'kitCartMaintance',
  initialState,
  reducers: {
  },
  extraReducers (builder) {
    builder
      .addCase(getKitCartDataRows.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getKitCartDataRows.fulfilled, (state, action) => {
        const { data } = action.payload
        state.status = 'succeeded'
        state.data = data
      })
      .addCase(getKitCartDataRows.rejected, (state) => {
        state.status = 'failed'
      })
  }
})

export default kitCartMaintanceSlice.reducer

// selectors
export const selectKitCartData = (state: RootState): KitCartRecord[] | null => {
  return state.kitCartMaintance.data
}
