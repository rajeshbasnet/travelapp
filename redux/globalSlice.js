import {createSlice} from '@reduxjs/toolkit';

export const globalSlice = createSlice({
  name: 'global',
  initialState: {
    location: {},
    show: false,
    loading: true,
  },
  reducers: {
    setLocation: (state, action) => {
      state.location = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setShow: state => {
      state.show = !state.show;
    },
  },
});

export const {setLocation, setLoading, setShow} = globalSlice.actions;

export default globalSlice.reducer;
