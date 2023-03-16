import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useAppDispatch } from "../../hooks/hooks";
import {
	addExpenseHistory,
	calculateBalance,
	calculateExpense,
	calculateIncome,
	IExpense,
	saveExpense,
} from "../../stores/features/expenseSlice";
import TransactionDatePicker from "./TransactionDatePicker";

const TransactionForm: React.FC = () => {
	const dispatch = useAppDispatch();

	const [expense, setExpense] = useState<IExpense>({
		date: new Date().toDateString(),
		expenseName: "",
		amount: 0,
	});

	const onChange = <K extends keyof IExpense>(key: K, value: IExpense[K]) => {
		setExpense({ ...expense, [key]: value });
	};

	const onSubmit = (e: React.SyntheticEvent) => {
		e.preventDefault();
		if (
			typeof expense.amount === "string" &&
			isNaN(parseFloat(expense.amount))
		) {
			return;
		}
		const expenseForDispatch = {
			...expense,
			date: Date.parse(expense.date),
		};
		console.log(expenseForDispatch);
		dispatch(saveExpense(expenseForDispatch));
		// dispatch(addExpenseHistory(expense));
		dispatch(calculateBalance());
		dispatch(calculateIncome());
		dispatch(calculateExpense());
	};

	return (
		<div className="mt-3">
			<Form className="d-flex flex-column align-items-center">
				<h3>Add new transaction</h3>
				<Form.Group className="mb-3">
					<Form.Control
						onChange={
							(e) => onChange(e.target.name as keyof IExpense, e.target.value) //e.target.name is expenseName (the value specified in name field)
						}
						placeholder="Transaction name"
						name="expenseName"
					/>
				</Form.Group>

				<Form.Group className="mb-3">
					<Form.Control
						onChange={(e) =>
							onChange(e.target.name as keyof IExpense, e.target.value)
						}
						placeholder="Transaction amount"
						name="amount"
					/>
				</Form.Group>

				<TransactionDatePicker onChange={onChange} />
				<Button variant="primary" type="submit" onClick={onSubmit}>
					Add
				</Button>
			</Form>
		</div>
	);
};

export default TransactionForm;
