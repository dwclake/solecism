/*
 * The redux store for the website
 *
 * Notes:
 * - Dropdown slice was removed; dropdown state is now local to components.
 * - This file finalizes typing for the store and the typed hooks.
 */

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
    useDispatch as reduxUseDispatch,
    useSelector as reduxUseSelector,
    type TypedUseSelectorHook
} from "react-redux";

/* No top-level reducers at the moment. Keep a placeholder `rootReducer`
   so the store shape is explicit and easy to extend later. */
const rootReducer = combineReducers({});

export const store = configureStore({
    reducer: rootReducer,
});

/* Strongly-typed helpers for components */
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

/* Export typed hooks to use across the app */
export const useDispatch: () => AppDispatch = reduxUseDispatch;
export const useSelector: TypedUseSelectorHook<RootState> = reduxUseSelector;