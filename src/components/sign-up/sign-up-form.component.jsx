import { useState } from "react";
import {
	createAuthUserWithEmailAndPassword,
	createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
import Button from "../button/button.component";
import FormInput from "../form-input/form-input";
import "./sign-up-form.styles.scss";

const defaultFormFields = {
	displayName: "",
	email: "",
	password: "",
	confirmPassword: "",
};

const SignUpForm = () => {
	const [formFields, setFormFields] = useState(defaultFormFields);
	const { displayName, email, password, confirmPassword } = formFields;

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			alert("Passwords do not match");
			return;
		}
		try {
			const { user } = await createAuthUserWithEmailAndPassword(
				email,
				password
			);

			await createUserDocumentFromAuth(user, { displayName });
			setFormFields(defaultFormFields);
		} catch (error) {
			if (error.code === "auth/email-already-in-use") {
				alert("Cannot create user, email already in use");
			} else {
				console.log("Can not create user", error.message);
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
		<div className="sign-up-container">
			<h2>Don't have an account?</h2>
			<span>Sign up with your email and password</span>
			<form onSubmit={handleSubmit}>
				<FormInput
					label="Dispaly Name"
					required
					type="text"
					value={displayName}
					onChange={handleHange}
					name="displayName"
				/>
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
				<FormInput
					label="Confirm Password"
					required
					type="password"
					value={confirmPassword}
					onChange={handleHange}
					name="confirmPassword"
				/>
				<Button type="submit">Sign Up</Button>
			</form>
		</div>
	);
};

export default SignUpForm;
