import { ServiceContainer } from "../../src/services/service.container";
import { LoginFlow } from './login.api.flow';
import { TestContext } from "../../src/context/test.context";
import { UserFactory } from "../testdata/factory/user.factory";
import { getMemDetailsFromJwt } from "../helper/auth/jwt.decode";
import { faker } from "@faker-js/faker";

export class UserFlow{
    constructor(
        private service: ServiceContainer,
        private loginFlow: LoginFlow
    ){}

    async loginUserFlow(contactNumber:string){
        TestContext.activeUser='current'
        const {response, accessToken, stateToken} = await this.loginFlow.loginFlow(contactNumber,'','current user')
    }

    async getRandomRegisteredUserLogInToSatsangSocial(){
        const {sfmm_id, contact_number, full_name} = await this.service.userRepo.getAnyRegisteredUserDetails()
        await this.loginUserFlow(contact_number)
    }

    async getValidRegionFlow(){
        await this.getRandomRegisteredUserLogInToSatsangSocial()
        const {regionId, region, completeRegion} = await this.service.userRepo.getRandomRegion()

        const regionPayload = {
            ...UserFactory.regionPayload(),
            region:region,
        }
        const {response} = await TestContext.services.userService.getRegion(regionPayload)
        return{
            response,
            expectedRegionId: region,
            expectedRegion: completeRegion
        }
    }

    async getValidAllFriends(){
        const {response} = await TestContext.services.userService.getAllFriends()
        return{
            response
        }
    }

    async sendFriendRequestWithDifferentPayload(type: 'valid friendId' | 'pending friend request' | 'cancelled friend request' | 'rejected friend request' | 'already friends' | 'logged in user' | 'unregistered friend',contactNumber=null):Promise<Record<string,any>>{
        let memuuid = ''
        if(contactNumber){
            await this.loginUserFlow(contactNumber)
        }else{
            memuuid = TestContext.initialMemuuid
        }
        // console.log(TestContext.accessToken)
        // const {memuuid} = getMemDetailsFromJwt(TestContext.accessToken)
        // console.log(`memuuid: ${memuuid}`)
        

        let friendId
        
        if(type=='valid friendId'){
            ({friendId} = await TestContext.services.userRepo.getRandomValidSendFriendId(memuuid))
        }
        else if(type=='pending friend request'){
            ({friendId} = await TestContext.services.userRepo.getRandomFriendIdWithPendingSentStatusOtherThanLoggedIn(memuuid))
        }
        else if(type=='cancelled friend request'){
            ({friendId} = await TestContext.services.userRepo.getRandomFriendIdWithCancelStatusOtherThanLoggedIn(memuuid))
        }
        else if(type=='rejected friend request'){
            ({friendId} = await TestContext.services.userRepo.getRandomFriendIdWithRejectedStatusOtherThanLoggedIn(memuuid))
        }
        else if(type=='already friends'){
            ({friendId} = await TestContext.services.userRepo.getRandomFriendIdWithAcceptedStatusOtherThanLoggedIn(memuuid))
        }
        else if(type=='logged in user'){
            friendId = memuuid
        }

        const sendFriendRequestPayload = {
            ...UserFactory.sendFriendRequestPayload(),
            ...{
                friendId:friendId,
                requestText: faker.lorem.sentence()
            }
        }
        return sendFriendRequestPayload
    }

    async validSendFriendRequest(contactNumber:string|any=null){
        let sendFriendRequestPayload:Record<string,any>
        if(contactNumber){
            sendFriendRequestPayload = await this.sendFriendRequestWithDifferentPayload('valid friendId',contactNumber)
        }else{
            sendFriendRequestPayload = await this.sendFriendRequestWithDifferentPayload('valid friendId')
        }
        const {response} = await TestContext.services.userService.sendFriendRequest(sendFriendRequestPayload)
        
        return{
            response
        }
    }

