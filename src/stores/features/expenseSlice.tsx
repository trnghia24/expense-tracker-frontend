import {
	ActionCreatorWithPayload,
	createAsyncThunk,
	createSlice,
	PayloadAction,
} from "@reduxjs/toolkit";
import { WritableDraft } from "immer/dist/internal";
import { useAppDispatch } from "../../hooks/hooks";
import { RootState } from "../store";

interface ExpenseState {
	balance: number;
	income: number;
	expense: number;
	expenseHistory: IExpenseHistory[];
}

export interface IExpense {
	date: string;
	expenseName: string;
	amount: number;
}

export type IExpenseHistory = { id: string } & IExpense;

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

export const deleteExpenseById = createAsyncThunk(
	"expense/deleteExpenseById",
	async (id: string, thunkAPI) => {
		try {
			const response = await fetch(`http://localhost:8080/expense/${id}`, {
				method: "DELETE",

				headers: {
					"Content-Type": "application/json",
				},
			});
		} catch (error: any) {
			thunkAPI.rejectWithValue(error.message);
		}
	}
);

export const recalculateInfo = (state: WritableDraft<ExpenseState>): void => {
	expenseSlice.caseReducers.calculateBalance(state);
	expenseSlice.caseReducers.calculateExpense(state);
	expenseSlice.caseReducers.calculateIncome(state);
};

const expenseSlice = createSlice({
	name: "expense",
	initialState,
	reducers: {
		addExpenseHistory: (state, action: PayloadAction<IExpenseHistory>) => {
			state.expenseHistory.push(action.payload);
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
			recalculateInfo(state);
		});

		builder.addCase(saveExpense.fulfilled, (state, action) => {
			expenseSlice.caseReducers.addExpenseHistory(state, action);
			recalculateInfo(state);
		});

		builder.addCase(deleteExpenseById.fulfilled, (state, action) => {
			const id = action.meta.arg;

			if (id) {
				state.expenseHistory = state.expenseHistory.filter(
					(ex) => ex.id !== id
				);
			}

			recalculateInfo(state);
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
