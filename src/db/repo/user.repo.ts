import { TestContext } from "../../context/test.context";
import { PgSocialClient } from "../client/pg.social.client";
export class UserRepo {
    
    async getAnyRegisteredUserDetails(){
        const query = `
            select ssup.ssup_sfmm_id, ssup.ssup_username, ssup.ssup_full_name from satsang_social.satsang_social_user_profiles ssup 
            order by Random()
            limit 1
        `
        const result = await PgSocialClient.query(query)
        const sfmm_id = result.rows[0]?.ssup_sfmm_id
        const username = result.rows[0]?.ssup_username

        const {sfmmID, contactNumber, fullName} = await TestContext.services.ssoRepo.getSSOMemberDetailsBySFMMDID(sfmm_id)
        return {
            sfmm_id: sfmmID,
            contact_number: contactNumber,
            full_name: fullName,
            username: username

        }
    }

    async getRandomRegion(){
        const result = await PgSocialClient.query(
            `
            select ssr.ssr_id as regionId, ssr.city as region, CONCAT(INITCAP(ssr.city),', ', INITCAP(ssr.state),', ', INITCAP(ssr.country)) as complete_region
            from satsang_social.satsang_social_regions ssr 
            order by random()
            limit 1
            `
        )
        return{
            regionId: result.rows[0]?.regionid,
            region: result.rows[0]?.region,
            completeRegion: result.rows[0]?.complete_region
        }
    }

    async getRandomValidSendFriendId(user_id:string){
        const result = await PgSocialClient.query(
          `
            select x.ssup_sfmm_id as friendid from (
            select distinct ssup.ssup_sfmm_id  from satsang_social.satsang_social_user_profiles ssup 
            left join satsang_social.satsang_social_friend_requests ssfr 
            on (ssup.ssup_sfmm_id = ssfr.ssfr_from_sfmm_id  or ssup.ssup_sfmm_id =ssfr.ssfr_to_sfmm_id ) 
            where ssfr.ssfr_id  is null --998
            union
            select distinct case when ssfr.ssfr_from_sfmm_id =$1 then ssfr.ssfr_to_sfmm_id
            else ssfr.ssfr_from_sfmm_id end as friendId
            from satsang_social.satsang_social_friend_requests ssfr 
            where (ssfr.ssfr_from_sfmm_id = $1 or ssfr.ssfr_to_sfmm_id =$1)
            and ssfr.ssfr_ssc_id in (23, 24)--179
            union
            select ssfr.ssfr_from_sfmm_id  from satsang_social.satsang_social_friend_requests ssfr --1464
            where (ssfr.ssfr_from_sfmm_id != $1 and ssfr.ssfr_to_sfmm_id !=$1) 
            union
            select ssfr.ssfr_to_sfmm_id  from satsang_social.satsang_social_friend_requests ssfr --1464
            where (ssfr.ssfr_from_sfmm_id != $1 and ssfr.ssfr_to_sfmm_id !=$1)
            except
            select distinct case when ssfr.ssfr_from_sfmm_id =$1 then ssfr.ssfr_to_sfmm_id
            else ssfr.ssfr_from_sfmm_id end as friendId
            from satsang_social.satsang_social_friend_requests ssfr 
            where (ssfr.ssfr_from_sfmm_id = $1 or ssfr.ssfr_to_sfmm_id =$1)
            and ssfr.ssfr_ssc_id in (21, 22)--550
            )x
            order by random()
            limit 1
          `
        ,[user_id])
          return{
              friendId: result?.rows[0]?.friendid
          }
    }

  async getRandomFriendIdWithPendingSentStatusOtherThanLoggedIn(UserUUID:string){
    const query=`
    select friendid from (
    select case when ssfr.ssfr_from_sfmm_id=$1 then ssfr.ssfr_to_sfmm_id
    when ssfr.ssfr_to_sfmm_id =$1 then ssfr.ssfr_from_sfmm_id
    end as friendid from satsang_social.satsang_social_friend_requests ssfr 
    where (ssfr.ssfr_from_sfmm_id =$1
    or ssfr.ssfr_to_sfmm_id =$1)
    and ssfr.ssfr_ssc_id =21
    except
    select case when ssfr.ssfr_from_sfmm_id=$1 then ssfr.ssfr_to_sfmm_id
    when ssfr.ssfr_to_sfmm_id =$1 then ssfr.ssfr_from_sfmm_id
    end as friendid from satsang_social.satsang_social_friend_requests ssfr 
    where (ssfr.ssfr_from_sfmm_id =$1
    or ssfr.ssfr_to_sfmm_id =$1)
    and ssfr.ssfr_ssc_id in (23,24,22)
    )x
    order by Random()
    limit 1
    `
    const result = await PgSocialClient.query(query, [UserUUID]);
    return { 
        friendId : result.rows[0]?.friendid
    }
  }

