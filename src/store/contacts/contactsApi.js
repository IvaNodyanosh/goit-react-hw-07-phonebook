import { createApi } from '@reduxjs/toolkit/query/react';
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const contactsApi = createApi({
  reducerPath: 'contacts',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://65c7fad7e7c384aada6f2473.mockapi.io/',
  }),
  tagTypes: 'contacts',
  endpoints: builder => ({
    getContacts: builder.query({
      query: () => 'contacts',
      providesTags: ['contacts'],
    }),
    addContact: builder.mutation({
      query: body => ({ url: `contacts`, method: 'POST', body }),
      invalidatesTags: ['contacts'],
    }),
    deleteContact: builder.mutation({
      query: id => ({ url: `contacts/${id}`, method: 'Delete' }),
      invalidatesTags: ['contacts'],
    }),
  }),
});

export const {
  useGetContactsQuery,
  useAddContactMutation,
  useDeleteContactMutation,
} = contactsApi;
