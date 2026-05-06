import { PgSocialClient } from "../client/pg.social.client";

export class ProfileRepo {
    
    async getMyPresentProfileMediaId(userId:string){
        const query = `
        select ssup.ssup_username as username, ssup.ssup_active_profile_smm_id as profileMediaId, ssup.ssup_active_profile_url qs profileUrl
        from satsang_social.satsang_social_user_profiles ssup 
        where ssup.ssup_sfmm_id = $1
        `
        const result = await PgSocialClient.query(query,[userId])
        return{
            username: result.rows[0].username,
            profileMediaId: result.rows[0].profileMediaId,
            profileUrl: result.rows[0].profileUrl
        }
    }

    async getMyExistingRandomProfileMediaId(userId:string){
        const query = `
        select x.smm_id as mediaId  from (
        select smm.smm_id, row_number() over(order by smm.smm_created_at desc) as orderRank from satsang_social.satsang_media_metadata smm 
        where smm.smm_sfmm_id = $1 and smm.smm_object_path like '%profiles%'
        and smm.smm_ssc_id =14
        )x where orderRank>1 
        order by Random()
        limit 1
        `
        const result = await PgSocialClient.query(query,[userId])
        return{
            mediaId: result.rows[0].mediaId
        }
    }

    async getMyRandomFriendsPresentProfileMediaId(userId:string){
        const query = `
            with acceptedFriends as (
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
            ),
            friend_with_active_profile as(
                select af.friendid, ssup.ssup_active_profile_smm_id as friendProfileMediaId from acceptedFriends af
                inner join satsang_social.satsang_social_user_profiles ssup 
                on ssup.ssup_sfmm_id = af.friendid and ssup.ssup_active_profile_smm_id is not null
            )
            select friendid,friendProfileMediaId from friend_with_active_profile
            order by random()
            limit 1
        `
        const result = await PgSocialClient.query(query,[userId])
        return{
            friendId: result.rows[0]?.friendid,
            mediaId: result.rows[0]?.friendProfileMediaId
        }
    }

    async getMyRandomFriendsExistingProfileMediaId(userId:string){
        const query = `
            with acceptedFriends as (
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
            ),
            friend_with_existing_profile as(
          		select ssup.ssup_sfmm_id as userId, ssup.ssup_username as username, smm.smm_id as mediaId, smm.smm_object_path as mediaUrl, 
          		rank() over(partition by ssup.ssup_username order by smm.smm_created_at  desc) as orderRank from satsang_social.satsang_media_metadata smm 
          		inner join acceptedFriends sf on smm.smm_sfmm_id=sf.friendid and smm.smm_object_path like '%profiles%' and smm.smm_ssc_id = 14
          		inner join satsang_social.satsang_social_user_profiles ssup on ssup.ssup_sfmm_id =sf.friendid  	
            )
            select userId, username, mediaId, mediaUrl from friend_with_existing_profile where orderRank>1
            order by random()
            limit 1
        `
        const result = await PgSocialClient.query(query,[userId])
        return{
            friendId: result.rows[0]?.userId,
            mediaId: result.rows[0]?.mediaId
        }
    }

    async getMyRandomFriendsExistingNonUploadedProfileMediaId(userId:string){
        const query = `
            with acceptedFriends as (
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
            ),
            friend_with_existing_profile as(
          		select ssup.ssup_sfmm_id as userId, ssup.ssup_username as username, smm.smm_id as mediaId, smm.smm_object_path as mediaUrl, 
          		rank() over(partition by ssup.ssup_username order by smm.smm_created_at  desc) as orderRank from satsang_social.satsang_media_metadata smm 
          		inner join acceptedFriends sf on smm.smm_sfmm_id=sf.friendid and smm.smm_object_path like '%profiles%' and smm.smm_ssc_id = 13
          		inner join satsang_social.satsang_social_user_profiles ssup on ssup.ssup_sfmm_id =sf.friendid  	
            )
            select userId, username, mediaId, mediaUrl from friend_with_existing_profile
            order by random()
            limit 1
        `
        const result = await PgSocialClient.query(query,[userId])
        return{
            friendId: result.rows[0]?.userId,
            mediaId: result.rows[0]?.mediaId
        }
    }

