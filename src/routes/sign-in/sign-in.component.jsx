import Button from "../../components/button/button.component";
import SignUpForm from "../../components/sign-up/sign-up-form.component";
import {
	createUserDocumentFromAuth,
	signInWithGooglePopup,
} from "../../utils/firebase/firebase.utils";

const SignIn = () => {
	const logGoogleUser = async () => {
		const { user } = await signInWithGooglePopup();
		await createUserDocumentFromAuth(user);
	};

	return (
		<div>
			<h1>Sign In Page</h1>
			<Button buttonType="google" onClick={logGoogleUser}>
				Sign in with Google
			</Button>
			<SignUpForm />
		</div>
	);
};

export default SignIn;
