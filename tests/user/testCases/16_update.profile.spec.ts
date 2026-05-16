import ResponseValidator from "../../../src/api/response.validator"
import { TestContext } from "../../../src/context/test.context"
import { UserFactory } from "../../../src/testdata/factory/user.factory"
import { updateProfilePayloadTestCases } from "../../../src/testdata/validationPoints/user.validation.points"

describe('Validate update profile API',()=>{

    updateProfilePayloadTestCases.forEach((testCases)=>{
        test(`Verify Update Profile - When ${testCases.description}`,async()=>{
            const updateProfilePayload = {
                ...UserFactory.updateProfilePayload(),
                ...testCases.overrides
            }
            const {response} = await TestContext.services.userService.updateProfile(updateProfilePayload)
            await ResponseValidator.validateStatus(response,testCases.expectedStatus)
            await ResponseValidator.validateErrorMessage(response,testCases.expectedMessage)
        })
    })
    
    test('Verify Update Profile API - Only Valid Bio',async()=>{
        const updateProfilePayload = {
            ...UserFactory.updateProfilePayload()
        }
        const onlyBioPayload = {
            bio: updateProfilePayload?.bio
        }
        const {response} = await TestContext.services.userService.updateProfile(onlyBioPayload)
        await ResponseValidator.validateStatus(response,200)
        await ResponseValidator.validateErrorMessage(response,'Profile Update Successfully')
    })

    test('Verify Update Profile API - Only Valid Gender',async()=>{
        const updateProfilePayload = {
            ...UserFactory.updateProfilePayload()
        }
        const onlyGenderPayload = {
            bio: updateProfilePayload?.gender
        }
        const {response} = await TestContext.services.userService.updateProfile(onlyGenderPayload)
        await ResponseValidator.validateStatus(response,200)
        await ResponseValidator.validateErrorMessage(response,'Successfully updated User-Profile')
    })

    test('Verify Update Profile API - Only Valid Username',async()=>{
        const updateProfilePayload = {
            ...UserFactory.updateProfilePayload()
        }
        const onlyUsernamePayload = {
            bio: updateProfilePayload?.username
        }
        const {response} = await TestContext.services.userService.updateProfile(onlyUsernamePayload)
        await ResponseValidator.validateStatus(response,200)
        await ResponseValidator.validateErrorMessage(response,'Successfully updated User-Profile')
    })

    test('Verify Update Profile API - valid payload',async()=>{
        const updateProfilePayload = {
            ...UserFactory.updateProfilePayload()
        }
        const {response} = await TestContext.services.userService.updateProfile(updateProfilePayload)
        await ResponseValidator.validateStatus(response,200)
        await ResponseValidator.validateErrorMessage(response,'Successfully updated User-Profile')
    })



})