import { useQuery } from "@tanstack/react-query";

import { CardInfo } from "../../types";
import { CARDS_API_PATH } from "./utils";

const fetchCards = async (): Promise<CardInfo[]> => {
	const response = await fetch(
		`${import.meta.env.VITE_VOCAPP_REST_API}${CARDS_API_PATH}`
	);

	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}

	const cards = await response.json();

	return cards;
};

export const useCards = () => {
	return useQuery({
		queryKey: ["cards"],
		queryFn: fetchCards,
	});
};