    async cancelFriendRequestWithDifferentPayload(type: 'valid pending sent request'|'pending received request'|'cancelled friend request'|'rejected friend request'|'accepted friend request'|'logged in user',contactNumber=null){
        let memuuid=''
        if(contactNumber){
            await this.loginUserFlow(contactNumber)
        }else{
            memuuid = TestContext.initialMemuuid
        }
        //const {memuuid} = getMemDetailsFromJwt(TestContext.accessToken)

        let friendId, friendRequestId
        
        if(type=='valid pending sent request'){
            ({friendRequestId, friendId} = await TestContext.services.userRepo.getRandomPendingSentRequest(memuuid))
        }
        else if(type=='pending received request'){
            ({friendRequestId, friendId} = await TestContext.services.userRepo.getRandomPendingReceivedRequest(memuuid))
        }
        else if(type=='cancelled friend request'){
            console.log(`memberUserId in user.api.flow:${memuuid}`);
            ({friendId} = await TestContext.services.userRepo.getRandomFriendIdWithCancelStatusOtherThanLoggedIn(memuuid));
            ({friendRequestId} = await TestContext.services.userRepo.getRandomFriendRequestIdWithCancelStatusOtherThanLoggedIn(memuuid))
            console.log(`friendId in user.api.flow:${friendId}`);
            console.log(`friendRequestId in user.api.flow:${friendRequestId}`);
        }
        else if(type=='rejected friend request'){
            ({friendId} = await TestContext.services.userRepo.getRandomFriendIdWithRejectedStatusOtherThanLoggedIn(memuuid));
            ({friendRequestId} = await TestContext.services.userRepo.getRandomFriendRequestIdWithRejectStatusOtherThanLoggedIn(memuuid))
        }
        else if(type=='accepted friend request'){
            ({friendId} = await TestContext.services.userRepo.getRandomFriendIdWithAcceptedStatusOtherThanLoggedIn(memuuid));
            ({friendRequestId} = await TestContext.services.userRepo.getRandomFriendRequestIdWithAcceptStatusOtherThanLoggedIn(memuuid));

        }
        else if(type=='logged in user'){
            friendId = memuuid
        }

        const friendIdPayload = {
                friendId:friendId,
        }

        const friendRequestIdPayload = {
                friendRequestId:friendRequestId,
        }
    
        return {
            friendIdPayload,
            friendRequestIdPayload
        }
    }

    async validCancelFriendRequest(by:'friendId'|'friendRequestId',contactNumber:string|any=null){
        let data
        if(contactNumber){
            data = await this.cancelFriendRequestWithDifferentPayload('valid pending sent request',contactNumber)
        }else{
            data = await this.cancelFriendRequestWithDifferentPayload('valid pending sent request')
        }

        let cancelFriendRequestPayload
        if(by=="friendId"){
            cancelFriendRequestPayload=data.friendIdPayload
        }
        else if(by=='friendRequestId'){
            cancelFriendRequestPayload=data.friendRequestIdPayload
        }

        const {response} = await TestContext.services.userService.cancelFriendRequest(cancelFriendRequestPayload) 
        return {
            response
        }
    }

    async acceptFriendRequestWithDifferentPayload(type: 'valid pending received request'|'pending send request'|'cancelled friend request'|'rejected friend request'|'accepted friend request'|'logged in user',contactNumber=null){
        let memuuid=''
        if(contactNumber){
            await this.loginUserFlow(contactNumber)
        }else{
            memuuid = TestContext.initialMemuuid
        }
        // const {memuuid} = getMemDetailsFromJwt(TestContext.accessToken)

        let friendId, friendRequestId
        
        if(type=='valid pending received request'){
            ({friendRequestId, friendId} = await TestContext.services.userRepo.getRandomPendingReceivedRequest(memuuid))
        }
        else if(type=='pending send request'){
            ({friendRequestId, friendId} = await TestContext.services.userRepo.getRandomPendingSentRequest(memuuid))
        }
        else if(type=='cancelled friend request'){
            ({friendId} = await TestContext.services.userRepo.getRandomFriendIdWithCancelStatusOtherThanLoggedIn(memuuid));
            ({friendRequestId} = await TestContext.services.userRepo.getRandomFriendRequestIdWithCancelStatusOtherThanLoggedIn(memuuid))
        }
        else if(type=='rejected friend request'){
            ({friendId} = await TestContext.services.userRepo.getRandomFriendIdWithRejectedStatusOtherThanLoggedIn(memuuid));
            ({friendRequestId} = await TestContext.services.userRepo.getRandomFriendRequestIdWithRejectStatusOtherThanLoggedIn(memuuid))
        }
        else if(type=='accepted friend request'){
            ({friendId} = await TestContext.services.userRepo.getRandomFriendIdWithAcceptedStatusOtherThanLoggedIn(memuuid));
            ({friendRequestId} = await TestContext.services.userRepo.getRandomFriendRequestIdWithAcceptStatusOtherThanLoggedIn(memuuid));

        }
        else if(type=='logged in user'){
            friendId = memuuid
        }

        const friendIdPayload = {
                friendId:friendId,
        }

        const friendRequestIdPayload = {
                friendRequestId:friendRequestId,
        }
    
        return {
            friendIdPayload,
            friendRequestIdPayload
        }
    }

