
import jwt from 'jsonwebtoken';

function auth(req, res, next) {
    try {
        const token = req.cookies.token
        if (!token) return res.status(401).json({ error: 'Unauthorized' })

        const verified = jwt.verify(token, process.env.JWT_PRIVATE_KEY)

        req.user = verified.user

        next()

    } catch (error) {
        res.status(401).json({ error: "Unauthorized" })
    }
}

export default auth