import {
	ActionCreatorWithPayload,
	createAsyncThunk,
	createSlice,
	PayloadAction,
} from "@reduxjs/toolkit";
import { useAppDispatch } from "../../hooks/hooks";

interface ExpenseState {
	balance: number;
	income: number;
	expense: number;
	expenseHistory: {
		date: string;
		expenseName: string;
		amount: number;
	}[];
}

export interface IExpense {
	date: string;
	expenseName: string;
	amount: string | number;
}

export interface IExpenseDispatch {
	date: number;
	expenseName: string;
	amount: string | number;
}

const initialState: ExpenseState = {
	balance: 0,
	income: 0,
	expense: 0,
	expenseHistory: [],
};

export const fetchExpenses = createAsyncThunk(
	"expense/fetchExpenses",
	async (data, thunkAPI) => {
		try {
			const response = await fetch("http://localhost:8080/expense/fetchAll", {
				method: "GET",
			});

			const data = response.json();
			return data;
		} catch (error: any) {
			thunkAPI.rejectWithValue(error.message);
		}
	}
);

export const saveExpense = createAsyncThunk(
	"expense/saveExpense",
	async (expense: IExpenseDispatch, thunkAPI) => {
		try {
			const response = await fetch("http://localhost:8080/expense/add", {
				method: "POST",

				headers: {
					"Content-Type": "application/json",
				},

				body: JSON.stringify({ ...expense }),
			});

			const data = response.json();
			return data;
		} catch (error: any) {
			thunkAPI.rejectWithValue(error.message);
		}
	}
);

const expenseSlice = createSlice({
	name: "expense",
	initialState,
	reducers: {
		addExpenseHistory: (state, action: PayloadAction<IExpense>) => {
			if (typeof action.payload.amount !== "number") {
				const newExpense = {
					date: action.payload.date,
					expenseName: action.payload.expenseName,
					amount: parseFloat(action.payload.amount),
				};

				state.expenseHistory.push(newExpense);
			}
		},
		calculateBalance: (state) => {
			state.balance = state.expenseHistory.reduce(
				(accumulator, expense) => accumulator + expense.amount,
				0
			);
		},
		calculateIncome: (state) => {
			state.income = state.expenseHistory.reduce((accumulator, expense) => {
				return expense.amount > 0 ? accumulator + expense.amount : accumulator;
			}, 0);
		},
		calculateExpense: (state) => {
			state.expense = state.expenseHistory.reduce((accumulator, expense) => {
				return expense.amount < 0
					? accumulator + Math.abs(expense.amount)
					: accumulator;
			}, 0);
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchExpenses.fulfilled, (state, action) => {
			state.expenseHistory = action.payload;
		});

		builder.addCase(saveExpense.fulfilled, (state, action) => {
			state.expenseHistory.push(action.payload); // do nothing because we will fetch expenses again???
		});
	},
});

export const {
	calculateBalance,
	addExpenseHistory,
	calculateExpense,
	calculateIncome,
} = expenseSlice.actions;

export default expenseSlice.reducer;
