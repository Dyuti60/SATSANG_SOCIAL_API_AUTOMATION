import { TestContext } from "src/context/test.context"
import { UserFactory } from "testdata/factory/user.factory"

describe('Integration Testing',()=>{

    test('SIT - Update Profile',async()=>{
        const updateProfilePayload = {
            ...UserFactory.updateProfilePayload()
        }
        const {response} = await TestContext.services.userService.updateProfile(updateProfilePayload)
        
        // Validate data creation in friend request table and friends table
    })
})