"use client";
import SubmitButton from "@/components/SubmitButton";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { Label } from "@radix-ui/react-dropdown-menu";
import { useActionState } from "react";
import { onboardUser } from "../actions";
import { onboardingSchema } from "../utils/zodSchemas";

export default function OnboardingPage() {
	const [lastResult, action] = useActionState(onboardUser, undefined);
	const [form, fields] = useForm({
		lastResult,

		onValidate({ formData }) {
			return parseWithZod(formData, {
				schema: onboardingSchema,
			});
		},

		shouldValidate: "onBlur",
		shouldRevalidate: "onInput",
	});

	return (
		<div className="flex items-center justify-center w-screen min-h-screen">
			<div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
				{/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
				<div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"></div>
			</div>
			<Card className="max-w-sm mx-auto">
				<CardHeader>
					<CardTitle className="text-xl text-center">
						Your are alomost finished!
					</CardTitle>
					<CardDescription className="text-center">
						We just need a few more details to finish setting up your account.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form
						action={action}
						id={form.id}
						onSubmit={form.onSubmit}
						noValidate
						className="grid gap-4"
					>
						<div className="grid grid-cols-2 gap-4">
							<div className="flex flex-col gap-2">
								<Label>First Name</Label>
								<Input
									name={fields.firstName.name}
									key={fields.firstName.key}
									defaultValue={fields.firstName.initialValue}
									placeholder="First name"
								/>
								<p className="text-sm text-red-500">
									{fields.firstName.errors}
								</p>
							</div>
							<div className="flex flex-col gap-2">
								<Label>Last Name</Label>
								<Input
									name={fields.lastName.name}
									key={fields.lastName.key}
									defaultValue={fields.lastName.initialValue}
									placeholder="Last name"
								/>
								<p className="text-sm text-red-500">{fields.lastName.errors}</p>
							</div>
						</div>
						<div className="flex flex-col gap-2">
							<Label>Address</Label>
							<Input
								name={fields.address.name}
								key={fields.address.key}
								defaultValue={fields.address.initialValue}
								placeholder="Address"
							/>
							<p className="text-sm text-red-500">{fields.address.errors}</p>
						</div>
						<SubmitButton text="Finish Onboarding" />
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
