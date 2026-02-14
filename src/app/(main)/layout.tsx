import { Sidebar } from "@/components/features/sidebar/sidebar";
import { MainContainer } from "@/components/features/sidebar/main-container";

export default function MainLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="min-h-dvh bg-background text-foreground">
			<Sidebar />
			<MainContainer>{children}</MainContainer>
		</div>
	);
}
