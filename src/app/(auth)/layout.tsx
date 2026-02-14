export default function AuthLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="min-h-dvh bg-zinc-100 text-foreground">
			<div className="mx-auto flex min-h-dvh w-full max-w-md items-center px-6 py-12">{children}</div>
		</div>
	);
}
