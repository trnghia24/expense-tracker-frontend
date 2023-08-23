import React from "react";
import { Button } from "react-bootstrap";
import { ListGroup, Stack } from "react-bootstrap";
import { Trash } from "react-bootstrap-icons";
import { useAppDispatch, useAppSelector } from "../../../utils/hooks/hooks";
import {
	deleteExpenseById,
	IExpense,
} from "../../../store/expense/expenseSlice";
import "./styles.css";

const ExpenseHistory = () => {
	const expenses = useAppSelector((state) => state.expense.expenseHistory);
	const dispatch = useAppDispatch();

	return (
		<div style={{ width: "100%" }}>
			{expenses.length === 0 ? (
				<span>No transanctions yet</span>
			) : (
				<ListGroup variant="flush">
					{expenses.map((ex) => (
						<ListGroup.Item key={ex.id}>
							<div className="container">
								<span className="info-column">{ex.date}</span>
								<span className="info-column">{ex.expenseName}</span>
								<span
									className={
										ex.amount < 0
											? "info-column text-danger"
											: "info-column text-success"
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
