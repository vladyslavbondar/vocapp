import { useState } from "react";
import { useParams, Link } from "react-router-dom";

import { useWordsByCardId } from "../../../api/cardWords";
import { WordUpdateForm } from "./WordUpdateForm";
import { WordCreateForm } from "./WordCreateForm";
import { SkeletonCard } from "./SkeletonCard";

const loadingSkeleton = new Array(3)
	.fill(null)
	.map((_, i) => <SkeletonCard key={i} />);

export function CardDetails() {
	const { cardId } = useParams();
	const [addNewWordShown, setAddNewWordShown] = useState(false);
	const { data: wordsList, isLoading } = useWordsByCardId(Number(cardId));

	// TODO: max height should be calculated
	return (
		<div className="w-full flex flex-col gap-3 overflow-hidden max-h-[700px]">
			<div className="flex rounded-2xl bg-white justify-end gap-2 p-3">
				<Link className="btn btn-info btn-soft" to={`/learn-card/${cardId}`}>
					Practive Learning
				</Link>
				<Link
					className="btn btn-accent btn-soft"
					to={`/dictation-card/${cardId}`}>
					Start Dictation
				</Link>
				<button
					className="btn btn-primary btn-soft"
					onClick={() => setAddNewWordShown(true)}
					disabled={isLoading}>
					Add Word
				</button>
			</div>
			<div className="w-full flex flex-col h-full gap-3 overflow-auto">
				{addNewWordShown ? (
					<WordCreateForm
						onCancel={() => setAddNewWordShown(false)}
						onCreateSuccess={() => setAddNewWordShown(false)}
					/>
				) : null}
				{isLoading ? loadingSkeleton : null}
				{wordsList?.map((word) => (
					<WordUpdateForm key={word.id} wordData={word} />
				))}
			</div>
		</div>
	);
}
