import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import { useCreateCard } from "../../api/vocabularyCards/useCreateCard";
import { EditInput } from "../../components";

export function CreateCard() {
	const { mutate: createCard, isPending } = useCreateCard();
	const navigate = useNavigate();

	const handleSubmit = async (formData: FormData) => {
		const title = formData.get("name") as string;
		createCard(
			{ title, id: uuidv4() },
			{
				onSuccess: (data) => {
					navigate(`/vocabulary-card/${data.id}`);
				},
			}
		);
	};

	return (
		<form
			action={handleSubmit}
			className="flex rounded-2xl bg-white justify-between gap-2 p-3 items-center">
			<div className="w-1/3">
				<EditInput name="name" />
			</div>
			<button type="submit" className="btn btn-primary btn-soft">
				{isPending ? "Loading..." : "Create card"}
			</button>
		</form>
	);
}
