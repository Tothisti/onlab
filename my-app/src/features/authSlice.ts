import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { type RootState } from '../app/store'
import myAxios from '../app/api/axiosInstance'
import { type LoginTokenResponse } from '../models/api/LoginTokenResponse'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const md5 = require('md5')
export const loginUser = createAsyncThunk(
  'login/loginUser',
  async (loginData: { usern: string, passw: string }) => {
    let postBody = {}
    if (loginData.usern !== '') {
      postBody = {
        id: 'string',
        username: loginData.usern,
        password: md5(loginData.passw),
        token: 'string'
      }
    }
    // call login api endpoint
    return await myAxios.post<LoginTokenResponse>('Login/Token', postBody)
  })

interface IinitialState {
  user: string | null
  token: string | null
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
}

const initialState: IinitialState = {
  user: null,
  token: null,
  status: 'idle'
}

export const authSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    logoutUser: state => {
      state.user = null
      state.token = null
      state.status = 'idle'
    },
    clearStatus: state => {
      state.status = 'idle'
    }
  },
  extraReducers (builder) {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        const { data } = action.payload
        state.status = 'succeeded'
        state.user = data.username
        state.token = data.token
      })
      .addCase(loginUser.rejected, (state) => {
        state.status = 'failed'
      })
  }
})
export const { logoutUser, clearStatus } = authSlice.actions

export default authSlice.reducer

// selectors
export const selectUser = (state: RootState): string | null => {
  return state.login.user
}

export const selectToken = (state: RootState): string | null => {
  return state.login.token
}
