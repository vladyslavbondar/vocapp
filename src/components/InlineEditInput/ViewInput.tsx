import { InputHTMLAttributes } from "react";

import {
	InlineEditInputContainer,
	InlineEditInputContainerProps,
} from "./InlineEditInputContainer";

type ViewInputProps = Pick<
	InputHTMLAttributes<HTMLInputElement>,
	"value" | "defaultValue" | "onClick"
> &
	InlineEditInputContainerProps;

export function ViewInput({
	label,
	error,
	required,
	value,
	defaultValue,
	onClick,
}: ViewInputProps) {
	return (
		<InlineEditInputContainer required={required} label={label} error={error}>
			<div
				className="cursor-pointer h-10 px-3 leading-10 text-lg hover:bg-gray-200 rounded-lg"
				onClick={onClick}>
				{value || defaultValue}
			</div>
		</InlineEditInputContainer>
	);
}
