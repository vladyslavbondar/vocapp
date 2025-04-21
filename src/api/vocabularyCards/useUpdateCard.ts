import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CardInfo } from "../../types";
import { CARDS_API_PATH } from "./utils";

const updateCard = async ({
	id,
	title,
}: {
	id: string;
	title: string;
}): Promise<CardInfo> => {
	const response = await fetch(
		`${import.meta.env.VITE_VOCAPP_REST_API}${CARDS_API_PATH}/${id}`,
		{
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				id,
				title,
				// progress: 0,
			}),
		}
	);

	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}

	return response.json();
};

export const useUpdateCard = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: updateCard,
		onMutate: async (updatedCard: Partial<CardInfo>) => {
			await queryClient.cancelQueries({ queryKey: ["cards"] });
			queryClient.invalidateQueries({ queryKey: ["cards"] });
			queryClient.setQueryData(["cards"], (cards: CardInfo[] | undefined) =>
				cards?.map((card) =>
					card.id === updatedCard.id ? { ...card, ...updatedCard } : card
				)
			);

			const cardQueryKey = ["card", updatedCard.id];
			await queryClient.cancelQueries({ queryKey: cardQueryKey });
			const previousCard = queryClient.getQueryData(cardQueryKey);
			queryClient.setQueryData(cardQueryKey, (card: CardInfo | undefined) => ({
				...card,
				...updatedCard,
			}));

			return { previousCard };
		},
		onError: (_, __, context) => {
			queryClient.setQueryData(["card"], context?.previousCard);
		},
	});
};
