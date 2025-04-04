import { useParams } from "react-router-dom";
import { useRef } from "react";

import { useUpdateWordById } from "../../../api/cardWords";
import { VocabularyWord } from "../../../types";
import { InlineEditInput } from "../../../components/InlineEditInput/InlineEditInput";
import { wordCardFieldDefenitions, VocabularyWordProp } from "../utils";

interface WordInlineEditProps {
	wordData: VocabularyWord;
}

export function WordUpdateForm({ wordData }: WordInlineEditProps) {
	const params = useParams();
	const { mutate: updateWordById, isPending } = useUpdateWordById();

	const formRef = useRef<HTMLFormElement>(null);

	async function actionHandler(formData: FormData) {
		const updatedWordData: Partial<VocabularyWord> = {};
		let shouldUpdate = false;

		const updatedFormValues = formData.entries();

		for (const valuePair of updatedFormValues) {
			if (wordData[valuePair[0] as VocabularyWordProp] !== valuePair[1]) {
				shouldUpdate = true;
				updatedWordData[valuePair[0] as VocabularyWordProp] =
					valuePair[1] as string;
			}
		}

		if (!shouldUpdate) return;

		updateWordById({
			cardId: Number(params.cardId),
			word: { ...(wordData || {}), ...updatedWordData },
		});
	}

	const handleBlur = () => {
		if (formRef.current) {
			formRef.current.requestSubmit();
		}
	};

	return (
		<form
			action={actionHandler}
			ref={formRef}
			className="w-full rounded-2xl flex flex-col gap-2 card bg-base-100 shadow-sm border-1 border-gray-100 p-4">
			<div className="absolute right-2 top-2 flex justify-end">
				<button type="button" className="btn btn-soft btn-error btn-xs">
					Remove
				</button>
			</div>
			<div className="absolute bottom-3 right-3">
				{isPending ? (
					<span className="loading loading-spinner text-info"></span>
				) : null}
			</div>

			{wordCardFieldDefenitions.map((wordCardFieldDefenition) => (
				<InlineEditInput
					key={wordCardFieldDefenition.name}
					label={wordCardFieldDefenition.label}
					name={wordCardFieldDefenition.name}
					required={wordCardFieldDefenition.required}
					defaultValue={wordData[wordCardFieldDefenition.name]}
					onBlur={handleBlur}
					validationRulse={wordCardFieldDefenition.validations}
					// onChange={onChange}
				/>
			))}
		</form>
	);
}
