export function CardSkeleton() {
	return (
		<div className="card bg-base-100 shadow-sm" data-testid="card-skeleton">
			<div className="card-body">
				<div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse" />
				<div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse mt-2" />
				<div className="h-1 bg-gray-200 rounded animate-pulse mt-4" />
			</div>
		</div>
	);
}
