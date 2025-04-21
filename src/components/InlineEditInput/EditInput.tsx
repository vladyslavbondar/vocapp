import {
	useLayoutEffect,
	useRef,
	InputHTMLAttributes,
	useState,
	useCallback,
	FocusEvent,
	ChangeEvent,
	useEffect,
} from "react";
import clsx from "clsx";

import {
	InlineEditInputContainer,
	InlineEditInputContainerProps,
} from "./InlineEditInputContainer";

type ValidationCallback = (value?: unknown) => string | null;

export interface EditInputProps
	extends InputHTMLAttributes<HTMLInputElement>,
		InlineEditInputContainerProps {
	focusOnLoad?: boolean;
	validationRulse?: ValidationCallback[];
}

export function EditInput({
	label,
	required,
	error,
	focusOnLoad,
	validationRulse,
	...props
}: EditInputProps) {
	const inputRef = useRef<HTMLInputElement | null>(null);

	const [validationError, setValidationError] =
		useState<InlineEditInputContainerProps["error"]>(error);

	const validateInput = useCallback(
		(event: ChangeEvent<HTMLInputElement> | FocusEvent<HTMLInputElement>) => {
			let errorMessage;
			validationRulse?.forEach((validationRule) => {
				errorMessage = validationRule(event.target.value);
				if (errorMessage) {
					return;
				}
			});

			return errorMessage;
		},
		[validationRulse]
	);

	useEffect(() => {
		setValidationError(error);
	}, [error]);

	useLayoutEffect(() => {
		if (inputRef && focusOnLoad) {
			inputRef.current?.focus();
		}
	}, [inputRef, focusOnLoad]);

	return (
		<InlineEditInputContainer
			label={label}
			required={required}
			error={validationError}>
			<input
				ref={inputRef}
				type="text"
				{...props}
				className={clsx(
					validationError ? "input-error" : "input-primary",
					"w-full input text-lg"
				)}
				onBlur={(event) => {
					const validationError = validateInput(event);
					setValidationError(validationError);

					if (validationError) return;

					if (error) return;

					if (props?.onBlur) props.onBlur(event);
				}}
				onChange={(event) => {
					const errorMessage = validateInput(event);

					setValidationError(errorMessage);

					if (props?.onChange) props.onChange(event);
				}}
			/>
		</InlineEditInputContainer>
	);
}
