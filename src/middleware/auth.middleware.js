import jwt from 'jsonwebtoken'

async function authMiddleware(req, res, next){

    const token = req.cookies.token

    if(!token){
        return res.status(401).json({
            msg: "Unauthorized"
        })
    }

    try {
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if(decoded.role !== "artist"){
            return res.status(403).json({
                   msg: "You don't have to access create album"
            })
        }

        req.user = decoded
        next()

    } catch (error) {
        return res.status(401).json({
             msg: "Unauthorized"
        })
    }
}

async function getMusicMid(req, res, next){
      const token = req.cookies.token

      if(!token){
        return res.status(401).json({
            msg: "Unauthorized"
        })
      }

      try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if(decoded.role !== "artist" && decoded.role !== "user"){
            return res.status(403).json({
                msg: "Your don't have access"
            })
        }

        req.user = decoded
        next()
        
      } catch (error) {
        return res.status(401).json({
            msg: "Unauthorized"
        })
      }
}

export { authMiddleware, getMusicMid }