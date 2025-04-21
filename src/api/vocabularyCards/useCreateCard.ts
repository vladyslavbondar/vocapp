import { useMutation, useQueryClient } from "@tanstack/react-query";

import { VocabularyCard, CardInfo } from "../../types";
import { CARDS_API_PATH } from "./utils";

const createCard = async (newCardDetails: {
	title: string;
	id: string;
}): Promise<VocabularyCard> => {
	const response = await fetch(
		`${import.meta.env.VITE_VOCAPP_REST_API}${CARDS_API_PATH}`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newCardDetails),
		}
	);

	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}

	return response.json();
};

export const useCreateCard = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: createCard,
		onSuccess: (data) => {
			queryClient.setQueryData(["card", data.id], data);
			const previousCards = queryClient.getQueryData<CardInfo[]>(["cards"]);
			queryClient.setQueryData<CardInfo[]>(
				["cards"],
				[data, ...(previousCards || [])]
			);
			return data;
		},
	});
};
