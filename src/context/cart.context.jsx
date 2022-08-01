import { createContext, useEffect, useState } from "react";

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

const removeCartItem = (cartItems, productToRemove) => {
	const existingCartItem = cartItems.find(
		(cartItem) => cartItem.id === productToRemove.id
	);
	if (existingCartItem.quantity === 1) {
		return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id);
	}

	return cartItems.map((item) =>
		item.id === productToRemove.id
			? { ...item, quantity: item.quantity - 1 }
			: item
	);
};

const clearCartItem = (cartItems, cartItemToClear) =>
	cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);

export const CartContext = createContext({
	isShowned: false,
	setIsShowned: () => null,
	cartItems: [],
	addItemToCart: () => null,
	removeItemFromCart: () => null,
	clearItemFromCart: () => null,
	cartQuantity: 0,
	setCartQuantity: () => null,
	cartTotal: 0,
});

export const CartProvider = ({ children }) => {
	const [isShowned, setIsShowned] = useState(false);
	const [cartItems, setCartItems] = useState([]);
	const [cartQuantity, setCartQuantity] = useState(0);
	const [cartTotal, setCartTotal] = useState(0);

	useEffect(() => {
		const newCartTotal = cartItems.reduce(
			(total, cartItems) => total + cartItems.quantity * cartItems.price,
			0
		);
		setCartTotal(newCartTotal);
	}, [cartItems]);

	const addItemToCart = (productToAdd) => {
		setCartItems(addCartItem(cartItems, productToAdd));
		setCartQuantity((prev) => prev + 1);
	};

	const removeItemFromCart = (productToRemove) => {
		setCartItems(removeCartItem(cartItems, productToRemove));
		setCartQuantity((prev) => prev - 1);
	};

	const clearItemFromCart = (productToClear) => {
		setCartItems(clearCartItem(cartItems, productToClear));
	};
	const value = {
		isShowned,
		setIsShowned,
		addItemToCart,
		cartItems,
		cartQuantity,
		removeItemFromCart,
		clearItemFromCart,
		cartTotal,
	};

	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
