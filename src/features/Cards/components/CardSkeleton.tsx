export function CardSkeleton() {
	return (
		<div className="card bg-base-100 shadow-sm hover:bg-gray-100 border-1 border-gray-200">
			<div className="card-body">
				<div className="h-[27px] skeleton bg-gray-200"></div>
				<div className="h-[21px] skeleton bg-gray-200"></div>
				<div className="h-[25px] skeleton bg-gray-200"></div>
				<div className="flex justify-between mt-3">
					<div className="h-[32px] w-[56px] skeleton bg-gray-200"></div>
					<div className="h-[32px] w-[72px] skeleton bg-gray-200"></div>
				</div>
			</div>
		</div>
	);
}
