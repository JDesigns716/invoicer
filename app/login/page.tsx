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
			<div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
				{/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
				<div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"></div>
			</div>
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
