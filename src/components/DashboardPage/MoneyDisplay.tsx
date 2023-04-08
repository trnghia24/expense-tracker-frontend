import React from "react";
import { Card, Stack } from "react-bootstrap";

type Props = {
	type: string;
	value: number;
	displayStyle: string;
};

const MoneyDisplay: React.FC<Props> = ({ type, value, displayStyle }) => {
	return (
		<Stack direction="vertical" className="align-items-center border-0">
			<h4>Your {type}</h4>
			<h4 className={displayStyle}>${value}</h4>
		</Stack>
	);
};

export default MoneyDisplay;
