import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const employeesSlice = createSlice({
  name: "employees",
  initialState: initialState,
  reducers: {
    addEmployee: (state, action) => {
      const newEmployee = action.payload;
      state.push(newEmployee);
    },
  },
});

export default employeesSlice.reducer;
export const { addEmployee } = employeesSlice.actions;