    async validAcceptFriendRequest(by:'friendId'|'friendRequestId',contactNumber:string|any=null){
        let data
        if(contactNumber){
            data = await this.acceptFriendRequestWithDifferentPayload('valid pending received request',contactNumber)
        }else{
            data = await this.acceptFriendRequestWithDifferentPayload('valid pending received request')
        }

        let acceptFriendRequestPayload
        if(by=="friendId"){
            acceptFriendRequestPayload=data.friendIdPayload
        }
        else if(by=='friendRequestId'){
            acceptFriendRequestPayload=data.friendRequestIdPayload
        }

        const {response} = await TestContext.services.userService.acceptFriendRequest(acceptFriendRequestPayload) 
        return {
            response
        }
    }


    async rejectFriendRequestWithDifferentPayload(type: 'valid pending received request'|'pending send request'|'cancelled friend request'|'rejected friend request'|'accepted friend request'|'logged in user',contactNumber=null){
        let memuuid=''
        if(contactNumber){
            await this.loginUserFlow(contactNumber)
        }else{
            memuuid = TestContext.initialMemuuid
        }
        // const {memuuid} = getMemDetailsFromJwt(TestContext.accessToken)

        let friendId, friendRequestId
        
        if(type=='valid pending received request'){
            ({friendRequestId, friendId} = await TestContext.services.userRepo.getRandomPendingReceivedRequest(memuuid))
        }
        else if(type=='pending send request'){
            ({friendRequestId, friendId} = await TestContext.services.userRepo.getRandomPendingSentRequest(memuuid))
        }
        else if(type=='cancelled friend request'){
            ({friendId} = await TestContext.services.userRepo.getRandomFriendIdWithCancelStatusOtherThanLoggedIn(memuuid));
            ({friendRequestId} = await TestContext.services.userRepo.getRandomFriendRequestIdWithCancelStatusOtherThanLoggedIn(memuuid))
        }
        else if(type=='rejected friend request'){
            ({friendId} = await TestContext.services.userRepo.getRandomFriendIdWithRejectedStatusOtherThanLoggedIn(memuuid));
            ({friendRequestId} = await TestContext.services.userRepo.getRandomFriendRequestIdWithRejectStatusOtherThanLoggedIn(memuuid))
        }
        else if(type=='accepted friend request'){
            ({friendId} = await TestContext.services.userRepo.getRandomFriendIdWithAcceptedStatusOtherThanLoggedIn(memuuid));
            ({friendRequestId} = await TestContext.services.userRepo.getRandomFriendRequestIdWithAcceptStatusOtherThanLoggedIn(memuuid));

        }
        else if(type=='logged in user'){
            friendId = memuuid
        }

        const friendIdPayload = {
                friendId:friendId,
        }

        const friendRequestIdPayload = {
                friendRequestId:friendRequestId,
        }
    
        return {
            friendIdPayload,
            friendRequestIdPayload
        }
    }

    async validRejectFriendRequest(by:'friendId'|'friendRequestId',contactNumber:string|any=null){
        let data
        if(contactNumber){
            data = await this.rejectFriendRequestWithDifferentPayload('valid pending received request',contactNumber)
        }else{
            data = await this.rejectFriendRequestWithDifferentPayload('valid pending received request')
        }

        let rejectFriendRequestPayload
        if(by=="friendId"){
            rejectFriendRequestPayload=data.friendIdPayload
        }
        else if(by=='friendRequestId'){
            rejectFriendRequestPayload=data.friendRequestIdPayload
        }

        const {response} = await TestContext.services.userService.rejectFriendRequest(rejectFriendRequestPayload) 
        return {
            response
        }
    }

