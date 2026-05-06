import { mediaPostValidationTestCases, mediaProfileValidationTestCases, mediaStoryValidationTestCases } from "../../src/testdata/validationPoints/media.validation.points";
import ResponseValidator from "../../src/api/response.validator";
import { TestContext } from "../../src/context/test.context";
import { MediaFactory } from "../../src/testdata/factory/media.factory";
import { getRandomJpegFile, getRandomMp4File } from "../../src/utils/mediaPicker";


describe('Validate POST /media/upload/story Endpoint',()=>{
    test('Valid Image Media height and width for story',async()=>{
        const filePath = getRandomJpegFile()
        // const mediaPayload = MediaFactory.buildMediaPayload([filePath],[1080],[1920])
        // const {response} = await TestContext.services.mediaService.placeMedia(mediaPayload,'story')
        const {response} = await TestContext.flows.mediaFlow.allocateResponseWithMediaIds('story',[filePath])
        await ResponseValidator.validateStatus(response,201)
        await ResponseValidator.validateErrorMessage(response, 'Media Uploaded Successully')
    })
    test('Valid Video Media height and width for story',async()=>{
        const filePath = getRandomMp4File()
        const {response} = await TestContext.flows.mediaFlow.allocateResponseWithMediaIds('story',[filePath])
        // const mediaPayload = MediaFactory.buildMediaPayload([filePath],[1080],[1920])
        // const {response} = await TestContext.services.mediaService.placeMedia(mediaPayload,'story')
        await ResponseValidator.validateStatus(response,201)
        await ResponseValidator.validateErrorMessage(response, 'Media Uploaded Successully')
    })

    mediaStoryValidationTestCases.forEach((testCases)=>{
        test(`Verify Image Story Media Allocation - When - ${testCases.description}`,async()=>{
            const {response} = await TestContext.services.mediaService.placeMedia(testCases.overrides,'story')
            await ResponseValidator.validateStatus(response,testCases.expectedStatus)
            await ResponseValidator.validateErrorMessage(response, testCases.expectedMessage)
        })

        test(`Verify Video Story Media Allocation - When - ${testCases.description}`,async()=>{
            const mediaPayload = { ...testCases.overrides }
            mediaPayload.medias![0].mimeType = 'video/mp4'
            const {response} = await TestContext.services.mediaService.placeMedia(mediaPayload,'story')
            await ResponseValidator.validateStatus(response,testCases.expectedStatus)
            await ResponseValidator.validateErrorMessage(response, testCases.expectedMessage)
        })
    })

    test('Smaller Media Size than Actual file for story',async()=>{
        const filePath = getRandomJpegFile()
        const mediaPayload = MediaFactory.buildMediaPayload([filePath],[1080],[1920])
        mediaPayload.medias![0].mediaSizeInBytes = 67
        const {response} = await TestContext.services.mediaService.placeMedia(mediaPayload,'story')
        await ResponseValidator.validateStatus(response,201)
        await ResponseValidator.validateErrorMessage(response, 'Media Not Uploaded Successully')
    })

    test('Higher Media Size than Actual file for story',async()=>{
        const filePath = getRandomJpegFile()
        const mediaPayload = MediaFactory.buildMediaPayload([filePath],[1080],[1920])
        mediaPayload.medias![0].mediaSizeInBytes = 5242879
        const {response} = await TestContext.services.mediaService.placeMedia(mediaPayload,'story')
        await ResponseValidator.validateStatus(response,201)
        await ResponseValidator.validateErrorMessage(response, 'Media Not Uploaded Successully')
    })
    test('Multiple Media Image Payload > 5 for story',async()=>{
        let filePaths:any
        for (let i =1; i=6; i++){
            const filePath = getRandomJpegFile()
            filePaths.push[filePath]
        }
        // const mediaPayload = MediaFactory.buildMediaPayload([filePaths],[1080,1080,1080,1080,1080,1080],[1920,1920,1920,1920,1920,1920])
        // const {response} = await TestContext.services.mediaService.placeMedia(mediaPayload,'story')
        const {response} = await TestContext.flows.mediaFlow.allocateResponseWithMediaIds('story',filePaths)
        await ResponseValidator.validateStatus(response,400)
        await ResponseValidator.validateErrorMessage(response, 'Media Not Uploaded Successully')
    })

    test('Multiple Media Image (3) Payload for story',async()=>{
        let filePaths:any
        for (let i =1; i=3; i++){
            const filePath = getRandomJpegFile()
            filePaths.push[filePath]
        }
        const {response} = await TestContext.flows.mediaFlow.allocateResponseWithMediaIds('story',filePaths)
        // const mediaPayload = MediaFactory.buildMediaPayload([filePaths],[1080,1080,1080],[1920,1920,1920])
        // const {response} = await TestContext.services.mediaService.placeMedia(mediaPayload,'story')
        await ResponseValidator.validateStatus(response,400)
        await ResponseValidator.validateErrorMessage(response, 'Media Not Uploaded Successully')
    })

    test('Multiple Media Video (2) Payload for story',async()=>{
        let filePaths:any
        for (let i =1; i=2; i++){
            const filePath = getRandomMp4File()
            filePaths.push[filePath]
        }
        const {response} = await TestContext.flows.mediaFlow.allocateResponseWithMediaIds('story',filePaths)
        // const mediaPayload = MediaFactory.buildMediaPayload([filePaths],[1080,1080],[1920,1920])
        // const {response} = await TestContext.services.mediaService.placeMedia(mediaPayload,'story')
        await ResponseValidator.validateStatus(response,400)
        await ResponseValidator.validateErrorMessage(response, 'Media Not Uploaded Successully')
    })

    test('Multiple Multi Media (1V, 1I) Payload for story',async()=>{
        const imagFile = getRandomJpegFile()
        const videoFile = getRandomMp4File()
        const mediaPayload = MediaFactory.buildMediaPayload([imagFile, videoFile],[1080,1080],[1920,1920])
        const {response} = await TestContext.services.mediaService.placeMedia(mediaPayload,'story')
        await ResponseValidator.validateStatus(response,400)
        await ResponseValidator.validateErrorMessage(response, 'Media Not Uploaded Successully')
    })

    test('Blank Payload for story',async()=>{
        const {response} = await TestContext.services.mediaService.placeMedia({},'story')
        await ResponseValidator.validateStatus(response,400)
        await ResponseValidator.validateErrorMessage(response,'No Data')
    })

})




