import jwt from 'jsonwebtoken'
import { User } from '../models/User.models.js';

const isAuthenticatedd = async (req, res, next) => {
    try{
        console.log("Received Cookies:", req.cookies);
        const token = req.cookies.token; 
        console.log("Extracted Token:", token); 
        if(!token){
            return res.status(401).json({
                message: "User not Authenticated",
                suucess: false,
            })
        }
        const decode = await jwt.verify(token, process.env.SECRET_KEY);
        if(!decode){
            return res.status(401).json({
                message: "Invalid token",
                suucess: false,
            })
        }
        const user = await User.findById(decode.userId);
        if (!user) {
            return res.status(401).json({
                message: "User not found",
                success: false,
            });
        }

        req.id = user; 
        next();
    }catch(error){
        console.log(error)
    }
}
export default isAuthenticatedd;