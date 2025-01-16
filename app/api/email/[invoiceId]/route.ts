import prisma from "@/app/utils/db";
import { requireUser } from "@/app/utils/hooks";
import { emailClient } from "@/app/utils/mailtrap";
import { NextResponse } from "next/server";

export async function POST(
	request: Request,
	{ params }: { params: Promise<{ invoiceId: string }> },
) {
	try {
		const session = await requireUser();

		const { invoiceId } = await params;

		const invoiceData = await prisma.invoice.findUnique({
			where: {
				id: invoiceId,
				userId: session.user?.id,
			},
		});

		if (!invoiceData) {
			return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
		}

		const sender = {
			email: "hello@demomailtrap.com",
			name: "Josh Meyer",
		};

		emailClient.send({
			from: sender,
			to: [{ email: "jay.designs716@gmail.com" }],
			template_uuid: "324b82a7-12c4-46e0-8f6c-83327c521873",
			template_variables: {
				first_name: invoiceData.clientName,
				company_info_name: "Invoicer",
				company_info_address: "Area 51",
				company_info_city: "New York",
				company_info_zip_code: "12345",
				company_info_country: "United States",
			},
		});

		return NextResponse.json({ success: true });
	} catch (error) {
		return NextResponse.json(
			{ error: "Failed to send invoice reminder email" },
			{ status: 500 },
		);
	}
}
