import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { fetchExpenses } from "../../store/expense/expenseSlice";
import { useAppDispatch } from "../../utils/hooks/hooks";
import Balance from "./Balance";
import ExpenseHistory from "./ExpenseHistory";
import IncomeAndExpenseDisplay from "./IncomeAndExpenseDisplay";
import TransactionForm from "./TransactionForm/TransactionForm";
import { useSavedState } from "../../utils/hooks/useSavedState";

const Dashboard = () => {
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
};

export default Dashboard;

const styles = {
	container:
		"d-flex flex-column align-items-center mt-5 card shadow rounded p-3",
};
