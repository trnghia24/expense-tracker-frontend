import React from "react";
import { ListGroup, Stack } from "react-bootstrap";
import { useAppSelector } from "../hooks/hooks";

const ExpenseHistory = () => {
	const expenses = useAppSelector((state) => state.expense.expenseHistory);
	return (
		<div style={{ width: "100%" }}>
			{expenses.length === 0 ? (
				<span>No transanctions yet</span>
			) : (
				<ListGroup variant="flush">
					{expenses.map((ex, i) => (
						<ListGroup.Item key={i}>
							<div className="d-flex">
								<span>{ex.date.toDateString()}</span>
								<span className="ms-auto">{ex.expenseName}</span>
								<span
									className={
										ex.amount < 0
											? "ms-auto text-danger"
											: "ms-auto text-success"
									}>
									{ex.amount < 0 ? `-$${Math.abs(ex.amount)}` : `$${ex.amount}`}
								</span>
							</div>
						</ListGroup.Item>
					))}
				</ListGroup>
			)}
		</div>
	);
};

export default ExpenseHistory;
