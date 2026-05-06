import { faker } from "@faker-js/faker"
export class UserFactory{

    static regionPayload():Record<string, any>{
        return {
            region: faker.address.city()
        }
    }

    static locationPayload():any{
        return {
            regionId: 1,
            latitude: faker.datatype.number({ min: 8.4, max: 37.6, precision: 0.000001 }), 
            longitude: faker.datatype.number({ min: 68.7, max: 97.25, precision: 0.000001 })
        }
    }

    static nearBySatsangeePayload():any{
        return {
            latitude: faker.datatype.number({ min: 8.4, max: 37.6, precision: 0.000001 }), 
            longitude: faker.datatype.number({ min: 68.7, max: 97.25, precision: 0.000001 })
        }
    }

    static sendFriendRequestPayload():any{
        return {
            friendId: '',
            requestText: ''
        }
    }

    static cancelFriendRequestPayload():any{
        return {
            friendId: '',
            friendRequestId: ''
        }
    }

    static acceptFriendRequestPayload():any{
        return {
            friendId: '',
            friendRequestId: ''
        }
    }

    static rejectFriendRequestPayload():any{
        return {
            friendId: '',
            friendRequestId: ''
        }
    }

    static getAllFriendsPayload():Record<string, any>{
        return {
            name: '',
            pageNo: 1
        }
    }

    static searchUserByNamePayload():any{
        return {
            name: ''
        }
    }


    static deleteFriendPayload():any{
        return {
            friendId: ''
        }
    }

    static getProfilePayload():any{
        return {
            userId: ''
        }
    }

    static updateProfilePayload():any{
        return {
            bio: faker.lorem.paragraph(),
            username: faker.name.firstName() + faker.name.lastName(),
            gender: faker.helpers.arrayElement(['male','female','other'])
        }
    }

}