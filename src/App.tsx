import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Balance from "./components/Balance";
import ExpenseHistory from "./components/ExpenseHistory";
import IncomeAndExpenseDisplay from "./components/IncomeAndExpenseDisplay";
import TransactionForm from "./components/TransactionForm/TransactionForm";
import { useAppDispatch } from "./hooks/hooks";
import {
	calculateBalance,
	calculateExpense,
	calculateIncome,
	fetchExpenses,
} from "./stores/features/expenseSlice";

function App() {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchExpenses());
	}, [dispatch]);

	return (
		<Container className={styles.container} style={{ maxWidth: "1000px" }}>
			<Balance />
			<IncomeAndExpenseDisplay />
			<ExpenseHistory />
			<TransactionForm />
		</Container>
	);
}

export default App;

const styles = {
	container:
		"d-flex flex-column align-items-center mt-5 card shadow rounded p-3",
};