  async getRandomFriendIdWithCancelStatusOtherThanLoggedIn(UserUUID: string) {
    const query = `
    select friendid from (
    select case when ssfr.ssfr_from_sfmm_id=$1 then ssfr.ssfr_to_sfmm_id
    when ssfr.ssfr_to_sfmm_id =$1 then ssfr.ssfr_from_sfmm_id
    end as friendid from satsang_social.satsang_social_friend_requests ssfr 
    where (ssfr.ssfr_from_sfmm_id =$1
    or ssfr.ssfr_to_sfmm_id =$1)
    and ssfr.ssfr_ssc_id =24
    except
    select case when ssfr.ssfr_from_sfmm_id=$1 then ssfr.ssfr_to_sfmm_id
    when ssfr.ssfr_to_sfmm_id =$1 then ssfr.ssfr_from_sfmm_id
    end as friendid from satsang_social.satsang_social_friend_requests ssfr 
    where (ssfr.ssfr_from_sfmm_id =$1
    or ssfr.ssfr_to_sfmm_id =$1)
    and ssfr.ssfr_ssc_id in (21,23,22)
    )x
    order by Random()
    limit 1
    `;
    const result = await PgSocialClient.query(query, [UserUUID]);
    return {
        friendId: result.rows[0]?.friendid
    }
  }
  
  async getRandomFriendIdWithRejectedStatusOtherThanLoggedIn( UserUUID: string) {
    const query = `
    select friendid from (
    select case when ssfr.ssfr_from_sfmm_id=$1 then ssfr.ssfr_to_sfmm_id
    when ssfr.ssfr_to_sfmm_id =$1 then ssfr.ssfr_from_sfmm_id
    end as friendid from satsang_social.satsang_social_friend_requests ssfr 
    where (ssfr.ssfr_from_sfmm_id =$1
    or ssfr.ssfr_to_sfmm_id =$1)
    and ssfr.ssfr_ssc_id =23
    except
    select case when ssfr.ssfr_from_sfmm_id=$1 then ssfr.ssfr_to_sfmm_id
    when ssfr.ssfr_to_sfmm_id =$1 then ssfr.ssfr_from_sfmm_id
    end as friendid from satsang_social.satsang_social_friend_requests ssfr 
    where (ssfr.ssfr_from_sfmm_id =$1
    or ssfr.ssfr_to_sfmm_id =$1)
    and ssfr.ssfr_ssc_id in (21,24,22)
    )x
    order by Random()
    limit 1
    `;
    const result = await PgSocialClient.query(query, [UserUUID]);
    return {
        friendId : result.rows[0]?.friendid
    }
  }

  async getRandomFriendIdWithAcceptedStatusOtherThanLoggedIn(UserUUID: string) {
    const query = `
    select friendid from (
    select case when ssfr.ssfr_from_sfmm_id=$1 then ssfr.ssfr_to_sfmm_id
    when ssfr.ssfr_to_sfmm_id =$1 then ssfr.ssfr_from_sfmm_id
    end as friendid from satsang_social.satsang_social_friend_requests ssfr 
    where (ssfr.ssfr_from_sfmm_id =$1
    or ssfr.ssfr_to_sfmm_id =$1)
    and ssfr.ssfr_ssc_id =22
    except
    select case when ssfr.ssfr_from_sfmm_id=$1 then ssfr.ssfr_to_sfmm_id
    when ssfr.ssfr_to_sfmm_id =$1 then ssfr.ssfr_from_sfmm_id
    end as friendid from satsang_social.satsang_social_friend_requests ssfr 
    where (ssfr.ssfr_from_sfmm_id =$1
    or ssfr.ssfr_to_sfmm_id =$1)
    and ssfr.ssfr_ssc_id in (23,24,21)
    )x
    order by Random()
    limit 1
    `;
    const result = await PgSocialClient.query(query, [UserUUID]);
    return {
        friendId : result.rows[0]?.friendid
    }
  }

