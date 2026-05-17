import ResponseValidator from "../../../src/api/response.validator"
import { TestContext } from "../../../src/context/test.context"
import { getRandomJpegFile, getRandomMp4File } from "../../../src/utils/mediaPicker"

describe('Validate POST /media/updateStatus for profile',()=>{


    test('Validate Profile Image Upload And Check Update Status',async()=>{
        const filePath = getRandomJpegFile()
        const {response} = await TestContext.flows.profileFlow.profileNewMediaUpload([filePath])
        await ResponseValidator.validateStatus(response,200)
        await ResponseValidator.validateErrorMessage(response,'Media Uploaded Successfully')   
    })

    test('Validate Profile Video Upload And Check Update Status',async()=>{
        const filePath = getRandomMp4File()
        const {response} = await TestContext.flows.profileFlow.profileNewMediaUpload([filePath])
        await ResponseValidator.validateStatus(response,200)
        await ResponseValidator.validateErrorMessage(response,'Media Uploaded Successfully')     
    })

    test('Validate Multiple Profile Images Upload And Check Update Status',async()=>{
        let filePaths:any
        for (let i =1; i=3; i++){
            const filePath = getRandomJpegFile()
            filePaths.push[filePath]
        }
        const {response} = await TestContext.flows.profileFlow.profileNewMediaUpload(filePaths)
        await ResponseValidator.validateStatus(response,200)
        await ResponseValidator.validateErrorMessage(response,'Media Uploaded Successfully')   
    })

    test('Validate Profile Update Status - Invalid MediaId',async()=>{
        const {response} = await TestContext.services.mediaService.updateMediaStatus({
            mediaIds:['b59cef1d-3d8-49-9f7-6bfb8eb01']
        })
        await ResponseValidator.validateStatus(response,200)
        await ResponseValidator.validateErrorMessage(response,'Media Uploaded Successfully')
    })

    test('Validate Profile Update Status - Blank MediaId',async()=>{
        const {response} = await TestContext.services.mediaService.updateMediaStatus({
            mediaIds:[]
        })
        await ResponseValidator.validateStatus(response,200)
        await ResponseValidator.validateErrorMessage(response,'Media Uploaded Successfully')
    })

    test('Validate Profile Update Status - Null MediaId',async()=>{
        const {response} = await TestContext.services.mediaService.updateMediaStatus({
            mediaIds:[null]
        })
        await ResponseValidator.validateStatus(response,200)
        await ResponseValidator.validateErrorMessage(response,'Media Uploaded Successfully')
    })

    test('Validate Profile Update Status - No Payload',async()=>{
        const {response} = await TestContext.services.mediaService.updateMediaStatus({
        })
        await ResponseValidator.validateStatus(response,200)
        await ResponseValidator.validateErrorMessage(response,'Media Uploaded Successfully')
    })

    describe('Validate My Profile Update Status - My Profile Media Variant',()=>{
        
        test('Validate My Profile Update Status - With Present Profile',async()=>{
            const {mediaId} = await TestContext.flows.profileFlow.uploadProfileWithMyPresentProfileMedia()
            const {response} = await TestContext.services.mediaService.updateMediaStatus({
                mediaIds: [mediaId]
            })
            await ResponseValidator.validateStatus(response,200)
            await ResponseValidator.validateErrorMessage(response,'Media Uploaded Successfully')
        })

        test('Validate My Profile Update Status - With Existing Profile',async()=>{
            const {mediaId} = await TestContext.flows.profileFlow.uploadProfileWithMyExistingProfileMedia()
            const {response} = await TestContext.services.mediaService.updateMediaStatus({
                mediaIds: [mediaId]
            })
            await ResponseValidator.validateStatus(response,200)
            await ResponseValidator.validateErrorMessage(response,'Media Uploaded Successfully')
        })


        test('Validate My Profile Update Status - With My Friends Present Profile',async()=>{
            const {mediaId} = await TestContext.flows.profileFlow.uploadProfileWithMyFriendsPresentProfileMedia()
            const {response} = await TestContext.services.mediaService.updateMediaStatus({
                mediaIds: [mediaId]
            })
            await ResponseValidator.validateStatus(response,200)
            await ResponseValidator.validateErrorMessage(response,'Media Uploaded Successfully')
        })

        test('Validate My Profile Update Status - With My Friends Existing Profile',async()=>{
            const {mediaId} = await TestContext.flows.profileFlow.uploadProfileWithMyFriendsExistingProfileMedia()
            const {response} = await TestContext.services.mediaService.updateMediaStatus({
                mediaIds: [mediaId]
            })
            await ResponseValidator.validateStatus(response,200)
            await ResponseValidator.validateErrorMessage(response,'Media Uploaded Successfully')
        })


        test('Validate My Profile Update Status - With My Friends Friend Present Profile',async()=>{
            const {mediaId} = await TestContext.flows.profileFlow.uploadProfileWithMyFriendsOfFriendsPresentProfileMedia()
            const {response} = await TestContext.services.mediaService.updateMediaStatus({
                mediaIds: [mediaId]
            })
            await ResponseValidator.validateStatus(response,200)
            await ResponseValidator.validateErrorMessage(response,'Media Uploaded Successfully')
        })

        test('Validate My Profile Update Status - With My Friends Friend Existing Profile',async()=>{
            const {mediaId} = await TestContext.flows.profileFlow.uploadProfileWithMyFriendsOfFriendsExistingProfileMedia()
            const {response} = await TestContext.services.mediaService.updateMediaStatus({
                mediaIds: [mediaId]
            })
            await ResponseValidator.validateStatus(response,200)
            await ResponseValidator.validateErrorMessage(response,'Media Uploaded Successfully')
        })

        test('Validate My Profile Update Status - With Non Friends Present Profile',async()=>{
            const {mediaId} = await TestContext.flows.profileFlow.uploadProfileWithNonFriendPresentProfileMedia()
            const {response} = await TestContext.services.mediaService.updateMediaStatus({
                mediaIds: [mediaId]
            })
            await ResponseValidator.validateStatus(response,200)
            await ResponseValidator.validateErrorMessage(response,'Media Uploaded Successfully')
        })

        test('Validate My Profile Update Status - With Non Friends Existing Profile',async()=>{
            const {mediaId} = await TestContext.flows.profileFlow.uploadProfileWithNonFriendExistingProfileMedia()
            const {response} = await TestContext.services.mediaService.updateMediaStatus({
                mediaIds: [mediaId]
            })
            await ResponseValidator.validateStatus(response,200)
            await ResponseValidator.validateErrorMessage(response,'Media Uploaded Successfully')
        })

    })





})