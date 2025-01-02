"use client";

import { LoaderCircle } from "lucide-react";
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";

interface SubmitButtonProps {
	text: string;
}

const SubmitButton = ({ text }: SubmitButtonProps) => {
	const { pending } = useFormStatus();
	return (
		<>
			{pending ? (
				<Button className="w-full" disabled>
					<LoaderCircle className="mr-2 size-2 animate-spin" />
				</Button>
			) : (
				<Button className="w-full" type="submit">
					{text}
				</Button>
			)}
		</>
	);
};

export default SubmitButton;
