const { z } = require("zod");

// Strong password regex
const passwordSchema = z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain uppercase letter")
    .regex(/[a-z]/, "Password must contain lowercase letter")
    .regex(/[0-9]/, "Password must contain number");

exports.registerSchema = z.object({
    body: z.object({
        name: z.string().min(2),
        email: z.string().email(),
        password: passwordSchema,
        role: z.enum(["user", "admin"]).optional()
    })
});

exports.loginSchema = z.object({
    body: z.object({
        email: z.string().email(),
        password: z.string().min(1, "Password is required"),
    })
});

exports.refreshSchema = z.object({
    body: z.object({
        refreshToken: z.string().min(1, "Refresh token required")
    })
});
