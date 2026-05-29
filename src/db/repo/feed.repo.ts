import { PgSocialClient } from "../client/pg.social.client";
import { CassandraQuery, toUUID, dedupeByKeys } from '../client/cassandra.client';
import { TestContext } from "../../../src/context/test.context";

export class FeedRepo {
    async getMyRandomPublicPost(userId:string){
        const query = `
            select ssp.ssp_id as postId, ssp.ssp_sfmm_id as userId, ssp.ssp_caption as caption, spmm.spmm_smm_id as postMediaId from satsang_social.satsang_social_posts ssp
            inner join satsang_social.satsang_post_media_map spmm on ssp.ssp_id = spmm.spmm_ssp_id 
            and spmm.spmm_post_category_ssc_id =300 and spmm.spmm_is_attached_ssc_id =350
            and ssp.ssp_ssc_id=204 and ssp.ssp_sfmm_id = $1 
        `
        const result = await PgSocialClient.query(query,[userId])
        return {
            postId: result.rows[0]?.postid,
            userId: result.rows[0]?.userid,
            caption: result.rows[0]?.caption,
            postMediaId: result.rows[0]?.postmediaid
        }
    }
    async getMyRandomHiddenPost(userId:string){
        const query = `
            select ssp.ssp_id as postId, ssp.ssp_sfmm_id as userId, ssp.ssp_caption as caption, spmm.spmm_smm_id as postMediaId from satsang_social.satsang_social_posts ssp
            inner join satsang_social.satsang_post_media_map spmm on ssp.ssp_id = spmm.spmm_ssp_id 
            and spmm.spmm_post_category_ssc_id =300 and spmm.spmm_is_attached_ssc_id =350
            and ssp.ssp_ssc_id=201 and ssp.ssp_sfmm_id = $1 
        `
        const result = await PgSocialClient.query(query,[userId])
        return {
            postId: result.rows[0]?.postid,
            userId: result.rows[0]?.userid,
            caption: result.rows[0]?.caption,
            postMediaId: result.rows[0]?.postmediaid
        }
    }
    async getMyRandomDeletedPost(userId:string){
        const query = `
            select ssp.ssp_id as postId, ssp.ssp_sfmm_id as userId, ssp.ssp_caption as caption, spmm.spmm_smm_id as postMediaId from satsang_social.satsang_social_posts ssp
            inner join satsang_social.satsang_post_media_map spmm on ssp.ssp_id = spmm.spmm_ssp_id 
            and spmm.spmm_post_category_ssc_id =300 and spmm.spmm_is_attached_ssc_id =350
            and ssp.ssp_ssc_id=200 and ssp.ssp_sfmm_id = $1 
        `
        const result = await PgSocialClient.query(query,[userId])
        return {
            postId: result.rows[0]?.postid,
            userId: result.rows[0]?.userid,
            caption: result.rows[0]?.caption,
            postMediaId: result.rows[0]?.postmediaid
        }
    }
    async getMyRandomPostWithFriendsVisibility(userId:string){
        const query = `
            select ssp.ssp_id as postId, ssp.ssp_sfmm_id as userId, ssp.ssp_caption as caption, spmm.spmm_smm_id as postMediaId from satsang_social.satsang_social_posts ssp
            inner join satsang_social.satsang_post_media_map spmm on ssp.ssp_id = spmm.spmm_ssp_id 
            and spmm.spmm_post_category_ssc_id =300 and spmm.spmm_is_attached_ssc_id =350
            and ssp.ssp_ssc_id=202 and ssp.ssp_sfmm_id = $1 
        `
        const result = await PgSocialClient.query(query,[userId])
        return {
            postId: result.rows[0]?.postid,
            userId: result.rows[0]?.userid,
            caption: result.rows[0]?.caption,
            postMediaId: result.rows[0]?.postmediaid
        }
    }
    async getMyRandomPostWithFriendsOfFriendVisibility(userId:string){
        const query = `
            select ssp.ssp_id as postId, ssp.ssp_sfmm_id as userId, ssp.ssp_caption as caption, spmm.spmm_smm_id as postMediaId from satsang_social.satsang_social_posts ssp
            inner join satsang_social.satsang_post_media_map spmm on ssp.ssp_id = spmm.spmm_ssp_id 
            and spmm.spmm_post_category_ssc_id =300 and spmm.spmm_is_attached_ssc_id =350
            and ssp.ssp_ssc_id=203 and ssp.ssp_sfmm_id = $1 
        `
        const result = await PgSocialClient.query(query,[userId])
        return {
            postId: result.rows[0]?.postid,
            userId: result.rows[0]?.userid,
            caption: result.rows[0]?.caption,
            postMediaId: result.rows[0]?.postmediaid
        }
    }

    async getMyRandomMinioPostMedia(userId:string){
        const query = `
            select smm.smm_id as mediaId, smm.smm_object_path as postUrl from satsang_social.satsang_media_metadata smm 
            left join satsang_social.satsang_post_media_map spmm on smm.smm_id =spmm.spmm_smm_id 
            where smm.smm_ssc_id =14 and smm.smm_object_path like '%posts%'
            and spmm.spmm_id  is null and smm.smm_sfmm_id = $1
            order by Random()
            limit 1 
        `
        const result = await PgSocialClient.query(query,[userId])
        return {
            postMediaId: result.rows[0]?.mediaid,
            postUrl: result.rows[0]?.posturl
        }
    }

    async getMyRandomMinioChatMedia(userId:string){
        const query = `
            select smm.smm_id as mediaId, smm.smm_object_path as chatUrl from satsang_social.satsang_media_metadata smm 
            left join satsang_social.satsang_post_media_map spmm on smm.smm_id =spmm.spmm_smm_id 
            where smm.smm_ssc_id =14 and smm.smm_object_path like '%chats%'
            and spmm.spmm_id  is null and smm.smm_sfmm_id = $1
            order by Random()
            limit 1 
        `
        const result = await PgSocialClient.query(query,[userId])
        return {
            chatMediaId: result.rows[0]?.mediaid,
            chatUrl: result.rows[0]?.chaturl
        }
    }
    async getMyRandomChatMedia(userId:string){
        const uuid = toUUID(userId);
        const query1 =`
            select
            smbc_conversation_id, smbc_message_id,
            smbc_media_smm_id, smbc_message_text,
            smbc_receiver_sfmm_id, smbc_sender_sfmm_id
            from satsang_chat.satsang_messages_by_conversation
            where smbc_sender_sfmm_id = $1
            allow filtering
        `
        const query2 =`
            select
            smbc_conversation_id, smbc_message_id,
            smbc_media_smm_id, smbc_message_text,
            smbc_receiver_sfmm_id, smbc_sender_sfmm_id
            from satsang_chat.satsang_messages_by_conversation
            where smbc_receiver_sfmm_id = $1
            allow filtering
        `
        const res1 = await CassandraQuery(query1, [uuid], 'chat')
        const res2 = await CassandraQuery(query2, [uuid], 'chat')

        const combinedRows = [...res1.rows, ...res2.rows]

        if (!combinedRows.length) return null;

        // 🔹 Deduplicate using 3 columns
        const uniqueRows = dedupeByKeys(combinedRows, [
            'smbc_conversation_id',
            'smbc_bucket',
            'smbc_message_id'
        ]);

        // 🔹 Filter rows where media exists
        const validRows = uniqueRows.filter(
            (r: any) => r.smbc_media_smm_id
        );

        if (!validRows.length) return null;

        // 🔹 Pick random row
        const randomIndex = Math.floor(Math.random() * validRows.length);
        const row = validRows[randomIndex];

        return{
            mediaId: row.smbc_media_smm_id
        }
    }

