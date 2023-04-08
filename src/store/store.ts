import { configureStore } from "@reduxjs/toolkit";
import expenseReducer from "./expense/expenseSlice";
import authReducer from "./auth/authSlice";

export const store = configureStore({
	reducer: {
		auth: authReducer,
		expense: expenseReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
