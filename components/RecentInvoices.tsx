import prisma from "@/app/utils/db";
import { formatCurrency } from "@/app/utils/formatCurrency";
import { requireUser } from "@/app/utils/hooks";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

async function getData(userId: string) {
	const data = await prisma.invoice.findMany({
		where: {
			userId: userId,
		},
		select: {
			id: true,
			clientName: true,
			clientEmail: true,
			total: true,
			currency: true,
		},
		orderBy: {
			createdAt: "desc",
		},
		take: 7,
	});

	return data;
}

export async function RecentInvoices() {
	const session = await requireUser();
	const data = getData(session.user?.id as string);
	return (
		<Card>
			<CardHeader>
				<CardTitle>Recent Invoices</CardTitle>
				<CardContent className="flex flex-col gap-8">
					{(await data).map((item) => (
						<div key={item.id} className="flex items-center gap-4">
							<Avatar className="hidden sm:flex size-9">
								<AvatarFallback>{item.clientName.slice(0, 2)}</AvatarFallback>
							</Avatar>
							<div className="flex flex-col gap-1">
								<p className="texxt-sm font-medium leading-none">
									{item.clientName}
								</p>
								<p className="texxt-sm text-muted-foreground">
									{item.clientEmail}
								</p>
							</div>
							<div className="ml-auto font-medium">
								{formatCurrency({
									amount: item.total,
									// biome-ignore lint/suspicious/noExplicitAny: <explanation>
									currency: item.currency as any,
								})}
							</div>
						</div>
					))}
				</CardContent>
			</CardHeader>
		</Card>
	);
}
