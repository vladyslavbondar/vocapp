import { createBrowserRouter, RouteObject } from "react-router-dom";
import { AppLayout } from "./components";
import { Cards, CardDetails, LearnCard, CardDictation } from "./features";

const routes: RouteObject[] = [
	{
		path: "/",
		element: <AppLayout />,
		children: [
			{
				path: "/cards",
				element: <Cards />,
			},
			{
				path: "/card-details/:cardId",
				element: <CardDetails />,
			},
			{
				path: "/learn-card/:cardId",
				element: <LearnCard />,
			},
			{
				path: "/dictation-card/:cardId",
				element: <CardDictation />,
			},
		],
	},
];

export const router = createBrowserRouter(routes);
