import prisma from "@/app/utils/db";
import { requireUser } from "@/app/utils/hooks";
import { EditInvoice } from "@/components/EditInvoice";
import { notFound } from "next/navigation";

async function getData(invoiceId: string, userId: string) {
	const data = await prisma.invoice.findUnique({
		where: {
			id: invoiceId,
			userId: userId,
		},
	});

	if (!data) {
		return notFound();
	}

	return data;
}

type Params = Promise<{ invoiceId: string }>;

export default async function EditInvoicePage({ params }: { params: Params }) {
	const session = await requireUser();
	const { invoiceId } = await params;
	const data = await getData(invoiceId, session.user?.id as string);

	return <EditInvoice data={data} />;
}
