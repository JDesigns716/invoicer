import prisma from "@/app/utils/db";
import { formatCurrency } from "@/app/utils/formatCurrency";
import { requireUser } from "@/app/utils/hooks";
import { InvoiceActions } from "./InvoiceActions";
import { Badge } from "./ui/badge";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "./ui/table";

async function fetchInvoices(userId: string) {
	const data = await prisma.invoice.findMany({
		where: {
			userId: userId,
		},
		select: {
			id: true,
			clientName: true,
			total: true,
			createdAt: true,
			status: true,
			invoiceNumber: true,
			currency: true,
		},
		orderBy: {
			createdAt: "desc",
		},
	});

	return data;
}

export async function InvoiceList() {
	const session = await requireUser();
	const data = await fetchInvoices(session.user?.id as string);

	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Invoice ID</TableHead>
					<TableHead>Customer</TableHead>
					<TableHead>Amount</TableHead>
					<TableHead>Status</TableHead>
					<TableHead>Date</TableHead>
					<TableHead className="text-right">Actions</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{data.map((invoice) => (
					<TableRow key={invoice.id}>
						<TableCell>#{invoice.invoiceNumber}</TableCell>
						<TableCell>{invoice.clientName}</TableCell>
						<TableCell>
							{formatCurrency({
								amount: invoice.total,
								// biome-ignore lint/suspicious/noExplicitAny: <explanation>
								currency: invoice.currency as any,
							})}
						</TableCell>
						<TableCell>
							<Badge className="rounded-full">{invoice.status}</Badge>
						</TableCell>
						<TableCell>
							{new Intl.DateTimeFormat("en-US", {
								dateStyle: "medium",
							}).format(invoice.createdAt)}
						</TableCell>
						<TableCell className="text-right">
							<InvoiceActions status={invoice.status} id={invoice.id} />
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