  async getRandomPendingSentRequest(user_id:string){
    const query = `
        select ssfr.ssfr_id as friendRequestId, ssfr.ssfr_to_sfmm_id as friendId 
        from satsang_social.satsang_social_friend_requests ssfr 
        inner join satsang_social.satsang_status_catalogue ssc 
        on ssfr.ssfr_ssc_id =ssc.ssc_id 
        where ssfr.ssfr_from_sfmm_id =$1
        and ssc.ssc_code = 'Pending'
        order by Random()
        limit 1
    `
    const result = await PgSocialClient.query(query,[user_id])
    return {
        friendRequestId: result.rows[0]?.friendrequestid,
        friendId: result.rows[0]?.friendid
    }
  }

  async getRandomPendingReceivedRequest(user_id:string){

    const query = `
        select ssfr.ssfr_id as friendRequestId, ssfr.ssfr_from_sfmm_id as friendId 
        from satsang_social.satsang_social_friend_requests ssfr 
        inner join satsang_social.satsang_status_catalogue ssc 
        on ssfr.ssfr_ssc_id =ssc.ssc_id 
        where ssfr.ssfr_to_sfmm_id =$1
        and ssc.ssc_code = 'Pending'
        order by Random()
        limit 1
    `
    const result = await PgSocialClient.query(query,[user_id])
    return {
        friendRequestId: result.rows[0]?.friendrequestid,
        friendId: result.rows[0]?.friendid
    }
  }



  async getRandomFriendRequestIdWithCancelStatusOtherThanLoggedIn(UserUUID: string) {
    const query = `
    select friendRequestId from (
    select ssfr.ssfr_id as friendRequestId  from satsang_social.satsang_social_friend_requests ssfr where 
    (ssfr.ssfr_from_sfmm_id =$1 
    or ssfr.ssfr_to_sfmm_id =$1)
    and ssfr.ssfr_ssc_id = 24 
    except 
    select ssfr.ssfr_id  from satsang_social.satsang_social_friend_requests ssfr where 
    (ssfr.ssfr_from_sfmm_id =$1 
    or ssfr.ssfr_to_sfmm_id =$1)
    and ssfr.ssfr_ssc_id in (21,22,23)
    )x
    order by Random()
    limit 1
    `;
    const result = await PgSocialClient.query(query, [UserUUID]);
    return {
        friendRequestId: result.rows[0]?.friendrequestid
    }
  }

  async getRandomFriendRequestIdWithRejectStatusOtherThanLoggedIn(UserUUID: string) {
    const query = `
    select friendRequestId from (
    select ssfr.ssfr_id as friendRequestId  from satsang_social.satsang_social_friend_requests ssfr where 
    (ssfr.ssfr_from_sfmm_id =$1 
    or ssfr.ssfr_to_sfmm_id =$1)
    and ssfr.ssfr_ssc_id = 23 
    except 
    select ssfr.ssfr_id  from satsang_social.satsang_social_friend_requests ssfr where 
    (ssfr.ssfr_from_sfmm_id =$1 
    or ssfr.ssfr_to_sfmm_id =$1)
    and ssfr.ssfr_ssc_id in (21,22,24)
    )x
    order by Random()
    limit 1
    `;
    const result = await PgSocialClient.query(query, [UserUUID]);
    return {
        friendRequestId: result.rows[0]?.friendrequestid
    }
  }

  async getRandomFriendRequestIdWithAcceptStatusOtherThanLoggedIn(UserUUID: string) {
    const query = `
    select friendRequestId from (
    select ssfr.ssfr_id as friendRequestId  from satsang_social.satsang_social_friend_requests ssfr where 
    (ssfr.ssfr_from_sfmm_id =$1 
    or ssfr.ssfr_to_sfmm_id =$1)
    and ssfr.ssfr_ssc_id = 22
    except 
    select ssfr.ssfr_id  from satsang_social.satsang_social_friend_requests ssfr where 
    (ssfr.ssfr_from_sfmm_id =$1 
    or ssfr.ssfr_to_sfmm_id =$1)
    and ssfr.ssfr_ssc_id in (21,23,24)
    )x
    order by Random()
    limit 1
    `;
    const result = await PgSocialClient.query(query, [UserUUID]);
    return {
        friendRequestId: result.rows[0]?.friendrequestid
    }
  }


