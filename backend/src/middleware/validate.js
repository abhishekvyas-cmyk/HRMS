const validate = (schema) => (req, res, next) => {
    const result = schema.safeParse({
        body: req.body,
        params: req.params,
        query: req.query
    });

    if (!result.success) {
        return res.status(400).json({
            error: result.error.issues[0]?.message
        });
    }

    next();
};

module.exports = validate;
