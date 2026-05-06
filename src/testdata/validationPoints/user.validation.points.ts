import { faker } from "@faker-js/faker";
import { UserFactory } from "../../testdata/factory/user.factory";

type regionPayload = ReturnType<typeof UserFactory.regionPayload>

interface InvalidRegionCases{
  description: string
  overrides: Partial<regionPayload>
  expectedStatus: number
  expectedMessage: string
}

export const invalidRegionTestCases: InvalidRegionCases[] = [
    {
        description:'lower caps region',
        overrides: {region:"jorhat"},
        expectedStatus: 200,
        expectedMessage: "User regions found" 
    },
    {
        description:'upper caps region',
        overrides: {region:"JORHAT"},
        expectedStatus: 200,
        expectedMessage: "User regions found"
    },
    {
        description:'short region',
        overrides: {region:"jo"},
        expectedStatus: 400,
        expectedMessage: "Something went wrong on our end. Please try again later." 
    },
    {
        description:'leading and lagging space in region string',
        overrides: {region:"            jorhat          "},
        expectedStatus: 200,
        expectedMessage: "User regions found"
    },
    {
        description:'non existing region string',
        overrides: {region:"khonsa"},
        expectedStatus: 200,
        expectedMessage: "User regions found"
    },
    {
        description:'invalid region string',
        overrides: {region:"123&^*"},
        expectedStatus: 200,
        expectedMessage: "User regions found"
    },
    {
        description:'number datatype region string',
        overrides: {region:12345},
        expectedStatus: 200,
        expectedMessage: "User regions found"
    },
    {
        description:'null datatype region string',
        overrides: {region:null},
        expectedStatus: 200,
        expectedMessage: "User regions found"
    },
    {
        description:'boolean datatype region string',
        overrides: {region:true},
        expectedStatus: 200,
        expectedMessage: "User regions found"
    },
]


type allFriendsPayload = ReturnType<typeof UserFactory.getAllFriendsPayload>

interface allFriendsCases{
  description: string
  overrides: Partial<allFriendsPayload>
  expectedStatus: number
  expectedMessage: string
}

export const allFriendsTestCases: allFriendsCases[] = [
    {
        description:'fetch all friends by valid name >=3 char',
        overrides: {
            name:"hald"
        },
        expectedStatus: 201,
        expectedMessage: "Successfully fetched the friend list" 
    },
    {
        description:'fetch all friends by valid name >=3 char in page 1',
        overrides: {
            name:"hal",
            pageNo: 1
        },
        expectedStatus: 201,
        expectedMessage: "Successfully fetched the friend list" 
    },
    {
        description:'fetch all friends by valid name >=3 char in page 2',
        overrides: {
            name:"hal",
            pageNo: 2
        },
        expectedStatus: 201,
        expectedMessage: "Successfully fetched the friend list" 
    },
    {
        description:'fetch all friends in page 1',
        overrides: {
            pageNo: 1
        },
        expectedStatus: 201,
        expectedMessage: "Successfully fetched the friend list" 
    },
    {
        description:'fetch all friends in page 2',
        overrides: {
            pageNo: 2
        },
        expectedStatus: 201,
        expectedMessage: "Successfully fetched the friend list" 
    },
    {
        description:'fetch all friends by name < 3 char in pageNo 1',
        overrides: {
            name:"ha",
            pageNo: 1
        },
        expectedStatus: 400,
        expectedMessage: "name must be longer than or equal to 3 characters" 
    },
    {
        description:'fetch all friends by name - number datatype > 3 char',
        overrides: {
            name:1000,
            pageNo: 1
        },
        expectedStatus: 400,
        expectedMessage: "name must be longer than or equal to 3 characters" 
    },
    {
        description:'fetch all friends by name - invalid string > 3 char',
        overrides: {
            name: "*&^*$RYIU$HRUF(*!)(*878767&^%#*&@YIUFKJ@#HKJFNCKEJNF#@KJF*#@U("
        },
        expectedStatus: 201,
        expectedMessage: "Successfully fetched the friend list" 
    },
    {
        description:'fetch all friends by name - invalid string < 3 char',
        overrides: {
            name: "*&"
        },
        expectedStatus: 400,
        expectedMessage: "name must be longer than or equal to 3 characters" 
    },
    {
        description:'fetch all friends by name - boolean datatype',
        overrides: {
            name: true
        },
        expectedStatus: 400,
        expectedMessage: "name must be longer than or equal to 3 characters" 
    },
    {
        description:'fetch all friends by name - casesensitive check',
        overrides: {
            name: "BIKA"
        },
        expectedStatus: 201,
        expectedMessage: "Successfully fetched the friend list" 
    }
]

