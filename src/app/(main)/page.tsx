import Link from "next/link";

export default function HomePage() {
	return (
		<main className="mx-auto flex min-h-dvh w-full max-w-5xl flex-col justify-center gap-6 px-6 py-16">
			<p className="text-sm uppercase tracking-[0.2em] text-zinc-500">Main Area</p>
			<h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">Mechat</h1>
			<p className="max-w-xl text-lg text-zinc-600">
				This is the <span className="font-en">(main)</span> layout for all non-authentication routes.
			</p>
			<p className="font-ja text-lg text-zinc-700">日本語テキストは Noto Sans JP を優先して表示されます。</p>
			<div>
				<Link
					href="/sign-in"
					className="inline-flex items-center rounded-full border border-zinc-900 px-5 py-2 text-sm font-medium hover:bg-zinc-900 hover:text-white"
				>
					Go to Sign In
				</Link>
			</div>
		</main>
	);
}
