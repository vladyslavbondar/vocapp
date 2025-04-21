import { Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

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
	const { pathname } = useLocation();
	const [bgGradient, setBgGradient] = useState(BACKGROUND_GRADIEND_CLASSES[0]);

	useEffect(() => {
		setBgGradient(
			BACKGROUND_GRADIEND_CLASSES[
				getRandomNumberInRange(0, BACKGROUND_GRADIEND_CLASSES.length)
			]
		);
	}, [pathname]);

	return (
		<div
			className={clsx(
				"w-full h-screen flex justify-center transition-all duration-1000 ease-in-out",
				bgGradient
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