describe('Validate POST /media/upload/post Endpoint',()=>{
    test('Valid image media height and width for Post',async()=>{
        const filePath = getRandomJpegFile()
        const mediaPayload = MediaFactory.buildMediaPayload([filePath],[1080],[1920])
        const {response} = await TestContext.services.mediaService.placeMedia(mediaPayload,'post')
        await ResponseValidator.validateStatus(response,201)
        await ResponseValidator.validateErrorMessage(response, 'Media Uploaded Successully')
    })

    test('Valid video media height and width for Post',async()=>{
        const filePath = getRandomMp4File()
        const mediaPayload = MediaFactory.buildMediaPayload([filePath],[1080],[1920])
        const {response} = await TestContext.services.mediaService.placeMedia(mediaPayload,'post')
        await ResponseValidator.validateStatus(response,201)
        await ResponseValidator.validateErrorMessage(response, 'Media Uploaded Successully')
    })

    mediaPostValidationTestCases.forEach((testCases)=>{
        test(`Verify Image Post Media Allocation - When - ${testCases.description}`,async()=>{
            const {response} = await TestContext.services.mediaService.placeMedia(testCases.overrides,'post')
            await ResponseValidator.validateStatus(response,testCases.expectedStatus)
            await ResponseValidator.validateErrorMessage(response, testCases.expectedMessage)
        })

        test(`Verify Video Post Media Allocation - When - ${testCases.description}`,async()=>{
            const mediaPayload = { ...testCases.overrides }
            mediaPayload.medias![0].mimeType = 'video/mp4'
            const {response} = await TestContext.services.mediaService.placeMedia(mediaPayload,'post')
            await ResponseValidator.validateStatus(response,testCases.expectedStatus)
            await ResponseValidator.validateErrorMessage(response, testCases.expectedMessage)
        })
    })

    test('Smaller Media Size than Actual file for post',async()=>{
        const filePath = getRandomJpegFile()
        const mediaPayload = MediaFactory.buildMediaPayload([filePath],[1080],[1920])
        mediaPayload.medias![0].mediaSizeInBytes = 67
        const {response} = await TestContext.services.mediaService.placeMedia(mediaPayload,'post')
        await ResponseValidator.validateStatus(response,400)
        await ResponseValidator.validateErrorMessage(response, 'Media Not Uploaded Successully')
    })

    test('Higher Media Size than Actual file for story',async()=>{
        const filePath = getRandomJpegFile()
        const mediaPayload = MediaFactory.buildMediaPayload([filePath],[1080],[1920])
        mediaPayload.medias![0].mediaSizeInBytes = 5242879
        const {response} = await TestContext.services.mediaService.placeMedia(mediaPayload,'post')
        await ResponseValidator.validateStatus(response,400)
        await ResponseValidator.validateErrorMessage(response, 'Media Not Uploaded Successully')
    })
    test('Multiple Media Image Payload > 5 for story',async()=>{
        let filePaths:any
        for (let i =1; i=6; i++){
            const filePath = getRandomJpegFile()
            filePaths.push[filePath]
        }
        const mediaPayload = MediaFactory.buildMediaPayload([filePaths],[1080,1080,1080,1080,1080,1080],[1920,1920,1920,1920,1920,1920])
        const {response} = await TestContext.services.mediaService.placeMedia(mediaPayload,'post')
        await ResponseValidator.validateStatus(response,400)
        await ResponseValidator.validateErrorMessage(response, 'Media Not Uploaded Successully')
    })

    test('Multiple Media Image (3) Payload for story',async()=>{
        let filePaths:any
        for (let i =1; i=3; i++){
            const filePath = getRandomJpegFile()
            filePaths.push[filePath]
        }
        const mediaPayload = MediaFactory.buildMediaPayload([filePaths],[1080,1080,1080],[1920,1920,1920])
        const {response} = await TestContext.services.mediaService.placeMedia(mediaPayload,'post')
        await ResponseValidator.validateStatus(response,400)
        await ResponseValidator.validateErrorMessage(response, 'Media Not Uploaded Successully')
    })

    test('Multiple Media Video (2) Payload for story',async()=>{
        let filePaths:any
        for (let i =1; i=2; i++){
            const filePath = getRandomMp4File()
            filePaths.push[filePath]
        }
        const mediaPayload = MediaFactory.buildMediaPayload([filePaths],[1080,1080],[1920,1920])
        const {response} = await TestContext.services.mediaService.placeMedia(mediaPayload,'post')
        await ResponseValidator.validateStatus(response,400)
        await ResponseValidator.validateErrorMessage(response, 'Media Not Uploaded Successully')
    })

    test('Multiple Multi Media (1V, 1I) Payload for story',async()=>{
        const imagFile = getRandomJpegFile()
        const videoFile = getRandomMp4File()
        const mediaPayload = MediaFactory.buildMediaPayload([imagFile, videoFile],[1080,1080],[1920,1920])
        const {response} = await TestContext.services.mediaService.placeMedia(mediaPayload,'post')
        await ResponseValidator.validateStatus(response,400)
        await ResponseValidator.validateErrorMessage(response, 'Media Not Uploaded Successully')
    })

    test('Blank Payload for Post',async()=>{
        const {response} = await TestContext.services.mediaService.placeMedia({},'post')
        await ResponseValidator.validateStatus(response,400)
        await ResponseValidator.validateErrorMessage(response,'No Data')
    })
})

