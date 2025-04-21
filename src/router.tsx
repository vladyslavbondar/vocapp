import { createBrowserRouter, RouteObject } from "react-router-dom";
import { AppLayout } from "./components";
import {
	Cards,
	VocabularyCard,
	LearnCard,
	CardDictation,
	CreateCard,
} from "./features";

const routes: RouteObject[] = [
	{
		path: "/",
		element: <AppLayout />,
		children: [
			{
				path: "/",
				element: <Cards />,
			},
			{
				path: "/create-create",
				element: <CreateCard />,
			},
			{
				path: "/vocabulary-card/:cardId",
				element: <VocabularyCard />,
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
