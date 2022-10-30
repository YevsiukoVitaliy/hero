import { createSlice, configureStore } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const SuperheroApi = createApi({
  reducerPath: 'SuperheroApi',
  tagTypes: ['Superhero'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://6347f045db76843976b6460d.mockapi.io/',
  }),
  endpoints: build => ({
    getSuperhero: build.query({
      query: () => `Superhero`,
      providesTags: result =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Superhero', id })),
              { type: 'Superhero', id: 'LIST' },
            ]
          : [{ type: 'Superhero', id: 'LIST' }],
    }),
    addSuperhero: build.mutation({
      query: body => ({
        url: 'Superhero',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Superhero', id: 'LIST' }],
    }),
    deleteSuperhero: build.mutation({
      query: id => ({
        url: `Superhero/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Superhero', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetSuperheroQuery,
  useAddSuperheroMutation,
  useDeleteSuperheroMutation,
} = SuperheroApi;

export const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    filterValue(state, action) {
      return (state = action.payload);
    },
  },
});

export const { filterValue } = filterSlice.actions;

export const store = configureStore({
  reducer: {
    [SuperheroApi.reducerPath]: SuperheroApi.reducer,
    filter: filterSlice.reducer,
  },
  middleware: getDefaultMiddlware =>
    getDefaultMiddlware().concat(SuperheroApi.middleware),
});
