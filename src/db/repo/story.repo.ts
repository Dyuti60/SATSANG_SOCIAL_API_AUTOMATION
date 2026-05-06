import { PgSocialClient } from "../client/pg.social.client";

export class StoryRepo {
    
    async getMyPresentStoryMediaId(userId:string){
        const query = `
            select sss.sss_id as storyId, sss.sss_smm_id as storyMediaId from satsang_social.satsang_social_stories sss
            inner join satsang_social.satsang_media_metadata smm on sss.sss_smm_id =smm.smm_id 
            where sss.sss_created_by = $1 and smm.smm_object_path like '%stories%'
            and sss.sss_expires_at > NOW() and sss.sss_ssc_id=1
            order by Random()
            limit 1
        `
        const result = await PgSocialClient.query(query,[userId])
        return {
            storyId: result.rows[0]?.storyId,
            storyMediaId: result.rows[0]?.storyMediaId
        }
    }

    async getMyPresentDeletedStoryMediaId(userId:string){
        const query = `
            select sss.sss_id as storyId, sss.sss_smm_id as storyMediaId from satsang_social.satsang_social_stories sss
            inner join satsang_social.satsang_media_metadata smm on sss.sss_smm_id =smm.smm_id 
            where sss.sss_created_by = $1 and smm.smm_object_path like '%stories%'
            and sss.sss_expires_at > NOW() and sss.sss_ssc_id=2
            order by Random()
            limit 1
        `
        const result = await PgSocialClient.query(query,[userId])
        return {
            storyId: result.rows[0]?.storyId,
            storyMediaId: result.rows[0]?.storyMediaId
        }
    }

    async getMyExpiredStoryMediaId(userId:string){
        const query = `
            select sss.sss_id as storyId, sss.sss_smm_id as storyMediaId from satsang_social.satsang_social_stories sss
            inner join satsang_social.satsang_media_metadata smm on sss.sss_smm_id =smm.smm_id 
            where sss.sss_created_by = $1 and sss.sss_ssc_id = 1 and smm.smm_object_path like '%stories%'
            and sss.sss_expires_at < NOW()
            order by Random()
            limit 1
        `
        const result = await PgSocialClient.query(query,[userId])
        return {
            storyId: result.rows[0]?.storyId,
            storyMediaId: result.rows[0]?.storyMediaId
        }
    }

    async getMyExpiredDeletedStoryMediaId(userId:string){
        const query = `
            select sss.sss_id as storyId, sss.sss_smm_id as storyMediaId from satsang_social.satsang_social_stories sss
            inner join satsang_social.satsang_media_metadata smm on sss.sss_smm_id =smm.smm_id 
            where sss.sss_created_by = $1 and sss.sss_ssc_id = 2 and smm.smm_object_path like '%stories%'
            and sss.sss_expires_at < NOW()
            order by Random()
            limit 1
        `
        const result = await PgSocialClient.query(query,[userId])
        return {
            storyId: result.rows[0]?.storyId,
            storyMediaId: result.rows[0]?.storyMediaId
        }
    }

    async myMinioLoadedOnlyStoryMediaId(userId:string){
        const query = `
            select smm.smm_id as mediaId, smm.smm_object_path as storyUrl
            from satsang_social.satsang_media_metadata smm 
            left join satsang_social_stories sss on smm.smm_id =sss.sss_smm_id  
            where smm.smm_ssc_id =14 and smm.smm_object_path like '%stories%'
            and sss.sss_id is null and smm.smm_sfmm_id = $1
            order by Random()
            limit 1
        `
        const result = await PgSocialClient.query(query,[userId])
        return {
            storyUrl: result.rows[0]?.storyUrl,
            storyMediaId: result.rows[0]?.mediaId
        }
    }