    async getRandomValidSendFriendName(user_id:string){
        const query=`
    	select ssup.ssup_sfmm_id  as sfmm_id,ssup.ssup_full_name as full_name, ssup.ssup_username as username
	    from satsang_social.satsang_social_user_profiles ssup where ssup.ssup_sfmm_id in (
        select x.ssup_sfmm_id as friendid from (
        select distinct ssup.ssup_sfmm_id  from satsang_social.satsang_social_user_profiles ssup 
        left join satsang_social.satsang_social_friend_requests ssfr 
        on (ssup.ssup_sfmm_id = ssfr.ssfr_from_sfmm_id  or ssup.ssup_sfmm_id =ssfr.ssfr_to_sfmm_id ) 
        where ssfr.ssfr_id  is null --998
        union
        select distinct case when ssfr.ssfr_from_sfmm_id =$1 then ssfr.ssfr_to_sfmm_id
        else ssfr.ssfr_from_sfmm_id end as friendId
        from satsang_social.satsang_social_friend_requests ssfr 
        where (ssfr.ssfr_from_sfmm_id = $1 or ssfr.ssfr_to_sfmm_id =$1)
        and ssfr.ssfr_ssc_id in (23, 24)--179
        union
        select ssfr.ssfr_from_sfmm_id  from satsang_social.satsang_social_friend_requests ssfr --1464
        where (ssfr.ssfr_from_sfmm_id != $1 and ssfr.ssfr_to_sfmm_id !=$1) 
        union
        select ssfr.ssfr_to_sfmm_id  from satsang_social.satsang_social_friend_requests ssfr --1464
        where (ssfr.ssfr_from_sfmm_id != $1 and ssfr.ssfr_to_sfmm_id !=$1)
        except
        select distinct case when ssfr.ssfr_from_sfmm_id =$1 then ssfr.ssfr_to_sfmm_id
        else ssfr.ssfr_from_sfmm_id end as friendId
        from satsang_social.satsang_social_friend_requests ssfr 
        where (ssfr.ssfr_from_sfmm_id = $1 or ssfr.ssfr_to_sfmm_id =$1)
        and ssfr.ssfr_ssc_id in (21, 22)--550
        )x
        order by random()
        limit 1
        )
        `
        const result = await PgSocialClient.query(query,[user_id])
        return{
            full_name: result.rows[0]?.full_name,
            username: result.rows[0]?.username
        }
    }

  async getRandomFriendNameWithPendingSentStatusOtherThanLoggedIn(UserUUID:string){
    const query=`
	select ssup.ssup_sfmm_id  as sfmm_id,ssup.ssup_full_name as full_name, ssup.ssup_username as username
	from satsang_social.satsang_social_user_profiles ssup where ssup.ssup_sfmm_id in (
    select friendid from (
    select case when ssfr.ssfr_from_sfmm_id=$1 then ssfr.ssfr_to_sfmm_id
    when ssfr.ssfr_to_sfmm_id =$1 then ssfr.ssfr_from_sfmm_id
    end as friendid from satsang_social.satsang_social_friend_requests ssfr 
    where (ssfr.ssfr_from_sfmm_id =$1
    or ssfr.ssfr_to_sfmm_id =$1)
    and ssfr.ssfr_ssc_id =21
    except
    select case when ssfr.ssfr_from_sfmm_id=$1 then ssfr.ssfr_to_sfmm_id
    when ssfr.ssfr_to_sfmm_id =$1 then ssfr.ssfr_from_sfmm_id
    end as friendid from satsang_social.satsang_social_friend_requests ssfr 
    where (ssfr.ssfr_from_sfmm_id =$1
    or ssfr.ssfr_to_sfmm_id =$1)
    and ssfr.ssfr_ssc_id in (23,24,22)
    )x
    order by Random()
    limit 1
    )
    `
    const result = await PgSocialClient.query(query, [UserUUID]);
    return {
        full_name: result.rows[0]?.full_name,
        username: result.rows[0]?.username
    }
  }

