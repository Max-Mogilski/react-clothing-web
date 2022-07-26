import { createContext, useState } from "react";

export const CartDropdownContext = createContext({
	isShowned: false,
	setIsShowned: () => null,
});

export const CartDropdownProvider = ({ children }) => {
	const [isShowned, setIsShowned] = useState(false);
	const value = { isShowned, setIsShowned };

	return (
		<CartDropdownContext.Provider value={value}>
			{children}
		</CartDropdownContext.Provider>
	);
};
