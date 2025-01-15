import DashboardLinks from "@/components/DashboardLinks";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Toaster } from "@/components/ui/sonner";
import Logo from "@/public/logo.png";
import { Menu, User2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
// biome-ignore lint/style/useImportType: <explanation>
import { ReactNode } from "react";
import { signOut } from "../utils/auth";
import prisma from "../utils/db";
import { requireUser } from "../utils/hooks";

async function getUser(userId: string) {
	const data = await prisma.user.findUnique({
		where: {
			id: userId,
		},
		select: {
			firstName: true,
			lastName: true,
			address: true,
		},
	});

	if (!data?.firstName || !data.lastName || !data.address) {
		redirect("/onboarding");
	}
}

export default async function DashboardLayout({
	children,
}: { children: ReactNode }) {
	const session = await requireUser();
	const data = await getUser(session.user?.id as string);
	return (
		<>
			<div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
				<div className="hidden border-r bg-muted/40 md:block">
					<div className="flex flex-col h-full max-h-screen gap-2">
						<div className="h-14 flex items-center border-b px-4 lg:h-[60px] lg:px-6">
							<Link className="flex items-center gap-2" href="/">
								<Image src={Logo} alt="Logo" className="size-7" />
								<p className="text-2xl font-bold">
									Invo<span className="text-blue-600">icer</span>
								</p>
							</Link>
						</div>
						<div className="flex-1">
							<nav className="grid items-start px-2 text-sm font-medium lg:px-4">
								<DashboardLinks />
							</nav>
						</div>
					</div>
				</div>
				<div className="flex flex-col">
					<header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
						<Sheet>
							<SheetTrigger asChild>
								<Button variant="outline" size="icon" className="md:hidden">
									<Menu className="size-5" />
								</Button>
							</SheetTrigger>
							<SheetContent side="left">
								<nav className="grid gap-2 mt-10">
									<DashboardLinks />
								</nav>
							</SheetContent>
						</Sheet>
						<div className="flex items-center ml-auto">
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button
										className="rounded-full"
										variant="outline"
										size="icon"
									>
										<User2 />
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent align="end">
									<DropdownMenuLabel>My Account</DropdownMenuLabel>
									<DropdownMenuSeparator />
									<DropdownMenuItem asChild>
										<Link href="/dashboard">Dashboard</Link>
									</DropdownMenuItem>
									<DropdownMenuItem asChild>
										<Link href="/dashboard/invoices">Invoices</Link>
									</DropdownMenuItem>
									<DropdownMenuSeparator />
									<DropdownMenuItem asChild>
										<form
											action={async () => {
												"use server";
												await signOut();
											}}
											className="w-full"
										>
											{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
											<button className="w-full text-left">Log out</button>
										</form>
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</div>
					</header>
					<main className="flex flex-col flex-1 gap-4 p-4 lg:gap-6 lg:p-6">
						{children}
					</main>
				</div>
			</div>
			<Toaster richColors closeButton theme="system" />
		</>
	);
}