    async getUserNameByDifferentContext(type:'Registered' | 'Accept Friend' | 'Cancel Friend' | 'Pending Friend' | 'Reject Friend' | 'Logged In User',contactNumber=null){
        let memuuid=''
        if(contactNumber){
            await this.loginUserFlow(contactNumber)
        }else{
            memuuid = TestContext.initialMemuuid
        }

        // const {memuuid} = getMemDetailsFromJwt(TestContext.accessToken)
        let full_name, username;

        if(type=='Registered'){
            ({full_name, username}=await TestContext.services.userRepo.getAnyRegisteredUserDetails())
        }
        else if(type=='Accept Friend'){
            ({full_name, username}=await TestContext.services.userRepo.getRandomFriendNameWithAcceptedStatusOtherThanLoggedIn(memuuid))
        }
        else if(type=='Pending Friend'){
            ({full_name, username}=await TestContext.services.userRepo.getRandomFriendNameWithPendingSentStatusOtherThanLoggedIn(memuuid))
        }
        else if(type=='Cancel Friend'){
            ({full_name, username}=await TestContext.services.userRepo.getRandomFriendNameWithCancelStatusOtherThanLoggedIn(memuuid))
        }
        else if(type=='Reject Friend'){
            ({full_name, username}=await TestContext.services.userRepo.getRandomFriendNameWithRejectedStatusOtherThanLoggedIn(memuuid))
        }
        else if(type=='Logged In User'){
            ({full_name, username}=await TestContext.services.userRepo.getUserDetailsById(memuuid))
        }

        const fullNamePayload = {
            name: full_name
        }
        const usernamePayload = {
            name: username
        }
        return{
            fullNamePayload,
            usernamePayload
        }
    }

    async validSearchUserByName(by:'fullName'|'username',contactNumber:string|any=null){
        let data
        if(contactNumber){
            data = await this.getUserNameByDifferentContext('Registered',contactNumber)
        }else{
            data = await this.getUserNameByDifferentContext('Registered')
        }

        let searchByNamePayload
        if(by=="fullName"){
            searchByNamePayload=data.fullNamePayload
        }
        else if(by=='username'){
            searchByNamePayload=data.usernamePayload
        }

        const {response} = await TestContext.services.userService.searchUserByName(searchByNamePayload) 
        return {
            response
        }
    }

    async deleteFriendWithDifferentPayload(type: 'Valid Accepted Friend' | 'Cancel Friend' | 'Pending Friend' | 'Rejected Friend' |'logged in user',contactNumber=null){
        let memuuid=''
        if(contactNumber){
            await this.loginUserFlow(contactNumber)
        }else{
            memuuid = TestContext.initialMemuuid
        }
        // const {memuuid} = getMemDetailsFromJwt(TestContext.accessToken)

        let friendId
        
        if(type =='Valid Accepted Friend'){
            ({friendId} = await TestContext.services.userRepo.getRandomFriendIdWithAcceptedStatusOtherThanLoggedIn(memuuid))
        }
        else if (type == 'Pending Friend'){
            ({friendId} = await TestContext.services.userRepo.getRandomFriendIdWithPendingSentStatusOtherThanLoggedIn(memuuid))
        }
        else if (type == 'Cancel Friend'){
            ({friendId} = await TestContext.services.userRepo.getRandomFriendIdWithCancelStatusOtherThanLoggedIn(memuuid))
        }
        else if (type == 'Rejected Friend'){
            ({friendId} = await TestContext.services.userRepo.getRandomFriendIdWithRejectedStatusOtherThanLoggedIn(memuuid))
        }
        else if(type=='logged in user'){
            friendId = memuuid
        }

        const friendIdPayload = {
                friendId:friendId,
        }
    
        return {
            friendIdPayload
        }
    }

    async validDeleteFriend(contactNumber:string|any=null){
        let friendIdPayload
        if(contactNumber){
            ({friendIdPayload} = await this.deleteFriendWithDifferentPayload('Valid Accepted Friend',contactNumber))
        }else{
            ({friendIdPayload} = await this.deleteFriendWithDifferentPayload('Valid Accepted Friend'))
            console.log(`friendId Payload: ${friendIdPayload}`)
        }
        const {response} = await TestContext.services.userService.deleteFriend(friendIdPayload)
        
        return{
            response
        }
    }

    async getProfileWithDifferentPayload(type:'LoggedIn User' | 'Non Social Friend' | 'Sent Request Friend' | 'Received Request Friend' | 'Cancelled Request Friend' | 'Accepted Request Friend',contactNumber=null){
        let memuuid=''
        if(contactNumber){
            await this.loginUserFlow(contactNumber)
        }else{
            memuuid = TestContext.initialMemuuid
        }
        // const {memuuid} = getMemDetailsFromJwt(TestContext.accessToken)

        let friendId

        if(type=='LoggedIn User'){
            friendId = memuuid
        }
        else if (type=='Accepted Request Friend'){
            ({friendId} = await TestContext.services.userRepo.getRandomFriendIdWithAcceptedStatusOtherThanLoggedIn(memuuid))
        }
        else if (type=='Sent Request Friend'){
            ({friendId} = await TestContext.services.userRepo.getRandomFriendIdWithPendingSentStatusOtherThanLoggedIn(memuuid))
        }
        else if (type=='Received Request Friend'){
            ({friendId} = await TestContext.services.userRepo.getRandomFriendIdWithPendingSentStatusOtherThanLoggedIn(memuuid))
        }
        else if (type=='Cancelled Request Friend'){
            ({friendId} = await TestContext.services.userRepo.getRandomFriendIdWithCancelStatusOtherThanLoggedIn(memuuid))
        }
        else if (type=='Non Social Friend'){
            friendId = await TestContext.services.userRepo.getRandomNonSocialFriendId(memuuid)
        }
        const userIdPayload = {
                userId: friendId
        }
        return {
            userIdPayload
        }
    }

