import { createSlice } from '@reduxjs/toolkit'

const homeSlice = createSlice({
    name: 'home',
    initialState: {
        sideBarStatus: true,
        uploadingStatus: false,
    },
    reducers: {
        toggleSideBar: (state, actions) => {
            state.sideBarStatus = actions.payload;
        },
        toggleUploadingStatus: (state, actions) => {
            state.uploadingStatus = actions.payload;
        }
    },
})

export const { toggleSideBar, toggleUploadingStatus } = homeSlice.actions

export default homeSlice.reducer