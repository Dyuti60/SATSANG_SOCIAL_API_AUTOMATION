import ResponseValidator from "../../../src/api/response.validator"
import { TestContext } from "../../../src/context/test.context"
import { getRandomJpegFile, getRandomMp4File } from "../../../src/utils/mediaPicker"

describe('Validate POST /feed/post',()=>{
    
    describe('Validate Creating My Post - Media Count And Media Type Variance',()=>{

        test('Validate Creating My Single Image Post',async()=>{
            const imaageFilePath = getRandomJpegFile()
            const {response} = await TestContext.flows.feedFlow.createPostWithMyNewPostMedia([imaageFilePath])
            await ResponseValidator.validateStatus(response, 201)
            await ResponseValidator.validateErrorMessage(response,'Saved post successfully')
        })

        test('Validate Creating My Multiple Image (2) Post',async()=>{
            let imageFilePaths:any=[]
            for(let i=1; i<=2; i++){
                imageFilePaths.push(getRandomJpegFile())
            }
            const {response} = await TestContext.flows.feedFlow.createPostWithMyNewPostMedia(imageFilePaths)
            await ResponseValidator.validateStatus(response, 201)
            await ResponseValidator.validateErrorMessage(response,'Saved post successfully')
        })

        test('Validate Creating My Multiple Image (>5) Post',async()=>{
            let imageFilePaths:any=[]
            for(let i=1; i<=6; i++){
                imageFilePaths.push(getRandomJpegFile())
            }
            const {response} = await TestContext.flows.feedFlow.createPostWithMyNewPostMedia(imageFilePaths)
            await ResponseValidator.validateStatus(response, 201)
            await ResponseValidator.validateErrorMessage(response,'Saved post successfully')
        })

        test('Validate Creating My Single Video Post',async()=>{
            const videoFilePath = getRandomMp4File()
            const {response} = await TestContext.flows.feedFlow.createPostWithMyNewPostMedia([videoFilePath])
            await ResponseValidator.validateStatus(response, 201)
            await ResponseValidator.validateErrorMessage(response,'Saved post successfully')
        })

        test('Validate Creating My Mutli Image And Video Post',async()=>{
            let filePaths:any=[]
            for(let i=1; i<=2; i++){
                filePaths.push(getRandomJpegFile())
                filePaths.push(getRandomMp4File())
            }
            const {response} = await TestContext.flows.feedFlow.createPostWithMyNewPostMedia(filePaths)
            await ResponseValidator.validateStatus(response, 201)
            await ResponseValidator.validateErrorMessage(response,'Saved post successfully')
        })

        test('Validate Creating Post With Textual Content Only',async()=>{
            const {response} = await TestContext.flows.feedFlow.createPostWithMyCaptionOnly()
            await ResponseValidator.validateStatus(response,201)
            await ResponseValidator.validateErrorMessage(response,'Saved post successfully')
        })

        // test('Validate Creating My Single Image Post With Already Posted Post MediaId',async()=>{
        //     const {response} = await TestContext.flows.feedFlow.createPostWithMyCaptionOnly()
        //     await ResponseValidator.validateStatus(response,201)
        //     await ResponseValidator.validateErrorMessage(response,'Saved post successfully')
        // })

        test('Validate Creating My Post With Only Minio Loaded Post Media',async()=>{
            const {response} = await TestContext.flows.feedFlow.createPostWithMyExistingMinioLoadedPostMedia()
            await ResponseValidator.validateStatus(response,201)
            await ResponseValidator.validateErrorMessage(response,'Saved post successfully')
        })


    })



    describe('Validate Creating My Post - Other MediaId',()=>{

        test('Validate Creating Post With My Story MediaId',async()=>{
            const {response} = await TestContext.flows.feedFlow.createPostWithMyAlreadyPostedStoryMedia()
            await ResponseValidator.validateStatus(response,201)
            await ResponseValidator.validateErrorMessage(response,'Saved post successfully')
        })

        test('Validate Creating Post With My Only Minio Loaded Story Media',async()=>{
            const {response} = await TestContext.flows.feedFlow.createPostWithMyExistingMinioLoadedStoryMedia()
            await ResponseValidator.validateStatus(response,201)
            await ResponseValidator.validateErrorMessage(response,'Saved post successfully')
        })

        test('Validate Creating Post With My Profile MediaId',async()=>{
            const {response} = await TestContext.flows.feedFlow.createPostWithMyAlreadyPostedProfileMedia()
            await ResponseValidator.validateStatus(response,201)
            await ResponseValidator.validateErrorMessage(response,'Saved post successfully')
        })

        test('Validate Creating Post With My Only Minio Loaded Profile Media',async()=>{
            const {response} = await TestContext.flows.feedFlow.createPostWithMyExistingMinioLoadedProfileMedia()
            await ResponseValidator.validateStatus(response,201)
            await ResponseValidator.validateErrorMessage(response,'Saved post successfully')
        })

    })




    describe('Validate Creating My Post - Different Status',()=>{
        
        test('Validate Creating My Post In Public Status',async()=>{
            const {response} = await TestContext.flows.feedFlow.createPostWithMyPostMedia('public')
            await ResponseValidator.validateStatus(response,201)
            await ResponseValidator.validateErrorMessage(response,'Saved post successfully')
        })

        test('Validate Creating My Post In Deleted Status',async()=>{
            const {response} = await TestContext.flows.feedFlow.createPostWithMyPostMedia('deleted')
            await ResponseValidator.validateStatus(response,201)
            await ResponseValidator.validateErrorMessage(response,'Saved post successfully')
        })

        test('Validate Creating My Post In Hidden Status',async()=>{
            const {response} = await TestContext.flows.feedFlow.createPostWithMyPostMedia('hidden')
            await ResponseValidator.validateStatus(response,201)
            await ResponseValidator.validateErrorMessage(response,'Saved post successfully')
        })
    
        test('Validate Creating My Post In fof visibility Status',async()=>{
            const {response} = await TestContext.flows.feedFlow.createPostWithMyPostMedia('fof visibility')
            await ResponseValidator.validateStatus(response,201)
            await ResponseValidator.validateErrorMessage(response,'Saved post successfully')
        })

        test('Validate Creating My Post In friends visibility Status',async()=>{
            const {response} = await TestContext.flows.feedFlow.createPostWithMyPostMedia('friends visibility')
            await ResponseValidator.validateStatus(response,201)
            await ResponseValidator.validateErrorMessage(response,'Saved post successfully')
        })

    })


    describe('Validate Creating My Post - Others Post MediaId',()=>{

        test('Validate Creating Post With My Friends Post MediaId',async()=>{
            const {response} = await TestContext.flows.feedFlow.createPostWithFriendsExistingMinioLoadedPostMedia()
            await ResponseValidator.validateStatus(response,201)
            await ResponseValidator.validateErrorMessage(response,'Saved post successfully')
        })

        test('Validate Creating Post With My Friends Only Minio Loaded Post MediaId',async()=>{
            const {response} = await TestContext.flows.feedFlow.createPostWithFriendsPostedPostMedia()
            await ResponseValidator.validateStatus(response,201)
            await ResponseValidator.validateErrorMessage(response,'Saved post successfully')
        })

    })

})

// 