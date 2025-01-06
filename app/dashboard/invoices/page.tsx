import { InvoiceList } from "@/components/InvoiceList";
import { Button, buttonVariants } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { CirclePlus } from "lucide-react";
import Link from "next/link";

export default function InvoicesPage() {
	return (
		<Card>
			<CardHeader>
				<div className="flex items-center justify-between">
					<div>
						<CardTitle className="text-2xl font-bold">Invoices</CardTitle>
						<CardDescription>Manage your invoices</CardDescription>
					</div>
					<Link href="/dashboard/invoices/create" className={buttonVariants()}>
						<CirclePlus /> Create Invoice
					</Link>
				</div>
			</CardHeader>
			<CardContent>
				<InvoiceList />
			</CardContent>
		</Card>
	);
}
