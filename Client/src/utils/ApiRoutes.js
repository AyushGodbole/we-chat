const host = "http://localhost:5000";

const registerRoute = `${host}/api/auth/register`;

const loginRoute = `${host}/api/auth/login`;

const logoutRoute = `${host}/api/auth/logout`;

const setAvatarRoute = `${host}/api/auth/setAvatar`;

const allUserRoutes = `${host}/api/auth/allusers`;

const sendMessageRoute = `${host}/api/messages/addmsg`;

const getAllMessagesRoute = `${host}/api/messages/getAllMessages`

export {registerRoute,loginRoute,logoutRoute,setAvatarRoute,allUserRoutes,sendMessageRoute,getAllMessagesRoute};