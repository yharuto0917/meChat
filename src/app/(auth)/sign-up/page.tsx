"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GoogleIcon } from "@/components/icons/google-icon";
import { GitHubIcon } from "@/components/icons/github-icon";

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
						<GoogleIcon className="mr-2 h-4 w-4" />
						Google
					</Button>
					<Button variant="outline" className="w-full rounded-full" type="button">
						<GitHubIcon className="mr-2 h-4 w-4" />
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
