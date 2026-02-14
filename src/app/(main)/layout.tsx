import { Sidebar } from "@/components/features/sidebar/sidebar";

export default function MainLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="relative flex h-dvh bg-[#f4f4f5] p-4 gap-4">
			<Sidebar />
			<main className="flex-1 rounded-3xl border border-white/20 bg-white/70 shadow-xl backdrop-blur-xl overflow-hidden h-full">
				<div className="h-full overflow-y-auto">
          {children}
        </div>
			</main>
		</div>
	);
}
