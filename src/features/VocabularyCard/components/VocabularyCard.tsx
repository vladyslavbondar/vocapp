import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

import { useGetCardById } from "../../../api";
import { useDeleteCard } from "../../../api/vocabularyCards";
import { WordUpdateForm } from "./WordUpdateForm";
import { WordCreateForm } from "./WordCreateForm";
import { VocabularyCardSkeleton } from "./VocabularyCardSkeleton";
import { UpdateCardName } from "./UpdateCardName";

const loadingSkeleton = new Array(3)
	.fill(null)
	.map((_, i) => <VocabularyCardSkeleton key={i} />);

export function VocabularyCard() {
	const { cardId } = useParams();
	const navigate = useNavigate();

	const [addNewWordShown, setAddNewWordShown] = useState(false);
	const { mutate: deleteCard, isPending } = useDeleteCard({
		onSuccess: () => {
			navigate("/");
		},
	});

	const { data, isLoading } = useGetCardById(cardId);

	const handleDelete = () => {
		if (cardId) {
			deleteCard(cardId);
		}
	};

	// TODO: max height should be calculated
	return (
		<div className="w-full flex flex-col gap-3 overflow-hidden max-h-[700px]">
			<div className="flex rounded-2xl bg-white justify-between items-center p-3">
				<UpdateCardName name={data?.title} />
				<div className="flex gap-2">
					<Link className="btn btn-info btn-soft" to={`/learn-card/${cardId}`}>
						Practice Learning
					</Link>
					<Link
						className="btn btn-accent btn-soft"
						to={`/dictation-card/${cardId}`}>
						Start Dictation
					</Link>
					<button className="btn btn-primary btn-soft" onClick={handleDelete}>
						{isPending ? <span className="loading loading-spinner" /> : null}
						Delete Card
					</button>
					<button
						className="btn btn-primary btn-soft"
						onClick={() => setAddNewWordShown(true)}
						disabled={isLoading}>
						Add Word
					</button>
				</div>
			</div>
			<div className="w-full flex flex-col h-full gap-3 overflow-auto rounded-2xl">
				{addNewWordShown ? (
					<WordCreateForm
						onCancel={() => setAddNewWordShown(false)}
						onCreateSuccess={() => setAddNewWordShown(false)}
					/>
				) : null}
				{isLoading || data == null
					? loadingSkeleton
					: data.words.map((word) => (
							<WordUpdateForm key={word.id} wordData={word} />
					  ))}
			</div>
		</div>
	);
}
