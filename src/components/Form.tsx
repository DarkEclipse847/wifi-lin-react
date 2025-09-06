//https://www.youtube.com/watch?v=YwHJMlvZRCc
//useful material to work with dialogs in react ↑↑↑↑

import { forwardRef, useState } from "react";
import { NetworkInfo, Credentials } from "../models/models";
import { connect, forget } from "../band/backend";

type PopupProps = {
	children: NetworkInfo | undefined;
	toggleDialog: () => void;
};

export const Popup = forwardRef<HTMLDialogElement, PopupProps>(
	({ children, toggleDialog }, ref) => {
		const [password, setPassword] = useState<string>("");
		function handleInput(e: React.SyntheticEvent<HTMLFormElement>) {
			e.preventDefault();
			const formData = new FormData(e.currentTarget);
			let parsedData = formData.get(children ? children.ssid : "") as string;
			setPassword(parsedData);

			let constructForm = {
				ssid: children ? children.ssid : "",
				password: password,
				interface: children ? children.interface : "",
				saved: children ? children.saved : false,
			};
			connect(
				constructForm.ssid,
				constructForm.password,
				constructForm.interface,
				constructForm.saved
			);
			toggleDialog();
		}

		switch (children?.saved) {
			case true:
				return (
					<dialog
						ref={ref}
						onClick={(e) => {
							if (e.currentTarget === e.target) {
								toggleDialog();
							}
						}}
					>
						<div className="network-nav">
							<h4 className="network-nav__header">
								{children ? children.ssid : "There is no network"}
							</h4>
							<button className="network-nav__close-btn" onClick={toggleDialog}>
								close
							</button>
						</div>
						<button
							className="network-nav__forget-btn"
							onClick={() => {
								forget(children.ssid);
							}}
						></button>
					</dialog>
				);
			case false:
				return (
					<dialog
						ref={ref}
						onClick={(e) => {
							if (e.currentTarget === e.target) {
								toggleDialog();
							}
						}}
					>
						<div className="network-nav">
							<h4 className="network-nav__header">
								{children ? children.ssid : "There is no network"}
							</h4>
							<button className="network-nav__close-btn" onClick={toggleDialog}>
								close
							</button>
						</div>
						<form action="" onSubmit={handleInput}>
							<input
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								type="password"
								name={children ? children.ssid : "There is no network"}
								id="password"
							/>
						</form>
					</dialog>
				);
			default:
				break;
		}
	}
);
