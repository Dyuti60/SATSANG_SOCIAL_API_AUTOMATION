import { TestContext } from "src/context/test.context"
import { getRandomJpegFile } from "utils/mediaPicker"

// React Story
describe('React To Story - E2E Flow',()=>{

    test('React to Story - Friends Visibility - E2E Flow',async()=>{

        // New User Creates A story with friends visibility
        TestContext.activeUser='current'
        await TestContext.flows.registrationFlow.registerUserFlow()
        const newUserDetails = await TestContext.flows.userFlow.getParticularUserDetails(TestContext.currentMemuuid)
        await TestContext.flows.storyFlow.createStoryWithMyNewStoryMedia([getRandomJpegFile()])
        const newUserStoryDetails = await TestContext.services.storyRepo.getMyPresentStoryMediaId(TestContext.currentMemuuid)

        // New User reacts to his story
        await TestContext.services.storyService.viewOrReactToStory({
            storyId: newUserStoryDetails.storyId,
            hasReacted: true
        })

        await TestContext.services.storyService.viewOrReactToStory({
            storyId: newUserStoryDetails.storyId,
            hasReacted: false
        })

        await TestContext.services.storyService.viewOrReactToStory({
            storyId: newUserStoryDetails.storyId,
            hasReacted: true
        })

        // New User views reaction in post
        await TestContext.services.storyService.getAllReactionsOrViewsForStory({
            storyId: newUserStoryDetails.storyId,
        })

        // Logged In User becomes friend of new user
        await TestContext.services.userService.sendFriendRequest({
            friendId: TestContext.initialMemuuid
        })

        TestContext.activeUser='initial'
        await TestContext.services.userService.acceptFriendRequest({
            friendId: TestContext.currentMemuuid
        })

        // logged In User views reaction in new users post
        await TestContext.services.storyService.getAllReactionsOrViewsForStory({
            storyId: newUserStoryDetails.storyId,
        })

        // logged in user views and reacts to user story
        await TestContext.services.storyService.viewOrReactToStory({
            storyId: newUserStoryDetails.storyId,
            hasReacted: true
        })

        await TestContext.services.storyService.viewOrReactToStory({
            storyId: newUserStoryDetails.storyId,
            hasReacted: false
        })

        await TestContext.services.storyService.viewOrReactToStory({
            storyId: newUserStoryDetails.storyId,
            hasReacted: true
        })

        // New User views reaction in post
        TestContext.activeUser='current'
        await TestContext.services.storyService.getAllReactionsOrViewsForStory({
            storyId: newUserStoryDetails.storyId,
        })

        // New Users - Friends of Friend Adds reaction 
        const fofId = await TestContext.services.userRepo.getValidFriendsOfFriendId(TestContext.currentMemuuid)
        const fofIdDetails = await TestContext.flows.userFlow.getParticularUserDetails(fofId.friendId)
        await TestContext.flows.loginFlow.loginFlow(fofIdDetails.contact_number,fofId.friendId,'current user')
        await TestContext.services.storyService.viewOrReactToStory({
            storyId: newUserStoryDetails.storyId,
            hasReacted: true
        })

        await TestContext.services.storyService.viewOrReactToStory({
            storyId: newUserStoryDetails.storyId,
            hasReacted: false
        })

        await TestContext.services.storyService.viewOrReactToStory({
            storyId: newUserStoryDetails.storyId,
            hasReacted: true
        })


        // New Users - Non Social Adds reaction
        const nfId = await TestContext.services.userRepo.getRandomNonSocialFriendId(TestContext.currentMemuuid)
        const nfIdDetails = await TestContext.flows.userFlow.getParticularUserDetails(nfId)
        await TestContext.flows.loginFlow.loginFlow(nfIdDetails.contact_number,nfId,'current user')
        await TestContext.services.storyService.viewOrReactToStory({
            storyId: newUserStoryDetails.storyId,
            hasReacted: true
        })

        await TestContext.services.storyService.viewOrReactToStory({
            storyId: newUserStoryDetails.storyId,
            hasReacted: false
        })

        await TestContext.services.storyService.viewOrReactToStory({
            storyId: newUserStoryDetails.storyId,
            hasReacted: true
        })


        // New User views reaction in story
        await TestContext.services.storyService.getAllReactionsOrViewsForStory({
            storyId: newUserStoryDetails.storyId,
        })
    })
})








// Logged In User becomes friend of new user

// Logged In User adds reaction In New Users Story

// Logged In User views reaction in story

// New User views reaction in story 

// New Users - Friends of Friend Adds reaction 

// Friends of Friends views reaction in story

// New User views reaction in story

// New Users - Non Social adds reaction

// Non Social views reaction in story

// New User views reaction in story
