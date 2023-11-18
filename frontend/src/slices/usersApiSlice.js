import { apiSlice } from './apiSlice'
import { USERS_URL } from '../constants/constants'

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation({
      query: data => ({
        url: `${USERS_URL}/auth`,
        method: 'POST',
        body: data
      })
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: 'POST'
      })
    })
  })
})

export const { useLoginMutation, useLogoutMutation } = usersApiSlice
