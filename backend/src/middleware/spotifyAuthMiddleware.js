// export const requireSpotifyAuth = (req, res, next) => {

//     const accessToken = req.session.accessToken;
//     if(!accessToken) {
//         return res.status(401).json({
//             error: "Unauthorized"
//         });
//     }
//     next();
// }