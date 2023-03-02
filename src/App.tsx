import { useState } from "react";
import { Container } from "react-bootstrap";
import Balance from "./components/Balance";
import ExpenseHistory from "./components/ExpenseHistory";
import IncomeAndExpenseDisplay from "./components/IncomeAndExpenseDisplay";
import TransactionForm from "./components/TransactionForm/TransactionForm";

function App() {
	return (
		<Container className={styles.container} style={{ maxWidth: "500px" }}>
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