type sendFriendRequestPayload = ReturnType<typeof UserFactory.sendFriendRequestPayload>

interface sendFriendRequestCases{
  description: string
  overrides: Partial<sendFriendRequestPayload>
  expectedStatus: number
  expectedMessage: string
}

export const sendFriendRequestPayloadTestCases: sendFriendRequestCases[] = [
    // {
    //     description:'Unregistered FriendId',
    //     overrides: {
    //         friendId: "0196ee77-8158-7a2d-a912-638634c8a592"
    //     },
    //     expectedStatus: 201,
    //     expectedMessage: "Friend request sent successfully" 
    // },
    {
        description:'Null Request Text',
        overrides: {
            requestText:null
        },
        expectedStatus: 201,
        expectedMessage: "Friend request sent successfully" 
    },
    {
        description:'Blank Request Text',
        overrides: {
            requestText:""
        },
        expectedStatus: 201,
        expectedMessage: "Friend request sent successfully" 
    },
    {
        description:'Space Request Text',
        overrides: {
            requestText:" "
        },
        expectedStatus: 201,
        expectedMessage: "Friend request sent successfully" 
    },
    {
        description:'Lengthy Request Text',
        overrides: {
            requestText:"YTYTTR#^@(H *&(!*)(@ erifhuoiewjf wofijwqoif ewoifjewoif weoijfwoif ewoifjoiew ewoifjoiewf ewihfoiewjfoiwef ewoifjewoifjoiewf coiwjeoifjmiafc ewoifjewoifji fsdivjewiljf mnewoifjewoifj ewoifjewoifj oejfoiewjf oijeoifjweoif oijewoifjwef oijeoifjewoif oiwqjfoiqjwiof ewiuhfiqwjfiqw oihdoiwqjfoiqw wqjfoiqwjfoiqwjfoi eifjwqoijfoiwqf weifjewofjoiewjfoi ewfoijewoifjeoiwf ewfoijewoifjw ewoifjewoifjow ewfoiewjfoiewjfio eifjewoijfoiewjf eifjoiewjfoiew iwejfoiewjfoi ewijfoiewjfoiwe eowjfoiewjfoiw ewfjewoijfoiew ewfjewoifjoiew"+faker.lorem.paragraph()
        },
        expectedStatus: 400,
        expectedMessage: "" 
    },
    {
        description:'Number Type Request Text',
        overrides: {
            requestText:876768576
        },
        expectedStatus: 400,
        expectedMessage: "requestText must be a string" 
    },
    {
        description:'Boolean Type Request Text',
        overrides: {
            requestText:true
        },
        expectedStatus: 400,
        expectedMessage: "requestText must be a string" 
    },
    {
        description:'Invalid FriendId',
        overrides: {
            friendId: "0196ee78-3ba1-7663-88fd-b385aa46c"
        },
        expectedStatus: 400,
        expectedMessage: "" 
    },
    {
        description:'null FriendId and valid request text',
        overrides: {
            friendId: null,
            requestText: "Hello"
        },
        expectedStatus: 400,
        expectedMessage: "friendId should not be empty" 
    },
    {
        description:'blank FriendId and valid request text',
        overrides: {
            friendId: "",
            requestText: "Hello"
        },
        expectedStatus: 400,
        expectedMessage: "friendId should not be empty" 
    },
    {
        description:'number datatype friendId',
        overrides: {
            friendId: 12345
        },
        expectedStatus: 400,
        expectedMessage: "" 
    },
    {
        description:'boolean datatype friendId',
        overrides: {
            friendId: true
        },
        expectedStatus: 201,
        expectedMessage: "" 
    },
    {
        description:'null friendId and request text',
        overrides: {
            friendId: null,
            requestText: null
        },
        expectedStatus: 400,
        expectedMessage: "friendId should not be empty" 
    },
    {
        description:'blank friendId and request text',
        overrides: {
            friendId: "",
            requestText: ""
        },
        expectedStatus: 400,
        expectedMessage: "friendId should not be empty"
    },
]


