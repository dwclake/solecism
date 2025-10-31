/**
 * The redux store for the website
 *
 * @author dwclake
 */

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
    useDispatch as reduxUseDispatch,
    useSelector as reduxUseSelector,
    type TypedUseSelectorHook
} from "react-redux";

import Dropdown from "./dropdown/Dropdown";

const root = combineReducers({
    dropdown: Dropdown
});

export const store = configureStore({
    reducer: root
});

type Dispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useDispatch: () => Dispatch = reduxUseDispatch;
export const useSelector: TypedUseSelectorHook<RootState> = reduxUseSelector;