    async getMyRandomFriendOfFriendsPresentProfileMediaId(userId:string){
        const query=`
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
        select fof_id as userId, ssup.ssup_active_profile_smm_id as profileMediaId, ssup.ssup_active_profile_url as profileUrl 
        from friends_of_friends fof
        inner join satsang_social.satsang_social_user_profiles ssup 
        on fof.fof_id =ssup.ssup_sfmm_id
        where ssup.ssup_active_profile_smm_id is not null 
        order by Random()
        limit 1
        `
        const result = await PgSocialClient.query(query,[userId])
        return{
            friendId: result.rows[0]?.userId,
            mediaId: result.rows[0]?.profileMediaId
        }
    }

    async getMyRandomFriendOfFriendsExistingProfileMediaId(userId:string){
        const query =`
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
            ),
        existing_mediaId as (
            select fof_id as userId, smm.smm_id as mediaId, smm.smm_object_path as mediaUrl,
            rank() over(partition by fof.fof_id order by smm.smm_created_at desc) as rankOrder
            from friends_of_friends fof
            inner join satsang_social.satsang_media_metadata smm 
            on fof.fof_id = smm.smm_sfmm_id and smm.smm_object_path like '%profiles%' and smm.smm_ssc_id = 14
            )
        select userId, mediaId, mediaUrl from existing_mediaId where rankOrder>1
        order by Random()
        limit 1
        `
        const result = await PgSocialClient.query(query,[userId])
        return{
            friendId: result.rows[0]?.userId,
            mediaId: result.rows[0]?.mediaId
        }
    }

    async getMyNonFriendsPresentProfileMediaId(userId:string){
        const query = `
        with nonSocialFriends as (
            select ssup.ssup_sfmm_id as userId from 
            satsang_social.satsang_social_user_profiles ssup
            left join 
            satsang_social.satsang_social_friend_requests ssfr 
            on (ssup.ssup_sfmm_id = ssfr.ssfr_from_sfmm_id 
            or ssup.ssup_sfmm_id = ssfr.ssfr_to_sfmm_id)
            where ssfr.ssfr_id is null
            and ssup.ssup_sfmm_id != $1
        ),
        present_mediaId as (
            select ssup.ssup_sfmm_id as userId, ssup.ssup_username as username, ssup.ssup_active_profile_smm_id as mediaId, ssup.ssup_active_profile_url as mediaUrl from nonSocialFriends nsf
            inner join satsang_social.satsang_social_user_profiles ssup 
            on nsf.userId = ssup.ssup_sfmm_id and ssup.ssup_active_profile_smm_id is not null
        )
        select userId, username, mediaId, mediaUrl from present_mediaId pm
        order by random()
        limit 1
        `;
        const result = await PgSocialClient.query(query,[userId])
        return{
            friendId: result.rows[0]?.userId,
            mediaId: result.rows[0]?.mediaId
        }
    }

    async getMyNonFriendsExistingProfileMediaId(userId:string){
        const query = `
        with nonSocialFriends as (
            select ssup.ssup_sfmm_id as userId from 
            satsang_social.satsang_social_user_profiles ssup
            left join 
            satsang_social.satsang_social_friend_requests ssfr 
            on (ssup.ssup_sfmm_id = ssfr.ssfr_from_sfmm_id 
            or ssup.ssup_sfmm_id = ssfr.ssfr_to_sfmm_id)
            where ssfr.ssfr_id is null
            and ssup.ssup_sfmm_id != $1
        ),
        existing_mediaId as (
                select userId, smm.smm_id as mediaId, smm.smm_object_path as mediaUrl,
                rank() over(partition by fof.userid  order by smm.smm_created_at desc) as rankOrder
                from nonSocialFriends fof
                inner join satsang_social.satsang_media_metadata smm 
                on fof.userid = smm.smm_sfmm_id and smm.smm_object_path like '%profiles%' and smm.smm_ssc_id = 14
                )
        select userId, mediaId, mediaUrl from existing_mediaId where rankOrder>1
        order by random()
        limit 1
        `;
        const result = await PgSocialClient.query(query,[userId])
        return{
            friendId: result.rows[0]?.userId,
            mediaId: result.rows[0]?.mediaId
        }
    }
}