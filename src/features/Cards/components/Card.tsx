import { useNavigate } from "react-router-dom";

interface CardProps {
	id: number;
	name: string;
	dateCreated: string;
	progress: number;
}

export function Card({ id, name, dateCreated, progress }: CardProps) {
	const navigate = useNavigate();

	return (
		<div
			className="card bg-base-100 shadow-sm hover:bg-gray-100 cursor-pointer border-1 border-gray-200"
			onClick={(event) => {
				event.preventDefault();
				navigate(`/card-details/${id}`);
			}}>
			<div className="card-body">
				<h2 className="card-title">{name}</h2>
				<p className="text-gray-400">{dateCreated}</p>
				<div>
					<p className="text-gray-400 text-center">{progress}%</p>
					<div
						className="h-1"
						style={{
							background: `linear-gradient(90deg, rgba(93,235,156,1) ${progress}%, rgba(214,214,214,1) ${progress}%)`,
						}}
					/>
				</div>
				<div className="mt-3 card-actions justify-between">
					<button
						className="btn btn-sm btn-outline btn-primary"
						onClick={(event) => {
							event.stopPropagation();
							navigate(`/learn-card/${id}`);
						}}>
						Learn
					</button>
					<button
						className="btn btn-sm btn-outline btn-accent"
						onClick={(event) => {
							event.stopPropagation();
							navigate(`/dictation-card/${id}`);
						}}>
						Dictation
					</button>
				</div>
			</div>
		</div>
	);
}
