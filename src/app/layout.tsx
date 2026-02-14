import type { Metadata } from "next";
import { Caveat, Google_Sans_Flex, Noto_Sans, Noto_Sans_JP } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

const googleSansFlex = Google_Sans_Flex({
	variable: "--font-google-sans-flex",
	subsets: ["latin"],
	weight: "variable",
	adjustFontFallback: false,
});

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
			</head>
			<body
				className={`${googleSansFlex.variable} ${notoSansJP.variable} ${notoSans.variable} ${caveat.variable} font-en antialiased`}
			>
				<TooltipProvider>
					{children}
				</TooltipProvider>
			</body>
		</html>
	);
}
