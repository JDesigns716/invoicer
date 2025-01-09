import { MailtrapClient } from "mailtrap";

export const emailClient = new MailtrapClient({
	// biome-ignore lint/style/noNonNullAssertion: <explanation>
	token: process.env.MAILTRAP_TOKEN!,
});
