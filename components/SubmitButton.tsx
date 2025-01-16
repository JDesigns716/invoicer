"use client";

import { LoaderCircle } from "lucide-react";
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";

interface SubmitButtonProps {
	text: string;
	variant?:
		| "default"
		| "destructive"
		| "outline"
		| "secondary"
		| "ghost"
		| "link"
		| null
		| undefined;
}

const SubmitButton = ({ text, variant }: SubmitButtonProps) => {
	const { pending } = useFormStatus();
	return (
		<>
			{pending ? (
				<Button className="w-full" variant={variant} disabled>
					<LoaderCircle className="mr-2 size-2 animate-spin" />
				</Button>
			) : (
				<Button className="w-full" variant={variant} type="submit">
					{text}
				</Button>
			)}
		</>
	);
};

export default SubmitButton;
