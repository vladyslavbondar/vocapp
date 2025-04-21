import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CardInfo } from "../../types";
import { CARDS_API_PATH } from "./utils";

const deleteCard = async (cardId: string): Promise<CardInfo> => {
	const response = await fetch(
		`${import.meta.env.VITE_VOCAPP_REST_API}${CARDS_API_PATH}/${cardId}`,
		{
			method: "DELETE",
		}
	);

	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}

	return response.json();
};

interface DeleteCardOptions {
	onSuccess?: () => void;
}

export const useDeleteCard = (options?: DeleteCardOptions) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: deleteCard,
		onMutate: async (cardId: string) => {
			const previousCards = queryClient.getQueryData<CardInfo[]>(["cards"]);

			queryClient.setQueryData<CardInfo[]>(["cards"], (oldCards) =>
				oldCards?.filter((oldcard) => oldcard.id !== cardId)
			);

			queryClient.invalidateQueries({ queryKey: ["cards"] });
			return { previousCards };
		},
		onSuccess: (_, __, cardId) => {
			queryClient.removeQueries({ queryKey: ["card", cardId] });

			if (options?.onSuccess) {
				options?.onSuccess();
			}
		},
		onError: (err, deletedCardId, context) => {
			queryClient.setQueryData(["cards"], context?.previousCards);
		},
	});
};
