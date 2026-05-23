import ResponseValidator from "src/api/response.validator"
import { TestContext } from "src/context/test.context"
import { searchUserPayloadTestCases } from "src/testdata/validationPoints/user.validation.points"

describe('Validate Search By Name API',()=>{

    test('Verify Search User By UserName API',async()=>{
        const {response} = await TestContext.flows.userFlow.validSearchUserByName('username')
        await ResponseValidator.validateSuccess(response,{
            httpStatus:201,
            statusCode:200,
            message:'Users found successfully'
        })
    })

    test('Verify Search User By FullName API',async()=>{
        const {response} = await TestContext.flows.userFlow.validSearchUserByName('fullName')
        await ResponseValidator.validateSuccess(response,{
            httpStatus:201,
            statusCode:200,
            message:'Users found successfully'
        })
    })


    test('Verify Search User By Accept Friend FullName API',async()=>{
        const {fullNamePayload} = await TestContext.flows.userFlow.getUserNameByDifferentContext('Accept Friend')
        const {response} = await TestContext.services.userService.searchUserByName(fullNamePayload)
        await ResponseValidator.validateSuccess(response,{
            httpStatus:201,
            statusCode:200,
            message:'Users found successfully'
        })
    })

    test('Verify Search User By Accept Friend UserName API',async()=>{
        const {usernamePayload} = await TestContext.flows.userFlow.getUserNameByDifferentContext('Accept Friend')
        const {response} = await TestContext.services.userService.searchUserByName(usernamePayload)
        await ResponseValidator.validateSuccess(response,{
            httpStatus:201,
            statusCode:200,
            message:'Users found successfully'
        })
    })

    test('Verify Search User By Pending Friend FullName API',async()=>{
        const {fullNamePayload} = await TestContext.flows.userFlow.getUserNameByDifferentContext('Pending Friend')
        const {response} = await TestContext.services.userService.searchUserByName(fullNamePayload)
        await ResponseValidator.validateSuccess(response,{
            httpStatus:201,
            statusCode:200,
            message:'Users found successfully'
        })
    })

    test('Verify Search User By Pending Friend UserName API',async()=>{
        const {usernamePayload} = await TestContext.flows.userFlow.getUserNameByDifferentContext('Pending Friend')
        const {response} = await TestContext.services.userService.searchUserByName(usernamePayload)
        await ResponseValidator.validateSuccess(response,{
            httpStatus:201,
            statusCode:200,
            message:'Users found successfully'
        })
    })

    test('Verify Search User By Cancel Friend FullName API',async()=>{
        const {fullNamePayload} = await TestContext.flows.userFlow.getUserNameByDifferentContext('Cancel Friend')
        const {response} = await TestContext.services.userService.searchUserByName(fullNamePayload)
        await ResponseValidator.validateSuccess(response,{
            httpStatus:201,
            statusCode:200,
            message:'Users found successfully'
        })
    })

    test('Verify Search User By Cancel Friend UserName API',async()=>{
        const {usernamePayload} = await TestContext.flows.userFlow.getUserNameByDifferentContext('Cancel Friend')
        const {response} = await TestContext.services.userService.searchUserByName(usernamePayload)
        await ResponseValidator.validateSuccess(response,{
            httpStatus:201,
            statusCode:200,
            message:'Users found successfully'
        })
    })

    test('Verify Search User By Reject Friend FullName API',async()=>{
        const {fullNamePayload} = await TestContext.flows.userFlow.getUserNameByDifferentContext('Reject Friend')
        const {response} = await TestContext.services.userService.searchUserByName(fullNamePayload)
        await ResponseValidator.validateSuccess(response,{
            httpStatus:201,
            statusCode:200,
            message:'Users found successfully'
        })
    })

    test('Verify Search User By Reject Friend UserName API',async()=>{
        const {usernamePayload} = await TestContext.flows.userFlow.getUserNameByDifferentContext('Reject Friend')
        const {response} = await TestContext.services.userService.searchUserByName(usernamePayload)
        await ResponseValidator.validateSuccess(response,{
            httpStatus:201,
            statusCode:200,
            message:'Users found successfully'
        })
    })

    test('Verify Search User By LoggedIn User FullName API',async()=>{
        const {fullNamePayload} = await TestContext.flows.userFlow.getUserNameByDifferentContext('Logged In User')
        const {response} = await TestContext.services.userService.searchUserByName(fullNamePayload)
        await ResponseValidator.validateSuccess(response,{
            httpStatus:201,
            statusCode:200,
            message:'Users found successfully'
        })
    })

    test('Verify Search User By Logged In Users UserName API',async()=>{
        const {usernamePayload} = await TestContext.flows.userFlow.getUserNameByDifferentContext('Logged In User')
        const {response} = await TestContext.services.userService.searchUserByName(usernamePayload)
        await ResponseValidator.validateSuccess(response,{
            httpStatus:201,
            statusCode:200,
            message:'Users found successfully'
        })
    })

    // implement invalid test cases for search by name api
    searchUserPayloadTestCases.forEach((testCases)=>{
        test(`Valid Search By User Name - When ${testCases.description}`,async()=>{
            const {response} = await TestContext.services.userService.searchUserByName(testCases.overrides)
            await ResponseValidator.validateStatus(response,testCases.expectedStatus)
            await ResponseValidator.validateErrorMessage(response,testCases.expectedMessage)
        })
    })
})