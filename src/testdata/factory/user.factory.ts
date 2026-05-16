import { faker } from "@faker-js/faker"
export class UserFactory{

    static regionPayload(){
        return {
            region: faker.address.city()
        }
    }

    static locationPayload(){
        return {
            regionId: 1,
            latitude: 1,
            longitude: 1
        }
    }

    static sendFriendRequestPayload(){
        return {
            friendId: '',
            requestText: ''
        }
    }

    static cancelFriendRequestPayload(){
        return {
            friendId: '',
            friendRequestId: ''
        }
    }

    static acceptFriendRequestPayload(){
        return {
            friendId: '',
            friendRequestId: ''
        }
    }

    static rejectFriendRequestPayload(){
        return {
            friendId: '',
            friendRequestId: ''
        }
    }

    static searchUserByNamePayload(){
        return {
            name: ''
        }
    }


    static deleteFriendPayload(){
        return {
            friendId: ''
        }
    }

}