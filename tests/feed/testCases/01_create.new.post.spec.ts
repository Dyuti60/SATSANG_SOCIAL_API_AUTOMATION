import { faker } from "@faker-js/faker"
import ResponseValidator from "../../../src/api/response.validator"
import { TestContext } from "../../../src/context/test.context"
import { getRandomJpegFile } from "../../../src/utils/mediaPicker"

describe('Validate POST /feed/post Endpoint',()=>{

    describe('Validate Creating Post - Payload Variants',()=>{

        test('Validate Creating Post - Only MediaId',async()=>{
            const filePath = getRandomJpegFile()
            const {mediaIds} = await TestContext.flows.feedFlow.postMediaUpload([filePath])
            const {response} = await TestContext.services.feedService.createPost({
                mediaIds: [mediaIds[0]],
                shareEnable: true,
                visibility: 202
            })
            await ResponseValidator.validateStatus(response,201)
            await ResponseValidator.validateErrorMessage(response,'Successfully saved post.')
        })

        test('Validate Creating Post - Invalid Only MediaId',async()=>{
            const filePath = getRandomJpegFile()
            const {mediaIds} = await TestContext.flows.feedFlow.postMediaUpload([filePath])
            const {response} = await TestContext.services.feedService.createPost({
                mediaIds: ['0196ee78-3ba1-7663-88fd-b385aa46c64b'],
                shareEnable: true,
                visibility: 202
            })
            await ResponseValidator.validateStatus(response,400)
            await ResponseValidator.validateErrorMessage(response,'Failed to save post. Please try again later.')
        })

        test('Validate Creating Post - Only Caption',async()=>{
            const {response} = await TestContext.services.feedService.createPost({
                caption: faker.lorem.words(20),
                shareEnable: true,
                visibility: 202
            })
            await ResponseValidator.validateStatus(response,201)
            await ResponseValidator.validateErrorMessage(response,'Successfully saved post.')
        })

        test('Validate Creating Post - Invalid Only Caption',async()=>{
            const {response} = await TestContext.services.feedService.createPost({
                caption: faker.lorem.paragraphs(200),
                shareEnable: true,
                visibility:202
            })
            await ResponseValidator.validateStatus(response,400)
            await ResponseValidator.validateErrorMessage(response,'caption must be shorter than or equal to 2200 characters')
        })

        test('Validate Creating Post - Only LocationId',async()=>{
            const {response} = await TestContext.services.feedService.createPost({
                locationId: 101,
                shareEnable: true,
                visibility:202
            })
            await ResponseValidator.validateStatus(response,400)
            await ResponseValidator.validateErrorMessage(response,'Failed to save post. Please try again later.')
        })

        test('Validate Creating Post - Invalid Only LocationId',async()=>{
            const {response} = await TestContext.services.feedService.createPost({
                locationId: 576567,
                shareEnable: true,
                visibility: 202
            })
            await ResponseValidator.validateStatus(response,400)
            await ResponseValidator.validateErrorMessage(response,'Failed to save post. Please try again later.')
        })

        test('Validate Creating Post - Only shareEnable',async()=>{
            const {response} = await TestContext.services.feedService.createPost({
                shareEnable: true,
                visibility: 202
            })
            await ResponseValidator.validateStatus(response,400)
            await ResponseValidator.validateErrorMessage(response,'Failed to save post. Please try again later.')
        })

        test('Validate Creating Post - Invalid Only ShareEnable',async()=>{
            const {response} = await TestContext.services.feedService.createPost({
                shareEnable: 'hello',
                visibility:202
            })
            await ResponseValidator.validateStatus(response,400)
            await ResponseValidator.validateErrorMessage(response,'shareEnable must be a boolean value')
        })

        test('Validate Creating Post - Only Visibility',async()=>{
            const {response} = await TestContext.services.feedService.createPost({
                visibility: 204,
                shareEnable:true
            })
            await ResponseValidator.validateStatus(response,400)
            await ResponseValidator.validateErrorMessage(response,'Failed to save post. Please try again later.')
        })

        test('Validate Creating Post - Invalid Only Visibility',async()=>{
            const {response} = await TestContext.services.feedService.createPost({
                visibility: 206,
                shareEnable:true
            })
            await ResponseValidator.validateStatus(response,400)
            await ResponseValidator.validateErrorMessage(response,'visibility must be one of the following values: 205, 200, 203, 202, 201, 204')
        })

        test('Validate Creating Post - Deleted Visibility',async()=>{
            const filePath = getRandomJpegFile()
            const {mediaIds} = await TestContext.flows.feedFlow.postMediaUpload([filePath])
            const {response} = await TestContext.services.feedService.createPost({
                mediaIds: [mediaIds[0]],
                visibility: 200,
                shareEnable:true
            })
            await ResponseValidator.validateStatus(response,400)
            await ResponseValidator.validateErrorMessage(response,'Failed to save post. Please try again later.')
        })
    })


    describe('Validate Creating Post - Mandatoy Fields With Post Media',()=>{

        test('Validate Creating Post - With Valid Media And Caption',async()=>{
            const filePath = getRandomJpegFile()
            const {mediaIds} = await TestContext.flows.feedFlow.postMediaUpload([filePath])
            const {response} = await TestContext.services.feedService.createPost({
                mediaIds: [mediaIds[0]],
                caption: faker.lorem.words(20),
                shareEnable:true,
                visibility:202
            })
            await ResponseValidator.validateStatus(response,201)
            await ResponseValidator.validateErrorMessage(response,'Successfully saved post.')
        })

        test('Validate Creating Post - With Valid Media And LocationId',async()=>{
            const filePath = getRandomJpegFile()
            const {mediaIds} = await TestContext.flows.feedFlow.postMediaUpload([filePath])
            const {response} = await TestContext.services.feedService.createPost({
                mediaIds: [mediaIds[0]],
                locationId: 101,
                shareEnable:true,
                visibility:202
            })
            await ResponseValidator.validateStatus(response,201)
            await ResponseValidator.validateErrorMessage(response,'Successfully saved post.')
        })

        test('Validate Creating Post - With Valid Media And shareEnable',async()=>{
            const filePath = getRandomJpegFile()
            const {mediaIds} = await TestContext.flows.feedFlow.postMediaUpload([filePath])
            const {response} = await TestContext.services.feedService.createPost({
                mediaIds: [mediaIds[0]],
                shareEnable: false,
                visibility:202
            })
            await ResponseValidator.validateStatus(response,201)
            await ResponseValidator.validateErrorMessage(response,'Successfully saved post.')
        })

    })


    describe('Validate Creating Post - Mandatoy Fields With Caption',()=>{

        test('Validate Creating Post - With Valid Caption And LocationId',async()=>{
            const {response} = await TestContext.services.feedService.createPost({
                caption: faker.lorem.words(200),
                locationId: 101,
                shareEnable:true,
                visibility: 202
            })
            await ResponseValidator.validateStatus(response,201)
            await ResponseValidator.validateErrorMessage(response,'Successfully saved post.')
        })

        test('Validate Creating Post - With Valid Caption And shareEnable',async()=>{
            const {response} = await TestContext.services.feedService.createPost({
                caption: faker.lorem.words(200),
                shareEnable: true,
                visibility:202
            })
            await ResponseValidator.validateStatus(response,201)
            await ResponseValidator.validateErrorMessage(response,'Successfully saved post.')
        })

        test('Validate Creating Post - With Valid Caption And visibility',async()=>{
            const {response} = await TestContext.services.feedService.createPost({
                caption: faker.lorem.words(200),
                shareEnable:true,
                visibility: 203
            })
            await ResponseValidator.validateStatus(response,201)
            await ResponseValidator.validateErrorMessage(response,'Successfully saved post.')
        })
    })
})