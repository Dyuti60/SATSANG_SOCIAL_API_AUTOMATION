import { faker } from '@faker-js/faker';
export class LoginFactory {

    static signInContactPayload(){
        return {
            contactNo: faker.helpers.arrayElement(['6', '7', '8', '9']) + faker.datatype.number({ min: 100000000, max: 999999999 }).toString()
        }
    }

    static verifyOtpPayload(){
        return {
            id: 16756,
            otp: faker.datatype.number({ min: 100000, max: 999999 }).toString(),
            appId: 11,
            codeChallenge: "decf9847ad0b98b8fb6d63b91e036c14"
        }
    }

    static createSessionPayload(){
        return {
            appId: 11,
            codeChallenge : "decf9847ad0b98b8fb6d63b91e036c14",
            userId: faker.datatype.uuid()
        }
    }
    
    static authorizeSessionPayload(){
        return {
            appId: 11,
            codeChallenge: "decf9847ad0b98b8fb6d63b91e036c14"
        }
    }

    static loginPayload(){
        return {
            accessCode: faker.datatype.uuid(),
            codeVerifier: "FDsTFMqclol65gTiURBY"
        }
    }
}