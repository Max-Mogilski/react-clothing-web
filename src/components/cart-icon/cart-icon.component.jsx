import { useContext } from "react";
import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import { CartContext } from "../../context/cart.context";

import "./cart-icon.styles.scss";

const CartIcon = ({ onClick }) => {
	const { cartQuantity } = useContext(CartContext);

	return (
		<div className="cart-icon-container" onClick={onClick}>
			<ShoppingIcon className="shopping-icon" />
			<span className="item-count">{cartQuantity}</span>
		</div>
	);
};

export default CartIcon;
