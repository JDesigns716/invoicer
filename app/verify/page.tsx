import { buttonVariants } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { AlertCircle, ArrowLeft, Mail } from "lucide-react";
import Link from "next/link";

const Verify = () => {
	return (
		<div className="flex items-center justify-center w-full min-h-screen">
			<div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
				{/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
				<div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"></div>
			</div>
			<Card className="w-[380px] px-5">
				<CardHeader className="text-center">
					<div className="flex items-center justify-center mx-auto mb-4 bg-blue-100 rounded-full size-20">
						<Mail className="text-blue-500 size-12" />
					</div>
					<CardTitle className="text-2xl font-bold">Check your Email</CardTitle>
					<CardDescription>
						We have sent a verication link to email address
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="p-4 mt-4 bg-yellow-100 border-yellow-400 rounded-md">
						<div className="flex items-center">
							<AlertCircle className="text-yellow-800 size-5" />
							<p className="ml-3 text-sm font-medium text-yellow-800">
								Be sure to check your spam folder
							</p>
						</div>
					</div>
				</CardContent>
				<CardFooter>
					<Link
						href="/"
						className={buttonVariants({
							className: "w-full",
							variant: "outline",
						})}
					>
						<ArrowLeft className="mr-2 size-4" /> Back to Homepage
					</Link>
				</CardFooter>
			</Card>
		</div>
	);
};

export default Verify;
