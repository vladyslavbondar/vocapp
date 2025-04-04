import { NavLink } from "react-router-dom";

export function Navbar() {
	return (
		<nav className="navbar bg-white text-primary-content px-5 py-3 flex items-end gap-4 shadow-xl rounded-2xl">
			<NavLink to="/">
				<h1 className="text-blue-700 text-xl font-bold">Vocapp</h1>
			</NavLink>
			<div>
				<NavLink to="/cards" className="text-blue-700">
					Cards
				</NavLink>
			</div>
		</nav>
	);
}
