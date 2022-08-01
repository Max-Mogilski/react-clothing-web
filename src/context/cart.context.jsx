import { createContext, useState } from "react";

const addCartItem = (cartItems, productToAdd) => {
	const existingCartItem = cartItems.find(
		(cartItem) => cartItem.id === productToAdd.id
	);
	if (existingCartItem) {
		return cartItems.map((item) =>
			item.id === productToAdd.id
				? { ...item, quantity: item.quantity + 1 }
				: item
		);
	}
	return [...cartItems, { ...productToAdd, quantity: 1 }];
};

export const CartContext = createContext({
	isShowned: false,
	setIsShowned: () => null,
	cartItems: [],
	addItemToCart: () => null,
	cartQuantity: 0,
	setCartQuantity: () => null,
});

export const CartProvider = ({ children }) => {
	const [isShowned, setIsShowned] = useState(false);
	const [cartItems, setCartItems] = useState([]);
	const [cartQuantity, setCartQuantity] = useState(0);

	const addItemToCart = (productToAdd) => {
		setCartItems(addCartItem(cartItems, productToAdd));
		setCartQuantity((prev) => prev + 1);
	};
	const value = {
		isShowned,
		setIsShowned,
		addItemToCart,
		cartItems,
		cartQuantity,
	};

	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
