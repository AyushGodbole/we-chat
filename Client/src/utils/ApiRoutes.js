const registerRoute = `${process.env.REACT_APP_HOST}/api/auth/register`;
const loginRoute = `${process.env.REACT_APP_HOST}/api/auth/login`;
const logoutRoute = `${process.env.REACT_APP_HOST}/api/auth/logout`;
const setAvatarRoute = `${process.env.REACT_APP_HOST}/api/auth/setAvatar`;
const allUserRoutes = `${process.env.REACT_APP_HOST}/api/auth/allusers`;
const sendMessageRoute = `${process.env.REACT_APP_HOST}/api/messages/addmsg`;
const getAllMessagesRoute = `${process.env.REACT_APP_HOST}/api/messages/getAllMessages`;

export { registerRoute, loginRoute, logoutRoute, setAvatarRoute, allUserRoutes, sendMessageRoute, getAllMessagesRoute };
