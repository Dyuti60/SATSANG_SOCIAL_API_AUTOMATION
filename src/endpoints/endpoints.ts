export const login = {
    signInContact: '/auth/signinContact',
    verifyOtp: '/auth/verifyOTP',
    createSession: '/auth/createSession',
    authorizeSession: '/auth/authorizeSession',
    loginUser: '/auth/login'
}

export const register = {
    registerUser: '/auth/register'
}

export const user = {
    GET_USER_REGION: '/user/getRegion/',
    PATCH_USER_LOCATION: '/user/location',
    GET_ALL_FRIENDS: '/user/friends',
    GET_FRIENDS_COUNT: '/user/friendCount',
    POST_SEND_FRIEND_REQUEST: '/user/friendRequest/send',
    POST_ACCEPT_FRIEND_REQUEST: '/user/friendRequest/accept',
    POST_REJECT_FRIEND_REQUEST: '/user/friendRequest/reject',
    POST_CANCEL_FRIEND_REQUEST: '/user/friendRequest/cancel',
    GET_ALLPENDING_REQUESTS: '/user/friendRequest/pending',
    GET_ALLSENT_PENDING_REQUESTS: '/user/friendRequest/sent',
    POST_SEARCH_USER_BY_NAME: '/user/getUsers',
    POST_GET_USER_DETAILS_BY_ID: '/user/getUserById',
    GET_RECOMMENDATIONS: '/user/getRecommendations',
    DEL_FRIEND_FROM_LIST: '/user/friends/delete'
}