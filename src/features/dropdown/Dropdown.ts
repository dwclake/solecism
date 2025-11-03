/*
 * The redux slice responsible for managing the state of the navigation dropdown
 *
 * @TODO rename this so it is specific to the navigation dropdown, maybe
 */

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const dropdown = createSlice({
    name: 'dropdown',
    initialState: {
        isOpen: false
    },
    reducers: {
        setIsOpen: (state, action: PayloadAction<boolean>) => {
            state.isOpen = action.payload;
        }
    }
});

export const { setIsOpen } = dropdown.actions;
export default dropdown.reducer;