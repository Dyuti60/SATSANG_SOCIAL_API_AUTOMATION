import { TestContext } from "src/context/test.context"
import { getRandomJpegFile, getRandomMp4File } from "utils/mediaPicker"

describe('Integration Testing',()=>{

    test('SIT - Upload Profile - Image',async()=>{
        const {response} = await TestContext.flows.mediaFlow.verifyUploadStatus('profile',[getRandomJpegFile()])

        // Validate record on media metadata table
    })

    test('SIT - Upload Post Media - Image',async()=>{
        const {response} = await TestContext.flows.mediaFlow.verifyUploadStatus('post',[getRandomJpegFile()])

        // Validate record on media metadata table
    })

    test('SIT - Upload Post Media - Video',async()=>{
        const {response} = await TestContext.flows.mediaFlow.verifyUploadStatus('post',[getRandomMp4File()])

        // Validate record on media metadata table
    })

    test('SIT - Upload Post Media - MultiMedia',async()=>{
        const {response} = await TestContext.flows.mediaFlow.verifyUploadStatus('post',[getRandomJpegFile(),getRandomMp4File()])

        // Validate record on media metadata table
    })

    test('SIT - Upload Story Media - Image',async()=>{
        const {response} = await TestContext.flows.mediaFlow.verifyUploadStatus('story',[getRandomJpegFile()])
        // Validate record on media metadata table
    })

    test('SIT - Upload Story Media - Video',async()=>{
        const {response} = await TestContext.flows.mediaFlow.verifyUploadStatus('story',[getRandomMp4File()])
        // Validate record on media metadata table
    })

    test('SIT - Upload Story Media - MultiMedia',async()=>{
        const {response} = await TestContext.flows.mediaFlow.verifyUploadStatus('story',[getRandomJpegFile(),getRandomMp4File()])
        // Validate record on media metadata table
    })

    
})