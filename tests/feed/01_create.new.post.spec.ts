import { faker } from "@faker-js/faker"
import ResponseValidator from "api/response.validator"
import { TestContext } from "src/context/test.context"
import { getRandomJpegFile } from "utils/mediaPicker"

describe('Validate POST /feed/post Endpoint',()=>{

    describe('Validate Creating Post - Payload Variants',()=>{

        test('Validate Creating Post - Only MediaId',async()=>{
            const filePath = getRandomJpegFile()
            const {mediaIds} = await TestContext.flows.feedFlow.postMediaUpload([filePath])
            const {response} = await TestContext.services.feedService.createPost({
                mediaIds: [mediaIds[0]]
            })
            await ResponseValidator.validateStatus(response,200)
            await ResponseValidator.validateErrorMessage(response,'Post Created')
        })

        test('Validate Creating Post - Invalid Only MediaId',async()=>{
            const filePath = getRandomJpegFile()
            const {mediaIds} = await TestContext.flows.feedFlow.postMediaUpload([filePath])
            const {response} = await TestContext.services.feedService.createPost({
                mediaIds: ['7687wegfuyewr78326rwegf2387']
            })
            await ResponseValidator.validateStatus(response,400)
            await ResponseValidator.validateErrorMessage(response,'Post Failed Creation')
        })

        test('Validate Creating Post - Only Caption',async()=>{
            const {response} = await TestContext.services.feedService.createPost({
                caption: faker.lorem.words(20)
            })
            await ResponseValidator.validateStatus(response,200)
            await ResponseValidator.validateErrorMessage(response,'Post Created')
        })

        test('Validate Creating Post - Invalid Only Caption',async()=>{
            const {response} = await TestContext.services.feedService.createPost({
                caption: faker.lorem.words(200)
            })
            await ResponseValidator.validateStatus(response,400)
            await ResponseValidator.validateErrorMessage(response,'Post Created')
        })

        test('Validate Creating Post - Only LocationId',async()=>{
            const {response} = await TestContext.services.feedService.createPost({
                locationId: 101
            })
            await ResponseValidator.validateStatus(response,400)
            await ResponseValidator.validateErrorMessage(response,'Post Creation Failed')
        })

        test('Validate Creating Post - Invalid Only LocationId',async()=>{
            const {response} = await TestContext.services.feedService.createPost({
                locationId: 576567
            })
            await ResponseValidator.validateStatus(response,400)
            await ResponseValidator.validateErrorMessage(response,'Post Creation Failed')
        })

        test('Validate Creating Post - Only shareEnable',async()=>{
            const {response} = await TestContext.services.feedService.createPost({
                shareEnable: true
            })
            await ResponseValidator.validateStatus(response,400)
            await ResponseValidator.validateErrorMessage(response,'Post Creation Failed')
        })

        test('Validate Creating Post - Invalid Only ShareEnable',async()=>{
            const {response} = await TestContext.services.feedService.createPost({
                shareEnable: 'hello'
            })
            await ResponseValidator.validateStatus(response,400)
            await ResponseValidator.validateErrorMessage(response,'Post Creation Failed')
        })

        test('Validate Creating Post - Only Visibility',async()=>{
            const {response} = await TestContext.services.feedService.createPost({
                visibilityId: 204
            })
            await ResponseValidator.validateStatus(response,400)
            await ResponseValidator.validateErrorMessage(response,'Post Creation Failed')
        })

        test('Validate Creating Post - Invalid Only Visibility',async()=>{
            const {response} = await TestContext.services.feedService.createPost({
                visibilityId: 205
            })
            await ResponseValidator.validateStatus(response,400)
            await ResponseValidator.validateErrorMessage(response,'Post Creation Failed')
        })
    })


    describe('Validate Creating Post - Mandatoy Fields With Post Media',()=>{

        test('Validate Creating Post - With Valid Media And Caption',async()=>{
            const filePath = getRandomJpegFile()
            const {mediaIds} = await TestContext.flows.feedFlow.postMediaUpload([filePath])
            const {response} = await TestContext.services.feedService.createPost({
                mediaIds: [mediaIds[0]],
                caption: faker.lorem.words(20)
            })
            await ResponseValidator.validateStatus(response,200)
            await ResponseValidator.validateErrorMessage(response,'Post Created')
        })

        test('Validate Creating Post - With Valid Media And LocationId',async()=>{
            const filePath = getRandomJpegFile()
            const {mediaIds} = await TestContext.flows.feedFlow.postMediaUpload([filePath])
            const {response} = await TestContext.services.feedService.createPost({
                mediaIds: [mediaIds[0]],
                locationId: 101
            })
            await ResponseValidator.validateStatus(response,200)
            await ResponseValidator.validateErrorMessage(response,'Post Created')
        })

        test('Validate Creating Post - With Valid Media And shareEnable',async()=>{
            const filePath = getRandomJpegFile()
            const {mediaIds} = await TestContext.flows.feedFlow.postMediaUpload([filePath])
            const {response} = await TestContext.services.feedService.createPost({
                mediaIds: [mediaIds[0]],
                shareEnable: false
            })
            await ResponseValidator.validateStatus(response,200)
            await ResponseValidator.validateErrorMessage(response,'Post Created')
        })

        test('Validate Creating Post - With Valid Media And visibility',async()=>{
            const filePath = getRandomJpegFile()
            const {mediaIds} = await TestContext.flows.feedFlow.postMediaUpload([filePath])
            const {response} = await TestContext.services.feedService.createPost({
                mediaIds: [mediaIds[0]],
                visibilityId: 204
            })
            await ResponseValidator.validateStatus(response,200)
            await ResponseValidator.validateErrorMessage(response,'Post Created')
        })
    })


    describe('Validate Creating Post - Mandatoy Fields With Caption',()=>{

        test('Validate Creating Post - With Valid Caption And LocationId',async()=>{
            const {response} = await TestContext.services.feedService.createPost({
                caption: faker.lorem.words(200),
                locationId: 101
            })
            await ResponseValidator.validateStatus(response,400)
            await ResponseValidator.validateErrorMessage(response,'Post Created')
        })

        test('Validate Creating Post - With Valid Caption And shareEnable',async()=>{
            const {response} = await TestContext.services.feedService.createPost({
                caption: faker.lorem.words(200),
                shareEnable: true
            })
            await ResponseValidator.validateStatus(response,400)
            await ResponseValidator.validateErrorMessage(response,'Post Created')
        })

        test('Validate Creating Post - With Valid Caption And visibility',async()=>{
            const {response} = await TestContext.services.feedService.createPost({
                caption: faker.lorem.words(200),
                visibilityId: 203
            })
            await ResponseValidator.validateStatus(response,400)
            await ResponseValidator.validateErrorMessage(response,'Post Created')
        })
    })
})