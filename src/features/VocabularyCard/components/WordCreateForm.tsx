import { useParams } from "react-router-dom";
import { useState, useRef } from "react";

import { useCreateWord } from "../../../api";
import { wordCardFieldDefenitions, VocabularyWordProp } from "../utils";
import { EditInput } from "../../../components";

interface WordCreateFormProps {
	onCreateSuccess?: () => void;
	onCancel?: () => void;
}

export function WordCreateForm({
	onCreateSuccess,
	onCancel,
}: WordCreateFormProps) {
	const formRef = useRef<HTMLFormElement>(null);
	const [validationErrors, setValidationError] = useState<
		Record<string, string>
	>({});

	const params = useParams();
	const { mutate: createWord, isPending } = useCreateWord();

	async function formAction(formData: FormData) {
		const submitValidationErrors = wordCardFieldDefenitions.reduce(
			(errorsByFieldName, fieldDefenition) => {
				fieldDefenition.validations.forEach((validationCb) => {
					const error = validationCb(formData.get(fieldDefenition.name));
					if (error) {
						errorsByFieldName[fieldDefenition.name] = error;
						return;
					}
				});

				return errorsByFieldName;
			},
			{} as Record<string, string>
		);

		if (Object.keys(submitValidationErrors).length) {
			setValidationError(submitValidationErrors);
			return;
		}

		const createWordData = {};

		const createFormValues = formData.entries();

		for (const valuePair of createFormValues) {
			createWordData[valuePair[0] as VocabularyWordProp] = valuePair[1];
		}

		if (!params.cardId) {
			throw new Error("cardId is missing");
		}

		createWord({
			cardId: params.cardId,
			originalWord: createWordData.originalWord,
			translations: createWordData.translations,
			note: createWordData.createWordData,
		});

		if (onCreateSuccess) {
			onCreateSuccess();
		}
	}

	return (
		<form
			action={formAction}
			ref={formRef}
			className="z-10 w-full rounded-2xl flex flex-col gap-2 card bg-base-100 shadow-sm border-1 border-gray-100 p-4">
			<div>
				{isPending ? (
					<span className="loading loading-spinner text-info"></span>
				) : null}
			</div>
			{wordCardFieldDefenitions.map((wordCardDefenition) => {
				return (
					<EditInput
						key={wordCardDefenition.name}
						label={wordCardDefenition.label}
						name={wordCardDefenition.name}
						required={wordCardDefenition.required}
						validationRulse={wordCardDefenition.validations}
						error={validationErrors[wordCardDefenition.name]}
					/>
				);
			})}
			<div className="flex justify-end gap-3">
				<button type="submit" onClick={onCancel} className="btn btn-info">
					Cancel
				</button>
				<button type="submit" className="btn btn-accent">
					Save
				</button>
			</div>
		</form>
	);
}