type cancelFriendRequestPayload = ReturnType<typeof UserFactory.cancelFriendRequestPayload>

interface cancelFriendRequestCases{
  description: string
  overrides: Partial<cancelFriendRequestPayload>
  expectedStatus: number
  expectedMessage: string
}

export const cancelFriendRequestPayloadTestCases: cancelFriendRequestCases[] = [
    {
        description:'Unregistered user friendId',
        overrides: {
            friendId: "019677-8158-7a2d-a912-6334c8a592"
        },
        expectedStatus: 400,
        expectedMessage: "" 
    },
    {
        description:'Blank Friend Request Id',
        overrides: {
            friendRequestId: ""
        },
        expectedStatus: 400,
        expectedMessage: "friendRequestId should not be empty" 
    },
    {
        description:'Null Friend Request Id',
        overrides: {
            friendRequestId: null
        },
        expectedStatus: 400,
        expectedMessage: "friendRequestId should not be empty" 
    },
    {
        description:'Invalid FriendRequestId',
        overrides: {
            friendRequestId: "0196ee77-8158-7a2d-a912-638634c8a592"
        },
        expectedStatus: 400,
        expectedMessage: "No valid pending friend request found" 
    },
    {
        description:'Number Datatype FriendRequestId',
        overrides: {
            friendRequestId: 1234
        },
        expectedStatus: 400,
        expectedMessage: "" 
    },
    {
        description:'Boolean Datatype FriendRequestId',
        overrides: {
            friendRequestId: true
        },
        expectedStatus: 400,
        expectedMessage: "" 
    },
    {
        description:'Blank FriendId',
        overrides: {
            friendId: ""
        },
        expectedStatus: 400,
        expectedMessage: "friendId should not be empty" 
    },
    {
        description:'Null FriendId',
        overrides: {
            friendId: null
        },
        expectedStatus: 400,
        expectedMessage: "friendId should not be empty" 
    },
    {
        description:'Invalid FriendId',
        overrides: {
            friendId: "019e77-8158-7a2d-a912-638634"
        },
        expectedStatus: 400,
        expectedMessage: "" 
    },
    {
        description:'Number Datatype FriendId',
        overrides: {
            friendId: 1234
        },
        expectedStatus: 400,
        expectedMessage: "" 
    },
    {
        description:'Boolean Datatype FriendId',
        overrides: {
            friendId: true
        },
        expectedStatus: 400,
        expectedMessage: "" 
    },
]

type acceptFriendRequestPayload = ReturnType<typeof UserFactory.acceptFriendRequestPayload>

interface acceptFriendRequestCases{
  description: string
  overrides: Partial<acceptFriendRequestPayload>
  expectedStatus: number
  expectedMessage: string
}

