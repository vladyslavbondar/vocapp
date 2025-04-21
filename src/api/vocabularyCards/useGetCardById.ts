import { useQuery } from "@tanstack/react-query";

import { VocabularyCard } from "../../types";
import { CARDS_API_PATH } from "./utils";

const getVocabularyCardById = async (
	cardId?: string
): Promise<VocabularyCard> => {
	if (!cardId) {
		throw new Error("'cardId' is not defined!");
	}

	const response = await fetch(
		`${import.meta.env.VITE_VOCAPP_REST_API}${CARDS_API_PATH}/${cardId}`
	);

	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}

	const vocabularyCard = await response.json();

	return vocabularyCard as VocabularyCard;
};

export const useGetCardById = (cardId?: string) => {
	return useQuery({
		queryKey: ["card", cardId],
		queryFn: () => getVocabularyCardById(cardId),
		enabled: !!cardId,
	});
};
