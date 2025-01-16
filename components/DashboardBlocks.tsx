import prisma from "@/app/utils/db";
import { formatCurrency } from "@/app/utils/formatCurrency";
import { requireUser } from "@/app/utils/hooks";
import { Activity, CreditCard, DollarSign, ReceiptText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

async function getData(userId: string) {
	const [data, openInvoices, paidInvoices] = await Promise.all([
		prisma.invoice.findMany({
			where: {
				userId: userId,
			},
			select: {
				total: true,
			},
		}),
		prisma.invoice.findMany({
			where: {
				userId: userId,
				status: "PENDING",
			},
			select: {
				id: true,
			},
		}),
		prisma.invoice.findMany({
			where: {
				userId: userId,
				status: "PAID",
			},
			select: {
				id: true,
			},
		}),
	]);
	return {
		data,
		openInvoices,
		paidInvoices,
	};
}

export async function DashboardBlocks() {
	const session = await requireUser();
	const { data, openInvoices, paidInvoices } = await getData(
		session.user?.id as string,
	);
	return (
		<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 md:gap-8">
			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
					<DollarSign className="size-4 text-muted-foreground" />
				</CardHeader>
				<CardContent>
					<h2 className="text-2xl font-bold">
						{formatCurrency({
							amount: data.reduce((acc, item) => acc + item.total, 0),
							currency: "USD",
						})}
					</h2>
					<p className="text-xs text-muted-foreground">
						Based on total violume
					</p>
				</CardContent>
			</Card>
			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium">
						Total Invoices Issued
					</CardTitle>
					<ReceiptText className="size-4 text-muted-foreground" />
				</CardHeader>
				<CardContent>
					<h2 className="text-2xl font-bold">{data.length}</h2>
					<p className="text-xs text-muted-foreground">
						Total Invoices Issued!
					</p>
				</CardContent>
			</Card>
			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium">Paid Invoices</CardTitle>
					<CreditCard className="size-4 text-muted-foreground" />
				</CardHeader>
				<CardContent>
					<h2 className="text-2xl font-bold">{paidInvoices.length}</h2>
					<p className="text-xs text-muted-foreground">
						Total Invoices that have been paid!
					</p>
				</CardContent>
			</Card>
			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium">
						Pending Invoices
					</CardTitle>
					<Activity className="size-4 text-muted-foreground" />
				</CardHeader>
				<CardContent>
					<h2 className="text-2xl font-bold">{openInvoices.length}</h2>
					<p className="text-xs text-muted-foreground">
						Invoices that are currently pending!
					</p>
				</CardContent>
			</Card>
		</div>
	);
}
