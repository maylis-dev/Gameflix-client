"use client";

import { ReactNode } from "react";

type Props = {
	isOpen: boolean;
	onClose: () => void;
	children: ReactNode;
};

export default function Modals({ isOpen, onClose, children }: Props) {
	if (!isOpen) return null;

	return (
		<div
			style={{
				position: "fixed",
				top: 0,
				left: 0,
				width: "100%",
				height: "100%",
				backgroundColor: "rgba(0,0,0,0.5)",
				zIndex: 9999,
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
			}}>
			<div
				className="bg-white w-[800px] h-[450px] overflow-y-auto scrollbar-none rounded-lg "
				// style={{
				//   backgroundColor: "white",
				//   padding: "20px",
				//   borderRadius: "8px",
				//   maxWidth: "500px",
				//   width: "90%",
				//   maxHeight: "80vh",
				//   overflowY: "auto",
				//   overflowX: "hidden",
				// }}
			>
				{children}
			</div>
		</div>
	);
}
