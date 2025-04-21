import { useMutation, useQueryClient } from "@tanstack/react-query";
import { v4 as uuidv4 } from "uuid";

import { VocabularyWord, VocabularyCard } from "../../types";

interface CreateWordParams extends Omit<VocabularyWord, "id" | "dateCreated"> {
	cardId: string;
}

const createWord = async ({
	cardId,
	originalWord,
	translations,
	note,
}: CreateWordParams): Promise<VocabularyWord> => {
	const response = await fetch(
		`${import.meta.env.VITE_VOCAPP_REST_API}/cards/${cardId}/words`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				id: uuidv4(),
				originalWord,
				translations,
				note,
				cardId,
			}),
		}
	);

	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}

	return response.json();
};

export const useCreateWord = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: createWord,
		onMutate: async (createdWord) => {
			const cardQueryKey = ["card", createdWord.cardId];
			const previousCard = queryClient.getQueryData(
				cardQueryKey
			) as VocabularyCard;

			queryClient.setQueryData(
				cardQueryKey,
				(card: VocabularyCard | undefined) => ({
					...card,
					words: [createdWord, ...(card?.words || [])],
				})
			);

			return { previousCard };
		},
		onError: (err, deletedCardId, context) => {
			queryClient.setQueryData(["card"], context?.previousCard.id);
		},
		onSettled: (_, __, context) => {
			queryClient.invalidateQueries({
				queryKey: ["card", context?.cardId],
			});
		},
	});
};
