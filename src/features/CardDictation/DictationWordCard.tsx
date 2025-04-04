import { useLayoutEffect, useRef } from "react";
import { DictationVocabularyWord } from "./CardDictation";

interface DictationWordCardProps {
	wordData: DictationVocabularyWord;
	onSubmit(wordData: DictationVocabularyWord): void;
}

export function DictationWordCard({
	wordData,
	onSubmit,
}: DictationWordCardProps) {
	const inputRef = useRef<HTMLInputElement>(null);

	function formAction(formData: FormData) {
		const userAnswer = formData.get("userAnswer");

		if (typeof userAnswer !== "string") return;

		onSubmit({
			...wordData,
			userAnswer,
		});
	}

	useLayoutEffect(() => {
		if (inputRef.current) {
			inputRef.current.focus();
		}
	}, [wordData]);

	return (
		<form
			action={formAction}
			className="w-[70%] flex flex-col gap-8 bg-base-100">
			<p className="text-3xl">{wordData.translations}</p>
			<input
				ref={inputRef}
				type="text"
				name="userAnswer"
				placeholder="Type here to answer..."
				className="border-gray-300 py-2 outline-none w-full text-6xl"
			/>

			<div className="flex justify-end">
				<button type="submit" className="btn btn-soft btn-primary btn-xl">
					Answer
				</button>
			</div>
		</form>
	);
}