export const acceptFriendRequestPayloadTestCases: acceptFriendRequestCases[] = [
    {
        description:'Unregistered user friendId',
        overrides: {
            friendId: "0196e77-8158-7a2d-a912-63834c8a592"
        },
        expectedStatus: 400,
        expectedMessage: "" 
    },
    {
        description:'Blank Friend Request Id',
        overrides: {
            friendRequestId: ""
        },
        expectedStatus: 400,
        expectedMessage: "friendRequestId should not be empty" 
    },
    {
        description:'Null Friend Request Id',
        overrides: {
            friendRequestId: null
        },
        expectedStatus: 400,
        expectedMessage: "friendRequestId should not be empty" 
    },
    {
        description:'Invalid FriendRequestId',
        overrides: {
            friendRequestId: "0196ee77-8158-7a2d-a912-638634c8a592"
        },
        expectedStatus: 400,
        expectedMessage: "No valid pending friend request found" 
    },
    {
        description:'Number Datatype FriendRequestId',
        overrides: {
            friendRequestId: 1234
        },
        expectedStatus: 400,
        expectedMessage: "" 
    },
    {
        description:'Boolean Datatype FriendRequestId',
        overrides: {
            friendRequestId: true
        },
        expectedStatus: 400,
        expectedMessage: "" 
    },
    {
        description:'Blank FriendId',
        overrides: {
            friendId: ""
        },
        expectedStatus: 400,
        expectedMessage: "friendId should not be empty" 
    },
    {
        description:'Null FriendId',
        overrides: {
            friendId: null
        },
        expectedStatus: 400,
        expectedMessage: "friendId should not be empty" 
    },
    {
        description:'Invalid FriendId',
        overrides: {
            friendId: "019e77-8158-7a2d-a912-638634"
        },
        expectedStatus: 400,
        expectedMessage: "" 
    },
    {
        description:'Number Datatype FriendId',
        overrides: {
            friendId: 1234
        },
        expectedStatus: 400,
        expectedMessage: "" 
    },
    {
        description:'Boolean Datatype FriendId',
        overrides: {
            friendId: true
        },
        expectedStatus: 400,
        expectedMessage: "" 
    },
]

type rejectFriendRequestPayload = ReturnType<typeof UserFactory.rejectFriendRequestPayload>

interface rejectFriendRequestCases{
  description: string
  overrides: Partial<rejectFriendRequestPayload>
  expectedStatus: number
  expectedMessage: string
}

export const rejectFriendRequestPayloadTestCases: rejectFriendRequestCases[] = [
    {
        description:'Unregistered user friendId',
        overrides: {
            friendId: "0196ee77-8158-7a2d-a912-638634c8a592"
        },
        expectedStatus: 400,
        expectedMessage: "Invalid FriendId" 
    },
    {
        description:'Blank Friend Request Id',
        overrides: {
            friendRequestId: ""
        },
        expectedStatus: 400,
        expectedMessage: "friendRequestId should not be empty" 
    },
    {
        description:'Null Friend Request Id',
        overrides: {
            friendRequestId: null
        },
        expectedStatus: 400,
        expectedMessage: "friendRequestId should not be empty" 
    },
    {
        description:'Invalid FriendRequestId',
        overrides: {
            friendRequestId: "0196ee77-8158-7a2d-a912-638634c8a592"
        },
        expectedStatus: 400,
        expectedMessage: "No valid pending friend request found" 
    },
    {
        description:'Number Datatype FriendRequestId',
        overrides: {
            friendRequestId: 1234
        },
        expectedStatus: 400,
        expectedMessage: "Invalid FriendRequestId" 
    },
    {
        description:'Boolean Datatype FriendRequestId',
        overrides: {
            friendRequestId: true
        },
        expectedStatus: 400,
        expectedMessage: "Invalid FriendRequestId" 
    },
    {
        description:'Blank FriendId',
        overrides: {
            friendId: ""
        },
        expectedStatus: 400,
        expectedMessage: "friendRequestId should not be empty" 
    },
    {
        description:'Null FriendId',
        overrides: {
            friendId: null
        },
        expectedStatus: 400,
        expectedMessage: "friendRequestId should not be empty" 
    },
    {
        description:'Invalid FriendId',
        overrides: {
            friendId: "019e77-8158-7a2d-a912-638634"
        },
        expectedStatus: 400,
        expectedMessage: "Invalid FriendId" 
    },
    {
        description:'Number Datatype FriendId',
        overrides: {
            friendId: 1234
        },
        expectedStatus: 400,
        expectedMessage: "Invalid FriendId" 
    },
    {
        description:'Boolean Datatype FriendId',
        overrides: {
            friendId: true
        },
        expectedStatus: 400,
        expectedMessage: "Invalid FriendId" 
    },
]


type searchUserPayload = ReturnType<typeof UserFactory.searchUserByNamePayload>

interface searchUserCases{
  description: string
  overrides: Partial<searchUserPayload>
  expectedStatus: number
  expectedMessage: string
}

