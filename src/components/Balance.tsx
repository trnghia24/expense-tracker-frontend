import React from "react";
import { useAppSelector } from "../hooks/hooks";

const Balance = () => {
	const balance = useAppSelector((state) => state.expense.balance);
	return (
		<h3 className="fw-bold">
			Your balance:
			{balance < 0 && <span className="text-muted">-</span>}
			<span className="text-muted">${Math.abs(balance)}</span>
		</h3>
	);
};

export default Balance;
