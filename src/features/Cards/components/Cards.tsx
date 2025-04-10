import { Card } from "./Card";
import { useCards } from "../../../api/cards";
import { CardSkeleton } from "./CardSkeleton";

const loadingSkeleton = new Array(5)
	.fill(null)
	.map((_, i) => <CardSkeleton key={i} />);

export function Cards() {
	const { data: cards, isLoading } = useCards();

	return (
		<div className="grid grid-cols-4 grid-rows-1 gap-3">
			{isLoading ? loadingSkeleton : null}
			{cards?.map((card) => (
				<Card key={card.id} {...card} />
			))}
		</div>
	);
}
