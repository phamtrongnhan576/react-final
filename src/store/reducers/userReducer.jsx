import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userRegister: {
        taiKhoan: "",
        matKhau: "",
        email: "",
        soDt: "",
        maNhom: "",
        hoTen: "",
    },
};

const userReducer = createSlice({
    name: "userReducer",
    initialState,
    reducers: {
        handleChangeInputAction: (state, action) => {
            console.log(action.payload);
            const { id, value } = action.payload;
            state.userRegister[id] = value;
        },
    },
});

export const { handleChangeInputAction } = userReducer.actions;

export default userReducer.reducer;
