import Link from "next/link";

export default function SignInPage() {
	return (
		<main className="w-full rounded-3xl bg-white p-8 shadow-lg">
			<p className="font-cavest text-3xl text-zinc-900">Welcome back</p>
			<h1 className="mt-3 text-2xl font-semibold tracking-tight text-zinc-900">Sign in</h1>
			<p className="mt-2 text-sm text-zinc-600">This page is inside the (auth) route-group layout.</p>
			<form className="mt-8 space-y-4">
				<input
					type="email"
					placeholder="Email"
					className="w-full rounded-full border border-zinc-300 px-4 py-3 text-sm outline-none focus:border-zinc-500"
				/>
				<input
					type="password"
					placeholder="Password"
					className="w-full rounded-full border border-zinc-300 px-4 py-3 text-sm outline-none focus:border-zinc-500"
				/>
				<button
					type="button"
					className="w-full rounded-full bg-zinc-900 px-4 py-3 text-sm font-medium text-white hover:bg-zinc-700"
				>
					Continue
				</button>
			</form>
			<Link href="/" className="mt-5 inline-block text-sm text-zinc-600 underline underline-offset-4">
				Back to home
			</Link>
		</main>
	);
}
