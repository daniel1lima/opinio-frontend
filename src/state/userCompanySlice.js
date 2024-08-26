import { createSlice } from '@reduxjs/toolkit';

const userCompanySlice = createSlice({
  name: 'userCompany',
  initialState: { user: null, companyId: null },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setCompanyId: (state, action) => {
      state.companyId = action.payload;
    },
  },
});

export const { setUser, setCompanyId } = userCompanySlice.actions;

export default userCompanySlice.reducer;