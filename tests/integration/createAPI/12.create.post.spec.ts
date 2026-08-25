import { TestContext } from "src/context/test.context"
import { getRandomJpegFile } from "utils/mediaPicker"

describe('Integration Testing',()=>{

    test('SIT - Create Post With Friends Visibility - Existing User',async()=>{
        await TestContext.flows.feedFlow.createPostWithMyNewPostMedia([getRandomJpegFile()],202)
        // Validate data creation in friend request table and friends table
    })

    test('SIT - Create Post With Friends of Friends Visibility - Existing User',async()=>{
        await TestContext.flows.feedFlow.createPostWithMyNewPostMedia([getRandomJpegFile()],203)
        // Validate data creation in friend request table and friends table
    })


    test('SIT - Create Post With Public Visibility - Existing User',async()=>{
        await TestContext.flows.feedFlow.createPostWithMyNewPostMedia([getRandomJpegFile()],204)
        // Validate data creation in friend request table and friends table
    })


    test('SIT - Create Post With Hidden Visibility - Existing User',async()=>{
        await TestContext.flows.feedFlow.createPostWithMyNewPostMedia([getRandomJpegFile()],201)
        // Validate data creation in friend request table and friends table
    })

})