import "./cart-dropdown.styles.scss";
import Button from "../button/button.component";
import { useContext } from "react";
import { CartContext } from "../../context/cart.context";
import CartItem from "../cart-item/cart-item.component";
import { useNavigate } from "react-router-dom";

const CartDropdown = () => {
	const navigate = useNavigate();
	const { cartItems } = useContext(CartContext);

	const goToCheckOutHandler = () => {
		navigate("/checkout");
	};
	return (
		<div className="cart-dropdown-container">
			<div className="cart-items">
				{cartItems &&
					cartItems.map((item) => <CartItem key={item.id} cartItem={item} />)}
			</div>
			<Button onClick={goToCheckOutHandler}>GO TO CHECKOUT</Button>
		</div>
	);
};

export default CartDropdown;
