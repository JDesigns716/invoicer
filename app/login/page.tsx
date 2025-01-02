import SubmitButton from "@/components/SubmitButton";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { redirect } from "next/navigation";
import { auth, signIn } from "../utils/auth";

export default async function LoginPage() {
	const session = await auth();

	if (session) {
		redirect("/dashboard");
	}

	return (
		<>
			<div className="flex items-center justify-center w-full h-screen px-4">
				<Card className="max-w-sm">
					<CardHeader>
						<CardTitle className="text-2xl">Login</CardTitle>
						<CardDescription>
							Enter your credentials to login to your account
						</CardDescription>
					</CardHeader>
					<CardContent>
						<form
							action={async (formData) => {
								"use server";
								await signIn("nodemailer", formData);
							}}
							className="flex flex-col gap-y-4"
						>
							<div className="flex flex-col gap-y-2">
								<Label>Email</Label>
								<Input
									type="email"
									name="email"
									placeholder="Enter your email"
									required
								/>
							</div>
							<SubmitButton text="Log In" />
						</form>
					</CardContent>
				</Card>
			</div>
		</>
	);
}
