import React from "react";
import { ListGroup, Stack } from "react-bootstrap";
import { useAppSelector } from "../hooks/hooks";
import MoneyDisplay from "./MoneyDisplay";

const IncomeAndExpenseDisplay: React.FC = () => {
	const income = useAppSelector((state) => state.expense.income);
	const expense = useAppSelector((state) => state.expense.expense);
	return (
		<ListGroup
			horizontal
			style={{ width: "100%" }}
			className="justify-content-center border-0">
			<ListGroup.Item className="border-0">
				<MoneyDisplay
					type="income"
					value={income}
					displayStyle="text-success"
				/>
			</ListGroup.Item>

			<ListGroup.Item className="border-0">
				<MoneyDisplay
					type="expense"
					value={expense}
					displayStyle="text-danger"
				/>
			</ListGroup.Item>
		</ListGroup>
	);
};

export default IncomeAndExpenseDisplay;
