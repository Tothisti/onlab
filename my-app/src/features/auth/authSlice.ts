import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { type RootState } from '../../app/store'

export const loginUser = createAsyncThunk(
  'login/loginUser',
  async (loginData: { usern: string, passw: string }) => {
    // call login api endpoint
    const response: {
      user: string
      token: string
    } = await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          user: loginData.usern,
          token: 'random hash'
        })
      }, 2000)
    })

    return response
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
  reducers: {},
  extraReducers (builder) {
    builder
      .addCase(loginUser.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.user = action.payload.user
        state.token = action.payload.token
      })
  }
})

export default authSlice.reducer

// selectors
export const selectUser = (state: RootState): string | null => {
  return state.login.user
}