    async getMyValidProfile(contactNumber:string|any=null){
        let userIdPayload
        if(contactNumber){
            ({userIdPayload} = await this.getProfileWithDifferentPayload('LoggedIn User',contactNumber))
        }else{
            ({userIdPayload} = await this.getProfileWithDifferentPayload('LoggedIn User'))
        }
        const {response} = await TestContext.services.userService.getProfile(userIdPayload)
        
        return{
            response
        }
    }

    async getRandomValidLocation(){
        const {regionId} = await TestContext.services.userRepo.getRandomRegion()
        const regionPayload = {
            ...UserFactory.locationPayload(),
            regionId
        }
        return{
            regionPayload
        }
    }

    async getRandomEnteredLocation(){
        const {userId, latitude, longitude, regionId} = await TestContext.services.userRepo.getRandomLocation()
        const nearByPayload = {
            ...UserFactory.nearBySatsangeePayload(),
            latitude,
            longitude
        }
        return{
            nearByPayload
        }
    }

  async randomFriendIdForBulkLoginInPendingRequest(memuuid:string){
    const sentRequestByUserId = memuuid

    const receivedRequestUserId = await TestContext.services.userRepo.getRandomFriendIdWhoReceivedSentFriendRequest(sentRequestByUserId)
    const receivedRequestUserDetails = await TestContext.services.ssoRepo.getSSOMemberDetailsBySFMMDID(receivedRequestUserId)

    TestContext.activeUser='current'
    const receiverDetails = await TestContext.flows.loginFlow.loginFlow(receivedRequestUserDetails.contactNumber, receivedRequestUserId, 'current user');
    // const receivedMember = getMemDetailsFromJwt(receiverDetails.accessToken)
    // const receivedUserId = receivedMember.memuuid
    const receivedUserId = TestContext.currentMemuuid

    const friendRequestId = await TestContext.services.userRepo.getFriendRequestIdForToAndFromUserId(sentRequestByUserId, receivedUserId)

    return {
      friendId: sentRequestByUserId,
      friendRequestId: friendRequestId
    }
  }

  async randomFriendIdForBulkLoginAndSendRequestToParticularUser(particualarUserId:string){
    const logInUserId = await TestContext.services.userRepo.getRandomValidFriendIdToSendRequestToAParticularUser(particualarUserId)
    const logInUserDetails = await TestContext.services.ssoRepo.getSSOMemberDetailsBySFMMDID(logInUserId)
    TestContext.activeUser='current'
    await TestContext.flows.loginFlow.loginFlow(logInUserDetails.contactNumber, logInUserId, 'current user');  
  }

  async randomFriendIdForBulkLoginAndCancelRequestToParticularUser(particualarUserId:string){
    const {friendId, friendRequestId} = await TestContext.services.userRepo.getFriendIdOfReceivedRequestToParticularUser(particualarUserId)
    const logInUserDetails = await TestContext.services.ssoRepo.getSSOMemberDetailsBySFMMDID(friendId)
    TestContext.activeUser='current'
    await TestContext.flows.loginFlow.loginFlow(logInUserDetails.contactNumber, friendId, 'current user');  
  }


  async randomFriendIdForAcceptingRequestOfParticularUser(){
    // const {memuuid} = getMemDetailsFromJwt(TestContext.accessToken)
    const memuuid = TestContext.initialMemuuid
    const {friendId, friendRequestId} = await TestContext.services.userRepo.getFriendIdOfReceivedRequestToParticularUser(memuuid)
    return {
        friendRequestId
    }
  }

  async randomFriendIdForRejectingRequestOfParticularUser(){
    // const {memuuid} = getMemDetailsFromJwt(TestContext.accessToken)
    const memuuid = TestContext.initialMemuuid
    const {friendId, friendRequestId} = await TestContext.services.userRepo.getFriendIdOfReceivedRequestToParticularUser(memuuid)
    return {
        friendRequestId
    }
  }


    

}