describe('Validate POST /media/upload/profile Endpoint',()=>{
    test('Valid media height and width for profile',async()=>{

    })

    mediaProfileValidationTestCases.forEach((testCases)=>{
        test(`Verify Image Profile Media Allocation - When - ${testCases.description}`,async()=>{
            const {response} = await TestContext.services.mediaService.placeMedia(testCases.overrides,'profile')
            await ResponseValidator.validateStatus(response,testCases.expectedStatus)
            await ResponseValidator.validateErrorMessage(response, testCases.expectedMessage)
        })

        test(`Verify Video Profile Media Allocation - When - ${testCases.description}`,async()=>{
            const mediaPayload = { ...testCases.overrides }
            mediaPayload.medias![0].mimeType = 'video/mp4'
            const {response} = await TestContext.services.mediaService.placeMedia(mediaPayload,'profile')
            await ResponseValidator.validateStatus(response,testCases.expectedStatus)
            await ResponseValidator.validateErrorMessage(response, testCases.expectedMessage)
        })
    })
    test('Smaller Media Size than Actual file for story',async()=>{
        const filePath = getRandomJpegFile()
        const mediaPayload = MediaFactory.buildMediaPayload([filePath],[1080],[1920])
        mediaPayload.medias![0].mediaSizeInBytes = 67
        const {response} = await TestContext.services.mediaService.placeMedia(mediaPayload,'profile')
        await ResponseValidator.validateStatus(response,400)
        await ResponseValidator.validateErrorMessage(response, 'Media Not Uploaded Successully')
    })

    test('Higher Media Size than Actual file for story',async()=>{
        const filePath = getRandomJpegFile()
        const mediaPayload = MediaFactory.buildMediaPayload([filePath],[1080],[1920])
        mediaPayload.medias![0].mediaSizeInBytes = 5242879
        const {response} = await TestContext.services.mediaService.placeMedia(mediaPayload,'profile')
        await ResponseValidator.validateStatus(response,400)
        await ResponseValidator.validateErrorMessage(response, 'Media Not Uploaded Successully')
    })
    test('Multiple Media Image Payload > 5 for story',async()=>{
        let filePaths:any
        for (let i =1; i=6; i++){
            const filePath = getRandomJpegFile()
            filePaths.push[filePath]
        }
        const mediaPayload = MediaFactory.buildMediaPayload([filePaths],[1080,1080,1080,1080,1080,1080],[1920,1920,1920,1920,1920,1920])
        const {response} = await TestContext.services.mediaService.placeMedia(mediaPayload,'profile')
        await ResponseValidator.validateStatus(response,400)
        await ResponseValidator.validateErrorMessage(response, 'Media Not Uploaded Successully')
    })

    test('Multiple Media Image (3) Payload for story',async()=>{
        let filePaths:any
        for (let i =1; i=3; i++){
            const filePath = getRandomJpegFile()
            filePaths.push[filePath]
        }
        const mediaPayload = MediaFactory.buildMediaPayload([filePaths],[1080,1080,1080],[1920,1920,1920])
        const {response} = await TestContext.services.mediaService.placeMedia(mediaPayload,'profile')
        await ResponseValidator.validateStatus(response,400)
        await ResponseValidator.validateErrorMessage(response, 'Media Not Uploaded Successully')
    })

    test('Multiple Media Video (2) Payload for story',async()=>{
        let filePaths:any
        for (let i =1; i=2; i++){
            const filePath = getRandomMp4File()
            filePaths.push[filePath]
        }
        const mediaPayload = MediaFactory.buildMediaPayload([filePaths],[1080,1080],[1920,1920])
        const {response} = await TestContext.services.mediaService.placeMedia(mediaPayload,'profile')
        await ResponseValidator.validateStatus(response,400)
        await ResponseValidator.validateErrorMessage(response, 'Media Not Uploaded Successully')
    })

    test('Multiple Multi Media (1V, 1I) Payload for story',async()=>{
        const imagFile = getRandomJpegFile()
        const videoFile = getRandomMp4File()
        const mediaPayload = MediaFactory.buildMediaPayload([imagFile, videoFile],[1080,1080],[1920,1920])
        const {response} = await TestContext.services.mediaService.placeMedia(mediaPayload,'profile')
        await ResponseValidator.validateStatus(response,400)
        await ResponseValidator.validateErrorMessage(response, 'Media Not Uploaded Successully')
    })

    test('Blank Payload for Profile',async()=>{
        const {response} = await TestContext.services.mediaService.placeMedia({},'profile')
        await ResponseValidator.validateStatus(response,400)
        await ResponseValidator.validateErrorMessage(response,'No Data')
    })
})

// describe('Validate POST /media/upload/chat Endpoint',()=>{

// })