    async myFriendsPresentStoryMediaId(userId:string){
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
            )
            select af.friendid, sss.sss_smm_id as mediaId, sss.sss_id as storyId
            from acceptedFriends af inner join satsang_social.satsang_social_stories sss 
            on af.friendid =sss.sss_created_by and sss.sss_expires_at > NOW() and sss.sss_ssc_id=1
            inner join satsang_social.satsang_media_metadata smm on sss.sss_smm_id =smm.smm_id and smm.smm_object_path like '%stories%'
            order by Random()
            limit 1
        `
        const result = await PgSocialClient.query(query,[userId])
        return {
            friendId: result.rows[0]?.friendid,
            storyId: result.rows[0]?.storyId,
            storyMediaId: result.rows[0]?.mediaId
        }
    }

    async myFriendsPresentDeletedStoryMediaId(userId:string){
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
            )
            select af.friendid, sss.sss_smm_id as mediaId, sss.sss_id as storyId
            from acceptedFriends af inner join satsang_social.satsang_social_stories sss 
            on af.friendid =sss.sss_created_by and sss.sss_expires_at > NOW() and sss.sss_ssc_id=2
            inner join satsang_social.satsang_media_metadata smm on sss.sss_smm_id =smm.smm_id and smm.smm_object_path like '%stories%'
            order by Random()
            limit 1
        `
        const result = await PgSocialClient.query(query,[userId])
        return {
            friendId: result.rows[0]?.friendid,
            storyId: result.rows[0]?.storyId,
            storyMediaId: result.rows[0]?.mediaId
        }
    }

    async myFriendsExpiredStoryMediaId(userId:string){
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
            )
            select af.friendid, sss.sss_smm_id as mediaId, sss.sss_id as storyId
            from acceptedFriends af inner join satsang_social.satsang_social_stories sss 
            on af.friendid =sss.sss_created_by and sss.sss_expires_at < NOW() and sss.sss_ssc_id=1
            inner join satsang_social.satsang_media_metadata smm on sss.sss_smm_id =smm.smm_id and smm.smm_object_path like '%stories%'
            order by Random()
            limit 1
        `
        const result = await PgSocialClient.query(query,[userId])
        return {
            friendId: result.rows[0]?.friendid,
            storyId: result.rows[0]?.storyId,
            storyMediaId: result.rows[0]?.mediaId
        }

    }

    async myFriendsMinioLoadedOnlyStoryMediaId(userId:String){
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
            )
            select smm.smm_sfmm_id as userId, smm.smm_id as mediaId, smm.smm_object_path as storyUrl 
            from acceptedFriends af 
            inner join satsang_social.satsang_media_metadata smm 
            on af.friendid =smm.smm_sfmm_id 
            left join satsang_social_stories sss 
            on smm.smm_id =sss.sss_smm_id  
            where smm.smm_ssc_id =14 and smm.smm_object_path like '%stories%'
            and sss.sss_id is null 
            order by Random()
            limit 1
        `
        const result = await PgSocialClient.query(query,[userId])
        return {
            friendId: result.rows[0]?.userId,
            storyMediaId: result.rows[0]?.mediaId
        }
    }

    async myFriendOfFriendPresentStoryMediaId(userId:string){
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
                )
            select fof.fof_id as friendid, sss.sss_smm_id as mediaId, sss.sss_id as storyId, sss.sss_expires_at
            from friends_of_friends fof inner join satsang_social.satsang_social_stories sss 
            on fof.fof_id =sss.sss_created_by and sss.sss_expires_at > NOW() and sss.sss_ssc_id=1
            inner join satsang_social.satsang_media_metadata smm on sss.sss_smm_id =smm.smm_id and smm.smm_object_path like '%stories%'
            order by Random()
            limit 1
        `
        const result = await PgSocialClient.query(query,[userId])
        return {
            friendId: result.rows[0]?.friendid,
            storyId: result.rows[0]?.storyId,
            storyMediaId: result.rows[0]?.mediaId
        }
    }

    async myFriendsOfFriendExpiredStoryMediaId(userId:string){
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
            select fof.fof_id as friendid, sss.sss_smm_id as mediaId, sss.sss_id as storyId, sss.sss_expires_at
            from friends_of_friends fof inner join satsang_social.satsang_social_stories sss 
            on fof.fof_id =sss.sss_created_by and sss.sss_expires_at < NOW() and sss.sss_ssc_id=1
            inner join satsang_social.satsang_media_metadata smm on sss.sss_smm_id =smm.smm_id and smm.smm_object_path like '%stories%'
            order by Random()
            limit 1
        `
        const result = await PgSocialClient.query(query,[userId])
        return {
            friendId: result.rows[0]?.friendid,
            storyId: result.rows[0]?.storyId,
            storyMediaId: result.rows[0]?.mediaId
        }
    }

    async myFriendsOfFriendMinioLoadedOnlyStoryMediaId(userId:string){
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
            select smm.smm_sfmm_id as userId, smm.smm_id as mediaId, smm.smm_object_path as storyUrl 
            from friends_of_friends fof 
            inner join satsang_social.satsang_media_metadata smm 
            on fof.fof_id =smm.smm_sfmm_id 
            left join satsang_social_stories sss 
            on smm.smm_id =sss.sss_smm_id  
            where smm.smm_ssc_id =14 and smm.smm_object_path like '%stories%'
            and sss.sss_id is null 
            order by Random()
            limit 1
        `
        const result = await PgSocialClient.query(query,[userId])
        return {
            friendId: result.rows[0]?.userId,
            storyMediaId: result.rows[0]?.mediaId
        }
    }

    async nonFriendsPresentStoryId(userId:string){
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
            )
            select nsf.userId, sss.sss_smm_id as mediaId, sss.sss_id as storyId
            from nonSocialFriends nsf inner join satsang_social.satsang_social_stories sss 
            on nsf.userid =sss.sss_created_by and sss.sss_expires_at > NOW() and sss.sss_ssc_id=1
            inner join satsang_social.satsang_media_metadata smm on sss.sss_smm_id =smm.smm_id and smm.smm_object_path like '%stories%'
            order by Random()
            limit 1
        `
        const result = await PgSocialClient.query(query,[userId])
        return {
            friendId: result.rows[0]?.userId,
            storyId: result.rows[0]?.storyId,
            storyMediaId: result.rows[0]?.mediaId
        }
    }

    async nonFriendsPresentDeletedStoryId(userId:string){
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
            )
            select nsf.userId, sss.sss_smm_id as mediaId, sss.sss_id as storyId
            from nonSocialFriends nsf inner join satsang_social.satsang_social_stories sss 
            on nsf.userid =sss.sss_created_by and sss.sss_expires_at > NOW() and sss.sss_ssc_id=2
            inner join satsang_social.satsang_media_metadata smm on sss.sss_smm_id =smm.smm_id and smm.smm_object_path like '%stories%'
            order by Random()
            limit 1
        `
        const result = await PgSocialClient.query(query,[userId])
        return {
            friendId: result.rows[0]?.userId,
            storyId: result.rows[0]?.storyId,
            storyMediaId: result.rows[0]?.mediaId
        }
    }

    async nonFriendsExpiredStoryId(userId:string){
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
            )
            select nsf.userId, sss.sss_smm_id as mediaId, sss.sss_id as storyId
            from nonSocialFriends nsf inner join satsang_social.satsang_social_stories sss 
            on nsf.userid =sss.sss_created_by and sss.sss_expires_at < NOW() and sss.sss_ssc_id=1
            inner join satsang_social.satsang_media_metadata smm on sss.sss_smm_id =smm.smm_id and smm.smm_object_path like '%stories%'
            order by Random()
            limit 1
        `
        const result = await PgSocialClient.query(query,[userId])
        return {
            friendId: result.rows[0]?.userId,
            storyId: result.rows[0]?.storyId,
            storyMediaId: result.rows[0]?.mediaId
        }
    }

    async nonFriendsMinioLoadedStoryMediaId(userId:string){
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
            )
            select smm.smm_sfmm_id as userId, smm.smm_id as mediaId, smm.smm_object_path as storyUrl 
            from nonSocialFriends nsf 
            inner join satsang_social.satsang_media_metadata smm 
            on nsf.userid =smm.smm_sfmm_id 
            left join satsang_social_stories sss 
            on smm.smm_id =sss.sss_smm_id  
            where smm.smm_ssc_id =14 and smm.smm_object_path like '%stories%'
            and sss.sss_id is null 
            order by Random()
            limit 1
        `
        const result = await PgSocialClient.query(query,[userId])
        return {
            friendId: result.rows[0]?.userId,
            storyMediaId: result.rows[0]?.mediaId
        }
    }


}