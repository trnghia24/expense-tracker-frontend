import { WritableDraft } from "immer/dist/internal";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Action } from "@remix-run/router";

export interface Credentials {
	email: string;
	password: string;
}

interface UserInfo {
	firstName: string;
	lastName: string;
	token: string;
}

export interface AuthState {
	loading: boolean;
	userInfo: UserInfo;
	isLoggedIn: boolean;
	error?: string | null;
}

const initialState: AuthState = {
	loading: false,
	userInfo: {
		firstName: "",
		lastName: "",
		token: "",
	},
	isLoggedIn: false,
	error: null,
};

const loginErrorState: AuthState = {
	loading: false,
	userInfo: {
		firstName: "",
		lastName: "",
		token: "",
	},
	isLoggedIn: false,
	error: "Invalid credentials",
};

const serverErrorState = {
	loading: false,
	userInfo: {
		firstName: "",
		lastName: "",
		token: "",
	},
	isLoggedIn: false,
	error: "Server error",
};

export const authenticateUser = createAsyncThunk<
	UserInfo,
	Credentials,
	{ rejectValue: string }
>("auth/authenticateUser", async (credentials: Credentials, thunkAPI) => {
	try {
		const response: Response = await fetch(
			"http://localhost:8080/api/v1/auth/authenticate",
			{
				method: "POST",

				headers: {
					"Content-Type": "application/json",
				},

				body: JSON.stringify({ ...credentials }),
			}
		);
		if (response.status == 200) return response.json();
		return thunkAPI.rejectWithValue("Login error");
	} catch (error: any) {
		return thunkAPI.rejectWithValue(error.message);
	}
});

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setSuccessfulAuthentication: (state, action: PayloadAction<UserInfo>) => {
			state.userInfo = { ...action.payload };
			state.loading = false;
			state.isLoggedIn = true;
			state.error = null;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(
			authenticateUser.fulfilled,
			(state, action: PayloadAction<UserInfo>) => {
				localStorage.setItem("token", JSON.stringify(action.payload.token));
				localStorage.setItem(
					"firstName",
					JSON.stringify(action.payload.firstName)
				);
				localStorage.setItem(
					"lastName",
					JSON.stringify(action.payload.lastName)
				);
				authSlice.caseReducers.setSuccessfulAuthentication(state, action);
				window.location.href = "dashboard";
			}
		);

		builder.addCase(authenticateUser.pending, (state, action) => {
			state.loading = true;
		});

		builder.addCase(authenticateUser.rejected, (state, action) => {
			state.loading = false;
			state.isLoggedIn = false;
			state.error = action.payload;
		});
	},
});

export const { setSuccessfulAuthentication } = authSlice.actions;

export default authSlice.reducer;
