"use server";

import { parseWithZod } from "@conform-to/zod";
import { redirect } from "next/navigation";
import prisma from "./utils/db";
import { formatCurrency } from "./utils/formatCurrency";
import { requireUser } from "./utils/hooks";
import { emailClient } from "./utils/mailtrap";
import { invoiceSchema, onboardingSchema } from "./utils/zodSchemas";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export async function onboardUser(prevState: any, formData: FormData) {
	const session = await requireUser();

	const submission = parseWithZod(formData, {
		schema: onboardingSchema,
	});

	if (submission.status !== "success") {
		return submission.reply();
	}

	const data = await prisma.user.update({
		where: {
			id: session.user?.id,
		},
		data: {
			firstName: submission.value.firstName,
			lastName: submission.value.lastName,
			address: submission.value.address,
		},
	});

	return redirect("/dashboard");
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export async function createInvoice(prevState: any, formData: FormData) {
	const session = await requireUser();

	const submission = parseWithZod(formData, {
		schema: invoiceSchema,
	});

	if (submission.status !== "success") {
		return submission.reply();
	}

	const data = await prisma.invoice.create({
		data: {
			clientAddress: submission.value.clientAddress || "",
			clientEmail: submission.value.clientEmail,
			clientName: submission.value.clientName,
			currency: submission.value.currency,
			date: submission.value.date,
			dueDate: submission.value.dueDate,
			fromAddress: submission.value.fromAddress || "",
			fromEmail: submission.value.fromEmail,
			fromName: submission.value.fromName,
			invoiceItemDescription: submission.value.invoiceItemDescription,
			invoiceItemPrice: submission.value.invoiceItemPrice,
			invoiceItemQuantity: submission.value.invoiceItemQuantity,
			invoiceName: submission.value.invoiceName,
			invoiceNumber: submission.value.invoiceNumber,
			note: submission.value.note,
			status: submission.value.status,
			total: submission.value.total,
			userId: session.user?.id,
		},
	});

	const sender = {
		email: "hello@demomailtrap.com",
		name: "Josh Meyer",
	};

	emailClient.send({
		from: sender,
		to: [{ email: "jay.designs716@gmail.com" }],
		template_uuid: "94363bbd-cf89-447d-b95c-890594643e46",
		template_variables: {
			clientName: submission.value.clientName,
			invoiceNumber: submission.value.invoiceNumber,
			invoiceDueDate: new Intl.DateTimeFormat("en-US", {
				dateStyle: "long",
			}).format(new Date(submission.value.date)),
			invoiceAmount: formatCurrency({
				amount: submission.value.total,
				// biome-ignore lint/suspicious/noExplicitAny: <explanation>
				currency: submission.value.currency as any,
			}),
			invoiceLink: `http://localhost:3000/api/invoice/${data.id}`,
		},
	});

	return redirect("/dashboard/invoices");
}