export const searchUserPayloadTestCases: searchUserCases[] = [

    {
        description:'Invalid User Name',
        overrides: {
            name: 'Pamku'
        },
        expectedStatus: 201,
        expectedMessage: "Users found successfully" 
    },
    {
        description:'Invalid Full Name',
        overrides: {
            name: 'Pamku Kumar'
        },
        expectedStatus: 201,
        expectedMessage: "Users found successfully" 
    },
    {
        description:'Partial User Name',
        overrides: {
            name: 'dyu'
        },
        expectedStatus: 201,
        expectedMessage: "Users found successfully" 
    },
    {
        description:'Partial Full Name',
        overrides: {
            name: 'DyutiSundar'
        },
        expectedStatus: 201,
        expectedMessage: "Users found successfully" 
    },
    {
        description:'<2 char name',
        overrides: {
            name: 'dy'
        },
        expectedStatus: 400,
        expectedMessage: "name must be longer than or equal to 3 characters" 
    },
    {
        description:'Number Datatype Name',
        overrides: {
            name: 123
        },
        expectedStatus: 400,
        expectedMessage: "name must be longer than or equal to 3 characters - invalid message" 
    },
    {
        description:'Boolean Datatype Name',
        overrides: {
            name: true
        },
        expectedStatus: 400,
        expectedMessage: "name must be longer than or equal to 3 characters - invalid message" 
    },
]


type deleteFriendPayload = ReturnType<typeof UserFactory.deleteFriendPayload>

interface deletFriendCases{
  description: string
  overrides: Partial<deleteFriendPayload>
  expectedStatus: number
  expectedMessage: string
}

export const deleteFriendPayloadTestCases: deletFriendCases[] = [
    {
        description:'Unregistered User friendId',
        overrides: {
            friendId: "0196ee77-8158-7a2d-a912-638634c8a592"
        },
        expectedStatus: 400,
        expectedMessage: "Successfully not deleted"
    },
    {
        description:'Blank FriendId',
        overrides: {
            friendId: ""
        },
        expectedStatus: 400,
        expectedMessage: "friendId should not be empty" 
    },
    {
        description:'Null FriendId',
        overrides: {
            friendId: null
        },
        expectedStatus: 400,
        expectedMessage: "friendId should not be empty" 
    },
    {
        description:'Number Datatype FriendId',
        overrides: {
            friendId: 1234
        },
        expectedStatus: 400,
        expectedMessage: "Number Datatype" 
    },
    {
        description:'Boolean Datatype FriendId',
        overrides: {
            friendId: true
        },
        expectedStatus: 400,
        expectedMessage: "Boolean Datatype" 
    }
]

type getProfilePayload = ReturnType<typeof UserFactory.getProfilePayload>

interface getProfileCases{
  description: string
  overrides: Partial<getProfilePayload>
  expectedStatus: number
  expectedMessage: string
}

export const getProfilePayloadTestCases: getProfileCases[] = [
    {
        description:'Blank User Id',
        overrides: {
            userId: ""
        },
        expectedStatus: 400,
        expectedMessage: "userId should not be empty" 
    },
    {
        description:'Null User Id',
        overrides: {
            userId: null
        },
        expectedStatus: 400,
        expectedMessage: "userId must be a string" 
    },
    {
        description:'Invalid User Id',
        overrides: {
            userId: "0196ee77-8158-7a2d-a912-638634c8a592"
        },
        expectedStatus: 200,
        expectedMessage: "No users found" 
    },
    {
        description:'Boolean User Id',
        overrides: {
            userId: false
        },
        expectedStatus: 400,
        expectedMessage: "Boolean" 
    },
    {
        description:'Space User Id',
        overrides: {
            userId: " "
        },
        expectedStatus: 400,
        expectedMessage: "No users found" 
    }
]

type updateProfilePayload = ReturnType<typeof UserFactory.updateProfilePayload>

interface updateProfileCases{
  description: string
  overrides: Partial<updateProfilePayload>
  expectedStatus: number
  expectedMessage: string
}

