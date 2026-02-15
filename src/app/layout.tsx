import type { Metadata } from "next";
import { Caveat, Noto_Sans, Noto_Sans_JP } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
	variable: "--font-noto-sans-jp",
	subsets: ["latin"],
	weight: "variable",
});

const notoSans = Noto_Sans({
	variable: "--font-noto-sans",
	subsets: ["latin"],
	weight: "variable",
});

const caveat = Caveat({
	variable: "--font-caveat",
	subsets: ["latin"],
	weight: "variable",
});

export const metadata: Metadata = {
	title: "Mechat",
	description: "Mechat application",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head>
				<link rel="icon" href="/favicon.svg" type="image/svg+xml"></link>
				<link rel="preconnect" href="https://fonts.googleapis.com"></link>
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"></link>
				<link
					rel="stylesheet"
					href="https://fonts.googleapis.com/css2?family=Google+Sans+Flex:opsz,wght@6..144,1..1000&display=swap"
				></link>
			</head>
			<body
				className={`${notoSansJP.variable} ${notoSans.variable} ${caveat.variable} font-en antialiased`}
			>
				<TooltipProvider>
					{children}
				</TooltipProvider>
			</body>
		</html>
	);
}
