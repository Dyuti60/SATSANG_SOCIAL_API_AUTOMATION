import { TestContext } from "../../../src/context/test.context"
import ResponseValidator from "../../../src/api/response.validator"
import { getRandomJpegFile, getRandomMp4File } from "../../../src/utils/mediaPicker"
import Log from "../../../src/utils/logger"


describe('Validate POST /media/updateStatus',()=>{

    test('Validate Story Image Media Upload To Minio And Update Status',async()=>{
        const filePath = getRandomJpegFile()
        const mediaId = await TestContext.flows.mediaFlow.uploadToMinIO('story',[filePath])
        const {response} = await TestContext.services.mediaService.updateMediaStatus({
            mediaIds:[mediaId]
        })
        await ResponseValidator.validateStatus(response,201)
        await ResponseValidator.validateErrorMessage(response,'Media uploaded successfully.')
    })
    test('Validate Story Video Media Upload To Minio And Update Status',async()=>{
        const filePath = getRandomMp4File()
        const mediaId = await TestContext.flows.mediaFlow.uploadToMinIO('story',[filePath])
        const {response} = await TestContext.services.mediaService.updateMediaStatus({
            mediaIds:[mediaId]
        })
        await ResponseValidator.validateStatus(response,201)
        await ResponseValidator.validateErrorMessage(response,'Media uploaded successfully.')
    })
    test('Validate Story Images And Videos Media Upload To Minio And Update Status',async()=>{
        const imageFilePath = getRandomMp4File()
        const videoFilePath = getRandomMp4File()
        const mediaIds = await TestContext.flows.mediaFlow.uploadToMinIO('story',[imageFilePath, videoFilePath])
        const {response} = await TestContext.services.mediaService.updateMediaStatus({
            mediaIds:mediaIds
        })
        await ResponseValidator.validateStatus(response,201)
        await ResponseValidator.validateErrorMessage(response,'Media uploaded successfully.')
    })

    test('Validate Feed Image Media Upload To Minio And Update Status',async()=>{
        const filePath = getRandomJpegFile()
        const mediaId = await TestContext.flows.mediaFlow.uploadToMinIO('post',[filePath])
        const {response} = await TestContext.services.mediaService.updateMediaStatus({
            mediaIds:[mediaId]
        })
        await ResponseValidator.validateStatus(response,201)
        await ResponseValidator.validateErrorMessage(response,'Media uploaded successfully.')
    })
    test('Validate Feed Video Media Upload To Minio And Update Status',async()=>{
        const filePath = getRandomMp4File()
        const mediaId = await TestContext.flows.mediaFlow.uploadToMinIO('post',[filePath])
        const {response} = await TestContext.services.mediaService.updateMediaStatus({
            mediaIds:[mediaId]
        })
        await ResponseValidator.validateStatus(response,201)
        await ResponseValidator.validateErrorMessage(response,'Media uploaded successfully.')
    })
    test('Validate Feed Images And Videos Media Upload To Minio And Update Status',async()=>{
        const imageFilePath = getRandomMp4File()
        const videoFilePath = getRandomMp4File()
        const mediaIds = await TestContext.flows.mediaFlow.uploadToMinIO('post',[imageFilePath, videoFilePath])
        const {response} = await TestContext.services.mediaService.updateMediaStatus({
            mediaIds:mediaIds
        })
        await ResponseValidator.validateStatus(response,201)
        await ResponseValidator.validateErrorMessage(response,'Media uploaded successfully.')
    })

    test('Validate Update Status - Invalid Single MediaId',async()=>{
        const {response} = await TestContext.services.mediaService.updateMediaStatus({
            mediaIds:['bc967a38-c75b-4f7d-9432-3b76bec83b51']
        })
        await ResponseValidator.validateStatus(response,400)
        await ResponseValidator.validateErrorMessage(response,'Invalid MediaId')
    })

    test('Validate Update Status - Single Invalid MediaId Out Of Many',async()=>{
        let filePaths:any=[]
        for (let i =1; i<=2; i++){
            const filePath = getRandomJpegFile()
            filePaths.push(filePath)
        }
        const mediaIds = await TestContext.flows.mediaFlow.uploadToMinIO('post',filePaths)
        mediaIds.push('bc967a38-c75b-4f7d-9432-3b76bec83b51')
        const {response} = await TestContext.services.mediaService.updateMediaStatus({
            mediaIds:mediaIds
        })
        await ResponseValidator.validateStatus(response,400)
        await ResponseValidator.validateErrorMessage(response,'Media file not found. Upload may be incomplete.')
    })

    test('Validate Update Status - Blank Single MediaId',async()=>{
        const {response} = await TestContext.services.mediaService.updateMediaStatus({
            mediaIds:['']
        })
        await ResponseValidator.validateStatus(response,400)
        await ResponseValidator.validateErrorMessage(response,'Blank MediaId')
    })

    test('Validate Update Status - Blank Invalid MediaId Out Of Many',async()=>{
        let filePaths:any=[]
        for (let i =1; i<=2; i++){
            const filePath = getRandomJpegFile()
            filePaths.push(filePath)
        }
        const mediaIds = await TestContext.flows.mediaFlow.uploadToMinIO('post',filePaths)
        mediaIds.push('')
        const {response} = await TestContext.services.mediaService.updateMediaStatus({
            mediaIds:mediaIds
        })
        await ResponseValidator.validateStatus(response,400)
        await ResponseValidator.validateErrorMessage(response,'Media Not Uploaded')
    })

    test('Validate Update Status - Blank Payload',async()=>{
        const {response} = await TestContext.services.mediaService.updateMediaStatus({})
        await ResponseValidator.validateStatus(response,400)
        await ResponseValidator.validateErrorMessage(response,'mediaIds must contain at least 1 elements')
    })

})