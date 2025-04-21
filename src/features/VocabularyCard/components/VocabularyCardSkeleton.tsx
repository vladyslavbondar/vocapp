export function VocabularyCardSkeleton() {
	return (
		<div className="h-[224px] flex flex-col gap-2 p-4 bg-white rounded-2xl">
			<div>
				<div className="skeleton bg-gray-200 rounded-lg h-[18px] w-full mb-0.5"></div>
				<div className="skeleton h-[40px] bg-gray-200 rounded-lg w-full"></div>
			</div>
			<div>
				<div className="skeleton bg-gray-200 rounded-lg h-[18px] w-full mb-0.5"></div>
				<div className="skeleton h-[40px] bg-gray-200 rounded-lg w-full"></div>
			</div>
			<div>
				<div className="skeleton bg-gray-200 rounded-lg h-[18px] w-full mb-0.5"></div>
				<div className="skeleton h-[40px] bg-gray-200 rounded-lg w-full"></div>
			</div>
		</div>
	);
}