  async getRandomFriendNameWithCancelStatusOtherThanLoggedIn(UserUUID: string) {
    const query = `
	select ssup.ssup_sfmm_id  as sfmm_id,ssup.ssup_full_name as full_name, ssup.ssup_username as username
	from satsang_social.satsang_social_user_profiles ssup where ssup.ssup_sfmm_id in (
    select friendid from (
    select case when ssfr.ssfr_from_sfmm_id=$1 then ssfr.ssfr_to_sfmm_id
    when ssfr.ssfr_to_sfmm_id =$1 then ssfr.ssfr_from_sfmm_id
    end as friendid
    from satsang_social.satsang_social_friend_requests ssfr 
    where (ssfr.ssfr_from_sfmm_id =$1
    or ssfr.ssfr_to_sfmm_id =$1)
    and ssfr.ssfr_ssc_id =24
    except
    select case when ssfr.ssfr_from_sfmm_id=$1 then ssfr.ssfr_to_sfmm_id
    when ssfr.ssfr_to_sfmm_id =$1 then ssfr.ssfr_from_sfmm_id
    end as friendid from satsang_social.satsang_social_friend_requests ssfr 
    where (ssfr.ssfr_from_sfmm_id =$1
    or ssfr.ssfr_to_sfmm_id =$1)
    and ssfr.ssfr_ssc_id in (23,21,22)
    )x
    order by Random()
    limit 1
    )

    `;
    const result = await PgSocialClient.query(query, [UserUUID]);
    return {
        full_name: result.rows[0]?.full_name,
        username: result.rows[0]?.username
    }
  }
  
  async getRandomFriendNameWithRejectedStatusOtherThanLoggedIn( UserUUID: string) {
    const query = `
	select ssup.ssup_sfmm_id  as sfmm_id,ssup.ssup_full_name as full_name, ssup.ssup_username as username
	from satsang_social.satsang_social_user_profiles ssup where ssup.ssup_sfmm_id in (
    select friendid from (
    select case when ssfr.ssfr_from_sfmm_id=$1 then ssfr.ssfr_to_sfmm_id
    when ssfr.ssfr_to_sfmm_id =$1 then ssfr.ssfr_from_sfmm_id
    end as friendid from satsang_social.satsang_social_friend_requests ssfr 
    where (ssfr.ssfr_from_sfmm_id =$1
    or ssfr.ssfr_to_sfmm_id =$1)
    and ssfr.ssfr_ssc_id =23
    except
    select case when ssfr.ssfr_from_sfmm_id=$1 then ssfr.ssfr_to_sfmm_id
    when ssfr.ssfr_to_sfmm_id =$1 then ssfr.ssfr_from_sfmm_id
    end as friendid from satsang_social.satsang_social_friend_requests ssfr 
    where (ssfr.ssfr_from_sfmm_id =$1
    or ssfr.ssfr_to_sfmm_id =$1)
    and ssfr.ssfr_ssc_id in (21,24,22)
    )x
    order by Random()
    limit 1
    )
    `;
    const result = await PgSocialClient.query(query, [UserUUID]);
    return {
        full_name: result.rows[0]?.full_name,
        username: result.rows[0]?.username
    }
  }

  async getRandomFriendNameWithAcceptedStatusOtherThanLoggedIn(UserUUID: string) {
    const query = `
	select ssup.ssup_sfmm_id  as sfmm_id,ssup.ssup_full_name as full_name, ssup.ssup_username as username
	from satsang_social.satsang_social_user_profiles ssup where ssup.ssup_sfmm_id in (
    select friendid from (
    select case when ssfr.ssfr_from_sfmm_id=$1 then ssfr.ssfr_to_sfmm_id
    when ssfr.ssfr_to_sfmm_id =$1 then ssfr.ssfr_from_sfmm_id
    end as friendid from satsang_social.satsang_social_friend_requests ssfr 
    where (ssfr.ssfr_from_sfmm_id =$1
    or ssfr.ssfr_to_sfmm_id =$1)
    and ssfr.ssfr_ssc_id =22
    except
    select case when ssfr.ssfr_from_sfmm_id=$1 then ssfr.ssfr_to_sfmm_id
    when ssfr.ssfr_to_sfmm_id =$1 then ssfr.ssfr_from_sfmm_id
    end as friendid from satsang_social.satsang_social_friend_requests ssfr 
    where (ssfr.ssfr_from_sfmm_id =$1
    or ssfr.ssfr_to_sfmm_id =$1)
    and ssfr.ssfr_ssc_id in (23,24,21)
    )x
    order by Random()
    limit 1
    )
    `;
    const result = await PgSocialClient.query(query, [UserUUID]);
    return {
        full_name: result.rows[0]?.full_name,
        username: result.rows[0]?.username
    }
  }

