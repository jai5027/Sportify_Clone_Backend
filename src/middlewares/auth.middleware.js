import jwt from 'jsonwebtoken'

async function authArtist(req, res, next){

    const token = req.cookies.token

    if(!token){
        return res.status(401).json({
            msg: "Unauthorized"
        })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if(decoded.role !== 'artist'){
            return res.status(403).json({ msg: "You don't access" })
        }

        req.user = decoded
        next()

    } catch (error) {
        return res.status(401).json({
            msg: "Unauthorized"
        })
    }
} 

async function getUser(req, res, next){

    const token = req.cookies.token

    if(!token){
        return res.status(401).json({
            msg: "Unauthorized"
        })
    }
    try {
     const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if(decoded.role !== "user"){
            return res.status(403).json({
                msg: "You don't have access"
            })
        }
        req.user = decoded

        next()

    } catch (error) {
        return res.status(401).json({
            msg: "Token Invalid"
        })
    }

}

export { authArtist, getUser } 