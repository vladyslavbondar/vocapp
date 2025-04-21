import { PropsWithChildren } from "react";
import clsx from "clsx";

export interface InlineEditInputContainerProps {
	label?: string;
	required?: boolean;
	error?: string;
}

export function InlineEditInputContainer({
	label,
	required,
	children,
	error,
}: PropsWithChildren<InlineEditInputContainerProps>) {
	return (
		<div className="flex flex-col">
			{label ? (
				<p
					className={clsx(
						error ? "text-red-700" : "text-gray-400",
						"text-xs px-3 pb-0.5"
					)}>
					{label}
					{required && "*"}
				</p>
			) : null}
			{children}
			{error ? <p className="text-red-700 text-xs mt-0.5">{error}</p> : null}
		</div>
	);
}