  async getUserDetailsById(UserUUID:string){
    const query = `
    select ssup.ssup_sfmm_id, ssup.ssup_username, ssup.ssup_full_name 
    from satsang_social.satsang_social_user_profiles ssup 
    where ssup.ssup_sfmm_id = $1
    limit 1
    `
    const result = await PgSocialClient.query(query,[UserUUID])
    return{
        full_name: result.rows[0]?.ssup_full_name,
        username: result.rows[0]?.ssup_username
    }
  }

  async getRandomNonSocialFriendId(UserUUID: string): Promise<string> {
    const query = `
    select ssup.ssup_sfmm_id  from 
    satsang_social.satsang_social_user_profiles ssup
    left join 
    satsang_social.satsang_social_friend_requests ssfr 
    on (ssup.ssup_sfmm_id = ssfr.ssfr_from_sfmm_id 
    or ssup.ssup_sfmm_id = ssfr.ssfr_to_sfmm_id)
    where ssfr.ssfr_id is null
    and ssup.ssup_sfmm_id != $1
    order by Random()
    limit 1
    `;
    const result = await PgSocialClient.query(query, [UserUUID]);
    const friendId = result.rows[0]?.ssup_sfmm_id;
    return friendId;
  }
  
  async getRandomLocation(){
    const query= `
    SELECT 
    ssup.ssup_sfmm_id as userId,
    ST_X(ssup.ssup_location::geometry) AS longitude,
    ST_Y(ssup.ssup_location::geometry) AS latitude,
    ssup.ssup_ssr_id AS regionId
    FROM satsang_social.satsang_social_user_profiles ssup
    where ssup.ssup_location is not null
    `
    const result = await PgSocialClient.query(query)
    return {
      userId: result.rows[0]?.userid,
      longitude: result.rows[0]?.longitude,
      latitude: result.rows[0]?.latitude,
      regionId: result.rows[0]?.regionId
    }
  }

  async getRandomFriendIdWhoReceivedSentFriendRequest(sentRequestByUUID:string){
    const query = `
    select ssfr.ssfr_from_sfmm_id , ssfr.ssfr_to_sfmm_id, ssc.ssc_code   
    from satsang_social.satsang_social_friend_requests ssfr 
    inner join satsang_social.satsang_status_catalogue ssc 
    on ssfr.ssfr_ssc_id =ssc.ssc_id 
    where ssfr.ssfr_from_sfmm_id = $1
    and ssc.ssc_code = 'Pending'
    order by Random()
    limit 1;`;
    const result = await PgSocialClient.query(query, [sentRequestByUUID]);
    const friendId = result.rows[0]?.ssfr_to_sfmm_id;
    return friendId
  }

  async getFriendRequestIdForToAndFromUserId(fromId: string, toID: string) {
    const query = `
    select ssfr.ssfr_id, ssfr.ssfr_from_sfmm_id , ssfr.ssfr_to_sfmm_id, ssc.ssc_code   
    from satsang_social.satsang_social_friend_requests ssfr 
    inner join satsang_social.satsang_status_catalogue ssc 
    on ssfr.ssfr_ssc_id =ssc.ssc_id 
    where ssfr.ssfr_from_sfmm_id = $1
    and ssc.ssc_code = 'Pending'
    and ssfr.ssfr_to_sfmm_id = $2
    `;
    const result = await PgSocialClient.query(query, [fromId, toID]);
    const frienRequestId = result.rows[0]?.ssfr_id;
    return frienRequestId;
  }

