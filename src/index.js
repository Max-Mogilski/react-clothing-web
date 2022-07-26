import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { CartDropdownProvider } from "./context/cart-dropdown.context";
import { ProductsProvider } from "./context/products.context";
import { UserProvider } from "./context/user.context";

import "./index.scss";

const rootElement = document.getElementById("root");

render(
	<React.StrictMode>
		<BrowserRouter>
			<UserProvider>
				<ProductsProvider>
					<CartDropdownProvider>
						<App />
					</CartDropdownProvider>
				</ProductsProvider>
			</UserProvider>
		</BrowserRouter>
	</React.StrictMode>,
	rootElement
);
