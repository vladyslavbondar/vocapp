import { Link } from "react-router-dom";

import { Card } from "./Card";
import { useCards } from "../../../api/vocabularyCards";
import { CardSkeleton } from "./CardSkeleton";

const loadingSkeleton = new Array(5)
	.fill(null)
	.map((_, i) => <CardSkeleton key={i} />);

export function Cards() {
	const { data: cards, isLoading } = useCards();

	return (
		<div className="flex flex-col gap-3">
			<div className="flex rounded-2xl bg-white justify-end items-center p-3">
				<Link className="btn btn-info btn-soft" to="/create-create">
					Add Card
				</Link>
			</div>
			<div className="grid grid-cols-4 grid-rows-1 gap-3">
				{isLoading ? loadingSkeleton : null}
				{cards?.map((card) => (
					<Card key={card.id} {...card} />
				))}
			</div>
		</div>
	);
}
