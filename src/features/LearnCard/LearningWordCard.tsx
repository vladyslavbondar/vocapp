import { useEffect, useState, useRef } from "react";
import { clsx } from "clsx";

import { LearnVocabularyWord } from "./LearnCard";

const REPEAT_ANSWER = 1;

interface LearningWordCardProps {
	wordData: LearnVocabularyWord;
	onAnswerComplete(vocabularyWord: LearnVocabularyWord): void;
}

export function LearningWordCard({
	wordData,
	onAnswerComplete,
}: LearningWordCardProps) {
	const [userAnswers, setUserAnswers] = useState<string[]>([]);
	const [isWordBlurred, setIsWordBlurred] = useState(true);

	const inputRef = useRef<HTMLInputElement>(null);

	function formAction(formData: FormData) {
		const userAnswer = formData.get("userAnswer");

		if (typeof userAnswer !== "string") return;

		setUserAnswers((prevUserAnswers) => [...prevUserAnswers, userAnswer]);
	}

	useEffect(() => {
		if (userAnswers.length === REPEAT_ANSWER) {
			setUserAnswers([]);
			// setTimeout(() => {
			onAnswerComplete({
				...wordData,
				userAnswers,
			});
			// }, 500);
		}

		if (inputRef.current) {
			inputRef.current.focus();
		}
	}, [wordData, userAnswers, onAnswerComplete]);

	useEffect(() => {
		if (!isWordBlurred) {
			setTimeout(() => {
				setIsWordBlurred(true);
			}, 2000);
		}
	}, [isWordBlurred]);

	const { originalWord, translations } = wordData;

	return (
		<form
			action={formAction}
			className="w-[70%] flex flex-col gap-8 bg-base-100">
			<h1
				className={clsx("text-7xl cursor-pointer", isWordBlurred && "blur-xl")}
				onClick={() => setIsWordBlurred(false)}>
				{originalWord}
			</h1>
			<div>
				<div className="divider" />
				<p className="text-3xl">{translations}</p>
			</div>
			<input
				type="text"
				name="userAnswer"
				placeholder="Type translation..."
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
