// Contains link to divert your request to server
export const host = "http://localhost:5000"

export const registerRoute = `${host}/api/auth/register`
export const loginRoute = `${host}/api/auth/login`
export const setAvatarRoute = `${host}/api/auth/setAvatar`
export const allUsersRoute = `${host}/api/auth/allUsers`

export const sendMessageRoute = `${host}/api/messages/addMsg`
export const getMessagesRoute = `${host}/api/messages/getAllMsgs`