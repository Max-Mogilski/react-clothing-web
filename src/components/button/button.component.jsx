import "./button.styles.scss";

const BUTTONS_TYPES_CLASSES = {
	google: "google-sign-in",
	inverted: "inverted",
};

const Button = ({ children, buttonType, ...otherProps }) => {
	return (
		<button
			className={`button-container ${BUTTONS_TYPES_CLASSES[buttonType]}`}
			{...otherProps}>
			{children}
		</button>
	);
};

export default Button;