export const updateProfilePayloadTestCases: updateProfileCases[] = [
    {
        description:'Bio with only space',
        overrides: {
            bio: " "
        },
        expectedStatus: 200,
        expectedMessage: "Successfully updated User-Profile" 
    },
    {
        description:'Bio with only blank',
        overrides: {
            bio: ""
        },
        expectedStatus: 200,
        expectedMessage: "Successfully updated User-Profile" 
    },
    {
        description:'Bio with only null',
        overrides: {
            bio: null
        },
        expectedStatus: 200,
        expectedMessage: "Successfully updated User-Profile"
    },
    {
        description:'Bio as Boolean Datatype',
        overrides: {
            bio: true
        },
        expectedStatus: 400,
        expectedMessage: "bio must be a string" 
    },
    {
        description:'Bio as Number Datatype',
        overrides: {
            bio: 12345
        },
        expectedStatus: 400,
        expectedMessage: "bio must be a string" 
    },
    {
        description:'Length Bio',
        overrides: {
            bio: "hekf wejfwle ewfjwke ewifjiewf ewfhewkf ewfjewlf ewifewhjkf ewifhewf ewfhew ewfjhkew  fhewfk" + faker.lorem.paragraphs()
        },
        expectedStatus: 400,
        expectedMessage: "bio is too lengthy" 
    },
    {
        description:'Invalid Gender',
        overrides: {
            gender: "human"
        },
        expectedStatus: 400,
        expectedMessage: "gender must be one of the following values: male, female, other" 
    },
    {
        description:'Number Datatype Gender',
        overrides: {
            gender: 1234
        },
        expectedStatus: 400,
        expectedMessage: "gender must be one of the following values: male, female, other" 
    },
    {
        description:'Space Gender',
        overrides: {
            gender: " "
        },
        expectedStatus: 400,
        expectedMessage: "gender must be one of the following values: male, female, other" 
    },
    {
        description:'Null Gender',
        overrides: {
            gender: null
        },
        expectedStatus: 400,
        expectedMessage: "gender must be one of the following values: male, female, other" 
    },
    {
        description:'Case Sensitive Gender',
        overrides: {
            gender: "MALE"
        },
        expectedStatus: 400,
        expectedMessage: "gender must be one of the following values: male, female, other" 
    },
    {
        description:'Short Username <3 Char',
        overrides: {
            username: "MA"
        },
        expectedStatus: 400,
        expectedMessage: "Username is too short" 
    },
    {
        description:'Already Existing Username',
        overrides: {
            username: "dyuti"
        },
        expectedStatus: 400,
        expectedMessage: "Username already in use" 
    },
    {
        description:'Space Username',
        overrides: {
            username: " "
        },
        expectedStatus: 400,
        expectedMessage: "Invalid username" 
    },
    {
        description:'Blank Username',
        overrides: {
            username: ""
        },
        expectedStatus: 400,
        expectedMessage: "Invalid Username" 
    },
    {
        description:'Null Username',
        overrides: {
            username: null
        },
        expectedStatus: 400,
        expectedMessage: "Invalid Username" 
    },
    {
        description:'Boolean Username',
        overrides: {
            username: true
        },
        expectedStatus: 400,
        expectedMessage: "username must be a string" 
    },
    {
        description:'Number Username',
        overrides: {
            username: 1234
        },
        expectedStatus: 400,
        expectedMessage: "username must be a string" 
    },
    {
        description:'Invalid Username',
        overrides: {
            username: "123432iuhfiu32r894378rwfevkjbsb*&^%^$%&^^*(&^&%&^^*&(*"
        },
        expectedStatus: 400,
        expectedMessage: "Invalid Username" 
    },
]

type updateUserLocationPayload = ReturnType<typeof UserFactory.locationPayload>

interface userLocationCases{
  description: string
  overrides: Partial<updateUserLocationPayload>
  expectedStatus: number
  expectedMessage: string
}

export const updateUserLocationPayloadTestCases1: userLocationCases[] = [
    {
        description:'Only latitude',
        overrides: {
            latitude:22.5
        },
        expectedStatus: 400,
        expectedMessage: "regionId must be a number conforming to the specified constraints" 
    },
    {
        description:'Only longitude',
        overrides: {
            longitude:88.3
        },
        expectedStatus: 400,
        expectedMessage: "regionId must be a number conforming to the specified constraints" 
    },
    {
        description:'Only regionId',
        overrides: {
            regionId:1
        },
        expectedStatus: 400,
        expectedMessage: "latitude must be a number conforming to the specified constraints" 
    },
    {
        description:'missing payload',
        overrides: {
        },
        expectedStatus: 400,
        expectedMessage: "regionId must be a number conforming to the specified constraints" 
    }
]


