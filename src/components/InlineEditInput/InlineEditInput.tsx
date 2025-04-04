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
			{...props}
			onClick={() => setIsEditMode(true)}
		/>
	);
}
