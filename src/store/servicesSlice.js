import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import {useGetData} from '../hooks/useGetData'
 
export const getServices= createAsyncThunk('service', async(_,thunkAPI) =>{
  try{
const res = await useGetData('service');
// const data = await res.json();
return res;
   }catch(error) {
console.log(error);
  }
})

 
;

const initialState = {
  category:null,
  };

const servicesSlice = createSlice({
  name: "services", 
  initialState,
  reducers: {
   },
  extraReducers: (builder) => {
     builder.addCase(getServices.fulfilled, (state, action) => {
      state.services=action.payload;
     })

   
    
  },
})
export default servicesSlice.reducer;
