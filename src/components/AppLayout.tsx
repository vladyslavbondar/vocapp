import { Outlet } from "react-router-dom";

import { Navbar } from "./Navbar";
import clsx from "clsx";

import { getRandomNumberInRange } from "../utils";

const BACKGROUND_GRADIEND_CLASSES = [
	"gradient-background",
	"gradient-background-ferrari",
	"gradient-background-red-bull",
	"gradient-background-smokers",
	"gradient-background-alpine",
	"gradient-background-lighter-ice-cream",
	"gradient-background-strange",
	"gradient-background-ukraine",
	"gradient-background-dinozaur",
];

export function AppLayout() {
	return (
		<div
			className={clsx(
				"w-full h-screen flex justify-center",
				BACKGROUND_GRADIEND_CLASSES[
					getRandomNumberInRange(0, BACKGROUND_GRADIEND_CLASSES.length)
				]
			)}>
			<div className="w-[75%] flex flex-col gap-3">
				<div className="flex mt-3">
					<Navbar />
				</div>
				<div className="rounded-2xl h-full mb-3">
					<Outlet />
				</div>
			</div>
		</div>
	);
}
