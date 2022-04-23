import {admin} from "src/config/firebase";


class Middleware {
    async decodeToken(request, response, next) {
        console.log("ADmin Middleware");
        if (!request.headers.authorization)
            return
        const authHeader = request.headers.authorization.split(" ");
        if (authHeader.length < 2)
            return;

        const token = request.headers.authorization.split(" ")[1];
        try {
            const decodeValue = await admin.auth().verifyIdToken(token);
            if (decodeValue) {
                request.user = decodeValue;
                next();
            } else
                return response.json({message: "Un Authorize"});
        } catch (err) {
            return response.json({message: "Auth Internal Error"});
        }
    }
}


export const middleware = new Middleware();