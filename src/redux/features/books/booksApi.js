import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import getBaseURL from '../../../utils/baseURL'


const baseQuery = fetchBaseQuery({
    baseUrl: `${getBaseURL()}/api/books`,
    credentials: 'include',
    prepareHeaders: (Headers) => {
        const token = localStorage.getItem('token');
        if(token){
            Headers.set('Authorization', `Bearer ${token}`);
        }
        return Headers;
    }
})

const BooksApi = createApi({
    reducerPath: 'bookApi',
    baseQuery,
    
    tagTypes :['Books'],

    endpoints: (builder) => ({
    // 🟢 GET all books
    fetchAllBooks : builder.query({
      query: () => "/",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: "Book", id: _id })),
              { type: "Book", id: "LIST" },
            ]
          : [{ type: "Book", id: "LIST" }],
    }),

     // 🟢 GET single book
    fetchBookById: builder.query({
      query: (id) => `/${id}`,
       providesTags: (result, error, id) => [{ type: "Book", id }],
    }),

     // 🟢 CREATE a book
    addBook: builder.mutation({
      query: (newBook) => ({
        url: "/create-book",
        method: "POST",
        body: newBook,
      }),
      invalidatesTags: [{ type: "Book", id: "LIST" }],
    }),

      // 🟢 UPDATE a book
    updateBook: builder.mutation({
      query: ({ id, ...updatedBook }) => ({
        url: `/edit/${id}`,
        method: "PUT",
        body: updatedBook,
        headers: { 
            'Content-Type': 'application/json'
        }
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Book", id },
        { type: "Book", id: "LIST" },
      ],
    }),

    // 🟢 DELETE a book
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Book", id: "LIST" }],
    }),
  }),

  })

  
    

    


export const  {useFetchAllBooksQuery, useFetchBookByIdQuery, useAddBookMutation, useUpdateBookMutation, useDeleteBookMutation} = BooksApi;
export default BooksApi;