  async getRandomValidFriendIdToSendRequestToAParticularUser(particularUserId: string) {
    const query = `
     select friendId from (select distinct
      case when ssfr.ssfr_from_sfmm_id=$1 then ssfr.ssfr_to_sfmm_id
      else ssfr.ssfr_from_sfmm_id
      end as friendId
      from satsang_social.satsang_social_friend_requests ssfr 
      where
      (ssfr.ssfr_from_sfmm_id =$1 or ssfr.ssfr_to_sfmm_id =$1)
      and ssfr.ssfr_ssc_id  in (23,24)
      union 
      --non social
      select distinct ssup.ssup_sfmm_id  from satsang_social.satsang_social_user_profiles ssup 
      left join satsang_social.satsang_social_friend_requests ssfr 
      on 
      (ssup.ssup_sfmm_id = ssfr.ssfr_from_sfmm_id 
      or 
      ssup.ssup_sfmm_id = ssfr.ssfr_to_sfmm_id )
      where ssfr.ssfr_id is null
      union 
      select distinct ssfr.ssfr_from_sfmm_id as friendId
      from satsang_social.satsang_social_friend_requests ssfr 
      where
      (ssfr.ssfr_from_sfmm_id !=$1 or ssfr.ssfr_to_sfmm_id !=$1)
      union
      select distinct ssfr.ssfr_to_sfmm_id as friendId
      from satsang_social.satsang_social_friend_requests ssfr 
      where
      (ssfr.ssfr_from_sfmm_id !=$1 or ssfr.ssfr_to_sfmm_id !=$1)
      except
      select distinct
      case when ssfr.ssfr_from_sfmm_id=$1 then ssfr.ssfr_to_sfmm_id
      else ssfr.ssfr_from_sfmm_id
      end as friendId
      from satsang_social.satsang_social_friend_requests ssfr 
      where
      (ssfr.ssfr_from_sfmm_id =$1 or ssfr.ssfr_to_sfmm_id =$1)
      and ssfr.ssfr_ssc_id  in (21,22)
      )x
      order by Random()
      limit 1;
    `;
    const result = await PgSocialClient.query(query, [particularUserId]);
    const friendId = result.rows[0]?.friendid;
    return friendId;
  }

  async getFriendIdOfReceivedRequestToParticularUser(particularUserId:string) {
    const query = `
    select ssfr.ssfr_id, ssfr.ssfr_from_sfmm_id , ssfr.ssfr_to_sfmm_id, ssc.ssc_code   
    from satsang_social.satsang_social_friend_requests ssfr 
    inner join satsang_social.satsang_status_catalogue ssc 
    on ssfr.ssfr_ssc_id =ssc.ssc_id 
    where ssc.ssc_code = 'Pending'
    and ssfr.ssfr_to_sfmm_id = $1
    order by Random()
    limit 1;
    `;
    const result = await PgSocialClient.query(query, [particularUserId]);
    const frienRequestId = result.rows[0]?.ssfr_id;
    const friendId = result.rows[0]?.ssfr_from_sfmm_id;
    return {
      friendRequestId: frienRequestId,
      friendId: friendId
    }
  }

  async getValidFriendsOfFriendId(particularUserId:string){
    const query = `
            with myFriends as(
                select distinct 
                case when ssf.ssf_sfmm1_id = $1 then ssf.ssf_sfmm2_id
                when ssf.ssf_sfmm2_id = $1 then ssf.ssf_sfmm1_id
                end as friendId
                from satsang_social.satsang_social_friends ssf 
                where ssf.ssf_sfmm1_id = $1
                or ssf.ssf_sfmm2_id = $1
                ),
            friends_of_friends as (
                select distinct x.fof_id 
                from(
                    select 
                    case when ssf.ssf_sfmm1_id = mf.friendId then ssf.ssf_sfmm2_id else ssf.ssf_sfmm1_id end as fof_id
                    from satsang_social.satsang_social_friends ssf 
                    join myFriends mf
                    on (ssf.ssf_sfmm1_id = mf.friendId or ssf.ssf_sfmm2_id = mf.friendId) and ssf.ssf_ssc_id =25
                )x
                where fof_id not in 
                (select * from myFriends) and fof_id != $1
                )
                
            select fof_id from friends_of_friends fof
            order by random()
            limit 1
    `
    const result = await PgSocialClient.query(query, [particularUserId]);
    return {
      friendId: result.rows[0]?.fof_id
    }
  }



}