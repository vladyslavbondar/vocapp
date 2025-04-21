import { useState, useEffect } from "react";

import { ViewInput } from "./ViewInput";
import { EditInput, EditInputProps } from "./EditInput";
import { InlineEditInputContainerProps } from "./InlineEditInputContainer";

interface InlineEditInputProps
	extends EditInputProps,
		InlineEditInputContainerProps {
	initalEditMode?: boolean;
}
// InlineInput rename
export function InlineEditInput({
	initalEditMode = false,
	label,
	required,
	error,
	validationRulse,
	...props
}: InlineEditInputProps) {
	const [isEditMode, setIsEditMode] = useState(initalEditMode);
	const [hasTouch, setHasTouch] = useState(!initalEditMode);
	const [viewInputValue, setViewInputValue] = useState(
		props.value || props.defaultValue
	);

	// for server side validation error
	useEffect(() => {
		if (error) {
			setIsEditMode(true);
		}
	}, [error]);

	return isEditMode ? (
		<EditInput
			label={label}
			required={required}
			focusOnLoad
			{...props}
			onBlur={(event) => {
				setViewInputValue(event.target.value);

				if (hasTouch) {
					setIsEditMode(false);
				}

				if (props?.onBlur) props.onBlur(event);
			}}
			onFocus={() => setHasTouch(true)}
			validationRulse={validationRulse}
		/>
	) : (
		<ViewInput
			label={label}
			required={required}
			value={viewInputValue}
			{...props}
			onClick={() => setIsEditMode(true)}
		/>
	);
}
