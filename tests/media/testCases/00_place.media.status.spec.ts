import { mediaPostImageValidationTestCases, mediaPostVideoValidationTestCases, mediaProfileValidationTestCases, mediaStoryImageValidationTestCases, mediaStoryVideoValidationTestCases } from "../../../src/testdata/validationPoints/media.validation.points";
import ResponseValidator from "../../../src/api/response.validator";
import { TestContext } from "../../../src/context/test.context";
import { MediaFactory } from "../../../src/testdata/factory/media.factory";
import { getRandomJpegFile, getRandomMp4File } from "../../../src/utils/mediaPicker";


describe('Validate POST /media/upload/story Endpoint',()=>{
    test('Valid Image Media height and width for story',async()=>{
        const filePath = getRandomJpegFile()
        const {response} = await TestContext.flows.mediaFlow.allocateResponseWithMediaIds('story',[filePath])
        await ResponseValidator.validateStatus(response,201)
        await ResponseValidator.validateErrorMessage(response, 'Success')
    })
    test('Valid Video Media height and width for story',async()=>{
        const filePath = getRandomMp4File()
        const {response} = await TestContext.flows.mediaFlow.allocateResponseWithMediaIds('story',[filePath])
        await ResponseValidator.validateStatus(response,201)
        await ResponseValidator.validateErrorMessage(response, 'Success')
    })

    mediaStoryImageValidationTestCases.forEach((testCases)=>{
        test(`Verify Image Story Media Allocation - When - ${testCases.description}`,async()=>{
            const {response} = await TestContext.services.mediaService.placeMedia(testCases.overrides,'story')
            await ResponseValidator.validateErrorMessage(response, testCases.expectedMessage)
            await ResponseValidator.validateStatus(response,testCases.expectedStatus)
        })
    })

    mediaStoryVideoValidationTestCases.forEach((testCases)=>{
        test(`Verify Video Story Media Allocation - When - ${testCases.description}`,async()=>{
            const {response} = await TestContext.services.mediaService.placeMedia(testCases.overrides,'story')
            await ResponseValidator.validateErrorMessage(response, testCases.expectedMessage)
            await ResponseValidator.validateStatus(response,testCases.expectedStatus)
        })
    })

    test('Smaller Media Size than Actual file for story',async()=>{
        const filePath = getRandomJpegFile()
        const mediaPayload = MediaFactory.buildMediaPayload([filePath],[1080],[1920])
        mediaPayload.medias![0].mediaSizeInBytes = 67
        const {response} = await TestContext.services.mediaService.placeMedia(mediaPayload,'story')
        await ResponseValidator.validateStatus(response,201)
        await ResponseValidator.validateErrorMessage(response, 'Success')
    })

    test('Higher Media Size than Actual file for story',async()=>{
        const filePath = getRandomJpegFile()
        const mediaPayload = MediaFactory.buildMediaPayload([filePath],[1080],[1920])
        mediaPayload.medias![0].mediaSizeInBytes = 5242879
        const {response} = await TestContext.services.mediaService.placeMedia(mediaPayload,'story')
        await ResponseValidator.validateStatus(response,201)
        await ResponseValidator.validateErrorMessage(response, 'Success')
    })
    test('Multiple Media Image Payload > 5 for story',async()=>{
        let filePaths:any=[]
        for (let i =1; i<=6; i++){
            const filePath = getRandomJpegFile()
            filePaths.push(filePath)
        }
        // const mediaPayload = MediaFactory.buildMediaPayload(filePaths,[1080,1080,1080,1080,1080,1080],[1920,1920,1920,1920,1920,1920])
        // const {response} = await TestContext.services.mediaService.placeMedia(mediaPayload,'story')
        const {response} = await TestContext.flows.mediaFlow.allocateResponseWithMediaIds('story',filePaths)
        await ResponseValidator.validateStatus(response,400)
        await ResponseValidator.validateErrorMessage(response, 'Media Not Uploaded Successully')
    })

    test('Multiple Media Image (3) Payload for story',async()=>{
        let filePaths:any=[]
        for (let i =1; i<=3; i++){
            const filePath = getRandomJpegFile()
            filePaths.push(filePath)
        }
        const {response} = await TestContext.flows.mediaFlow.allocateResponseWithMediaIds('story',filePaths)
        // const mediaPayload = MediaFactory.buildMediaPayload(filePaths,[1080,1080,1080],[1920,1920,1920])
        // const {response} = await TestContext.services.mediaService.placeMedia(mediaPayload,'story')
        await ResponseValidator.validateStatus(response,201)
        await ResponseValidator.validateErrorMessage(response, 'Success')
    })

    test('Multiple Media Video (2) Payload for story',async()=>{
        let filePaths:any=[]
        for (let i =1; i<=2; i++){
            const filePath = getRandomMp4File()
            filePaths.push(filePath)
        }
        const {response} = await TestContext.flows.mediaFlow.allocateResponseWithMediaIds('story',filePaths)
        // const mediaPayload = MediaFactory.buildMediaPayload(filePaths,[1080,1080],[1920,1920])
        // const {response} = await TestContext.services.mediaService.placeMedia(mediaPayload,'story')
        await ResponseValidator.validateStatus(response,400)
        await ResponseValidator.validateErrorMessage(response, 'Success')
    })

    test('Multiple Multi Media (1V, 1I) Payload for story',async()=>{
        const imagFile = getRandomJpegFile()
        const videoFile = getRandomMp4File()
        const mediaPayload = MediaFactory.buildMediaPayload([imagFile, videoFile],[1080,720],[1920,1920])
        const {response} = await TestContext.services.mediaService.placeMedia(mediaPayload,'story')
        await ResponseValidator.validateStatus(response,201)
        await ResponseValidator.validateErrorMessage(response, 'Success')
    })

    test('Blank Payload for story',async()=>{
        const {response} = await TestContext.services.mediaService.placeMedia({},'story')
        await ResponseValidator.validateStatus(response,400)
        await ResponseValidator.validateErrorMessage(response,'medias must contain at least 1 elements')
    })

 })




