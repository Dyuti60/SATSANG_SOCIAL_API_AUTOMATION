import { faker } from "@faker-js/faker"
import { RegistrationFactory } from "../../testdata/factory/registration.factory"

type userPayload = ReturnType<typeof RegistrationFactory.registerPayload>

type fieldName = keyof userPayload

interface InvalidUserCases {
  description: string
  overrides: Partial<userPayload>
  expectedStatus: number
  expectedMessage: string
}

export const invalidRegisterUserCases: InvalidUserCases[] = [
    {
    description:'duplicate username',
    overrides: {username:"dyuti"},
    expectedStatus: 400,
    expectedMessage: "The username is already taken" 
    },
    {
    description:'blank username',
    overrides: {username:""},
    expectedStatus: 400,
    expectedMessage: "username should not be empty" 
    },
    {
    description:'lengthy username',
    overrides: {username:"kwhekf wefhkwjeh ewfhkwe wehfkwekernvkjre rkjvne rkjvn wehfkwe wiuefhkw ewufhkwe wiehfk"+ faker.name.firstName()},
    expectedStatus: 400,
    expectedMessage: ""
    },
    {
    description:'invalid username',
    overrides: {username:"YTYTTR#^@(H *&(!*)(@" + faker.datatype.uuid()},
    expectedStatus: 400,
    expectedMessage: ""
    },
    {
    description:'null username',
    overrides: {username:null},
    expectedStatus: 400,
    expectedMessage: "username must be a string"
    },
    {
    description:'number username',
    overrides: {username:faker.datatype.number()},
    expectedStatus: 400,
    expectedMessage: "username must be a string"
    },
    {
    description:'boolean username',
    overrides: {username:true},
    expectedStatus: 400,
    expectedMessage: "username must be a string"
    },
    {
    description:'space username',
    overrides: {username:' '},
    expectedStatus: 400,
    expectedMessage: ""
    },
    {
    description:'lengthy bio',
    overrides: {bio:"YTYTTR#^@(H *&(!*)(@ erifhuoiewjf wofijwqoif ewoifjewoif weoijfwoif ewoifjoiew ewoifjoiewf ewihfoiewjfoiwef ewoifjewoifjoiewf coiwjeoifjmiafc ewoifjewoifji fsdivjewiljf mnewoifjewoifj ewoifjewoifj oejfoiewjf oijeoifjweoif oijewoifjwef oijeoifjewoif oiwqjfoiqjwiof ewiuhfiqwjfiqw oihdoiwqjfoiqw wqjfoiqwjfoiqwjfoi eifjwqoijfoiwqf weifjewofjoiewjfoi ewfoijewoifjeoiwf ewfoijewoifjw ewoifjewoifjow ewfoiewjfoiewjfio eifjewoijfoiewjf eifjoiewjfoiew iwejfoiewjfoi ewijfoiewjfoiwe eowjfoiewjfoiw ewfjewoijfoiew ewfjewoifjoiew"+faker.lorem.paragraph()},
    expectedStatus: 500,
    expectedMessage: "Something went wrong on our end. Please try again later."
    },
    {
    description:'null bio',
    overrides: {bio:null},
    expectedStatus: 201,
    expectedMessage: "Successfully registered"
    },
    {
    description:'blank bio',
    overrides: {bio:''},
    expectedStatus: 201,
    expectedMessage: "Successfully registered"
    },
    {
    description:'number bio',
    overrides: {bio:123},
    expectedStatus: 400,
    expectedMessage: "bio must be a string"
    },
    {
    description:'null gender',
    overrides: {gender:null},
    expectedStatus: 400,
    expectedMessage: "Enter a valid gender"
    },
    {
    description:'invalid type1 gender',
    overrides: {gender:67},
    expectedStatus: 400,
    expectedMessage: "Enter a valid gender"
    },
    {
    description:'invalid type2 gender',
    overrides: {gender:'*^&*^&*'},
    expectedStatus: 400,
    expectedMessage: "Enter a valid gender"
    },
    {
    description:'blank gender',
    overrides: {gender:''},
    expectedStatus: 400,
    expectedMessage: "Enter a valid gender"
    },
    {
    description:'invalid type3 gender',
    overrides: {gender:'Hello World'},
    expectedStatus: 400,
    expectedMessage: "Enter a valid gender"
    },
    {
    description:'todays date of birth',
    overrides: {dob:faker.date.recent(0).toISOString().split('T')[0]},
    expectedStatus: 400,
    expectedMessage: ""
    },
    {
    description:'future date of birth',
    overrides: {dob:'2032-09-28'},
    expectedStatus: 400,
    expectedMessage: "Date of birth cannot be a future date"
    },
    {
    description:'older date of birth',
    overrides: {dob:'1850-09-28'},
    expectedStatus: 400,
    expectedMessage: ""
    },
    {
    description:'invalid date of birth type 1',
    overrides: {dob:'2015-28-28'},
    expectedStatus: 400,
    expectedMessage: "dob must be a valid ISO 8601 date string"
    },
    {
    description:'invalid date of birth type 2',
    overrides: {dob:''},
    expectedStatus: 400,
    expectedMessage: "dob must be a valid ISO 8601 date string"
    },
    {
    description:'just less than 12 years of birth',
    overrides: {dob:faker.date.birthdate({min: 0, max: 11, mode: 'age'})},
    expectedStatus: 400,
    expectedMessage: ""
    },
    {
    description:'null date of birth',
    overrides: {dob:null},
    expectedStatus: 400,
    expectedMessage: "dob must be a valid ISO 8601 date string"
    },

]


export const invalidRegisterUserStateTokenCases: InvalidUserCases[] = [
    {
    description:'null state token',
    overrides: {stateToken:null},
    expectedStatus: 400,
    expectedMessage: "stateToken should not be empty"
    },
    {
    description:'blank state token',
    overrides: {stateToken:''},
    expectedStatus: 400,
    expectedMessage: "stateToken should not be empty"
    },
    {
    description:'number state token',
    overrides: {stateToken:123},
    expectedStatus: 400,
    expectedMessage: "stateToken must be a string"
    },
    {
    description:'invalid state token',
    overrides: {stateToken:'eyJhbGciOsInR5cCI6CJ9.eyJmYyI6IjAwII6IjEyNTUxIiwiaWFTcxNzc4OTZ9.6ZtpW6c-cRfaqodZ_LCz5Da7yMZIT'},
    expectedStatus: 401,
    expectedMessage: "Your session has been deactivated. Please try again"
    }
]