    async getMyRandomStoryMedia(userId:string){
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
            storyId: result.rows[0]?.storyid,
            storyMediaId: result.rows[0]?.storymediaid
        }
    }

    async getMyRandomMinioStoryMedia(userId:string){
        const query = `
            select smm.smm_id as mediaId, smm.smm_object_path as storyUrl from satsang_social.satsang_media_metadata smm 
            left join satsang_social.satsang_post_media_map spmm on smm.smm_id =spmm.spmm_smm_id 
            where smm.smm_ssc_id =14 and smm.smm_object_path like '%stories%'
            and spmm.spmm_id  is null and smm.smm_sfmm_id = $1
            order by Random()
            limit 1 
        `
        const result = await PgSocialClient.query(query,[userId])
        return {
            storyMediaId: result.rows[0]?.mediaid,
            storyUrl: result.rows[0]?.storyurl
        }
    }

    async getMyRandomProfileMediaId(userId:string){
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
            mediaId: result.rows[0].mediaid
        }
    }

    async getMyRandomMinioProfileMedia(userId:string){
        const query = `
            select smm.smm_id as mediaId, smm.smm_object_path as profileUrl from satsang_social.satsang_media_metadata smm 
            left join satsang_social.satsang_post_media_map spmm on smm.smm_id =spmm.spmm_smm_id 
            where smm.smm_ssc_id =14 and smm.smm_object_path like '%profiles%'
            and spmm.spmm_id  is null and smm.smm_sfmm_id = $1
            order by Random()
            limit 1 
        `
        const result = await PgSocialClient.query(query,[userId])
        return {
            profileMediaId: result.rows[0]?.mediaid,
            profileUrl: result.rows[0]?.profileurl
        }
    }

    async getMyFriendsRandomPost(userId:string){
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
            select ssp.ssp_id as postId, ssp.ssp_sfmm_id as userId, 
            ssp.ssp_caption as caption, spmm.spmm_smm_id as postMediaId 
            from satsang_social.satsang_social_posts ssp
            inner join satsang_social.satsang_post_media_map spmm on ssp.ssp_id = spmm.spmm_ssp_id 
            and spmm.spmm_post_category_ssc_id =300 and spmm.spmm_is_attached_ssc_id =350
            and spmm.spmm_smm_id is not null
            inner join acceptedFriends af on af.friendid = ssp.ssp_sfmm_id
            order by Random()
            limit 1
        `
        const result = await PgSocialClient.query(query,[userId])
        return {
            postId: result.rows[0]?.postid,
            userId: result.rows[0]?.userid,
            caption: result.rows[0]?.caption,
            postMediaId: result.rows[0]?.postmediaid
        }
    }

    async getMyFriendsRandomPublicPost(userId:string){
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
            select ssp.ssp_id as postId, ssp.ssp_sfmm_id as userId, 
            ssp.ssp_caption as caption, spmm.spmm_smm_id as postMediaId 
            from satsang_social.satsang_social_posts ssp
            inner join satsang_social.satsang_post_media_map spmm on ssp.ssp_id = spmm.spmm_ssp_id 
            and spmm.spmm_post_category_ssc_id =300 and spmm.spmm_is_attached_ssc_id =350
            and spmm.spmm_smm_id is not null and ssp.ssp_ssc_id=204
            inner join acceptedFriends af on af.friendid = ssp.ssp_sfmm_id
            order by Random()
            limit 1
        `
        const result = await PgSocialClient.query(query,[userId])
        return {
            postId: result.rows[0]?.postid,
            userId: result.rows[0]?.userid,
            caption: result.rows[0]?.caption,
            postMediaId: result.rows[0]?.postmediaid
        }
    }

    async getMyFriendsRandomHiddenPost(userId:string){
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
            select ssp.ssp_id as postId, ssp.ssp_sfmm_id as userId, 
            ssp.ssp_caption as caption, spmm.spmm_smm_id as postMediaId 
            from satsang_social.satsang_social_posts ssp
            inner join satsang_social.satsang_post_media_map spmm on ssp.ssp_id = spmm.spmm_ssp_id 
            and spmm.spmm_post_category_ssc_id =300 and spmm.spmm_is_attached_ssc_id =350
            and spmm.spmm_smm_id is not null and ssp.ssp_ssc_id=201
            inner join acceptedFriends af on af.friendid = ssp.ssp_sfmm_id
            order by Random()
            limit 1
        `
        const result = await PgSocialClient.query(query,[userId])
        return {
            postId: result.rows[0]?.postid,
            userId: result.rows[0]?.userid,
            caption: result.rows[0]?.caption,
            postMediaId: result.rows[0]?.postmediaid
        }
    }

    async getMyFriendsRandomDeletedPost(userId:string){
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
            select ssp.ssp_id as postId, ssp.ssp_sfmm_id as userId, 
            ssp.ssp_caption as caption, spmm.spmm_smm_id as postMediaId 
            from satsang_social.satsang_social_posts ssp
            inner join satsang_social.satsang_post_media_map spmm on ssp.ssp_id = spmm.spmm_ssp_id 
            and spmm.spmm_post_category_ssc_id =300 and spmm.spmm_is_attached_ssc_id =350
            and spmm.spmm_smm_id is not null and ssp.ssp_ssc_id=200
            inner join acceptedFriends af on af.friendid = ssp.ssp_sfmm_id
            order by Random()
            limit 1
        `
        const result = await PgSocialClient.query(query,[userId])
        return {
            postId: result.rows[0]?.postid,
            userId: result.rows[0]?.userid,
            caption: result.rows[0]?.caption,
            postMediaId: result.rows[0]?.postmediaid
        }
    }

    async getMyFriendsRandomPostWithFriendsVisibility(userId:string){
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
            select ssp.ssp_id as postId, ssp.ssp_sfmm_id as userId, 
            ssp.ssp_caption as caption, spmm.spmm_smm_id as postMediaId 
            from satsang_social.satsang_social_posts ssp
            inner join satsang_social.satsang_post_media_map spmm on ssp.ssp_id = spmm.spmm_ssp_id 
            and spmm.spmm_post_category_ssc_id =300 and spmm.spmm_is_attached_ssc_id =350
            and spmm.spmm_smm_id is not null and ssp.ssp_ssc_id=202
            inner join acceptedFriends af on af.friendid = ssp.ssp_sfmm_id
            order by Random()
            limit 1
        `
        const result = await PgSocialClient.query(query,[userId])
        return {
            postId: result.rows[0]?.postid,
            userId: result.rows[0]?.userid,
            caption: result.rows[0]?.caption,
            postMediaId: result.rows[0]?.postmediaid
        }
    }


    async getMyFriendsRandomPostWithFriendsOfFriendsVisibility(userId:string){
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
            select ssp.ssp_id as postId, ssp.ssp_sfmm_id as userId, 
            ssp.ssp_caption as caption, spmm.spmm_smm_id as postMediaId 
            from satsang_social.satsang_social_posts ssp
            inner join satsang_social.satsang_post_media_map spmm on ssp.ssp_id = spmm.spmm_ssp_id 
            and spmm.spmm_post_category_ssc_id =300 and spmm.spmm_is_attached_ssc_id =350
            and spmm.spmm_smm_id is not null and ssp.ssp_ssc_id=203
            inner join acceptedFriends af on af.friendid = ssp.ssp_sfmm_id
            order by Random()
            limit 1
        `
        const result = await PgSocialClient.query(query,[userId])
        return {
            postId: result.rows[0]?.postid,
            userId: result.rows[0]?.userid,
            caption: result.rows[0]?.caption,
            postMediaId: result.rows[0]?.postmediaid
        }
    }

    async getMyFriendsMinioLoadedPostMedia(userId:string){
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
            select smm.smm_id as mediaId, smm.smm_object_path as postUrl from satsang_social.satsang_media_metadata smm 
            left join satsang_social.satsang_post_media_map spmm on smm.smm_id =spmm.spmm_smm_id 
            left join satsang_social.satsang_social_posts ssp on ssp.ssp_id = spmm.spmm_ssp_id 
            left join acceptedFriends af on af.friendid = ssp.ssp_sfmm_id 
            where smm.smm_ssc_id =14 and smm.smm_object_path like '%posts%'
            and ssp.ssp_id  is null
            order by Random()
            limit 1 
        `
        const result = await PgSocialClient.query(query,[userId])
        return {
            postMediaId: result.rows[0]?.postmediaid,
            postUrl: result.rows[0]?.posturl
        }
    }

    async getMyFriendsOfFriendsRandomPublicPost(userId:string){
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
            select ssp.ssp_id as postId, ssp.ssp_sfmm_id as userId, 
            ssp.ssp_caption as caption, spmm.spmm_smm_id as postMediaId 
            from satsang_social.satsang_social_posts ssp
            inner join satsang_social.satsang_post_media_map spmm on ssp.ssp_id = spmm.spmm_ssp_id 
            and spmm.spmm_post_category_ssc_id =300 and spmm.spmm_is_attached_ssc_id =350
            and spmm.spmm_smm_id is not null and ssp.ssp_ssc_id=204
            inner join friends_of_friends af on af.fof_id = ssp.ssp_sfmm_id
            order by Random()
            limit 1
        `
        const result = await PgSocialClient.query(query,[userId])
        return {
            postId: result.rows[0]?.postid,
            userId: result.rows[0]?.userid,
            caption: result.rows[0]?.caption,
            postMediaId: result.rows[0]?.postmediaid
        }
    }

    async getMyFriendsOfFriendsRandomHiddenPost(userId:string){
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
            select ssp.ssp_id as postId, ssp.ssp_sfmm_id as userId, 
            ssp.ssp_caption as caption, spmm.spmm_smm_id as postMediaId 
            from satsang_social.satsang_social_posts ssp
            inner join satsang_social.satsang_post_media_map spmm on ssp.ssp_id = spmm.spmm_ssp_id 
            and spmm.spmm_post_category_ssc_id =300 and spmm.spmm_is_attached_ssc_id =350
            and spmm.spmm_smm_id is not null and ssp.ssp_ssc_id=201
            inner join friends_of_friends af on af.fof_id = ssp.ssp_sfmm_id
            order by Random()
            limit 1
        `
        const result = await PgSocialClient.query(query,[userId])
        return {
            postId: result.rows[0]?.postid,
            userId: result.rows[0]?.userid,
            caption: result.rows[0]?.caption,
            postMediaId: result.rows[0]?.postmediaid
        }
    }

    async getMyFriendsOfFriendsRandomDeletedPost(userId:string){
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
            select ssp.ssp_id as postId, ssp.ssp_sfmm_id as userId, 
            ssp.ssp_caption as caption, spmm.spmm_smm_id as postMediaId 
            from satsang_social.satsang_social_posts ssp
            inner join satsang_social.satsang_post_media_map spmm on ssp.ssp_id = spmm.spmm_ssp_id 
            and spmm.spmm_post_category_ssc_id =300 and spmm.spmm_is_attached_ssc_id =350
            and spmm.spmm_smm_id is not null and ssp.ssp_ssc_id=200
            inner join friends_of_friends af on af.fof_id = ssp.ssp_sfmm_id
            order by Random()
            limit 1
        `
        const result = await PgSocialClient.query(query,[userId])
        return {
            postId: result.rows[0]?.postid,
            userId: result.rows[0]?.userid,
            caption: result.rows[0]?.caption,
            postMediaId: result.rows[0]?.postmediaid
        }
    }

    async getMyFriendsOfFriendsRandomPostWithFriendsVisibility(userId:string){
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
            select ssp.ssp_id as postId, ssp.ssp_sfmm_id as userId, 
            ssp.ssp_caption as caption, spmm.spmm_smm_id as postMediaId 
            from satsang_social.satsang_social_posts ssp
            inner join satsang_social.satsang_post_media_map spmm on ssp.ssp_id = spmm.spmm_ssp_id 
            and spmm.spmm_post_category_ssc_id =300 and spmm.spmm_is_attached_ssc_id =350
            and spmm.spmm_smm_id is not null and ssp.ssp_ssc_id=202
            inner join friends_of_friends af on af.fof_id = ssp.ssp_sfmm_id
            order by Random()
            limit 1
        `
        const result = await PgSocialClient.query(query,[userId])
        return {
            postId: result.rows[0]?.postid,
            userId: result.rows[0]?.userid,
            caption: result.rows[0]?.caption,
            postMediaId: result.rows[0]?.postmediaid
        }
    }

    async getMyFriendsOfFriendsRandomPostWithFriendsOfFriendVisibility(userId:string){
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
            select ssp.ssp_id as postId, ssp.ssp_sfmm_id as userId, 
            ssp.ssp_caption as caption, spmm.spmm_smm_id as postMediaId 
            from satsang_social.satsang_social_posts ssp
            inner join satsang_social.satsang_post_media_map spmm on ssp.ssp_id = spmm.spmm_ssp_id 
            and spmm.spmm_post_category_ssc_id =300 and spmm.spmm_is_attached_ssc_id =350
            and spmm.spmm_smm_id is not null and ssp.ssp_ssc_id=203
            inner join friends_of_friends af on af.fof_id = ssp.ssp_sfmm_id
            order by Random()
            limit 1
        `
        const result = await PgSocialClient.query(query,[userId])
        return {
            postId: result.rows[0]?.postid,
            userId: result.rows[0]?.userid,
            caption: result.rows[0]?.caption,
            postMediaId: result.rows[0]?.postmediaid
        }
    }



    async getMyNonFriendsRandomPublicPost(userId:string){
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
            select ssp.ssp_id as postId, ssp.ssp_sfmm_id as userId, 
            ssp.ssp_caption as caption, spmm.spmm_smm_id as postMediaId 
            from satsang_social.satsang_social_posts ssp
            inner join satsang_social.satsang_post_media_map spmm on ssp.ssp_id = spmm.spmm_ssp_id 
            and spmm.spmm_post_category_ssc_id =300 and spmm.spmm_is_attached_ssc_id =350
            and spmm.spmm_smm_id is not null and ssp.ssp_ssc_id=204
            inner join nonSocialFriends af on af.userId = ssp.ssp_sfmm_id
            order by Random()
            limit 1
        `
        const result = await PgSocialClient.query(query,[userId])
        return {
            postId: result.rows[0]?.postid,
            userId: result.rows[0]?.userid,
            caption: result.rows[0]?.caption,
            postMediaId: result.rows[0]?.postmediaid
        }
    }

    async getMyNonFriendsRandomHiddenPost(userId:string){
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
            select ssp.ssp_id as postId, ssp.ssp_sfmm_id as userId, 
            ssp.ssp_caption as caption, spmm.spmm_smm_id as postMediaId 
            from satsang_social.satsang_social_posts ssp
            inner join satsang_social.satsang_post_media_map spmm on ssp.ssp_id = spmm.spmm_ssp_id 
            and spmm.spmm_post_category_ssc_id =300 and spmm.spmm_is_attached_ssc_id =350
            and spmm.spmm_smm_id is not null and ssp.ssp_ssc_id=201
            inner join nonSocialFriends af on af.userId = ssp.ssp_sfmm_id
            order by Random()
            limit 1
        `
        const result = await PgSocialClient.query(query,[userId])
        return {
            postId: result.rows[0]?.postid,
            userId: result.rows[0]?.userid,
            caption: result.rows[0]?.caption,
            postMediaId: result.rows[0]?.postmediaid
        }
    }

    async getMyNonFriendsRandomDeletedPost(userId:string){
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
            select ssp.ssp_id as postId, ssp.ssp_sfmm_id as userId, 
            ssp.ssp_caption as caption, spmm.spmm_smm_id as postMediaId 
            from satsang_social.satsang_social_posts ssp
            inner join satsang_social.satsang_post_media_map spmm on ssp.ssp_id = spmm.spmm_ssp_id 
            and spmm.spmm_post_category_ssc_id =300 and spmm.spmm_is_attached_ssc_id =350
            and spmm.spmm_smm_id is not null and ssp.ssp_ssc_id=200
            inner join nonSocialFriends af on af.userId = ssp.ssp_sfmm_id
            order by Random()
            limit 1
        `
        const result = await PgSocialClient.query(query,[userId])
        return {
            postId: result.rows[0]?.postid,
            userId: result.rows[0]?.userid,
            caption: result.rows[0]?.caption,
            postMediaId: result.rows[0]?.postmediaid
        }
    }

    async getMyNonFriendsRandomPostWithFriendsVisibility(userId:string){
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
            select ssp.ssp_id as postId, ssp.ssp_sfmm_id as userId, 
            ssp.ssp_caption as caption, spmm.spmm_smm_id as postMediaId 
            from satsang_social.satsang_social_posts ssp
            inner join satsang_social.satsang_post_media_map spmm on ssp.ssp_id = spmm.spmm_ssp_id 
            and spmm.spmm_post_category_ssc_id =300 and spmm.spmm_is_attached_ssc_id =350
            and spmm.spmm_smm_id is not null and ssp.ssp_ssc_id=202
            inner join nonSocialFriends af on af.userId = ssp.ssp_sfmm_id
            order by Random()
            limit 1
        `
        const result = await PgSocialClient.query(query,[userId])
        return {
            postId: result.rows[0]?.postid,
            userId: result.rows[0]?.userid,
            caption: result.rows[0]?.caption,
            postMediaId: result.rows[0]?.postmediaid
        }
    }

    async getMyNonFriendsRandomPostWithFriendsOfFriendVisibility(userId:string){
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
            select ssp.ssp_id as postId, ssp.ssp_sfmm_id as userId, 
            ssp.ssp_caption as caption, spmm.spmm_smm_id as postMediaId 
            from satsang_social.satsang_social_posts ssp
            inner join satsang_social.satsang_post_media_map spmm on ssp.ssp_id = spmm.spmm_ssp_id 
            and spmm.spmm_post_category_ssc_id =300 and spmm.spmm_is_attached_ssc_id =350
            and spmm.spmm_smm_id is not null and ssp.ssp_ssc_id=203
            inner join nonSocialFriends af on af.userId = ssp.ssp_sfmm_id
            order by Random()
            limit 1
        `
        const result = await PgSocialClient.query(query,[userId])
        return {
            postId: result.rows[0]?.postid,
            userId: result.rows[0]?.userid,
            caption: result.rows[0]?.caption,
            postMediaId: result.rows[0]?.postmediaid
        }
    }

    async getMyRandomCommentMadeOnMyPost(userId:string, type: 'deleted'|'public'|'hidden'|'friends visibility'|'fof visibility'){
        const uuid = toUUID(userId);

        // Step 1 -> Get All Comments Made By User from CASSANDRA
        const casQuery = `
            select sspc_id as commentid, sspc_content as comment, 
            sspc_sfmm_id as userid, sspc_ssp_id as postid, sspc_ssc_id as statusid from satsang_social.satsang_social_post_comments
            where sspc_sfmm_id=?
            allow filtering
        `
        const casRes = await CassandraQuery(casQuery,[uuid],'social')
        const casRows = [...casRes.rows];
        if(!casRows.length) return null
        console.log('-----------------------------------------------------')
        console.log(`CasRows ${JSON.stringify(casRows)}`)
        console.log('-----------------------------------------------------')

        // Step 2 -> Extract Unique PostIds from Comments
        const postIds = [... new Set(casRows.map((r:any)=>r.postid?.toString()).filter(Boolean))]
        if(!postIds.length) return null
        console.log('-----------------------------------------------------')
        console.log(`All PostIds:  ${postIds}`)
        console.log('-----------------------------------------------------')

        // Step 3 -> Fetch Posts from POSTGRESQL
        const pgQuery = `
            select ssp.ssp_id as postid, ssp.ssp_sfmm_id as userid, 
            ssp.ssp_caption as caption, spmm.spmm_smm_id as postmediaid, ssp.ssp_ssc_id as poststatusid
            from satsang_social.satsang_social_posts ssp
            inner join satsang_social.satsang_post_media_map spmm 
                on ssp.ssp_id = spmm.spmm_ssp_id

            where spmm.spmm_post_category_ssc_id =300
            and spmm.spmm_is_attached_ssc_id =350
            and spmm.spmm_smm_id is not null
            and ssp.ssp_can_share = true
            and ssp.ssp_sfmm_id = $1
            and ssp.ssp_id = ANY($2::uuid[])
        `
        
        const pgRes = await PgSocialClient.query(pgQuery,[userId,postIds])
        console.log('-----------------------------------------------------')
        console.log(`PG Rows: ${JSON.stringify(pgRes.rows)}`)
        console.log('-----------------------------------------------------')

        console.log('-----------------------------------------------------')
        console.log(`PGQUERY:  ${pgQuery}`)
        console.log('-----------------------------------------------------')
        let filteredPosts: any[]=[]

        // Step 4: Filter posts based on requested type
        if(type==="deleted"){
            filteredPosts = pgRes.rows.filter((p:any)=>Number(p?.poststatusid)===200)
        }
        else if(type==="hidden"){
            filteredPosts = pgRes.rows.filter((p:any)=>Number(p?.poststatusid)===201)
        }
        else if(type==="public"){
            filteredPosts = pgRes.rows.filter((p:any)=>Number(p?.poststatusid)===204)
        }
        else if(type==="friends visibility"){
            filteredPosts = pgRes.rows.filter((p:any)=>Number(p?.poststatusid)===202)
        }
        else if(type==="fof visibility"){
            filteredPosts = pgRes.rows.filter((p:any)=>Number(p?.poststatusid)===203)
        }
        console.log('-----------------------------------------------------')
        console.log(`Filtered Posts Length: ${filteredPosts.length}`)
        console.log(`Filtered Posts: ${JSON.stringify(filteredPosts)}`)
        console.log('-----------------------------------------------------')

        if (!filteredPosts.length) return null


        // Step 5 -> Pick Random POST (Having Comment)
        const randomPost = filteredPosts[Math.floor(Math.random()*filteredPosts.length)]
        console.log('-----------------------------------------------------')
        console.log(`Random Posts:  ${JSON.stringify(randomPost)}`)
        console.log('-----------------------------------------------------')

        // Step 6 -> Find Comments For Selected POST
        const filteredComments = casRows.filter((r:any)=>r.postid?.toString()===randomPost?.postid?.toString())
        console.log('-----------------------------------------------------')
        console.log(`Filtered Comments:  ${JSON.stringify(filteredComments)}`)
        console.log('-----------------------------------------------------')

        if (!filteredComments.length) return null;

        // Step 7 -> 
        const randomComment = filteredComments[Math.floor(Math.random()*filteredComments.length)]
        console.log(`Random Comments:  ${JSON.stringify(randomComment)}`)
        return{
            commentId: randomComment.commentid,
            comment: randomComment.comment,
            userId: randomComment.userid,
            postId: randomComment.postid,
            statusId: randomComment.statusid
        }
    }

    // async getMyRandomCommentMadeOnMyPost(userId:string, type: 'deleted'|'public'|'hidden'|'friends visibility'|'fof visibility'){
    //     const uuid = toUUID(userId);
    //     const casQuery = `
    //         select sspc_id as commentId, sspc_content as comment, 
    //         sspc_sfmm_id as userId, sspc_ssp_id as postId, sspc_ssc_id as statusId from satsang_social.satsang_social_post_comments
    //         where sspc_sfmm_id=?
    //         allow filtering
    //     `
    //     const casRes = await CassandraQuery(casQuery, [uuid], 'social')
    //     console.log(`Cas Res - ${JSON.stringify(casRes)}`)

    //     const casRows = [...casRes.rows]

    //     if (!casRows.length) return null;

    //     let postId:any;
    //     if(type=='deleted'){
    //         ({postId} = await this.getMyRandomDeletedPost(userId))
    //     }
    //     else if(type=='hidden'){
    //         ({postId} = await this.getMyRandomHiddenPost(userId))
    //     }
    //     else if(type=='public'){
    //         ({postId} = await this.getMyRandomPublicPost(userId))
    //     }
    //     else if(type=='friends visibility'){
    //         ({postId} = await this.getMyRandomPostWithFriendsVisibility(userId))
    //     }
    //     else if(type=='fof visibility'){
    //         ({postId} = await this.getMyRandomPostWithFriendsOfFriendVisibility(userId))
    //     }

    //     console.log(`Random Public PostID - ${JSON.stringify(postId)}`)
    //     // 🔹 Filter rows where media exists
    //     const filteredRows = casRows.filter(
    //         (r: any) => r.postId?.toString() === postId.toString()
    //     );

    //     console.log(`Filtered Rows - ${JSON.stringify(filteredRows)}`)

    //     if (!filteredRows.length) return null;

    //     // 🔹 Pick random row
    //     const randomIndex = Math.floor(Math.random() * filteredRows.length);
    //     const row = filteredRows[randomIndex];

    //     return {
    //         commentId: row.commentId,
    //         comment: row.comment,
    //         userId: row.userId,
    //         postId: row.postId,
    //         statusId: row.statusId
    //     }

    // }

    async getMyRandomCommentMadeOnFriendsPost(userId:string, type: 'deleted'|'public'|'hidden'|'friends visibility'|'fof visibility'){
        const uuid = toUUID(userId);

        // Step 1 -> Get All Comments Made By User from CASSANDRA
        const casQuery = `
            select sspc_id as commentid, sspc_content as comment, 
            sspc_sfmm_id as userid, sspc_ssp_id as postid, sspc_ssc_id as statusid from satsang_social.satsang_social_post_comments
            where sspc_sfmm_id=?
            allow filtering
        `
        const casRes = await CassandraQuery(casQuery,[uuid],'social')
        const casRows = [...casRes.rows];
        if(!casRows.length) return null

        // Step 2 -> Extract Unique PostIds from Comments
        const postIds = [... new Set(casRows.map((r:any)=>r.postid?.toString()).filter(Boolean))]
        if(!postIds.length) return null

        // Step 3 -> Fetch Posts from POSTGRESQL
        const pgQuery = `
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
            select ssp.ssp_id as postid, ssp.ssp_sfmm_id as userid, 
            ssp.ssp_caption as caption, spmm.spmm_smm_id as postmediaid, ssp.ssp_ssc_id as poststatusid 
            from satsang_social.satsang_social_posts ssp
            inner join satsang_social.satsang_post_media_map spmm on ssp.ssp_id = spmm.spmm_ssp_id 
            and spmm.spmm_post_category_ssc_id =300 and spmm.spmm_is_attached_ssc_id =350
            and spmm.spmm_smm_id is not null
            inner join acceptedFriends af on af.friendid = ssp.ssp_sfmm_id and
            ssp.ssp_id = ANY($2::uuid[])
        `
        const pgRes = await PgSocialClient.query(pgQuery,[userId,postIds])

        let filteredPosts: any[]=[]

        // Step 4: Filter posts based on requested type
        if(type==="deleted"){
            filteredPosts = pgRes.rows.filter((p:any)=>Number(p?.poststatusid)===200)
        }
        else if(type==="hidden"){
            filteredPosts = pgRes.rows.filter((p:any)=>Number(p?.poststatusid)===201)
        }
        else if(type==="public"){
            filteredPosts = pgRes.rows.filter((p:any)=>Number(p?.poststatusid)===204)
        }
        else if(type==="friends visibility"){
            filteredPosts = pgRes.rows.filter((p:any)=>Number(p?.poststatusid)===202)
        }
        else if(type==="fof visibility"){
            filteredPosts = pgRes.rows.filter((p:any)=>Number(p?.poststatusid)===203)
        }

        if (!filteredPosts.length) return null

        // Step 5 -> Pick Random POST (Having Comment)
        const randomPost = filteredPosts[Math.floor(Math.random()*filteredPosts.length)]

        // Step 6 -> Find Comments For Selected POST
        const filteredComments = casRows.filter((r:any)=>r.postid?.toString()===randomPost?.postid?.toString())

        if (!filteredComments.length) return null;

        // Step 7 -> 
        const randomComment = filteredComments[Math.floor(Math.random()*filteredComments.length)]

        return{
            commentId: randomComment.commentid,
            comment: randomComment.comment,
            userId: randomComment.userid,
            postId: randomComment.postid,
            statusId: randomComment.statusid
        }
    }

    // async getMyRandomCommentMadeOnFriendsPost(userId:string, type: 'deleted'|'public'|'hidden'|'friends visibility'|'fof visibility'){
    //     const uuid = toUUID(userId);
    //     const casQuery = `
    //         select sspc_id as commentId, sspc_content as comment, 
    //         sspc_sfmm_id as userId, sspc_ssp_id as postId, sspc_ssc_id as statusId from satsang_social.satsang_social_post_comments
    //         where sspc_sfmm_id=?
    //         allow filtering
    //     `
    //     const casRes = await CassandraQuery(casQuery, [uuid], 'social')

    //     const casRows = [...casRes.rows]

    //     if (!casRows.length) return null;

    //     let postId:any;
    //     if(type=='deleted'){
    //         ({postId} = await this.getMyFriendsRandomDeletedPost(userId))
    //     }
    //     else if(type=='hidden'){
    //         ({postId} = await this.getMyFriendsRandomHiddenPost(userId))
    //     }
    //     else if(type=='public'){
    //         ({postId} = await this.getMyFriendsRandomPublicPost(userId))
    //     }
    //     else if(type=='friends visibility'){
    //         ({postId} = await this.getMyFriendsRandomPostWithFriendsVisibility(userId))
    //     }
    //     else if(type=='fof visibility'){
    //         ({postId} = await this.getMyFriendsRandomPostWithFriendsOfFriendsVisibility(userId))
    //     }

    //     // 🔹 Filter rows where media exists
    //     const filteredRows = casRows.filter(
    //         (r: any) => r.postId?.toString() === postId.toString()
    //     );

    //     if (!filteredRows.length) return null;

    //     // 🔹 Pick random row
    //     const randomIndex = Math.floor(Math.random() * filteredRows.length);
    //     const row = filteredRows[randomIndex];

    //     return {
    //         commentId: row.commentId,
    //         comment: row.comment,
    //         userId: row.userId,
    //         postId: row.postId,
    //         statusId: row.statusId
    //     }

    // }
    async getMyRandomCommentMadeOnFriendsOfFriendPost(userId:string, type: 'deleted'|'public'|'hidden'|'friends visibility'|'fof visibility'){
        const uuid = toUUID(userId);
        // Step 1 -> Get All Comments Made By User from CASSANDRA
        const casQuery = `
            select sspc_id as commentid, sspc_content as comment, 
            sspc_sfmm_id as userid, sspc_ssp_id as postid, sspc_ssc_id as statusid from satsang_social.satsang_social_post_comments
            where sspc_sfmm_id=?
            allow filtering
        `
        const casRes = await CassandraQuery(casQuery,[uuid],'social')
        const casRows = [...casRes.rows];
        if(!casRows.length) return null

        // Step 2 -> Extract Unique PostIds from Comments
        const postIds = [... new Set(casRows.map((r:any)=>r.postid?.toString()).filter(Boolean))]
        if(!postIds.length) return null

        // Step 3 -> Fetch Posts from POSTGRESQL
        const pgQuery = `
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
            select ssp.ssp_id as postid, ssp.ssp_sfmm_id as userid, 
            ssp.ssp_caption as caption, spmm.spmm_smm_id as postmediaid, ssp.ssp_ssc_id as poststatusid 
            from satsang_social.satsang_social_posts ssp
            inner join satsang_social.satsang_post_media_map spmm on ssp.ssp_id = spmm.spmm_ssp_id 
            and spmm.spmm_post_category_ssc_id =300 and spmm.spmm_is_attached_ssc_id =350
            and spmm.spmm_smm_id is not null
            inner join friends_of_friends af on af.fof_id = ssp.ssp_sfmm_id and
            ssp.ssp_id = ANY($2::uuid[])
        `
        const pgRes = await PgSocialClient.query(pgQuery,[userId,postIds])

        let filteredPosts: any[]=[]

        // Step 4: Filter posts based on requested type
        if(type==="deleted"){
            filteredPosts = pgRes.rows.filter((p:any)=>Number(p?.poststatusid)===200)
        }
        else if(type==="hidden"){
            filteredPosts = pgRes.rows.filter((p:any)=>Number(p?.poststatusid)===201)
        }
        else if(type==="public"){
            filteredPosts = pgRes.rows.filter((p:any)=>Number(p?.poststatusid)===204)
        }
        else if(type==="friends visibility"){
            filteredPosts = pgRes.rows.filter((p:any)=>Number(p?.poststatusid)===202)
        }
        else if(type==="fof visibility"){
            filteredPosts = pgRes.rows.filter((p:any)=>Number(p?.poststatusid)===203)
        }

        if (!filteredPosts.length) return null

        // Step 5 -> Pick Random POST (Having Comment)
        const randomPost = filteredPosts[Math.floor(Math.random()*filteredPosts.length)]

        // Step 6 -> Find Comments For Selected POST
        const filteredComments = casRows.filter((r:any)=>r.postid?.toString()===randomPost?.postid?.toString())

        if (!filteredComments.length) return null;

        // Step 7 -> 
        const randomComment = filteredComments[Math.floor(Math.random()*filteredComments.length)]

        return{
            commentId: randomComment.commentid,
            comment: randomComment.comment,
            userId: randomComment.userid,
            postId: randomComment.postid,
            statusId: randomComment.statusid
        }
    }

    // async getMyRandomCommentMadeOnFriendsOfFriendsPost(userId:string, type: 'deleted'|'public'|'hidden'|'friends visibility'|'fof visibility'){
    //     const uuid = toUUID(userId);
    //     const casQuery = `
    //         select sspc_id as commentId, sspc_content as comment, 
    //         sspc_sfmm_id as userId, sspc_ssp_id as postId, sspc_ssc_id as statusId from satsang_social.satsang_social_post_comments
    //         where sspc_sfmm_id=?
    //         allow filtering
    //     `
    //     const casRes = await CassandraQuery(casQuery, [uuid], 'social')

    //     const casRows = [...casRes.rows]

    //     if (!casRows.length) return null;

    //     let postId:any;
    //     if(type=='deleted'){
    //         ({postId} = await this.getMyFriendsOfFriendsRandomDeletedPost(userId))
    //     }
    //     else if(type=='hidden'){
    //         ({postId} = await this.getMyFriendsOfFriendsRandomHiddenPost(userId))
    //     }
    //     else if(type=='public'){
    //         ({postId} = await this.getMyFriendsOfFriendsRandomPublicPost(userId))
    //     }
    //     else if(type=='friends visibility'){
    //         ({postId} = await this.getMyFriendsOfFriendsRandomPostWithFriendsVisibility(userId))
    //     }
    //     else if(type=='fof visibility'){
    //         ({postId} = await this.getMyFriendsOfFriendsRandomPostWithFriendsOfFriendVisibility(userId))
    //     }

    //     // 🔹 Filter rows where media exists
    //     const filteredRows = casRows.filter(
    //         (r: any) => r.postId?.toString() === postId.toString()
    //     );

    //     if (!filteredRows.length) return null;

    //     // 🔹 Pick random row
    //     const randomIndex = Math.floor(Math.random() * filteredRows.length);
    //     const row = filteredRows[randomIndex];

    //     return {
    //         commentId: row.commentId,
    //         comment: row.comment,
    //         userId: row.userId,
    //         postId: row.postId,
    //         statusId: row.statusId
    //     }

    // }
    async  getMyRandomCommentMadeOnNonFriendsPost(userId:string, type: 'deleted'|'public'|'hidden'|'friends visibility'|'fof visibility'){
        const uuid = toUUID(userId);

        // Step 1 -> Get All Comments Made By User from CASSANDRA
        const casQuery = `
            select sspc_id as commentid, sspc_content as comment, 
            sspc_sfmm_id as userid, sspc_ssp_id as postid, sspc_ssc_id as statusid from satsang_social.satsang_social_post_comments
            where sspc_sfmm_id=?
            allow filtering
        `
        const casRes = await CassandraQuery(casQuery,[uuid],'social')
        const casRows = [...casRes.rows];
        if(!casRows.length) return null

        // Step 2 -> Extract Unique PostIds from Comments
        const postIds = [... new Set(casRows.map((r:any)=>r.postid?.toString()).filter(Boolean))]
        if(!postIds.length) return null

        // Step 3 -> Fetch Posts from POSTGRESQL
        const pgQuery = `
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
            select ssp.ssp_id as postid, ssp.ssp_sfmm_id as userid, 
            ssp.ssp_caption as caption, spmm.spmm_smm_id as postmediaid, ssp.ssp_ssc_id as poststatusid 
            from satsang_social.satsang_social_posts ssp
            inner join satsang_social.satsang_post_media_map spmm on ssp.ssp_id = spmm.spmm_ssp_id 
            and spmm.spmm_post_category_ssc_id =300 and spmm.spmm_is_attached_ssc_id =350
            and spmm.spmm_smm_id is not null
            inner join nonSocialFriends af on af.userId = ssp.ssp_sfmm_id and
            ssp.ssp_id = ANY($2::uuid[])
        `
        const pgRes = await PgSocialClient.query(pgQuery,[userId,postIds])

        let filteredPosts: any[]=[]

        // Step 4: Filter posts based on requested type
        if(type==="deleted"){
            filteredPosts = pgRes.rows.filter((p:any)=>Number(p?.poststatusid)===200)
        }
        else if(type==="hidden"){
            filteredPosts = pgRes.rows.filter((p:any)=>Number(p?.poststatusid)===201)
        }
        else if(type==="public"){
            filteredPosts = pgRes.rows.filter((p:any)=>Number(p?.poststatusid)===204)
        }
        else if(type==="friends visibility"){
            filteredPosts = pgRes.rows.filter((p:any)=>Number(p?.poststatusid)===202)
        }
        else if(type==="fof visibility"){
            filteredPosts = pgRes.rows.filter((p:any)=>Number(p?.poststatusid)===203)
        }

        if (!filteredPosts.length) return null

        // Step 5 -> Pick Random POST (Having Comment)
        const randomPost = filteredPosts[Math.floor(Math.random()*filteredPosts.length)]

        // Step 6 -> Find Comments For Selected POST
        const filteredComments = casRows.filter((r:any)=>r.postid?.toString()===randomPost?.postid?.toString())

        if (!filteredComments.length) return null;

        // Step 7 -> 
        const randomComment = filteredComments[Math.floor(Math.random()*filteredComments.length)]

        return{
            commentId: randomComment.commentid,
            comment: randomComment.comment,
            userId: randomComment.userid,
            postId: randomComment.postid,
            statusId: randomComment.statusid
        }
    }
    // async getMyRandomCommentMadeOnNonFriendsPost(userId:string, type: 'deleted'|'public'|'hidden'|'friends visibility'|'fof visibility'){
    //     const uuid = toUUID(userId);
    //     const casQuery = `
    //         select sspc_id as commentId, sspc_content as comment, 
    //         sspc_sfmm_id as userId, sspc_ssp_id as postId, sspc_ssc_id as statusId from satsang_social.satsang_social_post_comments
    //         where sspc_sfmm_id=?
    //         allow filtering
    //     `
    //     const casRes = await CassandraQuery(casQuery, [uuid], 'social')

    //     const casRows = [...casRes.rows]

    //     if (!casRows.length) return null;

    //     let postId:any;
    //     if(type=='deleted'){
    //         ({postId} = await this.getMyNonFriendsRandomDeletedPost(userId))
    //     }
    //     else if(type=='hidden'){
    //         ({postId} = await this.getMyNonFriendsRandomHiddenPost(userId))
    //     }
    //     else if(type=='public'){
    //         ({postId} = await this.getMyNonFriendsRandomPublicPost(userId))
    //     }
    //     else if(type=='friends visibility'){
    //         ({postId} = await this.getMyNonFriendsRandomPostWithFriendsVisibility(userId))
    //     }
    //     else if(type=='fof visibility'){
    //         ({postId} = await this.getMyNonFriendsRandomPostWithFriendsOfFriendVisibility(userId))
    //     }

    //     // 🔹 Filter rows where media exists
    //     const filteredRows = casRows.filter(
    //         (r: any) => r.postId?.toString() === postId.toString()
    //     );

    //     if (!filteredRows.length) return null;

    //     // 🔹 Pick random row
    //     const randomIndex = Math.floor(Math.random() * filteredRows.length);
    //     const row = filteredRows[randomIndex];

    //     return {
    //         commentId: row.commentId,
    //         comment: row.comment,
    //         userId: row.userId,
    //         postId: row.postId,
    //         statusId: row.statusId
    //     }

    // }

    // async getOthersRandomCommentMadeOnMyFriendsPost( userId: string, type: 'deleted' | 'public' | 'hidden' | 'friends visibility' | 'fof visibility'){
    //     const userUUID = toUUID(userId);

    //     let postId: string | undefined;

    //     if (type === 'deleted') {
    //         ({ postId } = await this.getMyFriendsRandomDeletedPost(userId) || {});
    //     } else if (type === 'hidden') {
    //         ({ postId } = await this.getMyFriendsRandomHiddenPost(userId) || {});
    //     } else if (type === 'public') {
    //         ({ postId } = await this.getMyFriendsRandomPublicPost(userId) || {});
    //     } else if (type === 'friends visibility') {
    //         ({ postId } = await this.getMyFriendsRandomPostWithFriendsVisibility(userId) || {});
    //     } else if (type === 'fof visibility') {
    //         ({ postId } = await this.getMyFriendsRandomPostWithFriendsOfFriendsVisibility(userId) || {});
    //     }

    //     if (!postId) return null;

    //     const postUUID = toUUID(postId);

    //     const casQuery = `
    //         SELECT 
    //         sspc_id as commentId, 
    //         sspc_content as comment, 
    //         sspc_sfmm_id as userId, 
    //         sspc_ssp_id as postId, 
    //         sspc_ssc_id as statusId 
    //         FROM satsang_social.satsang_social_post_comments
    //         WHERE sspc_ssp_id = ?
    //         ALLOW FILTERING
    //     `;

    //     const casRes = await CassandraQuery(casQuery, [postUUID], 'social');

    //     const casRows = [...casRes.rows];

    //     if (!casRows.length) return null;

    //     // 🔹 Exclude my own comments
    //     const filteredRows = casRows.filter(
    //         (r: any) => r.userId?.toString() !== userUUID.toString()
    //     );

    //     if (!filteredRows.length) return null;

    //     // 🔹 Random selection
    //     const row =
    //         filteredRows[Math.floor(Math.random() * filteredRows.length)];

    //     return {
    //         commentId: row.commentId,
    //         comment: row.comment,
    //         userId: row.userId,
    //         postId: row.postId,
    //         statusId: row.statusId
    //     };
    // }

    // async getOthersRandomCommentMadeOnMyFriendsOfFriendsPost( userId: string, type: 'deleted' | 'public' | 'hidden' | 'friends visibility' | 'fof visibility'){
    //     const userUUID = toUUID(userId);

    //     let postId: string | undefined;

    //     if(type=='deleted'){
    //         ({postId} = await this.getMyFriendsOfFriendsRandomDeletedPost(userId))
    //     }
    //     else if(type=='hidden'){
    //         ({postId} = await this.getMyFriendsOfFriendsRandomHiddenPost(userId))
    //     }
    //     else if(type=='public'){
    //         ({postId} = await this.getMyFriendsOfFriendsRandomPublicPost(userId))
    //     }
    //     else if(type=='friends visibility'){
    //         ({postId} = await this.getMyFriendsOfFriendsRandomPostWithFriendsVisibility(userId))
    //     }
    //     else if(type=='fof visibility'){
    //         ({postId} = await this.getMyFriendsOfFriendsRandomPostWithFriendsOfFriendVisibility(userId))
    //     }
    //     if (!postId) return null;

    //     const postUUID = toUUID(postId);

    //     const casQuery = `
    //         SELECT 
    //         sspc_id as commentId, 
    //         sspc_content as comment, 
    //         sspc_sfmm_id as userId, 
    //         sspc_ssp_id as postId, 
    //         sspc_ssc_id as statusId 
    //         FROM satsang_social.satsang_social_post_comments
    //         WHERE sspc_ssp_id = ?
    //         ALLOW FILTERING
    //     `;

    //     const casRes = await CassandraQuery(casQuery, [postUUID], 'social');

    //     const casRows = [...casRes.rows];

    //     if (!casRows.length) return null;

    //     // 🔹 Exclude my own comments
    //     const filteredRows = casRows.filter(
    //         (r: any) => r.userId?.toString() !== userUUID.toString()
    //     );

    //     if (!filteredRows.length) return null;

    //     // 🔹 Random selection
    //     const row =
    //         filteredRows[Math.floor(Math.random() * filteredRows.length)];

    //     return {
    //         commentId: row.commentId,
    //         comment: row.comment,
    //         userId: row.userId,
    //         postId: row.postId,
    //         statusId: row.statusId
    //     };
    // }

    // async getOthersRandomCommentMadeOnMyNonFriendsPost( userId: string, type: 'deleted' | 'public' | 'hidden' | 'friends visibility' | 'fof visibility'){
    //     const userUUID = toUUID(userId);

    //     let postId: string | undefined;

    //     if(type=='deleted'){
    //         ({postId} = await this.getMyNonFriendsRandomDeletedPost(userId))
    //     }
    //     else if(type=='hidden'){
    //         ({postId} = await this.getMyNonFriendsRandomHiddenPost(userId))
    //     }
    //     else if(type=='public'){
    //         ({postId} = await this.getMyNonFriendsRandomPublicPost(userId))
    //     }
    //     else if(type=='friends visibility'){
    //         ({postId} = await this.getMyNonFriendsRandomPostWithFriendsVisibility(userId))
    //     }
    //     else if(type=='fof visibility'){
    //         ({postId} = await this.getMyNonFriendsRandomPostWithFriendsOfFriendVisibility(userId))
    //     }
    //     if (!postId) return null;

    //     const postUUID = toUUID(postId);

    //     const casQuery = `
    //         SELECT 
    //         sspc_id as commentId, 
    //         sspc_content as comment, 
    //         sspc_sfmm_id as userId, 
    //         sspc_ssp_id as postId, 
    //         sspc_ssc_id as statusId 
    //         FROM satsang_social.satsang_social_post_comments
    //         WHERE sspc_ssp_id = ?
    //         ALLOW FILTERING
    //     `;

    //     const casRes = await CassandraQuery(casQuery, [postUUID], 'social');

    //     const casRows = [...casRes.rows];

    //     if (!casRows.length) return null;

    //     // 🔹 Exclude my own comments
    //     const filteredRows = casRows.filter(
    //         (r: any) => r.userId?.toString() !== userUUID.toString()
    //     );

    //     if (!filteredRows.length) return null;

    //     // 🔹 Random selection
    //     const row =
    //         filteredRows[Math.floor(Math.random() * filteredRows.length)];

    //     return {
    //         commentId: row.commentId,
    //         comment: row.comment,
    //         userId: row.userId,
    //         postId: row.postId,
    //         statusId: row.statusId
    //     };
    // }

    // async getOthersRandomCommentMadeOnMyPost( userId: string, type: 'deleted' | 'public' | 'hidden' | 'friends visibility' | 'fof visibility'){
    //     const userUUID = toUUID(userId);

    //     let postId: string | undefined;

    //     if(type=='deleted'){
    //         ({postId} = await this.getMyRandomDeletedPost(userId))
    //     }
    //     else if(type=='hidden'){
    //         ({postId} = await this.getMyRandomHiddenPost(userId))
    //     }
    //     else if(type=='public'){
    //         ({postId} = await this.getMyRandomPublicPost(userId))
    //     }
    //     else if(type=='friends visibility'){
    //         ({postId} = await this.getMyRandomPostWithFriendsVisibility(userId))
    //     }
    //     else if(type=='fof visibility'){
    //         ({postId} = await this.getMyRandomPostWithFriendsOfFriendVisibility(userId))
    //     }
    //     if (!postId) return null;

    //     const postUUID = toUUID(postId);

    //     const casQuery = `
    //         SELECT 
    //         sspc_id as commentId, 
    //         sspc_content as comment, 
    //         sspc_sfmm_id as userId, 
    //         sspc_ssp_id as postId, 
    //         sspc_ssc_id as statusId 
    //         FROM satsang_social.satsang_social_post_comments
    //         WHERE sspc_ssp_id = ?
    //         ALLOW FILTERING
    //     `;

    //     const casRes = await CassandraQuery(casQuery, [postUUID], 'social');

    //     const casRows = [...casRes.rows];

    //     if (!casRows.length) return null;

    //     // 🔹 Exclude my own comments
    //     const filteredRows = casRows.filter(
    //         (r: any) => r.userId?.toString() !== userUUID.toString()
    //     );

    //     if (!filteredRows.length) return null;

    //     // 🔹 Random selection
    //     const row =
    //         filteredRows[Math.floor(Math.random() * filteredRows.length)];

    //     return {
    //         commentId: row.commentId,
    //         comment: row.comment,
    //         userId: row.userId,
    //         postId: row.postId,
    //         statusId: row.statusId
    //     };
    // }

    /////////////////////////////////////// REPLY TO OTHERS COMMENT ON POST ///////////////////////////////////////////////


    async getOthersRandomCommentMadeOnMyPost(userId:string, type: 'deleted'|'public'|'hidden'|'friends visibility'|'fof visibility'){
        const uuid = toUUID(userId);

        // Step 1 -> Get All Comments from CASSANDRA
        const casQuery = `
            select sspc_id as commentid, sspc_content as comment, 
            sspc_sfmm_id as userid, sspc_ssp_id as postid, sspc_ssc_id as statusid from satsang_social.satsang_social_post_comments
        `
        const casRes = await CassandraQuery(casQuery,[],'social')
        const casRows = [...casRes.rows];
        if(!casRows.length) return null


        // Step 1.1 -> Filter comments NOT created by the same user
        const otherUsersComments = casRows.filter(
            (r: any) => r.userId?.toString() !== uuid.toString()
        );

        console.log(`Other Users Comments - ${JSON.stringify(otherUsersComments)}`);

        if (!otherUsersComments.length) return null;

        // Step 2 -> Extract Unique PostIds from Comments
        const postIds = [... new Set(otherUsersComments.map((r:any)=>r.postid?.toString()).filter(Boolean))]
        if(!postIds.length) return null

        // Step 3 -> Fetch Posts from POSTGRESQL
        const pgQuery = `
            select ssp.ssp_id as postid, ssp.ssp_sfmm_id as userid, 
            ssp.ssp_caption as caption, spmm.spmm_smm_id as postmediaid, ssp.ssp_ssc_id as poststatusid
            from satsang_social.satsang_social_posts ssp
            inner join satsang_social.satsang_post_media_map spmm on ssp.ssp_id = spmm.spmm_ssp_id 
            and spmm.spmm_post_category_ssc_id =300 and spmm.spmm_is_attached_ssc_id =350
            and spmm.spmm_smm_id is not null and ssp.ssp_can_share = true and ssp.ssp_sfmm_id = $1
            and ssp.ssp_id = ANY($2::uuid[])
        `
        const pgRes = await PgSocialClient.query(pgQuery,[userId,postIds])

        let filteredPosts: any[]=[]

        // Step 4: Filter posts based on requested type
        if(type==="deleted"){
            filteredPosts = pgRes.rows.filter((p:any)=>Number(p?.poststatusid)===200)
        }
        else if(type==="hidden"){
            filteredPosts = pgRes.rows.filter((p:any)=>Number(p?.poststatusid)===201)
        }
        else if(type==="public"){
            filteredPosts = pgRes.rows.filter((p:any)=>Number(p?.poststatusid)===204)
        }
        else if(type==="friends visibility"){
            filteredPosts = pgRes.rows.filter((p:any)=>Number(p?.poststatusid)===202)
        }
        else if(type==="fof visibility"){
            filteredPosts = pgRes.rows.filter((p:any)=>Number(p?.poststatusid)===203)
        }

        if (!filteredPosts.length) return null

        // Step 5 -> Pick Random POST (Having Comment)
        const randomPost = filteredPosts[Math.floor(Math.random()*filteredPosts.length)]

        // Step 6 -> Find Comments For Selected POST
        const filteredComments = casRows.filter((r:any)=>r.postid?.toString()===randomPost?.postid?.toString())

        if (!filteredComments.length) return null;

        // Step 7 -> 
        const randomComment = filteredComments[Math.floor(Math.random()*filteredComments.length)]

        return{
            commentId: randomComment.commentid,
            comment: randomComment.comment,
            userId: randomComment.userid,
            postId: randomComment.postid,
            statusId: randomComment.statusid
        }
    }

    async getOthersRandomCommentMadeOnMyFriendsPost(userId:string, type: 'deleted'|'public'|'hidden'|'friends visibility'|'fof visibility'){
        const uuid = toUUID(userId);

        // Step 1 -> Get All Comments Made By User from CASSANDRA
        const casQuery = `
            select sspc_id as commentid, sspc_content as comment, 
            sspc_sfmm_id as userid, sspc_ssp_id as postid, sspc_ssc_id as statusid from satsang_social.satsang_social_post_comments
        `
        const casRes = await CassandraQuery(casQuery,[],'social')
        const casRows = [...casRes.rows];
        if(!casRows.length) return null
        // Step 1.1 -> Filter comments NOT created by the same user
        const otherUsersComments = casRows.filter(
            (r: any) => r.userId?.toString() !== uuid.toString()
        );

        console.log(`Other Users Comments - ${JSON.stringify(otherUsersComments)}`);

        if (!otherUsersComments.length) return null;

        // Step 2 -> Extract Unique PostIds from Comments
        const postIds = [... new Set(otherUsersComments.map((r:any)=>r.postid?.toString()).filter(Boolean))]
        if(!postIds.length) return null

        // Step 3 -> Fetch Posts from POSTGRESQL
        const pgQuery = `
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
            select ssp.ssp_id as postid, ssp.ssp_sfmm_id as userid, 
            ssp.ssp_caption as caption, spmm.spmm_smm_id as postmediaid, ssp.ssp_ssc_id as poststatusid 
            from satsang_social.satsang_social_posts ssp
            inner join satsang_social.satsang_post_media_map spmm on ssp.ssp_id = spmm.spmm_ssp_id 
            and spmm.spmm_post_category_ssc_id =300 and spmm.spmm_is_attached_ssc_id =350
            and spmm.spmm_smm_id is not null
            inner join acceptedFriends af on af.friendid = ssp.ssp_sfmm_id and
            ssp.ssp_id = ANY($2::uuid[])
        `
        const pgRes = await PgSocialClient.query(pgQuery,[userId,postIds])

        let filteredPosts: any[]=[]

        // Step 4: Filter posts based on requested type
        if(type==="deleted"){
            filteredPosts = pgRes.rows.filter((p:any)=>Number(p?.poststatusid)===200)
        }
        else if(type==="hidden"){
            filteredPosts = pgRes.rows.filter((p:any)=>Number(p?.poststatusid)==201)
        }
        else if(type==="public"){
            filteredPosts = pgRes.rows.filter((p:any)=>Number(p?.poststatusid)===204)
        }
        else if(type==="friends visibility"){
            filteredPosts = pgRes.rows.filter((p:any)=>Number(p?.poststatusid)===202)
        }
        else if(type==="fof visibility"){
            filteredPosts = pgRes.rows.filter((p:any)=>Number(p?.poststatusid)===203)
        }

        if (!filteredPosts.length) return null

        // Step 5 -> Pick Random POST (Having Comment)
        const randomPost = filteredPosts[Math.floor(Math.random()*filteredPosts.length)]

        // Step 6 -> Find Comments For Selected POST
        const filteredComments = casRows.filter((r:any)=>r.postid?.toString()===randomPost?.postid?.toString())

        if (!filteredComments.length) return null;

        // Step 7 -> 
        const randomComment = filteredComments[Math.floor(Math.random()*filteredComments.length)]

        return{
            commentId: randomComment.commentid,
            comment: randomComment.comment,
            userId: randomComment.userid,
            postId: randomComment.postid,
            statusId: randomComment.statusid
        }
    }

    async getOthersRandomCommentMadeOnMyFriendsOfFriendsPost(userId:string, type: 'deleted'|'public'|'hidden'|'friends visibility'|'fof visibility'){
        const uuid = toUUID(userId);
        // Step 1 -> Get All Comments Made By User from CASSANDRA
        const casQuery = `
            select sspc_id as commentid, sspc_content as comment, 
            sspc_sfmm_id as userid, sspc_ssp_id as postid, sspc_ssc_id as statusid from satsang_social.satsang_social_post_comments
        `
        const casRes = await CassandraQuery(casQuery,[],'social')
        const casRows = [...casRes.rows];
        if(!casRows.length) return null

        // Step 1.1 -> Filter comments NOT created by the same user
        const otherUsersComments = casRows.filter(
            (r: any) => r.userId?.toString() !== uuid.toString()
        );

        console.log(`Other Users Comments - ${JSON.stringify(otherUsersComments)}`);

        if (!otherUsersComments.length) return null;

        // Step 2 -> Extract Unique PostIds from Comments
        const postIds = [... new Set(otherUsersComments.map((r:any)=>r.postid?.toString()).filter(Boolean))]
        if(!postIds.length) return null

        // Step 3 -> Fetch Posts from POSTGRESQL
        const pgQuery = `
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
            select ssp.ssp_id as postid, ssp.ssp_sfmm_id as userid, 
            ssp.ssp_caption as caption, spmm.spmm_smm_id as postmediaid, ssp.ssp_ssc_id as poststatusid 
            from satsang_social.satsang_social_posts ssp
            inner join satsang_social.satsang_post_media_map spmm on ssp.ssp_id = spmm.spmm_ssp_id 
            and spmm.spmm_post_category_ssc_id =300 and spmm.spmm_is_attached_ssc_id =350
            and spmm.spmm_smm_id is not null
            inner join friends_of_friends af on af.fof_id = ssp.ssp_sfmm_id and
            ssp.ssp_id = ANY($2::uuid[])
        `
        const pgRes = await PgSocialClient.query(pgQuery,[userId,postIds])

        let filteredPosts: any[]=[]

        // Step 4: Filter posts based on requested type
        if(type==="deleted"){
            filteredPosts = pgRes.rows.filter((p:any)=>Number(p?.poststatusid)===200)
        }
        else if(type==="hidden"){
            filteredPosts = pgRes.rows.filter((p:any)=>Number(p?.poststatusid)===201)
        }
        else if(type==="public"){
            filteredPosts = pgRes.rows.filter((p:any)=>Number(p?.poststatusid)===204)
        }
        else if(type==="friends visibility"){
            filteredPosts = pgRes.rows.filter((p:any)=>Number(p?.poststatusid)===202)
        }
        else if(type==="fof visibility"){
            filteredPosts = pgRes.rows.filter((p:any)=>Number(p?.poststatusid)===203)
        }

        if (!filteredPosts.length) return null

        // Step 5 -> Pick Random POST (Having Comment)
        const randomPost = filteredPosts[Math.floor(Math.random()*filteredPosts.length)]

        // Step 6 -> Find Comments For Selected POST
        const filteredComments = casRows.filter((r:any)=>r.postid?.toString()===randomPost?.postid?.toString())

        if (!filteredComments.length) return null;

        // Step 7 -> 
        const randomComment = filteredComments[Math.floor(Math.random()*filteredComments.length)]

        return{
            commentId: randomComment.commentid,
            comment: randomComment.comment,
            userId: randomComment.userid,
            postId: randomComment.postid,
            statusId: randomComment.statusid
        }
    }

    async  getOthersRandomCommentMadeOnMyNonFriendsPost(userId:string, type: 'deleted'|'public'|'hidden'|'friends visibility'|'fof visibility'){
        const uuid = toUUID(userId);

        // Step 1 -> Get All Comments Made By User from CASSANDRA
        const casQuery = `
            select sspc_id as commentid, sspc_content as comment, 
            sspc_sfmm_id as userid, sspc_ssp_id as postid, sspc_ssc_id as statusid from satsang_social.satsang_social_post_comments
        `
        const casRes = await CassandraQuery(casQuery,[],'social')
        const casRows = [...casRes.rows];
        if(!casRows.length) return null

        // Step 1.1 -> Filter comments NOT created by the same user
        const otherUsersComments = casRows.filter(
            (r: any) => r.userId?.toString() !== uuid.toString()
        );

        console.log(`Other Users Comments - ${JSON.stringify(otherUsersComments)}`);

        if (!otherUsersComments.length) return null;

        // Step 2 -> Extract Unique PostIds from Comments
        const postIds = [... new Set(otherUsersComments.map((r:any)=>r.postid?.toString()).filter(Boolean))]
        if(!postIds.length) return null

        // Step 3 -> Fetch Posts from POSTGRESQL
        const pgQuery = `
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
            select ssp.ssp_id as postid, ssp.ssp_sfmm_id as userid, 
            ssp.ssp_caption as caption, spmm.spmm_smm_id as postmediaid, ssp.ssp_ssc_id as poststatusid 
            from satsang_social.satsang_social_posts ssp
            inner join satsang_social.satsang_post_media_map spmm on ssp.ssp_id = spmm.spmm_ssp_id 
            and spmm.spmm_post_category_ssc_id =300 and spmm.spmm_is_attached_ssc_id =350
            and spmm.spmm_smm_id is not null
            inner join nonSocialFriends af on af.userId = ssp.ssp_sfmm_id and
            ssp.ssp_id = ANY($2::uuid[])
        `
        const pgRes = await PgSocialClient.query(pgQuery,[userId,postIds])

        let filteredPosts: any[]=[]

        // Step 4: Filter posts based on requested type
        if(type==="deleted"){
            filteredPosts = pgRes.rows.filter((p:any)=>Number(p?.poststatusid)===200)
        }
        else if(type==="hidden"){
            filteredPosts = pgRes.rows.filter((p:any)=>Number(p?.poststatusid)===201)
        }
        else if(type==="public"){
            filteredPosts = pgRes.rows.filter((p:any)=>Number(p?.poststatusid)===204)
        }
        else if(type==="friends visibility"){
            filteredPosts = pgRes.rows.filter((p:any)=>Number(p?.poststatusid)===202)
        }
        else if(type==="fof visibility"){
            filteredPosts = pgRes.rows.filter((p:any)=>Number(p?.poststatusid)===203)
        }

        if (!filteredPosts.length) return null

        // Step 5 -> Pick Random POST (Having Comment)
        const randomPost = filteredPosts[Math.floor(Math.random()*filteredPosts.length)]

        // Step 6 -> Find Comments For Selected POST
        const filteredComments = casRows.filter((r:any)=>r.postid?.toString()===randomPost?.postid?.toString())

        if (!filteredComments.length) return null;

        // Step 7 -> 
        const randomComment = filteredComments[Math.floor(Math.random()*filteredComments.length)]

        return{
            commentId: randomComment.commentid,
            comment: randomComment.comment,
            userId: randomComment.userid,
            postId: randomComment.postid,
            statusId: randomComment.statusid
        }
    }

    // BOOKMARK REPO

    // // 1. Bookmark ready post
    // async getMyFriendsRandomPublicBookmarkReadyPost(bookmarkedByUserId:string){
    //     const myFriendId = await TestContext.services.userRepo.getRandomFriendIdWithAcceptedStatusOtherThanLoggedIn(bookmarkedByUserId)
    //     const query = `
    //     select x.postid, x.postedbyuserid, x.bookmarkedbyuserid, x.statusid from (
    //     select ssp.ssp_id as postId, ssp.ssp_sfmm_id as postedByUserId ,sspb.sspb_ssup_id as bookmarkedByUserId, sspb.sspb_ssc_id as statusId  from satsang_social.satsang_social_posts ssp 
    //     left join satsang_social.satsang_social_post_bookmarks sspb 
    //     on ssp.ssp_id =sspb.sspb_ssp_id
    //     where sspb.sspb_id is null and ssp.ssp_ssc_id = 204 and 
    //     ssp.ssp_sfmm_id =$1
    //     union
    //     select ssp.ssp_id as postId, ssp.ssp_sfmm_id as postedByUserId ,sspb.sspb_ssup_id as bookmarkedByUserId, sspb.sspb_ssc_id  from satsang_social.satsang_social_posts ssp 
    //     left join satsang_social.satsang_social_post_bookmarks sspb 
    //     on ssp.ssp_id =sspb.sspb_ssp_id
    //     where ssp.ssp_sfmm_id =$1 and sspb.sspb_ssup_id =$1 and sspb.sspb_ssc_id = 451
    //     and ssp.ssp_ssc_id = 204
    //     )x
    //     order by Random()
    //     limit 1
    //     `
    //     const result = await PgSocialClient.query(query,[myFriendId.friendId])
    //     return {
    //         postId: result.rows[0]?.postid,
    //         postedByUserId: result.rows[0]?.postedbyuserid,
    //         bookmarkedByUserId: result.rows[0]?.bookmarkedbyuserid
    //     }
    // }
    // async getMyFriendsRandomBookmarkReadyHiddenPost(bookmarkedByUserId:string){
    //     const myFriendId = await TestContext.services.userRepo.getRandomFriendIdWithAcceptedStatusOtherThanLoggedIn(bookmarkedByUserId)
    //     const query = `
    //     select x.postid, x.postedbyuserid, x.bookmarkedbyuserid, x.statusid from (
    //     select ssp.ssp_id as postId, ssp.ssp_sfmm_id as postedByUserId ,sspb.sspb_ssup_id as bookmarkedByUserId, sspb.sspb_ssc_id as statusId  from satsang_social.satsang_social_posts ssp 
    //     left join satsang_social.satsang_social_post_bookmarks sspb 
    //     on ssp.ssp_id =sspb.sspb_ssp_id
    //     where sspb.sspb_id is null and ssp.ssp_ssc_id = 201 and 
    //     ssp.ssp_sfmm_id =$1
    //     union
    //     select ssp.ssp_id as postId, ssp.ssp_sfmm_id as postedByUserId ,sspb.sspb_ssup_id as bookmarkedByUserId, sspb.sspb_ssc_id  from satsang_social.satsang_social_posts ssp 
    //     left join satsang_social.satsang_social_post_bookmarks sspb 
    //     on ssp.ssp_id =sspb.sspb_ssp_id
    //     where ssp.ssp_sfmm_id =$1 and sspb.sspb_ssup_id =$1 and sspb.sspb_ssc_id = 451
    //     and ssp.ssp_ssc_id = 201
    //     )x
    //     order by Random()
    //     limit 1
    //     `
    //     const result = await PgSocialClient.query(query,[myFriendId.friendId])
    //     return {
    //         postId: result.rows[0]?.postid,
    //         postedByUserId: result.rows[0]?.postedbyuserid,
    //         bookmarkedByUserId: result.rows[0]?.bookmarkedbyuserid
    //     }
    // }
    // async getMyFriendsRandomBookmarkReadyDeletedPost(bookmarkedByUserId:string){
    //     const myFriendId = await TestContext.services.userRepo.getRandomFriendIdWithAcceptedStatusOtherThanLoggedIn(bookmarkedByUserId)
    //     const query = `
    //     select x.postid, x.postedbyuserid, x.bookmarkedbyuserid, x.statusid from (
    //     select ssp.ssp_id as postId, ssp.ssp_sfmm_id as postedByUserId ,sspb.sspb_ssup_id as bookmarkedByUserId, sspb.sspb_ssc_id as statusId  from satsang_social.satsang_social_posts ssp 
    //     left join satsang_social.satsang_social_post_bookmarks sspb 
    //     on ssp.ssp_id =sspb.sspb_ssp_id
    //     where sspb.sspb_id is null and ssp.ssp_ssc_id = 200 and 
    //     ssp.ssp_sfmm_id =$1
    //     union
    //     select ssp.ssp_id as postId, ssp.ssp_sfmm_id as postedByUserId ,sspb.sspb_ssup_id as bookmarkedByUserId, sspb.sspb_ssc_id  from satsang_social.satsang_social_posts ssp 
    //     left join satsang_social.satsang_social_post_bookmarks sspb 
    //     on ssp.ssp_id =sspb.sspb_ssp_id
    //     where ssp.ssp_sfmm_id =$1 and sspb.sspb_ssup_id =$1 and sspb.sspb_ssc_id = 451
    //     and ssp.ssp_ssc_id = 200
    //     )x
    //     order by Random()
    //     limit 1
    //     `
    //     const result = await PgSocialClient.query(query,[myFriendId.friendId])
    //     return {
    //         postId: result.rows[0]?.postid,
    //         postedByUserId: result.rows[0]?.postedbyuserid,
    //         bookmarkedByUserId: result.rows[0]?.bookmarkedbyuserid
    //     }
    // }
    // async getMyFriendsRandomBookmarkReadyPostWithFriendsVisibility(bookmarkedByUserId:string){
    //     const myFriendId = await TestContext.services.userRepo.getRandomFriendIdWithAcceptedStatusOtherThanLoggedIn(bookmarkedByUserId)
    //     const query = `
    //     select x.postid, x.postedbyuserid, x.bookmarkedbyuserid, x.statusid from (
    //     select ssp.ssp_id as postId, ssp.ssp_sfmm_id as postedByUserId ,sspb.sspb_ssup_id as bookmarkedByUserId, sspb.sspb_ssc_id as statusId  from satsang_social.satsang_social_posts ssp 
    //     left join satsang_social.satsang_social_post_bookmarks sspb 
    //     on ssp.ssp_id =sspb.sspb_ssp_id
    //     where sspb.sspb_id is null and ssp.ssp_ssc_id = 202  and 
    //     ssp.ssp_sfmm_id =$1
    //     union
    //     select ssp.ssp_id as postId, ssp.ssp_sfmm_id as postedByUserId ,sspb.sspb_ssup_id as bookmarkedByUserId, sspb.sspb_ssc_id  from satsang_social.satsang_social_posts ssp 
    //     left join satsang_social.satsang_social_post_bookmarks sspb 
    //     on ssp.ssp_id =sspb.sspb_ssp_id
    //     where ssp.ssp_sfmm_id =$1 and sspb.sspb_ssup_id =$1 and sspb.sspb_ssc_id = 451
    //     and ssp.ssp_ssc_id = 202
    //     )x
    //     order by Random()
    //     limit 1
    //     `
    //     const result = await PgSocialClient.query(query,[myFriendId.friendId])
    //     return {
    //         postId: result.rows[0]?.postid,
    //         postedByUserId: result.rows[0]?.postedbyuserid,
    //         bookmarkedByUserId: result.rows[0]?.bookmarkedbyuserid
    //     }
    // }
    // async getMyFriendsRandomBookmarkReadyPostWithFriendsOfFriendsVisibility(bookmarkedByUserId:string){
    //     const myFriendId = await TestContext.services.userRepo.getRandomFriendIdWithAcceptedStatusOtherThanLoggedIn(bookmarkedByUserId)
    //     const query = `
    //     select x.postid, x.postedbyuserid, x.bookmarkedbyuserid, x.statusid from (
    //     select ssp.ssp_id as postId, ssp.ssp_sfmm_id as postedByUserId ,sspb.sspb_ssup_id as bookmarkedByUserId, sspb.sspb_ssc_id as statusId  from satsang_social.satsang_social_posts ssp 
    //     left join satsang_social.satsang_social_post_bookmarks sspb 
    //     on ssp.ssp_id =sspb.sspb_ssp_id
    //     where sspb.sspb_id is null and ssp.ssp_ssc_id = 203 and 
    //     ssp.ssp_sfmm_id =$1
    //     union
    //     select ssp.ssp_id as postId, ssp.ssp_sfmm_id as postedByUserId ,sspb.sspb_ssup_id as bookmarkedByUserId, sspb.sspb_ssc_id  from satsang_social.satsang_social_posts ssp 
    //     left join satsang_social.satsang_social_post_bookmarks sspb 
    //     on ssp.ssp_id =sspb.sspb_ssp_id
    //     where ssp.ssp_sfmm_id =$1 and sspb.sspb_ssup_id =$1 and sspb.sspb_ssc_id = 451
    //     and ssp.ssp_ssc_id = 203
    //     )x
    //     order by Random()
    //     limit 1
    //     `
    //     const result = await PgSocialClient.query(query,[myFriendId.friendId])
    //     return {
    //         postId: result.rows[0]?.postid,
    //         postedByUserId: result.rows[0]?.postedbyuserid,
    //         bookmarkedByUserId: result.rows[0]?.bookmarkedbyuserid
    //     }
    // }



    // async getMyFriendsOfFriendsRandomBookmarkReadyPublicPost(bookmarkedByUserId:string){
    //     const myFriendId = await TestContext.services.userRepo.getValidFriendsOfFriendId(bookmarkedByUserId)
    //     const query = `
    //     select x.postid, x.postedbyuserid, x.bookmarkedbyuserid, x.statusid from (
    //     select ssp.ssp_id as postId, ssp.ssp_sfmm_id as postedByUserId ,sspb.sspb_ssup_id as bookmarkedByUserId, sspb.sspb_ssc_id as statusId  from satsang_social.satsang_social_posts ssp 
    //     left join satsang_social.satsang_social_post_bookmarks sspb 
    //     on ssp.ssp_id =sspb.sspb_ssp_id
    //     where sspb.sspb_id is null and ssp.ssp_ssc_id = 204 and 
    //     ssp.ssp_sfmm_id =$1
    //     union
    //     select ssp.ssp_id as postId, ssp.ssp_sfmm_id as postedByUserId ,sspb.sspb_ssup_id as bookmarkedByUserId, sspb.sspb_ssc_id  from satsang_social.satsang_social_posts ssp 
    //     left join satsang_social.satsang_social_post_bookmarks sspb 
    //     on ssp.ssp_id =sspb.sspb_ssp_id
    //     where ssp.ssp_sfmm_id =$1 and sspb.sspb_ssup_id =$1 and sspb.sspb_ssc_id = 451
    //     and ssp.ssp_ssc_id = 204
    //     )x
    //     order by Random()
    //     limit 1
    //     `
    //     const result = await PgSocialClient.query(query,[myFriendId.friendId])
    //     return {
    //         postId: result.rows[0]?.postid,
    //         postedByUserId: result.rows[0]?.postedbyuserid,
    //         bookmarkedByUserId: result.rows[0]?.bookmarkedbyuserid
    //     }
    // }
    // async getMyFriendsOfFriendsRandomBookmarkReadyHiddenPost(bookmarkedByUserId:string){
    //     const myFriendId = await TestContext.services.userRepo.getValidFriendsOfFriendId(bookmarkedByUserId)
    //     const query = `
    //     select x.postid, x.postedbyuserid, x.bookmarkedbyuserid, x.statusid from (
    //     select ssp.ssp_id as postId, ssp.ssp_sfmm_id as postedByUserId ,sspb.sspb_ssup_id as bookmarkedByUserId, sspb.sspb_ssc_id as statusId  from satsang_social.satsang_social_posts ssp 
    //     left join satsang_social.satsang_social_post_bookmarks sspb 
    //     on ssp.ssp_id =sspb.sspb_ssp_id
    //     where sspb.sspb_id is null and ssp.ssp_ssc_id = 201 and 
    //     ssp.ssp_sfmm_id =$1
    //     union
    //     select ssp.ssp_id as postId, ssp.ssp_sfmm_id as postedByUserId ,sspb.sspb_ssup_id as bookmarkedByUserId, sspb.sspb_ssc_id  from satsang_social.satsang_social_posts ssp 
    //     left join satsang_social.satsang_social_post_bookmarks sspb 
    //     on ssp.ssp_id =sspb.sspb_ssp_id
    //     where ssp.ssp_sfmm_id =$1 and sspb.sspb_ssup_id =$1 and sspb.sspb_ssc_id = 451
    //     and ssp.ssp_ssc_id = 201
    //     )x
    //     order by Random()
    //     limit 1
    //     `
    //     const result = await PgSocialClient.query(query,[myFriendId.friendId])
    //     return {
    //         postId: result.rows[0]?.postid,
    //         postedByUserId: result.rows[0]?.postedbyuserid,
    //         bookmarkedByUserId: result.rows[0]?.bookmarkedbyuserid
    //     }
    // }
    // async getMyFriendsOfFriendsRandomBookmarkReadyDeletedPost(bookmarkedByUserId:string){
    //     const myFriendId = await TestContext.services.userRepo.getValidFriendsOfFriendId(bookmarkedByUserId)
    //     const query = `
    //     select x.postid, x.postedbyuserid, x.bookmarkedbyuserid, x.statusid from (
    //     select ssp.ssp_id as postId, ssp.ssp_sfmm_id as postedByUserId ,sspb.sspb_ssup_id as bookmarkedByUserId, sspb.sspb_ssc_id as statusId  from satsang_social.satsang_social_posts ssp 
    //     left join satsang_social.satsang_social_post_bookmarks sspb 
    //     on ssp.ssp_id =sspb.sspb_ssp_id
    //     where sspb.sspb_id is null and ssp.ssp_ssc_id = 200 and 
    //     ssp.ssp_sfmm_id =$1
    //     union
    //     select ssp.ssp_id as postId, ssp.ssp_sfmm_id as postedByUserId ,sspb.sspb_ssup_id as bookmarkedByUserId, sspb.sspb_ssc_id  from satsang_social.satsang_social_posts ssp 
    //     left join satsang_social.satsang_social_post_bookmarks sspb 
    //     on ssp.ssp_id =sspb.sspb_ssp_id
    //     where ssp.ssp_sfmm_id =$1 and sspb.sspb_ssup_id =$1 and sspb.sspb_ssc_id = 451
    //     and ssp.ssp_ssc_id = 200
    //     )x
    //     order by Random()
    //     limit 1
    //     `
    //     const result = await PgSocialClient.query(query,[myFriendId.friendId])
    //     return {
    //         postId: result.rows[0]?.postid,
    //         postedByUserId: result.rows[0]?.postedbyuserid,
    //         bookmarkedByUserId: result.rows[0]?.bookmarkedbyuserid
    //     }
    // }
    // async getMyFriendsOfFriendsRandomBookmarkReadyPostWithFriendsVisibility(bookmarkedByUserId:string){
    //     const myFriendId = await TestContext.services.userRepo.getValidFriendsOfFriendId(bookmarkedByUserId)
    //     const query = `
    //     select x.postid, x.postedbyuserid, x.bookmarkedbyuserid, x.statusid from (
    //     select ssp.ssp_id as postId, ssp.ssp_sfmm_id as postedByUserId ,sspb.sspb_ssup_id as bookmarkedByUserId, sspb.sspb_ssc_id as statusId  from satsang_social.satsang_social_posts ssp 
    //     left join satsang_social.satsang_social_post_bookmarks sspb 
    //     on ssp.ssp_id =sspb.sspb_ssp_id
    //     where sspb.sspb_id is null and ssp.ssp_ssc_id = 202 and 
    //     ssp.ssp_sfmm_id =$1
    //     union
    //     select ssp.ssp_id as postId, ssp.ssp_sfmm_id as postedByUserId ,sspb.sspb_ssup_id as bookmarkedByUserId, sspb.sspb_ssc_id  from satsang_social.satsang_social_posts ssp 
    //     left join satsang_social.satsang_social_post_bookmarks sspb 
    //     on ssp.ssp_id =sspb.sspb_ssp_id
    //     where ssp.ssp_sfmm_id =$1 and sspb.sspb_ssup_id =$1 and sspb.sspb_ssc_id = 451
    //     and ssp.ssp_ssc_id = 202
    //     )x
    //     order by Random()
    //     limit 1
    //     `
    //     const result = await PgSocialClient.query(query,[myFriendId.friendId])
    //     return {
    //         postId: result.rows[0]?.postid,
    //         postedByUserId: result.rows[0]?.postedbyuserid,
    //         bookmarkedByUserId: result.rows[0]?.bookmarkedbyuserid
    //     }
    // }
    // async getMyFriendsOfFriendsRandomBookmarkReadyPostWithFriendsOfFriendVisibility(bookmarkedByUserId:string){
    //     const myFriendId = await TestContext.services.userRepo.getValidFriendsOfFriendId(bookmarkedByUserId)
    //     const query = `
    //     select x.postid, x.postedbyuserid, x.bookmarkedbyuserid, x.statusid from (
    //     select ssp.ssp_id as postId, ssp.ssp_sfmm_id as postedByUserId ,sspb.sspb_ssup_id as bookmarkedByUserId, sspb.sspb_ssc_id as statusId  from satsang_social.satsang_social_posts ssp 
    //     left join satsang_social.satsang_social_post_bookmarks sspb 
    //     on ssp.ssp_id =sspb.sspb_ssp_id
    //     where sspb.sspb_id is null and ssp.ssp_ssc_id = 203 and 
    //     ssp.ssp_sfmm_id =$1
    //     union
    //     select ssp.ssp_id as postId, ssp.ssp_sfmm_id as postedByUserId ,sspb.sspb_ssup_id as bookmarkedByUserId, sspb.sspb_ssc_id  from satsang_social.satsang_social_posts ssp 
    //     left join satsang_social.satsang_social_post_bookmarks sspb 
    //     on ssp.ssp_id =sspb.sspb_ssp_id
    //     where ssp.ssp_sfmm_id =$1 and sspb.sspb_ssup_id =$1 and sspb.sspb_ssc_id = 451
    //     and ssp.ssp_ssc_id = 203
    //     )x
    //     order by Random()
    //     limit 1
    //     `
    //     const result = await PgSocialClient.query(query,[myFriendId.friendId])
    //     return {
    //         postId: result.rows[0]?.postid,
    //         postedByUserId: result.rows[0]?.postedbyuserid,
    //         bookmarkedByUserId: result.rows[0]?.bookmarkedbyuserid
    //     }
    // }

    // async getMyNonFriendsRandomBookmarkReadyPublicPost(bookmarkedByUserId:string){
    //     const myFriendId = await TestContext.services.userRepo.getRandomNonSocialFriendId(bookmarkedByUserId)
    //     const query = `
    //     select x.postid, x.postedbyuserid, x.bookmarkedbyuserid, x.statusid from (
    //     select ssp.ssp_id as postId, ssp.ssp_sfmm_id as postedByUserId ,sspb.sspb_ssup_id as bookmarkedByUserId, sspb.sspb_ssc_id as statusId  from satsang_social.satsang_social_posts ssp 
    //     left join satsang_social.satsang_social_post_bookmarks sspb 
    //     on ssp.ssp_id =sspb.sspb_ssp_id
    //     where sspb.sspb_id is null and ssp.ssp_ssc_id = 204 and 
    //     ssp.ssp_sfmm_id =$1
    //     union
    //     select ssp.ssp_id as postId, ssp.ssp_sfmm_id as postedByUserId ,sspb.sspb_ssup_id as bookmarkedByUserId, sspb.sspb_ssc_id  from satsang_social.satsang_social_posts ssp 
    //     left join satsang_social.satsang_social_post_bookmarks sspb 
    //     on ssp.ssp_id =sspb.sspb_ssp_id
    //     where ssp.ssp_sfmm_id =$1 and sspb.sspb_ssup_id =$1 and sspb.sspb_ssc_id = 451
    //     and ssp.ssp_ssc_id = 204
    //     )x
    //     order by Random()
    //     limit 1
    //     `
    //     const result = await PgSocialClient.query(query,[myFriendId])
    //     return {
    //         postId: result.rows[0]?.postid,
    //         postedByUserId: result.rows[0]?.postedbyuserid,
    //         bookmarkedByUserId: result.rows[0]?.bookmarkedbyuserid
    //     }
    // }
    // async getMyNonFriendsRandomBookmarkReadyHiddenPost(bookmarkedByUserId:string){
    //     const myFriendId = await TestContext.services.userRepo.getRandomNonSocialFriendId(bookmarkedByUserId)
    //     const query = `
    //     select x.postid, x.postedbyuserid, x.bookmarkedbyuserid, x.statusid from (
    //     select ssp.ssp_id as postId, ssp.ssp_sfmm_id as postedByUserId ,sspb.sspb_ssup_id as bookmarkedByUserId, sspb.sspb_ssc_id as statusId  from satsang_social.satsang_social_posts ssp 
    //     left join satsang_social.satsang_social_post_bookmarks sspb 
    //     on ssp.ssp_id =sspb.sspb_ssp_id
    //     where sspb.sspb_id is null and ssp.ssp_ssc_id = 201 and 
    //     ssp.ssp_sfmm_id =$1
    //     union
    //     select ssp.ssp_id as postId, ssp.ssp_sfmm_id as postedByUserId ,sspb.sspb_ssup_id as bookmarkedByUserId, sspb.sspb_ssc_id  from satsang_social.satsang_social_posts ssp 
    //     left join satsang_social.satsang_social_post_bookmarks sspb 
    //     on ssp.ssp_id =sspb.sspb_ssp_id
    //     where ssp.ssp_sfmm_id =$1 and sspb.sspb_ssup_id =$1 and sspb.sspb_ssc_id = 451
    //     and ssp.ssp_ssc_id = 201
    //     )x
    //     order by Random()
    //     limit 1
    //     `
    //     const result = await PgSocialClient.query(query,[myFriendId])
    //     return {
    //         postId: result.rows[0]?.postid,
    //         postedByUserId: result.rows[0]?.postedbyuserid,
    //         bookmarkedByUserId: result.rows[0]?.bookmarkedbyuserid
    //     }
    // }
    // async getMyNonFriendsRandomBookmarkReadyDeletedPost(bookmarkedByUserId:string){
    //     const myFriendId = await TestContext.services.userRepo.getRandomNonSocialFriendId(bookmarkedByUserId)
    //     const query = `
    //     select x.postid, x.postedbyuserid, x.bookmarkedbyuserid, x.statusid from (
    //     select ssp.ssp_id as postId, ssp.ssp_sfmm_id as postedByUserId ,sspb.sspb_ssup_id as bookmarkedByUserId, sspb.sspb_ssc_id as statusId  from satsang_social.satsang_social_posts ssp 
    //     left join satsang_social.satsang_social_post_bookmarks sspb 
    //     on ssp.ssp_id =sspb.sspb_ssp_id
    //     where sspb.sspb_id is null and ssp.ssp_ssc_id = 200 and 
    //     ssp.ssp_sfmm_id =$1
    //     union
    //     select ssp.ssp_id as postId, ssp.ssp_sfmm_id as postedByUserId ,sspb.sspb_ssup_id as bookmarkedByUserId, sspb.sspb_ssc_id  from satsang_social.satsang_social_posts ssp 
    //     left join satsang_social.satsang_social_post_bookmarks sspb 
    //     on ssp.ssp_id =sspb.sspb_ssp_id
    //     where ssp.ssp_sfmm_id =$1 and sspb.sspb_ssup_id =$1 and sspb.sspb_ssc_id = 451
    //     and ssp.ssp_ssc_id = 200
    //     )x
    //     order by Random()
    //     limit 1
    //     `
    //     const result = await PgSocialClient.query(query,[myFriendId])
    //     return {
    //         postId: result.rows[0]?.postid,
    //         postedByUserId: result.rows[0]?.postedbyuserid,
    //         bookmarkedByUserId: result.rows[0]?.bookmarkedbyuserid
    //     }
    // }
    // async getMyNonFriendsRandomBookmarkReadyPostWithFriendsVisibility(bookmarkedByUserId:string){
    //     const myFriendId = await TestContext.services.userRepo.getRandomNonSocialFriendId(bookmarkedByUserId)
    //     const query = `
    //     select x.postid, x.postedbyuserid, x.bookmarkedbyuserid, x.statusid from (
    //     select ssp.ssp_id as postId, ssp.ssp_sfmm_id as postedByUserId ,sspb.sspb_ssup_id as bookmarkedByUserId, sspb.sspb_ssc_id as statusId  from satsang_social.satsang_social_posts ssp 
    //     left join satsang_social.satsang_social_post_bookmarks sspb 
    //     on ssp.ssp_id =sspb.sspb_ssp_id
    //     where sspb.sspb_id is null and ssp.ssp_ssc_id = 202 and 
    //     ssp.ssp_sfmm_id =$1
    //     union
    //     select ssp.ssp_id as postId, ssp.ssp_sfmm_id as postedByUserId ,sspb.sspb_ssup_id as bookmarkedByUserId, sspb.sspb_ssc_id  from satsang_social.satsang_social_posts ssp 
    //     left join satsang_social.satsang_social_post_bookmarks sspb 
    //     on ssp.ssp_id =sspb.sspb_ssp_id
    //     where ssp.ssp_sfmm_id =$1 and sspb.sspb_ssup_id =$1 and sspb.sspb_ssc_id = 451
    //     and ssp.ssp_ssc_id = 202
    //     )x
    //     order by Random()
    //     limit 1
    //     `
    //     const result = await PgSocialClient.query(query,[myFriendId])
    //     return {
    //         postId: result.rows[0]?.postid,
    //         postedByUserId: result.rows[0]?.postedbyuserid,
    //         bookmarkedByUserId: result.rows[0]?.bookmarkedbyuserid
    //     }
    // }
    // async getMyNonFriendsRandomBookmarkReadyPostWithFriendsOfFriendVisibility(bookmarkedByUserId:string){
    //     const myFriendId = await TestContext.services.userRepo.getRandomNonSocialFriendId(bookmarkedByUserId)
    //     const query = `
    //     select x.postid, x.postedbyuserid, x.bookmarkedbyuserid, x.statusid from (
    //     select ssp.ssp_id as postId, ssp.ssp_sfmm_id as postedByUserId ,sspb.sspb_ssup_id as bookmarkedByUserId, sspb.sspb_ssc_id as statusId  from satsang_social.satsang_social_posts ssp 
    //     left join satsang_social.satsang_social_post_bookmarks sspb 
    //     on ssp.ssp_id =sspb.sspb_ssp_id
    //     where sspb.sspb_id is null and ssp.ssp_ssc_id = 203 and 
    //     ssp.ssp_sfmm_id =$1
    //     union
    //     select ssp.ssp_id as postId, ssp.ssp_sfmm_id as postedByUserId ,sspb.sspb_ssup_id as bookmarkedByUserId, sspb.sspb_ssc_id  from satsang_social.satsang_social_posts ssp 
    //     left join satsang_social.satsang_social_post_bookmarks sspb 
    //     on ssp.ssp_id =sspb.sspb_ssp_id
    //     where ssp.ssp_sfmm_id =$1 and sspb.sspb_ssup_id =$1 and sspb.sspb_ssc_id = 451
    //     and ssp.ssp_ssc_id = 203
    //     )x
    //     order by Random()
    //     limit 1
    //     `
    //     const result = await PgSocialClient.query(query,[myFriendId])
    //     return {
    //         postId: result.rows[0]?.postid,
    //         postedByUserId: result.rows[0]?.postedbyuserid,
    //         bookmarkedByUserId: result.rows[0]?.bookmarkedbyuserid
    //     }
    // }

    // async getMyRandomBookmarkReadyPublicPost(bookmarkedByUserId:string){
    //     const query = `
    //     select x.postid, x.postedbyuserid, x.bookmarkedbyuserid, x.statusid from (
    //     select ssp.ssp_id as postId, ssp.ssp_sfmm_id as postedByUserId ,sspb.sspb_ssup_id as bookmarkedByUserId, sspb.sspb_ssc_id as statusId  from satsang_social.satsang_social_posts ssp 
    //     left join satsang_social.satsang_social_post_bookmarks sspb 
    //     on ssp.ssp_id =sspb.sspb_ssp_id
    //     where sspb.sspb_id is null and ssp.ssp_ssc_id = 204 and 
    //     ssp.ssp_sfmm_id =$1
    //     union
    //     select ssp.ssp_id as postId, ssp.ssp_sfmm_id as postedByUserId ,sspb.sspb_ssup_id as bookmarkedByUserId, sspb.sspb_ssc_id  from satsang_social.satsang_social_posts ssp 
    //     left join satsang_social.satsang_social_post_bookmarks sspb 
    //     on ssp.ssp_id =sspb.sspb_ssp_id
    //     where ssp.ssp_sfmm_id =$1 and sspb.sspb_ssup_id =$1 and sspb.sspb_ssc_id = 451
    //     and ssp.ssp_ssc_id = 204
    //     )x
    //     order by Random()
    //     limit 1
    //     `
    //     const result = await PgSocialClient.query(query,[bookmarkedByUserId])
    //     return {
    //         postId: result.rows[0]?.postid,
    //         postedByUserId: result.rows[0]?.postedbyuserid,
    //         bookmarkedByUserId: result.rows[0]?.bookmarkedbyuserid
    //     }
    // }
    // async getMyRandomBookmarkReadyHiddenPost(bookmarkedByUserId:string){
    //     const query = `
    //     select x.postid, x.postedbyuserid, x.bookmarkedbyuserid, x.statusid from (
    //     select ssp.ssp_id as postId, ssp.ssp_sfmm_id as postedByUserId ,sspb.sspb_ssup_id as bookmarkedByUserId, sspb.sspb_ssc_id as statusId  from satsang_social.satsang_social_posts ssp 
    //     left join satsang_social.satsang_social_post_bookmarks sspb 
    //     on ssp.ssp_id =sspb.sspb_ssp_id
    //     where sspb.sspb_id is null and ssp.ssp_ssc_id = 201 and 
    //     ssp.ssp_sfmm_id =$1
    //     union
    //     select ssp.ssp_id as postId, ssp.ssp_sfmm_id as postedByUserId ,sspb.sspb_ssup_id as bookmarkedByUserId, sspb.sspb_ssc_id  from satsang_social.satsang_social_posts ssp 
    //     left join satsang_social.satsang_social_post_bookmarks sspb 
    //     on ssp.ssp_id =sspb.sspb_ssp_id
    //     where ssp.ssp_sfmm_id =$1 and sspb.sspb_ssup_id =$1 and sspb.sspb_ssc_id = 451
    //     and ssp.ssp_ssc_id = 201
    //     )x
    //     order by Random()
    //     limit 1
    //     `
    //     const result = await PgSocialClient.query(query,[bookmarkedByUserId])
    //     return {
    //         postId: result.rows[0]?.postid,
    //         postedByUserId: result.rows[0]?.postedbyuserid,
    //         bookmarkedByUserId: result.rows[0]?.bookmarkedbyuserid
    //     }
    // }
    // async getMyRandomBookmarkReadyDeletedPost(bookmarkedByUserId:string){
    //     const query = `
    //     select x.postid, x.postedbyuserid, x.bookmarkedbyuserid, x.statusid from (
    //     select ssp.ssp_id as postId, ssp.ssp_sfmm_id as postedByUserId ,sspb.sspb_ssup_id as bookmarkedByUserId, sspb.sspb_ssc_id as statusId  from satsang_social.satsang_social_posts ssp 
    //     left join satsang_social.satsang_social_post_bookmarks sspb 
    //     on ssp.ssp_id =sspb.sspb_ssp_id
    //     where sspb.sspb_id is null and ssp.ssp_ssc_id = 200 and 
    //     ssp.ssp_sfmm_id =$1
    //     union
    //     select ssp.ssp_id as postId, ssp.ssp_sfmm_id as postedByUserId ,sspb.sspb_ssup_id as bookmarkedByUserId, sspb.sspb_ssc_id  from satsang_social.satsang_social_posts ssp 
    //     left join satsang_social.satsang_social_post_bookmarks sspb 
    //     on ssp.ssp_id =sspb.sspb_ssp_id
    //     where ssp.ssp_sfmm_id =$1 and sspb.sspb_ssup_id =$1 and sspb.sspb_ssc_id = 451
    //     and ssp.ssp_ssc_id = 200
    //     )x
    //     order by Random()
    //     limit 1
    //     `
    //     const result = await PgSocialClient.query(query,[bookmarkedByUserId])
    //     return {
    //         postId: result.rows[0]?.postid,
    //         postedByUserId: result.rows[0]?.postedbyuserid,
    //         bookmarkedByUserId: result.rows[0]?.bookmarkedbyuserid
    //     }
    // }
    // async getMyRandomBookmarkReadyPostWithFriendsVisibility(bookmarkedByUserId:string){
    //     const query = `
    //     select x.postid, x.postedbyuserid, x.bookmarkedbyuserid, x.statusid from (
    //     select ssp.ssp_id as postId, ssp.ssp_sfmm_id as postedByUserId ,sspb.sspb_ssup_id as bookmarkedByUserId, sspb.sspb_ssc_id as statusId  from satsang_social.satsang_social_posts ssp 
    //     left join satsang_social.satsang_social_post_bookmarks sspb 
    //     on ssp.ssp_id =sspb.sspb_ssp_id
    //     where sspb.sspb_id is null and ssp.ssp_ssc_id = 202 and 
    //     ssp.ssp_sfmm_id =$1
    //     union
    //     select ssp.ssp_id as postId, ssp.ssp_sfmm_id as postedByUserId ,sspb.sspb_ssup_id as bookmarkedByUserId, sspb.sspb_ssc_id  from satsang_social.satsang_social_posts ssp 
    //     left join satsang_social.satsang_social_post_bookmarks sspb 
    //     on ssp.ssp_id =sspb.sspb_ssp_id
    //     where ssp.ssp_sfmm_id =$1 and sspb.sspb_ssup_id =$1 and sspb.sspb_ssc_id = 451
    //     and ssp.ssp_ssc_id = 202
    //     )x
    //     order by Random()
    //     limit 1
    //     `
    //     const result = await PgSocialClient.query(query,[bookmarkedByUserId])
    //     return {
    //         postId: result.rows[0]?.postid,
    //         postedByUserId: result.rows[0]?.postedbyuserid,
    //         bookmarkedByUserId: result.rows[0]?.bookmarkedbyuserid
    //     }
    // }
    // async getMyRandomBookmarkReadyPostWithFriendsOfFriendsVisibility(bookmarkedByUserId:string){
    //     const query = `
    //     select x.postid, x.postedbyuserid, x.bookmarkedbyuserid, x.statusid from (
    //     select ssp.ssp_id as postId, ssp.ssp_sfmm_id as postedByUserId ,sspb.sspb_ssup_id as bookmarkedByUserId, sspb.sspb_ssc_id as statusId  from satsang_social.satsang_social_posts ssp 
    //     left join satsang_social.satsang_social_post_bookmarks sspb 
    //     on ssp.ssp_id =sspb.sspb_ssp_id
    //     where sspb.sspb_id is null and ssp.ssp_ssc_id = 203 and 
    //     ssp.ssp_sfmm_id =$1
    //     union
    //     select ssp.ssp_id as postId, ssp.ssp_sfmm_id as postedByUserId ,sspb.sspb_ssup_id as bookmarkedByUserId, sspb.sspb_ssc_id  from satsang_social.satsang_social_posts ssp 
    //     left join satsang_social.satsang_social_post_bookmarks sspb 
    //     on ssp.ssp_id =sspb.sspb_ssp_id
    //     where ssp.ssp_sfmm_id =$1 and sspb.sspb_ssup_id =$1 and sspb.sspb_ssc_id = 451
    //     and ssp.ssp_ssc_id = 203
    //     )x
    //     order by Random()
    //     limit 1
    //     `
    //     const result = await PgSocialClient.query(query,[bookmarkedByUserId])
    //     return {
    //         postId: result.rows[0]?.postid,
    //         postedByUserId: result.rows[0]?.postedbyuserid,
    //         bookmarkedByUserId: result.rows[0]?.bookmarkedbyuserid
    //     }
    // }

    //1. Never Bookmarked Posts
    async getMyRandomNeverBookmarkedPost(userId:string, type:'public'|'hidden'|'deleted'|'friends visibility'|'fof visibility'){
        let postType:any
        switch (type){
            case 'public':
                postType = 204
                break;
            case 'fof visibility':
                postType = 203
                break;
            case 'deleted':
                postType = 200
                break;
            case 'friends visibility':
                postType = 202
                break;
            case 'hidden':
                postType = 201
                break;
        default:
            postType = 204
        }
        console.log(`userId is ${userId}`)
        console.log(`postType is ${postType}`)
        const query = `
        select x.postid, x.postedbyuserid, x.bookmarkedbyuserid, x.statusid from (
        select ssp.ssp_id as postId, ssp.ssp_sfmm_id as postedByUserId ,sspb.sspb_ssup_id as bookmarkedByUserId, sspb.sspb_ssc_id as statusId  
        from satsang_social.satsang_social_posts ssp 
        left join satsang_social.satsang_social_post_bookmarks sspb 
        on ssp.ssp_id =sspb.sspb_ssp_id
        where sspb.sspb_id is null and
        ssp.ssp_sfmm_id =$1 and ssp.ssp_ssc_id=$2)x
        order by Random()
        limit 1
        `
        const result = await PgSocialClient.query(query,[userId,postType])
        console.log(`result is ${JSON.stringify(result)}`)
        return {
            postId: result.rows[0]?.postid,
            postedByUserId: result.rows[0]?.postedbyuserid,
            bookmarkedByUserId: result.rows[0]?.bookmarkedbyuserid
        }
    }


    async getMyFriendsRandomNeverBookmarkedPost(userId:string, type:'public'|'hidden'|'deleted'|'friends visibility'|'fof visibility'){
        let postType:any
        switch (type){
            case 'public':
                postType = 204
                break;
            case 'fof visibility':
                postType = 203
                break;
            case 'deleted':
                postType = 200
                break;
            case 'friends visibility':
                postType = 202
                break;
            case 'hidden':
                postType = 201
                break;
        default:
            postType = 204
        }

        const query = `
        with myFriends as(
        select distinct 
        case when ssf.ssf_sfmm1_id = $1 then ssf.ssf_sfmm2_id
        when ssf.ssf_sfmm2_id = $1 then ssf.ssf_sfmm1_id
        end as friendId
        from satsang_social.satsang_social_friends ssf 
        where ssf.ssf_sfmm1_id = $1
        or ssf.ssf_sfmm2_id = $1
        )
        select x.postid, x.postedbyuserid, x.bookmarkedbyuserid, x.statusid from (
        select ssp.ssp_id as postId, ssp.ssp_sfmm_id as postedByUserId ,sspb.sspb_ssup_id as bookmarkedByUserId, sspb.sspb_ssc_id as statusId  from satsang_social.satsang_social_posts ssp 
        left join satsang_social.satsang_social_post_bookmarks sspb 
        on ssp.ssp_id =sspb.sspb_ssp_id
        inner join myFriends mf on ssp.ssp_sfmm_id = mf.friendid
        where sspb.sspb_id is null and ssp.ssp_ssc_id=$2)x
        order by Random()
        limit 1
        `
        const result = await PgSocialClient.query(query,[userId,postType])
        return {
            postId: result.rows[0]?.postid,
            postedByUserId: result.rows[0]?.postedbyuserid,
            bookmarkedByUserId: result.rows[0]?.bookmarkedbyuserid
        }
    }



    async getMyFriendsFriendsRandomNeverBookmarkedPost(userId:string, type:'public'|'hidden'|'deleted'|'friends visibility'|'fof visibility'){
        let postType:any
        switch (type){
            case 'public':
                postType = 204
                break;
            case 'fof visibility':
                postType = 203
                break;
            case 'deleted':
                postType = 200
                break;
            case 'friends visibility':
                postType = 202
                break;
            case 'hidden':
                postType = 201
                break;
        default:
            postType = 204
        }

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
        select x.postid, x.postedbyuserid, x.bookmarkedbyuserid, x.statusid from (
        select ssp.ssp_id as postId, ssp.ssp_sfmm_id as postedByUserId ,sspb.sspb_ssup_id as bookmarkedByUserId, sspb.sspb_ssc_id as statusId  from satsang_social.satsang_social_posts ssp 
        left join satsang_social.satsang_social_post_bookmarks sspb 
        on ssp.ssp_id =sspb.sspb_ssp_id
        inner join friends_of_friends fof on ssp.ssp_sfmm_id = fof.fof_id 
        where sspb.sspb_id is null and ssp.ssp_ssc_id=$2)x
        order by Random()
        limit 1
        `
        const result = await PgSocialClient.query(query,[userId,postType])
        return {
            postId: result.rows[0]?.postid,
            postedByUserId: result.rows[0]?.postedbyuserid,
            bookmarkedByUserId: result.rows[0]?.bookmarkedbyuserid
        }
    }


    async getMyNonFriendsRandomNeverBookmarkedPost(userId:string, type:'public'|'hidden'|'deleted'|'friends visibility'|'fof visibility'){
        let postType:any
        switch (type){
            case 'public':
                postType = 204
                break;
            case 'fof visibility':
                postType = 203
                break;
            case 'deleted':
                postType = 200
                break;
            case 'friends visibility':
                postType = 202
                break;
            case 'hidden':
                postType = 201
                break;
        default:
            postType = 204
        }

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
        select x.postid, x.postedbyuserid, x.bookmarkedbyuserid, x.statusid from (
        select ssp.ssp_id as postId, ssp.ssp_sfmm_id as postedByUserId ,sspb.sspb_ssup_id as bookmarkedByUserId, sspb.sspb_ssc_id as statusId  from satsang_social.satsang_social_posts ssp 
        left join satsang_social.satsang_social_post_bookmarks sspb 
        on ssp.ssp_id =sspb.sspb_ssp_id
        inner join nonSocialFriends nsf on ssp.ssp_sfmm_id = nsf.userid  
        where sspb.sspb_id is null and ssp.ssp_ssc_id=$2)x
        order by Random()
        limit 1
        `
        const result = await PgSocialClient.query(query,[userId,postType])
        return {
            postId: result.rows[0]?.postid,
            postedByUserId: result.rows[0]?.postedbyuserid,
            bookmarkedByUserId: result.rows[0]?.bookmarkedbyuserid
        }
    }

//  Already Bookmarked Posts
    async getPostsBookmarkedByMe(userId:string, action:'add'|'remove', type:'public'|'hidden'|'deleted'|'friends visibility'|'fof visibility'){
        let postType:any
        switch (type){
            case 'public':
                postType = 204
                break;
            case 'fof visibility':
                postType = 203
                break;
            case 'deleted':
                postType = 200
                break;
            case 'friends visibility':
                postType = 202
                break;
            case 'hidden':
                postType = 201
                break;
        default:
            postType = 204
        }

        let bookmarkType: any
        switch(action){
            case 'add':
                bookmarkType = 450
                break;
            case 'remove':
                bookmarkType = 451
                break;
        }

        console.log(`userId is ${userId}`)
        console.log(`postType is ${postType}`)
        console.log(`bookmarkType is ${bookmarkType}`)
        const query = `
        select sspb.sspb_id as bookmarkid, sspb.sspb_ssp_id as postid, sspb.sspb_ssup_id as bookmarkedbyuserid from satsang_social.satsang_social_post_bookmarks sspb
        inner join satsang_social.satsang_social_posts ssp on sspb.sspb_ssp_id =ssp.ssp_id 
        where sspb.sspb_ssup_id = $1 and ssp.ssp_ssc_id=$2 and sspb.sspb_ssc_id=$3
        order by Random()
        limit 1
        `
        const result = await PgSocialClient.query(query,[userId,postType,bookmarkType])
        console.log(`Result is ${JSON.stringify(result)}`)
        return {
            postId: result.rows[0]?.postid,
            postedByUserId: result.rows[0]?.postedbyuserid,
            bookmarkedByUserId: result.rows[0]?.bookmarkedbyuserid
        }
    }

    async getPostsBookmakedByMeOfMyFriend(userId:string, action:'add'|'remove', type:'public'|'hidden'|'deleted'|'friends visibility'|'fof visibility'){
        let postType:any
        switch (type){
            case 'public':
                postType = 204
                break;
            case 'fof visibility':
                postType = 203
                break;
            case 'deleted':
                postType = 200
                break;
            case 'friends visibility':
                postType = 202
                break;
            case 'hidden':
                postType = 201
                break;
        default:
            postType = 204
        }

        let bookmarkType: any
        switch(action){
            case 'add':
                bookmarkType = 450
                break;
            case 'remove':
                bookmarkType = 451
                break;
        }

        const query = `
        with myFriends as(
        select distinct 
        case when ssf.ssf_sfmm1_id = $1 then ssf.ssf_sfmm2_id
        when ssf.ssf_sfmm2_id = $1 then ssf.ssf_sfmm1_id
        end as friendId
        from satsang_social.satsang_social_friends ssf 
        where ssf.ssf_sfmm1_id = $1
        or ssf.ssf_sfmm2_id = $1
        )
        select sspb.sspb_id as bookmarkid, sspb.sspb_ssp_id as postid, sspb.sspb_ssup_id as bookmarkedbyuserid from satsang_social.satsang_social_post_bookmarks sspb
        inner join satsang_social.satsang_social_posts ssp on sspb.sspb_ssp_id =ssp.ssp_id 
        inner join myFriends mf on ssp.ssp_sfmm_id = mf.friendid 
        where ssp.ssp_ssc_id=$2 and sspb.sspb_ssc_id=$3 and sspb.sspb_ssup_id=$1
        order by Random()
        limit 1
        `
        const result = await PgSocialClient.query(query,[userId,postType,bookmarkType])
        return {
            postId: result.rows[0]?.postid,
            postedByUserId: result.rows[0]?.postedbyuserid,
            bookmarkedByUserId: result.rows[0]?.bookmarkedbyuserid
        }
    }

    async getPostsBookmakedByMeOfMyFriendsFriend(userId:string, action:'add'|'remove', type:'public'|'hidden'|'deleted'|'friends visibility'|'fof visibility'){
        let postType:any
        switch (type){
            case 'public':
                postType = 204
                break;
            case 'fof visibility':
                postType = 203
                break;
            case 'deleted':
                postType = 200
                break;
            case 'friends visibility':
                postType = 202
                break;
            case 'hidden':
                postType = 201
                break;
        default:
            postType = 204
        }
        
        let bookmarkType: any
        switch(action){
            case 'add':
                bookmarkType = 450
                break;
            case 'remove':
                bookmarkType = 451
                break;
        }
        const nonUserId = TestContext.initialMemuuid

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
        select sspb.sspb_id as bookmarkid, sspb.sspb_ssp_id as postid, sspb.sspb_ssup_id as bookmarkedbyuserid from satsang_social.satsang_social_post_bookmarks sspb
        inner join satsang_social.satsang_social_posts ssp on sspb.sspb_ssp_id =ssp.ssp_id 
        inner join myFriends mf on ssp.ssp_sfmm_id = mf.friendid  and sspb.sspb_ssup_id = $1
        where ssp.ssp_ssc_id=$2 and sspb.sspb_ssc_id=$3
        order by Random()
        limit 1
        `
        const result = await PgSocialClient.query(query,[userId,postType,bookmarkType])
        return {
            postId: result.rows[0]?.postid,
            postedByUserId: result.rows[0]?.postedbyuserid,
            bookmarkedByUserId: result.rows[0]?.bookmarkedbyuserid
        }
    }

    async getPostsBookmakedByMeOfNonFriend(userId:string, action:'add'|'remove', type:'public'|'hidden'|'deleted'|'friends visibility'|'fof visibility'){
        let postType:any
        switch (type){
            case 'public':
                postType = 204
                break;
            case 'fof visibility':
                postType = 203
                break;
            case 'deleted':
                postType = 200
                break;
            case 'friends visibility':
                postType = 202
                break;
            case 'hidden':
                postType = 201
                break;
        default:
            postType = 204
        }
        
        let bookmarkType: any
        switch(action){
            case 'add':
                bookmarkType = 450
                break;
            case 'remove':
                bookmarkType = 451
                break;
        }
        const nonUserId = TestContext.initialMemuuid

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
        select sspb.sspb_id as bookmarkid, sspb.sspb_ssp_id as postid, sspb.sspb_ssup_id as bookmarkedbyuserid from satsang_social.satsang_social_post_bookmarks sspb
        inner join satsang_social.satsang_social_posts ssp on sspb.sspb_ssp_id =ssp.ssp_id 
        inner join nonSocialFriends  nsf on ssp.ssp_sfmm_id =nsf.userid 
        where ssp.ssp_ssc_id=$2 and sspb.sspb_ssc_id=$3  and sspb.sspb_ssup_id = $1
        order by Random()
        limit 1
        `
        const result = await PgSocialClient.query(query,[userId,postType,bookmarkType])
        return {
            postId: result.rows[0]?.postid,
            postedByUserId: result.rows[0]?.postedbyuserid,
            bookmarkedByUserId: result.rows[0]?.bookmarkedbyuserid
        }
    }

    async getPostsBookmarkedByMyFriends(userId:string, action:'add'|'remove', type:'public'|'hidden'|'deleted'|'friends visibility'|'fof visibility'){
        let postType:any
        switch (type){
            case 'public':
                postType = 204
                break;
            case 'fof visibility':
                postType = 203
                break;
            case 'deleted':
                postType = 200
                break;
            case 'friends visibility':
                postType = 202
                break;
            case 'hidden':
                postType = 201
                break;
        default:
            postType = 204
        }
        
        let bookmarkType: any
        switch(action){
            case 'add':
                bookmarkType = 450
                break;
            case 'remove':
                bookmarkType = 451
                break;
        }
        const nonUserId = TestContext.initialMemuuid

        const query = `
        with myFriends as(
        select distinct 
        case when ssf.ssf_sfmm1_id = $1 then ssf.ssf_sfmm2_id
        when ssf.ssf_sfmm2_id = $1 then ssf.ssf_sfmm1_id
        end as friendId
        from satsang_social.satsang_social_friends ssf 
        where ssf.ssf_sfmm1_id = $1
        or ssf.ssf_sfmm2_id = $1
        )
        select sspb.sspb_id as bookmarkid, sspb.sspb_ssp_id as postid, sspb.sspb_ssup_id as bookmarkedbyuserid from satsang_social.satsang_social_post_bookmarks sspb
        inner join satsang_social.satsang_social_posts ssp on sspb.sspb_ssp_id =ssp.ssp_id 
        inner join myFriends mf on sspb.sspb_ssup_id =mf.friendid 
        where ssp.ssp_ssc_id=$2 and sspb.sspb_ssc_id=$3 and sspb.sspb_ssup_id != $4
        order by Random()
        limit 1
        `
        const result = await PgSocialClient.query(query,[userId,postType,bookmarkType,nonUserId])
        return {
            postId: result.rows[0]?.postid,
            postedByUserId: result.rows[0]?.postedbyuserid,
            bookmarkedByUserId: result.rows[0]?.bookmarkedbyuserid
        }
    }



    async getPostBookmrkedByMyFriendsFriends(userId:string, action:'add'|'remove', type:'public'|'hidden'|'deleted'|'friends visibility'|'fof visibility'){
        let postType:any
        switch (type){
            case 'public':
                postType = 204
                break;
            case 'fof visibility':
                postType = 203
                break;
            case 'deleted':
                postType = 200
                break;
            case 'friends visibility':
                postType = 202
                break;
            case 'hidden':
                postType = 201
                break;
        default:
            postType = 204
        }
        let bookmarkType: any
        switch(action){
            case 'add':
                bookmarkType = 450
                break;
            case 'remove':
                bookmarkType = 451
                break;
        }
        const nonUserId = TestContext.initialMemuuid

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
        select sspb.sspb_id as bookmarkid, sspb.sspb_ssp_id as postid, sspb.sspb_ssup_id as bookmarkedbyuserid from satsang_social.satsang_social_post_bookmarks sspb
        inner join satsang_social.satsang_social_posts ssp on sspb.sspb_ssp_id =ssp.ssp_id 
        inner join myFriends mf on sspb.sspb_ssup_id =mf.friendid  and sspb.sspb_ssup_id != $4
        where ssp.ssp_ssc_id=$2 and sspb.sspb_ssc_id=$3
        order by Random()
        limit 1
        `
        const result = await PgSocialClient.query(query,[userId,postType,bookmarkType,nonUserId])
        return {
            postId: result.rows[0]?.postid,
            postedByUserId: result.rows[0]?.postedbyuserid,
            bookmarkedByUserId: result.rows[0]?.bookmarkedbyuserid
        }
    }


    async getPostBookmarkedByMyNonFriends(userId:string, action:'add'|'remove', type:'public'|'hidden'|'deleted'|'friends visibility'|'fof visibility'){
        let postType:any
        switch (type){
            case 'public':
                postType = 204
                break;
            case 'fof visibility':
                postType = 203
                break;
            case 'deleted':
                postType = 200
                break;
            case 'friends visibility':
                postType = 202
                break;
            case 'hidden':
                postType = 201
                break;
        default:
            postType = 204
        }
        
        let bookmarkType: any
        switch(action){
            case 'add':
                bookmarkType = 450
                break;
            case 'remove':
                bookmarkType = 451
                break;
        }
        const nonUserId = TestContext.initialMemuuid

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
        select sspb.sspb_id as bookmarkid, sspb.sspb_ssp_id as postid, sspb.sspb_ssup_id as bookmarkedbyuserid from satsang_social.satsang_social_post_bookmarks sspb
        inner join satsang_social.satsang_social_posts ssp on sspb.sspb_ssp_id =ssp.ssp_id 
        inner join nonSocialFriends  nsf on sspb.sspb_ssup_id =nsf.userid 
        where ssp.ssp_ssc_id=$2 and sspb.sspb_ssc_id=$3  and sspb.sspb_ssup_id != $4
        order by Random()
        limit 1
        `
        const result = await PgSocialClient.query(query,[userId,postType,bookmarkType,nonUserId])
        return {
            postId: result.rows[0]?.postid,
            postedByUserId: result.rows[0]?.postedbyuserid,
            bookmarkedByUserId: result.rows[0]?.bookmarkedbyuserid
        }
    }
}