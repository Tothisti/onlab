import { createSlice } from '@reduxjs/toolkit'
import { type RootState } from '../../app/store'

export const authSlice = createSlice({
  name: 'login',
  initialState: {
    user: null,
    token: null
  },
  reducers: {
  }
})

export default authSlice.reducer

// selectors
export const selectUser = (state: RootState): string | null => {
  return state.login.user
}
