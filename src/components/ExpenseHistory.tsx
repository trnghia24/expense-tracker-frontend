import React from "react";
import { Button } from "react-bootstrap";
import { ListGroup, Stack } from "react-bootstrap";
import { Trash } from "react-bootstrap-icons";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { deleteExpenseById, IExpense } from "../stores/features/expenseSlice";

const ExpenseHistory = () => {
	const expenses = useAppSelector((state) => state.expense.expenseHistory);
	const dispatch = useAppDispatch();
	// const options = {
	// 	weekday: "long",
	// 	year: "numeric",
	// 	month: "long",
	// 	day: "numeric",
	// };

	return (
		<div style={{ width: "100%" }}>
			{expenses.length === 0 ? (
				<span>No transanctions yet</span>
			) : (
				<ListGroup variant="flush">
					{expenses.map((ex) => (
						<ListGroup.Item key={ex.id}>
							<div className="d-flex align-items-center">
								<span className="ms-auto">{ex.date}</span>
								<span className="ms-auto">{ex.expenseName}</span>
								<span
									className={
										ex.amount < 0
											? "ms-auto text-danger"
											: "ms-auto text-success"
									}>
									{ex.amount < 0 ? `-$${Math.abs(ex.amount)}` : `$${ex.amount}`}
								</span>
								<span className="ms-auto">
									<Button
										onClick={() => {
											dispatch(deleteExpenseById(ex.id));
										}}>
										<Trash />
									</Button>
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
