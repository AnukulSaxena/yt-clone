import { createSlice } from '@reduxjs/toolkit'

const homeSlice = createSlice({
    name: 'home',
    initialState: {
        sideBarStatus: true,
        isSideBarOpen: true,
        uploadingStatus: false,
    },
    reducers: {
        toggleSideBar: (state, actions) => {
            state.sideBarStatus = actions.payload;
        },
        toggleUploadingStatus: (state, actions) => {
            state.uploadingStatus = actions.payload;
        },
        toggleIsSideBarOpen: (state, actions) => {
            state.isSideBarOpen = actions.payload;
        }
    },
})

export const { toggleSideBar, toggleUploadingStatus, toggleIsSideBarOpen } = homeSlice.actions

export default homeSlice.reducer