"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SignUpPage() {
	return (
		<main className="w-full rounded-3xl bg-white p-8 shadow-lg">
			<div className="space-y-2">
				<p className="font-caveat text-3xl text-zinc-900">Get started</p>
				<h1 className="text-2xl font-semibold tracking-tight text-zinc-900">Create an account</h1>
				<p className="text-sm text-zinc-600">
					Enter your email below to create your account or continue with a provider
				</p>
			</div>

			<div className="mt-8 space-y-4">
				<div className="grid grid-cols-2 gap-4">
					<Button variant="outline" className="w-full rounded-full" type="button">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 48 48"
							className="mr-2 h-4 w-4"
						>
							<path
								fill="#EA4335"
								d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
							/>
							<path
								fill="#4285F4"
								d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
							/>
							<path
								fill="#FBBC05"
								d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
							/>
							<path
								fill="#34A853"
								d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
							/>
							<path fill="none" d="M0 0h48v48H0z" />
						</svg>
						Google
					</Button>
					<Button variant="outline" className="w-full rounded-full" type="button">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							className="mr-2 h-4 w-4"
						>
							<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
							<path d="M9 18c-4.51 2-5-2-7-2" />
						</svg>
						GitHub
					</Button>
				</div>

				<div className="relative">
					<div className="absolute inset-0 flex items-center">
						<span className="w-full border-t border-zinc-200" />
					</div>
					<div className="relative flex justify-center text-xs uppercase">
						<span className="bg-white px-2 text-zinc-500">Or continue with</span>
					</div>
				</div>

				<form className="space-y-4">
					<div className="space-y-2">
						<Input
							type="email"
							placeholder="Email"
							className="w-full rounded-full border-zinc-300 bg-white px-4 py-6 text-sm outline-none focus:border-zinc-500 focus:ring-zinc-500"
						/>
					</div>
					<div className="space-y-2">
						<Input
							type="password"
							placeholder="Password"
							className="w-full rounded-full border-zinc-300 bg-white px-4 py-6 text-sm outline-none focus:border-zinc-500 focus:ring-zinc-500"
						/>
					</div>
					<Button
						type="button"
						className="w-full rounded-full bg-zinc-900 py-6 text-sm font-medium text-white hover:bg-zinc-800"
					>
						Create account
					</Button>
				</form>
			</div>

			<div className="mt-5 text-center text-sm text-zinc-600">
				Already have an account?{" "}
				<Link
					href="/sign-in"
					className="font-medium text-zinc-900 underline underline-offset-4 hover:text-zinc-700"
				>
					Sign in
				</Link>
			</div>
		</main>
	);
}
