import { useRef } from "react";
import { useParams } from "react-router-dom";
import { InlineEditInput } from "../../../components";
import { useUpdateCard } from "../../../api/vocabularyCards/useUpdateCard";

interface UpdateCardNameProps {
	name?: string;
}

export function UpdateCardName({ name }: UpdateCardNameProps) {
	const params = useParams();
	const formRef = useRef<HTMLFormElement>(null);
	const { mutate: updateCard } = useUpdateCard();

	const handleBlur = () => {
		if (formRef.current) {
			formRef.current.requestSubmit();
		}
	};

	const handleSubmit = (formData: FormData) => {
		const title = formData.get("title") as string;
		if (!title) return;

		updateCard({
			id: params.cardId as string,
			title,
		});
	};

	return (
		<form ref={formRef} action={handleSubmit} className="w-1/3">
			<InlineEditInput
				name="title"
				defaultValue={name}
				required
				onBlur={handleBlur}
				validationRulse={[
					(value?: unknown) => (value ? null : "Card title is required"),
				]}
			/>
		</form>
	);
}
