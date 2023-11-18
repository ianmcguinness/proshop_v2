import { apiSlice } from '@reduxjs/toolkit/query/react'
import { USERS_URL } from '../constants/constants'

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation({
      query: data => ({
        url: `${USERS_URL}/auth`,
        method: 'POST',
        body: data
      })
    })
  })
})

export const { useLoginMutation } = usersApiSlice
