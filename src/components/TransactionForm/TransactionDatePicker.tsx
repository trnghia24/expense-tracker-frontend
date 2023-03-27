import React, { Dispatch, SetStateAction, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { IExpense } from "../../stores/features/expenseSlice";

type Props = {
	onChange: <K extends keyof IExpense>(key: K, value: IExpense[K]) => void;
};

const TransactionDatePicker: React.FC<Props> = ({ onChange }) => {
	const [pickedDate, setPickedDate] = useState<Date>(new Date());
	return (
		<DatePicker
			className="w-100"
			selected={pickedDate}
			onChange={(date: Date) => {
				setPickedDate(date);
				onChange("date", date.toLocaleString());
			}}
			name="date"
		/>
	);
};

export default TransactionDatePicker;
