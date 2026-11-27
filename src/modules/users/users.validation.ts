import { z } from 'zod';

export const createUserValidationSchema = z.object({
    body: z.object({
        name: z.string().trim().min(2, 'Name is required'),
        email: z.string().trim().toLowerCase().email('Invalid email'),
        password: z.string().min(6, 'Password must be at least 6 characters'),
        role: z
            .enum(['attendee', 'organizer'], {
                message: 'Role must be either attendee or organizer',
            })
            .optional(),
    }),
});
