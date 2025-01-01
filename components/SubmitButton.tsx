"use client";

import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { LoaderCircle } from "lucide-react";

const SubmitButton = () => {
	const { pending } = useFormStatus();
	return (
		<>
			{pending ? (
				<Button className="w-full" disabled>
					<LoaderCircle className="mr-2 size-2 animate-spin" />
				</Button>
			) : (
				<Button className="w-full" type="submit">
					Submit
				</Button>
			)}
		</>
	);
};

export default SubmitButton;
