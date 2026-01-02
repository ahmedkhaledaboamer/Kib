

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useGetData } from "../hooks/useGetData";
import { useInsertData } from "../hooks/useInsertData";

/* =========================
   GET SERVICES
========================= */
export const getServices = createAsyncThunk(
  "services/getServices",
  async (_, thunkAPI) => {
    try {
      const res = await useGetData("service");
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response || error.message
      );
    }
  }
);

/* =========================
   POST WEB SERVICES BOOKING
========================= */
export const createServiceBooking = createAsyncThunk(
  "services/createBooking",
  async (data, thunkAPI) => {
    try {
      const res = await useInsertData("web-services-booking", data);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || error.message
      );
    }
  }
);

/* =========================
   INITIAL STATE
========================= */
const initialState = {
  services: [],
  booking: null,
  loading: false,
  error: null,
};

/* =========================
   SLICE
========================= */
const servicesSlice = createSlice({
  name: "services",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      /* ===== GET SERVICES ===== */
      .addCase(getServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getServices.fulfilled, (state, action) => {
        state.loading = false;
        state.services = action.payload;
      })
      .addCase(getServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ===== CREATE BOOKING ===== */
      .addCase(createServiceBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createServiceBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.booking = action.payload;
      })
      .addCase(createServiceBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default servicesSlice.reducer;





// import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
// import {useGetData} from '../hooks/useGetData'
 
// export const getServices= createAsyncThunk('service', async(_,thunkAPI) =>{
//   try{
// const res = await useGetData('service');
// // const data = await res.json();
// return res;
//    }catch(error) {
// console.log(error);
//   }
// })

 
// ;

// const initialState = {
//   category:null,
//   };

// const servicesSlice = createSlice({
//   name: "services", 
//   initialState,
//   reducers: {
//    },
//   extraReducers: (builder) => {
//      builder.addCase(getServices.fulfilled, (state, action) => {
//       state.services=action.payload;
//      })

   
    
//   },
// })
// export default servicesSlice.reducer;
