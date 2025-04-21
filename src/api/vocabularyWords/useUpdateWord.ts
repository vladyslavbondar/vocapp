import { useMutation, useQueryClient } from "@tanstack/react-query";
import { VocabularyWord } from "../../types";

interface UpdateWordParams extends VocabularyWord {
	cardId: string;
}

const updateWord = async ({
	cardId,
	id,
	originalWord,
	translations,
	note,
}: UpdateWordParams): Promise<VocabularyWord> => {
	const response = await fetch(
		`${import.meta.env.VITE_VOCAPP_REST_API}/cards/${cardId}/words/${id}`,
		{
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				cardId,
				id,
				originalWord,
				translations,
				note,
			}),
		}
	);

	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}

	return response.json();
};

export const useUpdateWord = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: updateWord,
		onSuccess: (_, variables) => {
			queryClient.invalidateQueries({ queryKey: ["card", variables.cardId] });
		},
	});
};
