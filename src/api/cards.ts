import { useQuery } from "@tanstack/react-query";

import { wordStore } from "./mockData";
import { getRandomNumberInRange } from "../utils";
import { Card } from "../types";

export const getCards = async (): Promise<Card[]> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			const cards = wordStore.map((card) => ({
				id: card.id,
				name: card.name,
				dateCreated: card.dateCreated,
				progress: card.progress,
			}));

			resolve(cards);
		}, getRandomNumberInRange(500, 3000));
	});
};

export const useCards = () => {
	return useQuery({
		queryKey: ["cards"],
		queryFn: () => getCards(),
	});
};