export const updateUserLocationPayloadTestCases2: userLocationCases[] = [
    {
        description:'Minimum Latitude India',
        overrides: {
            latitude:8.4,
            longitude:68.7
        },
        expectedStatus: 200,
        expectedMessage: "User home location added successfull" 
    },
    {
        description:'Maximum Longitude India',
        overrides: {
            latitude:37.6,
            longitude:97.25
        },
        expectedStatus: 200,
        expectedMessage: "User home location added successfully" 
    },
    {
        description:'Minimum Latitude Global',
        overrides: {
            latitude:-90,
            longitude:90
        },
        expectedStatus: 200,
        expectedMessage: "User home location added successfully" 
    },
    {
        description:'Maximum Longitude Global',
        overrides: {
            latitude:-180,
            longitude:180
        },
        expectedStatus: 200,
        expectedMessage: "User home location added successfully" 
    },
    {
        description:'Null latitude',
        overrides: {
            latitude:null
        },
        expectedStatus: 400,
        expectedMessage: "latitude must be a number conforming to the specified constraints" 
    },
    {
        description:'undefined longitude and latitude',
        overrides: {
            longitude:undefined,
            latitude:undefined
        },
        expectedStatus: 400,
        expectedMessage: "latitude must be a number conforming to the specified constraints" 
    },
    {
        description:'invalid string datatype',
        overrides: {
            latitude: "abc",
            longitude: 88.3
        },
        expectedStatus: 400,
        expectedMessage: "latitude must be a number conforming to the specified constraints" 
    },
    {
        description:'invalid boolean datatype',
        overrides: {
            latitude: 22.5,
            longitude: true
        },
        expectedStatus: 400,
        expectedMessage: "longitude must be a number conforming to the specified constraints" 
    },
    {
        description:'out of range payload',
        overrides: {
            latitude: 100,
            longitude: 88
        },
        expectedStatus: 200,
        expectedMessage: "User home location added successfully" 
    },
    {
        description:'out of range payload negative',
        overrides: {
            latitude: -95,
            longitude: 200
        },
        expectedStatus: 200,
        expectedMessage: "User home location added successfully" 
    },
    {
        description:'precision edge case',
        overrides: {
            latitude: 22.12347567575,
            longitude: 88.25
        },
        expectedStatus: 200,
        expectedMessage: "User home location added successfully" 
    },
    {
        description:'empty string',
        overrides: {
            latitude: "",
            longitude: ""
        },
        expectedStatus: 400,
        expectedMessage: "latitude must be a number conforming to the specified constraints" 
    },
    {
        description:'zero value',
        overrides: {
            latitude: 0,
            longitude: 0
        },
        expectedStatus: 200,
        expectedMessage: "User home location added successfully" 
    },
    {
        description:'maximum lat and long',
        overrides: {
            latitude: 90,
            longitude: 100
        },
        expectedStatus: 200,
        expectedMessage: "User home location added successfully" 
    },
    {
        description:'check precision handling',
        overrides: {
            latitude: 22.0000001,
            longitude: 88.000001
        },
        expectedStatus: 200,
        expectedMessage: "User home location added successfully" 
    },
    {
        description:'Invalid RegionId',
        overrides: {
            regionId: 90909090
        },
        expectedStatus: 200,
        expectedMessage: "User home location added successfully" 
    },
    {
        description:'Null RegionId',
        overrides: {
            regionId: null
        },
        expectedStatus: 400,
        expectedMessage: "regionId must be a number conforming to the specified constraints" 
    },
    {
        description:'Zero RegionId',
        overrides: {
            regionId: 0
        },
        expectedStatus: 200,
        expectedMessage: "User home location added successfully" 
    },
    {
        description:'Boolean Datatype RegionId',
        overrides: {
            regionId: true
        },
        expectedStatus: 400,
        expectedMessage: "regionId must be a number conforming to the specified constraints" 
    }
]
