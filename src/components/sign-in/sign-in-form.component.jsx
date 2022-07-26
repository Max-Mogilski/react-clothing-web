import { useState } from "react";
import { logiInUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";
import Button from "../button/button.component";
import FormInput from "../form-input/form-input";

import { signInWithGooglePopup } from "../../utils/firebase/firebase.utils";
import "./sign-in-form.styles.scss";

const defaultFormFields = {
	email: "",
	password: "",
};

const SignInForm = () => {
	const [formFields, setFormFields] = useState(defaultFormFields);
	const { email, password } = formFields;

	const signInWithGoogle = async (e) => {
		e.preventDefault();
		await signInWithGooglePopup();
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			await logiInUserWithEmailAndPassword(email, password);

			setFormFields(defaultFormFields);
		} catch (error) {
			switch (error.code) {
				case "auth/wrong-password":
					alert("Incorrect password for email");
					break;
				case "auth/user-not-found":
					alert("Incorrect password or email");
					break;
				default:
					console.error(error.message);
			}
		}
	};

	const handleHange = (e) => {
		const { name, value } = e.target;
		setFormFields((prev) => {
			return { ...prev, [name]: value };
		});
	};

	return (
		<div className="sign-in-container">
			<h2>Already have an account</h2>
			<span>Sign in with your email and password</span>
			<form onSubmit={handleSubmit}>
				<FormInput
					label="Email"
					required
					type="email"
					value={email}
					onChange={handleHange}
					name="email"
				/>
				<FormInput
					label="Password"
					required
					type="password"
					value={password}
					onChange={handleHange}
					name="password"
				/>
				<div className="buttons-container">
					<Button type="submit">Sign In</Button>
					<Button buttonType="google" onClick={signInWithGoogle}>
						Sign in with Google
					</Button>
				</div>
			</form>
		</div>
	);
};

export default SignInForm;
