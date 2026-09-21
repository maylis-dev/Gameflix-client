import localFont from "next/font/local";

const futura = localFont({
	src: [
		{
			path: "../public/fonts/futura/Futura-Book-font.ttf",
			weight: "400",
			style: "normal",
		},
		{
			path: "../public/fonts/futura/Futura-Book-Italic-font.ttf",
			weight: "400",
			style: "italic",
		},
		{
			path: "../public/fonts/futura/Futura-Heavy-font.ttf",
			weight: "600",
			style: "normal",
		},
		{
			path: "../public/fonts/futura/Futura-Heavy-Italic-font.ttf",
			weight: "600",
			style: "italic",
		},
		{
			path: "../public/fonts/futura/Futura-Bold-Italic-font.ttf",
			weight: "700",
			style: "italic",
		},
	],
});

export default futura;
