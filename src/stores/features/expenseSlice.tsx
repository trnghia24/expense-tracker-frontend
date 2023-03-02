import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ExpenseState {
	balance: number;
	income: number;
	expense: number;
	expenseHistory: {
		date: Date;
		expenseName: string;
		amount: number;
	}[];
}

export interface IExpense {
	date: Date;
	expenseName: string;
	amount: string | number;
}

const initialState: ExpenseState = {
	balance: 0,
	income: 0,
	expense: 0,
	expenseHistory: [],
};

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
});

export const {
	calculateBalance,
	addExpenseHistory,
	calculateExpense,
	calculateIncome,
} = expenseSlice.actions;

export default expenseSlice.reducer;
