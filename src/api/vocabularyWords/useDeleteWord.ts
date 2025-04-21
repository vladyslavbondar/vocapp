import { useMutation, useQueryClient } from "@tanstack/react-query";

import { VocabularyCard } from "../../types";

interface DeleteWordParams {
	cardId: string;
	wordId: string;
}

const deleteWord = async ({
	cardId,
	wordId,
}: DeleteWordParams): Promise<void> => {
	const response = await fetch(
		`${import.meta.env.VITE_VOCAPP_REST_API}/cards/${cardId}/words/${wordId}`,
		{
			method: "DELETE",
		}
	);

	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}
};

export const useDeleteWord = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: deleteWord,
		onMutate: async ({ cardId, wordId }) => {
			await queryClient.cancelQueries({ queryKey: ["cards"] });

			const cardQueryKey = ["card", cardId];
			const previousCard = queryClient.getQueryData(
				cardQueryKey
			) as VocabularyCard;

			queryClient.setQueryData(
				cardQueryKey,
				(card: VocabularyCard | undefined) => ({
					...card,
					words: (card?.words || []).filter((word) => word.id !== wordId),
				})
			);

			return { previousCard };
		},
		onSuccess: (_, variables) => {
			queryClient.invalidateQueries({ queryKey: ["card", variables.cardId] });
		},
	});
};