describe('Validate POST /media/upload/post Endpoint',()=>{
    test('Valid image media height and width for Post',async()=>{
        const filePath = getRandomJpegFile()
        const mediaPayload = MediaFactory.buildMediaPayload([filePath],[1080],[1080])
        const {response} = await TestContext.services.mediaService.placeMedia(mediaPayload,'post')
        await ResponseValidator.validateStatus(response,201)
        await ResponseValidator.validateErrorMessage(response, 'Success')
    })

    test('Valid video media height and width for Post',async()=>{
        const filePath = getRandomMp4File()
        const mediaPayload = MediaFactory.buildMediaPayload([filePath],[720],[1280])
        const {response} = await TestContext.services.mediaService.placeMedia(mediaPayload,'post')
        await ResponseValidator.validateStatus(response,201)
        await ResponseValidator.validateErrorMessage(response, 'Success')
    })

    mediaPostImageValidationTestCases.forEach((testCases)=>{
        test(`Verify Image Post Media Allocation - When - ${testCases.description}`,async()=>{
            const {response} = await TestContext.services.mediaService.placeMedia(testCases.overrides,'post')
            await ResponseValidator.validateErrorMessage(response, testCases.expectedMessage)
            await ResponseValidator.validateStatus(response,testCases.expectedStatus)
        })
    })

    mediaPostVideoValidationTestCases.forEach((testCases)=>{
        test(`Verify Video Post Media Allocation - When - ${testCases.description}`,async()=>{
            const {response} = await TestContext.services.mediaService.placeMedia(testCases.overrides,'post')
            await ResponseValidator.validateErrorMessage(response, testCases.expectedMessage)
            await ResponseValidator.validateStatus(response,testCases.expectedStatus)
        })
    })

    test('Smaller Media Size than Actual file for post',async()=>{
        const filePath = getRandomJpegFile()
        const mediaPayload = MediaFactory.buildMediaPayload([filePath],[1080],[1080])
        mediaPayload.medias![0].mediaSizeInBytes = 67
        const {response} = await TestContext.services.mediaService.placeMedia(mediaPayload,'post')
        await ResponseValidator.validateErrorMessage(response, 'Invalid file dimensions.')
        await ResponseValidator.validateStatus(response,400)
    })

    test('Higher Media Size than Actual file for story',async()=>{
        const filePath = getRandomJpegFile()
        const mediaPayload = MediaFactory.buildMediaPayload([filePath],[1080],[1080])
        mediaPayload.medias![0].mediaSizeInBytes = 5242879
        const {response} = await TestContext.services.mediaService.placeMedia(mediaPayload,'post')
        await ResponseValidator.validateErrorMessage(response, 'Success')
        await ResponseValidator.validateStatus(response,201)
    })
    test('Multiple Media Image Payload > 5 for story',async()=>{
        let filePaths:any=[]
        for (let i =1; i<=6; i++){
            const filePath = getRandomJpegFile()
            filePaths.push(filePath)
        }
        const mediaPayload = MediaFactory.buildMediaPayload(filePaths,[1080,1080,1080,1080,1080,1080],[1080,1080,1080,1080,1080,1080])
        const {response} = await TestContext.services.mediaService.placeMedia(mediaPayload,'post')
        await ResponseValidator.validateErrorMessage(response, 'Media Not Uploaded Successully')
        await ResponseValidator.validateStatus(response,400)
    })

    test('Multiple Media Image (3) Payload for story',async()=>{
        let filePaths:any=[]
        for (let i =1; i<=3; i++){
            const filePath = getRandomJpegFile()
            filePaths.push(filePath)
        }
        const mediaPayload = MediaFactory.buildMediaPayload(filePaths,[1080,1080,1080],[1080,1080,1080])
        const {response} = await TestContext.services.mediaService.placeMedia(mediaPayload,'post')
        await ResponseValidator.validateErrorMessage(response, 'Media Not Uploaded Successully')
        await ResponseValidator.validateStatus(response,201)
    })

    test('Multiple Media Video (2) Payload for story',async()=>{
        let filePaths:any=[]
        for (let i =1; i<=2; i++){
            const filePath = getRandomMp4File()
            filePaths.push(filePath)
        }
        const mediaPayload = MediaFactory.buildMediaPayload(filePaths,[1080,1080],[1080,1080])
        const {response} = await TestContext.services.mediaService.placeMedia(mediaPayload,'post')
        await ResponseValidator.validateErrorMessage(response, 'Success')
        await ResponseValidator.validateStatus(response,201)
    })

    test('Multiple Multi Media (1V, 1I) Payload for story',async()=>{
        const imagFile = getRandomJpegFile()
        const videoFile = getRandomMp4File()
        const mediaPayload = MediaFactory.buildMediaPayload([imagFile, videoFile],[1080,1080],[1080,1080])
        const {response} = await TestContext.services.mediaService.placeMedia(mediaPayload,'post')
        await ResponseValidator.validateErrorMessage(response, 'Success')
        await ResponseValidator.validateStatus(response,400)
    })

    test('Blank Payload for Post',async()=>{
        const {response} = await TestContext.services.mediaService.placeMedia({},'post')
        await ResponseValidator.validateErrorMessage(response,'medias must contain at least 1 elements')
        await ResponseValidator.validateStatus(response,400)
    })
})

