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
    GET_FRIENDS_COUNT: '/user/friendsCount',
    POST_SEND_FRIEND_REQUEST: '/user/friendRequest/send',
    POST_ACCEPT_FRIEND_REQUEST: '/user/friendRequest/accept',
    POST_REJECT_FRIEND_REQUEST: '/user/friendRequest/reject',
    POST_CANCEL_FRIEND_REQUEST: '/user/friendRequest/cancel',
    GET_ALLPENDING_REQUESTS: '/user/friendRequest/pending',
    GET_ALLSENT_PENDING_REQUESTS: '/user/friendRequest/sent',
    POST_SEARCH_USER_BY_NAME: '/user/getUsers',
    POST_GET_USER_DETAILS_BY_ID: '/user/getUserById',
    GET_RECOMMENDATIONS: '/user/getRecommendations',
    DEL_FRIEND_FROM_LIST: '/user/friends/delete',
    GET_PROFILE:'/user/profile',
    PATCH_PROFILE: '/user/profile',
    POST_NEARBY_SATSANGEES: '/user/nearbySatsangees'
}

export const media = {
    POST_ALLOCATE_MEDIA: '/media/upload/',
    POST_MEDIA_UPDATESTATUS: '/media/updateStatus'
}

export const profile = {
    POST_UPLOAD_PROFILE: '/user/profile/uploadProfile'
}

export const chat = {
    POST_GET_UNREAD_MESSAGES: '/chat/getUnread',
    POST_GET_MESSAGES: '/chat/getMessages',
    GET_GETCONVERSATIONS: '/chat/getConversations',
    POST_GETCONVERSATION_DETAILS: '/chat/getConversationDetails',
    POST_CREATE_GROUP: '/chat/createGroup',
    POST_SEND_MESSAGE: '/chat/sendMessage',
    POST_ACKNOWLEDGE_MESSAGE: '/chat/acknowledeMessages',
    POST_CONVERSATION_RECEIVER_STATUS: '/chat/conversation/receiverStatus',
    POST_DELETE_MESSAGE: '/chat/deletMessage',
    POST_EDIT_MESSAGE: '/chat/editMessage',
    POST_GETMESSAGE_UPDATES: '/chat/getMessageUpdates',
    POST_GETMESSAGEUPDATE_SEQNO: '/chat/getMessageUpdateSeqNo'
}

export const feed = {
    POST_CREATE_POST: '/feed/post',
    GET_POSTS_IN_FEED: '/feed/post',
    GET_POSTS_VISIBILITY_OPTIONS: '/feed/post/visibility',
    GET_POSTS_REACTION_OPTIONS: '/feed/post/reactions',
    POST_REACT_TO_POST: '/feed/post/react',
    DELETE_REACTION_FROM_POST: '/feed/post/react',
    POST_ADDCOMMENT_ON_POST: '/feed/post/comment',
    GET_COMMENTS_ON_POST: '/feed/post/comment',
    GET_USERCOMMENT_REACTIONS: '/feed/post/comment/reactions',
    POST_REACT_TO_COMMENT_ON_POST: '/feed/post/comment/react',
    POST_BOOKMARK_POST: '/feed/post/bookmark',
    PATCH_REMOVE_BOOKMARKED_POST: '/feed/post/bookmark',
    GET_BOOKMARKED_POSTS: '/feed/post/bookmark',
    GET_POSTS_IN_PROFILE: '/feed/post/profile',
    GET_FEED_LOCATION: '/feed/locations',
    GET_ALL_REACTIONS_ON_POST: '/feed/post/'
}

export const story = {
    POST_CREATE_STORY: '/stories/create',
    POST_BULK_STORIES: '/stories/bulk-create',
    GET_STORIES: '/stories',
    POST_REACTTO_STORY: '/stories/react',
    DELETE_STORY: '/stories/',
    GET_REACTION_AND_VIEWS: '/stories/'
}