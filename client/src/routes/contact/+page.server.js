import { sendMail } from '$lib/server/mail.js';
import { fail } from '@sveltejs/kit';

export function load() {}


export const actions = {
	contact: async ({ request }) => {
		const data = await request.formData();
		console.log('server data from formData POST:', data);
		const name = data.get('name');
		const email = data.get('email');
		const subject = data.get('subject');
		const message = data.get('message');
		const errors = {};
		if (!email) errors.email = 'Email requis';
		if (!name) errors.name = 'Nom requis';
		if (!message || message.length < 4) errors.message = 'Message trop court';

		if (Object.keys(errors).length > 0) {
			return fail(400, { errors });
		}

		try {
			await sendMail({ name, email, subject, message });
			return { success: true, message: 'Merci pour votre message !' };
		} catch (e) {
			console.error('Erreur envoi mail:', e);
			return fail(500, { errors: { server: 'Une erreur est survenue lors de l’envoi du message.' } });
		}
	}
};