describe('Validate POST /media/upload/profile Endpoint',()=>{
    test('Valid media height and width for profile',async()=>{
        const filePath = getRandomJpegFile()
        const mediaPayload = MediaFactory.buildMediaPayload([filePath],[1080],[1080])
        const {response} = await TestContext.services.mediaService.placeMedia(mediaPayload,'profile')
        await ResponseValidator.validateStatus(response,201)
        await ResponseValidator.validateErrorMessage(response, 'Success')
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
            await ResponseValidator.validateStatus(response,400)
            await ResponseValidator.validateErrorMessage(response, 'Unsupported file format.')
        })
    })
    test('Smaller Media Size than Actual file for profile',async()=>{
        const filePath = getRandomJpegFile()
        const mediaPayload = MediaFactory.buildMediaPayload([filePath],[1080],[1080])
        mediaPayload.medias![0].mediaSizeInBytes = 67
        const {response} = await TestContext.services.mediaService.placeMedia(mediaPayload,'profile')
        await ResponseValidator.validateStatus(response,400)
        await ResponseValidator.validateErrorMessage(response, 'Invalid file dimensions.')
    })

    test('Higher Media Size than Actual file for profile',async()=>{
        const filePath = getRandomJpegFile()
        const mediaPayload = MediaFactory.buildMediaPayload([filePath],[1080],[1080])
        mediaPayload.medias![0].mediaSizeInBytes = 5242879
        const {response} = await TestContext.services.mediaService.placeMedia(mediaPayload,'profile')
        await ResponseValidator.validateStatus(response,201)
        await ResponseValidator.validateErrorMessage(response, 'Success')
    })
    test('Multiple Media Image Payload > 5 for profile',async()=>{
        let filePaths:any=[]
        for (let i =1; i<=6; i++){
            const filePath = getRandomJpegFile()
            filePaths.push(filePath)
        }
        console.log(`filePaths: ${filePaths}`)
        const mediaPayload = MediaFactory.buildMediaPayload(filePaths,[1080,1080,1080,1080,1080,1080],[1080,1080,1080,1080,1080,1080])
        const {response} = await TestContext.services.mediaService.placeMedia(mediaPayload,'profile')
        await ResponseValidator.validateStatus(response,400)
        await ResponseValidator.validateErrorMessage(response, 'medias must contain no more than 5 elements')
    })

    test('Multiple Media Image (3) Payload for profile',async()=>{
        let filePaths:any=[]
        for (let i =1; i<=3; i++){
            const filePath = getRandomJpegFile()
            filePaths.push(filePath)
        }
        console.log(`filePaths: ${filePaths}`)
        const mediaPayload = MediaFactory.buildMediaPayload(filePaths,[1080,1080,1080],[1080,1080,1080])
        const {response} = await TestContext.services.mediaService.placeMedia(mediaPayload,'profile')
        await ResponseValidator.validateStatus(response,400)
        await ResponseValidator.validateErrorMessage(response, 'Please upload only one profile picture')
    })

    test('Multiple Media Video (2) Payload for profile',async()=>{
        let filePaths:any=[]
        for (let i =1; i<=2; i++){
            const filePath = getRandomMp4File()
            filePaths.push(filePath)
        }
        console.log(`filePaths: ${filePaths}`)
        const mediaPayload = MediaFactory.buildMediaPayload(filePaths,[1080,1080],[1080,1080])
        const {response} = await TestContext.services.mediaService.placeMedia(mediaPayload,'profile')
        await ResponseValidator.validateStatus(response,400)
        await ResponseValidator.validateErrorMessage(response, 'Please upload only one profile picture')
    })

    test('Multiple Multi Media (1V, 1I) Payload for profile',async()=>{
        const imagFile = getRandomJpegFile()
        const videoFile = getRandomMp4File()
        const mediaPayload = MediaFactory.buildMediaPayload([imagFile, videoFile],[1080,1080],[1080,1080])
        const {response} = await TestContext.services.mediaService.placeMedia(mediaPayload,'profile')
        await ResponseValidator.validateStatus(response,400)
        await ResponseValidator.validateErrorMessage(response, 'Please upload only one profile picture')
    })

    test('Blank Payload for Profile',async()=>{
        const {response} = await TestContext.services.mediaService.placeMedia({},'profile')
        await ResponseValidator.validateStatus(response,400)
        await ResponseValidator.validateErrorMessage(response,'medias must contain at least 1 elements')
    })
})

// describe('Validate POST /media/upload/chat Endpoint',()=>{

// })

