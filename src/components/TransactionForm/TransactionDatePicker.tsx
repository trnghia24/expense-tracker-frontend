import React, { Dispatch, SetStateAction, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { IExpense } from "../../stores/features/expenseSlice";

type Props = {
	// setPickedDate: Dispatch<SetStateAction<Date>>;
	onChange: <K extends keyof IExpense>(key: K, value: IExpense[K]) => void;
};

const TransactionDatePicker: React.FC<Props> = ({ onChange }) => {
	const [pickedDate, setPickedDate] = useState<Date>(new Date());
	return (
		<DatePicker
			selected={pickedDate}
			onChange={(date: Date) => {
				setPickedDate(date);
				onChange("date", date.toDateString());
			}}
			name="date"
		/>
	);
};

export default TransactionDatePicker;
