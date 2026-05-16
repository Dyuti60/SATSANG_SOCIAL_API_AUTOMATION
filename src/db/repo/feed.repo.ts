import { PgSocialClient } from "../client/pg.social.client";
import { CassandraQuery, toUUID, dedupeByKeys } from '../client/cassandra.client';
import { TestContext } from "src/context/test.context";

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
            postId: result.rows[0]?.postId,
            userId: result.rows[0]?.userId,
            caption: result.rows[0]?.caption,
            postMediaId: result.rows[0]?.postMediaId
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
            postId: result.rows[0]?.postId,
            userId: result.rows[0]?.userId,
            caption: result.rows[0]?.caption,
            postMediaId: result.rows[0]?.postMediaId
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
            postId: result.rows[0]?.postId,
            userId: result.rows[0]?.userId,
            caption: result.rows[0]?.caption,
            postMediaId: result.rows[0]?.postMediaId
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
            postId: result.rows[0]?.postId,
            userId: result.rows[0]?.userId,
            caption: result.rows[0]?.caption,
            postMediaId: result.rows[0]?.postMediaId
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
            postId: result.rows[0]?.postId,
            userId: result.rows[0]?.userId,
            caption: result.rows[0]?.caption,
            postMediaId: result.rows[0]?.postMediaId
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
            postMediaId: result.rows[0]?.mediaId,
            postUrl: result.rows[0]?.postUrl
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
            chatMediaId: result.rows[0]?.mediaId,
            chatUrl: result.rows[0]?.chatUrl
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
            storyId: result.rows[0]?.storyId,
            storyMediaId: result.rows[0]?.storyMediaId
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
            storyMediaId: result.rows[0]?.mediaId,
            storyUrl: result.rows[0]?.storyUrl
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
            mediaId: result.rows[0].mediaId
        }
    }

    async getMyRandomMinioProfileMedia(userId:string){
        const query = `
            select smm.smm_id as mediaId, smm.smm_object_path as chatUrl from satsang_social.satsang_media_metadata smm 
            left join satsang_social.satsang_post_media_map spmm on smm.smm_id =spmm.spmm_smm_id 
            where smm.smm_ssc_id =14 and smm.smm_object_path like '%profiles%'
            and spmm.spmm_id  is null and smm.smm_sfmm_id = $1
            order by Random()
            limit 1 
        `
        const result = await PgSocialClient.query(query,[userId])
        return {
            profileMediaId: result.rows[0]?.mediaId,
            profileUrl: result.rows[0]?.chatUrl
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
            postId: result.rows[0]?.postId,
            userId: result.rows[0]?.userId,
            caption: result.rows[0]?.caption,
            postMediaId: result.rows[0]?.postMediaId
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
            postId: result.rows[0]?.postId,
            userId: result.rows[0]?.userId,
            caption: result.rows[0]?.caption,
            postMediaId: result.rows[0]?.postMediaId
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
            postId: result.rows[0]?.postId,
            userId: result.rows[0]?.userId,
            caption: result.rows[0]?.caption,
            postMediaId: result.rows[0]?.postMediaId
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
            postId: result.rows[0]?.postId,
            userId: result.rows[0]?.userId,
            caption: result.rows[0]?.caption,
            postMediaId: result.rows[0]?.postMediaId
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
            postId: result.rows[0]?.postId,
            userId: result.rows[0]?.userId,
            caption: result.rows[0]?.caption,
            postMediaId: result.rows[0]?.postMediaId
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
            postId: result.rows[0]?.postId,
            userId: result.rows[0]?.userId,
            caption: result.rows[0]?.caption,
            postMediaId: result.rows[0]?.postMediaId
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
            postMediaId: result.rows[0]?.postMediaId,
            postUrl: result.rows[0]?.postUrl
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
            postId: result.rows[0]?.postId,
            userId: result.rows[0]?.userId,
            caption: result.rows[0]?.caption,
            postMediaId: result.rows[0]?.postMediaId
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
            postId: result.rows[0]?.postId,
            userId: result.rows[0]?.userId,
            caption: result.rows[0]?.caption,
            postMediaId: result.rows[0]?.postMediaId
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
            postId: result.rows[0]?.postId,
            userId: result.rows[0]?.userId,
            caption: result.rows[0]?.caption,
            postMediaId: result.rows[0]?.postMediaId
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
            postId: result.rows[0]?.postId,
            userId: result.rows[0]?.userId,
            caption: result.rows[0]?.caption,
            postMediaId: result.rows[0]?.postMediaId
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
            postId: result.rows[0]?.postId,
            userId: result.rows[0]?.userId,
            caption: result.rows[0]?.caption,
            postMediaId: result.rows[0]?.postMediaId
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
            postId: result.rows[0]?.postId,
            userId: result.rows[0]?.userId,
            caption: result.rows[0]?.caption,
            postMediaId: result.rows[0]?.postMediaId
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
            postId: result.rows[0]?.postId,
            userId: result.rows[0]?.userId,
            caption: result.rows[0]?.caption,
            postMediaId: result.rows[0]?.postMediaId
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
            postId: result.rows[0]?.postId,
            userId: result.rows[0]?.userId,
            caption: result.rows[0]?.caption,
            postMediaId: result.rows[0]?.postMediaId
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
            postId: result.rows[0]?.postId,
            userId: result.rows[0]?.userId,
            caption: result.rows[0]?.caption,
            postMediaId: result.rows[0]?.postMediaId
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
            postId: result.rows[0]?.postId,
            userId: result.rows[0]?.userId,
            caption: result.rows[0]?.caption,
            postMediaId: result.rows[0]?.postMediaId
        }
    }


    async getMyRandomCommentMadeOnMyPost(userId:string, type: 'deleted'|'public'|'hidden'|'friends visibility'|'fof visibility'){
        const uuid = toUUID(userId);
        const casQuery = `
            select sspc_id as commentId, sspc_content as comment, 
            sspc_sfmm_id as userId, sspc_ssp_id as postId, sspc_ssc_id as statusId from satsang_social.satsang_social_post_comments
            where sspc_sfmm_id=?
            allow filtering
        `
        const casRes = await CassandraQuery(casQuery, [uuid], 'social')

        const casRows = [...casRes.rows]

        if (!casRows.length) return null;

        let postId:any;
        if(type=='deleted'){
            ({postId} = await this.getMyRandomDeletedPost(userId))
        }
        else if(type=='hidden'){
            ({postId} = await this.getMyRandomHiddenPost(userId))
        }
        else if(type=='public'){
            ({postId} = await this.getMyRandomPublicPost(userId))
        }
        else if(type=='friends visibility'){
            ({postId} = await this.getMyRandomPostWithFriendsVisibility(userId))
        }
        else if(type=='fof visibility'){
            ({postId} = await this.getMyRandomPostWithFriendsOfFriendVisibility(userId))
        }

        // 🔹 Filter rows where media exists
        const filteredRows = casRows.filter(
            (r: any) => r.postId?.toString() === postId.toString()
        );

        if (!filteredRows.length) return null;

        // 🔹 Pick random row
        const randomIndex = Math.floor(Math.random() * filteredRows.length);
        const row = filteredRows[randomIndex];

        return {
            commentId: row.commentId,
            comment: row.comment,
            userId: row.userId,
            postId: row.postId,
            statusId: row.statusId
        }

    }

    async getMyRandomCommentMadeOnFriendsPost(userId:string, type: 'deleted'|'public'|'hidden'|'friends visibility'|'fof visibility'){
        const uuid = toUUID(userId);
        const casQuery = `
            select sspc_id as commentId, sspc_content as comment, 
            sspc_sfmm_id as userId, sspc_ssp_id as postId, sspc_ssc_id as statusId from satsang_social.satsang_social_post_comments
            where sspc_sfmm_id=?
            allow filtering
        `
        const casRes = await CassandraQuery(casQuery, [uuid], 'social')

        const casRows = [...casRes.rows]

        if (!casRows.length) return null;

        let postId:any;
        if(type=='deleted'){
            ({postId} = await this.getMyFriendsRandomDeletedPost(userId))
        }
        else if(type=='hidden'){
            ({postId} = await this.getMyFriendsRandomHiddenPost(userId))
        }
        else if(type=='public'){
            ({postId} = await this.getMyFriendsRandomPublicPost(userId))
        }
        else if(type=='friends visibility'){
            ({postId} = await this.getMyFriendsRandomPostWithFriendsVisibility(userId))
        }
        else if(type=='fof visibility'){
            ({postId} = await this.getMyFriendsRandomPostWithFriendsOfFriendsVisibility(userId))
        }

        // 🔹 Filter rows where media exists
        const filteredRows = casRows.filter(
            (r: any) => r.postId?.toString() === postId.toString()
        );

        if (!filteredRows.length) return null;

        // 🔹 Pick random row
        const randomIndex = Math.floor(Math.random() * filteredRows.length);
        const row = filteredRows[randomIndex];

        return {
            commentId: row.commentId,
            comment: row.comment,
            userId: row.userId,
            postId: row.postId,
            statusId: row.statusId
        }

    }

    async getMyRandomCommentMadeOnFriendsOfFriendsPost(userId:string, type: 'deleted'|'public'|'hidden'|'friends visibility'|'fof visibility'){
        const uuid = toUUID(userId);
        const casQuery = `
            select sspc_id as commentId, sspc_content as comment, 
            sspc_sfmm_id as userId, sspc_ssp_id as postId, sspc_ssc_id as statusId from satsang_social.satsang_social_post_comments
            where sspc_sfmm_id=?
            allow filtering
        `
        const casRes = await CassandraQuery(casQuery, [uuid], 'social')

        const casRows = [...casRes.rows]

        if (!casRows.length) return null;

        let postId:any;
        if(type=='deleted'){
            ({postId} = await this.getMyFriendsOfFriendsRandomDeletedPost(userId))
        }
        else if(type=='hidden'){
            ({postId} = await this.getMyFriendsOfFriendsRandomHiddenPost(userId))
        }
        else if(type=='public'){
            ({postId} = await this.getMyFriendsOfFriendsRandomPublicPost(userId))
        }
        else if(type=='friends visibility'){
            ({postId} = await this.getMyFriendsOfFriendsRandomPostWithFriendsVisibility(userId))
        }
        else if(type=='fof visibility'){
            ({postId} = await this.getMyFriendsOfFriendsRandomPostWithFriendsOfFriendVisibility(userId))
        }

        // 🔹 Filter rows where media exists
        const filteredRows = casRows.filter(
            (r: any) => r.postId?.toString() === postId.toString()
        );

        if (!filteredRows.length) return null;

        // 🔹 Pick random row
        const randomIndex = Math.floor(Math.random() * filteredRows.length);
        const row = filteredRows[randomIndex];

        return {
            commentId: row.commentId,
            comment: row.comment,
            userId: row.userId,
            postId: row.postId,
            statusId: row.statusId
        }

    }

    async getMyRandomCommentMadeOnNonFriendsPost(userId:string, type: 'deleted'|'public'|'hidden'|'friends visibility'|'fof visibility'){
        const uuid = toUUID(userId);
        const casQuery = `
            select sspc_id as commentId, sspc_content as comment, 
            sspc_sfmm_id as userId, sspc_ssp_id as postId, sspc_ssc_id as statusId from satsang_social.satsang_social_post_comments
            where sspc_sfmm_id=?
            allow filtering
        `
        const casRes = await CassandraQuery(casQuery, [uuid], 'social')

        const casRows = [...casRes.rows]

        if (!casRows.length) return null;

        let postId:any;
        if(type=='deleted'){
            ({postId} = await this.getMyNonFriendsRandomDeletedPost(userId))
        }
        else if(type=='hidden'){
            ({postId} = await this.getMyNonFriendsRandomHiddenPost(userId))
        }
        else if(type=='public'){
            ({postId} = await this.getMyNonFriendsRandomPublicPost(userId))
        }
        else if(type=='friends visibility'){
            ({postId} = await this.getMyNonFriendsRandomPostWithFriendsVisibility(userId))
        }
        else if(type=='fof visibility'){
            ({postId} = await this.getMyNonFriendsRandomPostWithFriendsOfFriendVisibility(userId))
        }

        // 🔹 Filter rows where media exists
        const filteredRows = casRows.filter(
            (r: any) => r.postId?.toString() === postId.toString()
        );

        if (!filteredRows.length) return null;

        // 🔹 Pick random row
        const randomIndex = Math.floor(Math.random() * filteredRows.length);
        const row = filteredRows[randomIndex];

        return {
            commentId: row.commentId,
            comment: row.comment,
            userId: row.userId,
            postId: row.postId,
            statusId: row.statusId
        }

    }

    async getOthersRandomCommentMadeOnMyFriendsPost( userId: string, type: 'deleted' | 'public' | 'hidden' | 'friends visibility' | 'fof visibility'){
        const userUUID = toUUID(userId);

        let postId: string | undefined;

        if (type === 'deleted') {
            ({ postId } = await this.getMyFriendsRandomDeletedPost(userId) || {});
        } else if (type === 'hidden') {
            ({ postId } = await this.getMyFriendsRandomHiddenPost(userId) || {});
        } else if (type === 'public') {
            ({ postId } = await this.getMyFriendsRandomPublicPost(userId) || {});
        } else if (type === 'friends visibility') {
            ({ postId } = await this.getMyFriendsRandomPostWithFriendsVisibility(userId) || {});
        } else if (type === 'fof visibility') {
            ({ postId } = await this.getMyFriendsRandomPostWithFriendsOfFriendsVisibility(userId) || {});
        }

        if (!postId) return null;

        const postUUID = toUUID(postId);

        const casQuery = `
            SELECT 
            sspc_id as commentId, 
            sspc_content as comment, 
            sspc_sfmm_id as userId, 
            sspc_ssp_id as postId, 
            sspc_ssc_id as statusId 
            FROM satsang_social.satsang_social_post_comments
            WHERE sspc_ssp_id = ?
            ALLOW FILTERING
        `;

        const casRes = await CassandraQuery(casQuery, [postUUID], 'social');

        const casRows = [...casRes.rows];

        if (!casRows.length) return null;

        // 🔹 Exclude my own comments
        const filteredRows = casRows.filter(
            (r: any) => r.userId?.toString() !== userUUID.toString()
        );

        if (!filteredRows.length) return null;

        // 🔹 Random selection
        const row =
            filteredRows[Math.floor(Math.random() * filteredRows.length)];

        return {
            commentId: row.commentId,
            comment: row.comment,
            userId: row.userId,
            postId: row.postId,
            statusId: row.statusId
        };
    }

    async getOthersRandomCommentMadeOnMyFriendsOfFriendsPost( userId: string, type: 'deleted' | 'public' | 'hidden' | 'friends visibility' | 'fof visibility'){
        const userUUID = toUUID(userId);

        let postId: string | undefined;

        if(type=='deleted'){
            ({postId} = await this.getMyFriendsOfFriendsRandomDeletedPost(userId))
        }
        else if(type=='hidden'){
            ({postId} = await this.getMyFriendsOfFriendsRandomHiddenPost(userId))
        }
        else if(type=='public'){
            ({postId} = await this.getMyFriendsOfFriendsRandomPublicPost(userId))
        }
        else if(type=='friends visibility'){
            ({postId} = await this.getMyFriendsOfFriendsRandomPostWithFriendsVisibility(userId))
        }
        else if(type=='fof visibility'){
            ({postId} = await this.getMyFriendsOfFriendsRandomPostWithFriendsOfFriendVisibility(userId))
        }
        if (!postId) return null;

        const postUUID = toUUID(postId);

        const casQuery = `
            SELECT 
            sspc_id as commentId, 
            sspc_content as comment, 
            sspc_sfmm_id as userId, 
            sspc_ssp_id as postId, 
            sspc_ssc_id as statusId 
            FROM satsang_social.satsang_social_post_comments
            WHERE sspc_ssp_id = ?
            ALLOW FILTERING
        `;

        const casRes = await CassandraQuery(casQuery, [postUUID], 'social');

        const casRows = [...casRes.rows];

        if (!casRows.length) return null;

        // 🔹 Exclude my own comments
        const filteredRows = casRows.filter(
            (r: any) => r.userId?.toString() !== userUUID.toString()
        );

        if (!filteredRows.length) return null;

        // 🔹 Random selection
        const row =
            filteredRows[Math.floor(Math.random() * filteredRows.length)];

        return {
            commentId: row.commentId,
            comment: row.comment,
            userId: row.userId,
            postId: row.postId,
            statusId: row.statusId
        };
    }

    async getOthersRandomCommentMadeOnMyNonFriendsPost( userId: string, type: 'deleted' | 'public' | 'hidden' | 'friends visibility' | 'fof visibility'){
        const userUUID = toUUID(userId);

        let postId: string | undefined;

        if(type=='deleted'){
            ({postId} = await this.getMyNonFriendsRandomDeletedPost(userId))
        }
        else if(type=='hidden'){
            ({postId} = await this.getMyNonFriendsRandomHiddenPost(userId))
        }
        else if(type=='public'){
            ({postId} = await this.getMyNonFriendsRandomPublicPost(userId))
        }
        else if(type=='friends visibility'){
            ({postId} = await this.getMyNonFriendsRandomPostWithFriendsVisibility(userId))
        }
        else if(type=='fof visibility'){
            ({postId} = await this.getMyNonFriendsRandomPostWithFriendsOfFriendVisibility(userId))
        }
        if (!postId) return null;

        const postUUID = toUUID(postId);

        const casQuery = `
            SELECT 
            sspc_id as commentId, 
            sspc_content as comment, 
            sspc_sfmm_id as userId, 
            sspc_ssp_id as postId, 
            sspc_ssc_id as statusId 
            FROM satsang_social.satsang_social_post_comments
            WHERE sspc_ssp_id = ?
            ALLOW FILTERING
        `;

        const casRes = await CassandraQuery(casQuery, [postUUID], 'social');

        const casRows = [...casRes.rows];

        if (!casRows.length) return null;

        // 🔹 Exclude my own comments
        const filteredRows = casRows.filter(
            (r: any) => r.userId?.toString() !== userUUID.toString()
        );

        if (!filteredRows.length) return null;

        // 🔹 Random selection
        const row =
            filteredRows[Math.floor(Math.random() * filteredRows.length)];

        return {
            commentId: row.commentId,
            comment: row.comment,
            userId: row.userId,
            postId: row.postId,
            statusId: row.statusId
        };
    }

    async getOthersRandomCommentMadeOnMyPost( userId: string, type: 'deleted' | 'public' | 'hidden' | 'friends visibility' | 'fof visibility'){
        const userUUID = toUUID(userId);

        let postId: string | undefined;

        if(type=='deleted'){
            ({postId} = await this.getMyRandomDeletedPost(userId))
        }
        else if(type=='hidden'){
            ({postId} = await this.getMyRandomHiddenPost(userId))
        }
        else if(type=='public'){
            ({postId} = await this.getMyRandomPublicPost(userId))
        }
        else if(type=='friends visibility'){
            ({postId} = await this.getMyRandomPostWithFriendsVisibility(userId))
        }
        else if(type=='fof visibility'){
            ({postId} = await this.getMyRandomPostWithFriendsOfFriendVisibility(userId))
        }
        if (!postId) return null;

        const postUUID = toUUID(postId);

        const casQuery = `
            SELECT 
            sspc_id as commentId, 
            sspc_content as comment, 
            sspc_sfmm_id as userId, 
            sspc_ssp_id as postId, 
            sspc_ssc_id as statusId 
            FROM satsang_social.satsang_social_post_comments
            WHERE sspc_ssp_id = ?
            ALLOW FILTERING
        `;

        const casRes = await CassandraQuery(casQuery, [postUUID], 'social');

        const casRows = [...casRes.rows];

        if (!casRows.length) return null;

        // 🔹 Exclude my own comments
        const filteredRows = casRows.filter(
            (r: any) => r.userId?.toString() !== userUUID.toString()
        );

        if (!filteredRows.length) return null;

        // 🔹 Random selection
        const row =
            filteredRows[Math.floor(Math.random() * filteredRows.length)];

        return {
            commentId: row.commentId,
            comment: row.comment,
            userId: row.userId,
            postId: row.postId,
            statusId: row.statusId
        };
    }



    // BOOKMARK REPO

    // 1. Bookmark ready post
    async getMyFriendsRandomPublicBookmarkReadyPost(bookmarkedByUserId:string){
        const myFriendId = await TestContext.services.userRepo.getRandomFriendIdWithAcceptedStatusOtherThanLoggedIn(bookmarkedByUserId)
        const query = `
        select x.postid, x.postedbyuserid, x.bookmarkedbyuserid, x.statusid from (
        select ssp.ssp_id as postId, ssp.ssp_sfmm_id as postedByUserId ,sspb.sspb_ssup_id as bookmarkedByUserId, sspb.sspb_ssc_id as statusId  from satsang_social.satsang_social_posts ssp 
        left join satsang_social.satsang_social_post_bookmarks sspb 
        on ssp.ssp_id =sspb.sspb_ssp_id
        where sspb.sspb_id is null and ssp.ssp_ssc_id = 204
        ssp.ssp_sfmm_id =$1
        union
        select ssp.ssp_id as postId, ssp.ssp_sfmm_id as postedByUserId ,sspb.sspb_ssup_id as bookmarkedByUserId, sspb.sspb_ssc_id  from satsang_social.satsang_social_posts ssp 
        left join satsang_social.satsang_social_post_bookmarks sspb 
        on ssp.ssp_id =sspb.sspb_ssp_id
        where ssp.ssp_sfmm_id =$1 and sspb.sspb_ssup_id =$1 and sspb.sspb_ssc_id = 451
        and ssp.ssp_ssc_id = 204
        )x
        order by Random()
        limit 1
        `
        const result = await PgSocialClient.query(query,[myFriendId])
        return {
            postId: result.rows[0]?.postid,
            postedByUserId: result.rows[0]?.postedbyuserid,
            bookmarkedByUserId: result.rows[0]?.bookmarkedbyuserid
        }
    }
    async getMyFriendsRandomBookmarkReadyHiddenPost(bookmarkedByUserId:string){
        const myFriendId = await TestContext.services.userRepo.getRandomFriendIdWithAcceptedStatusOtherThanLoggedIn(bookmarkedByUserId)
        const query = `
        select x.postid, x.postedbyuserid, x.bookmarkedbyuserid, x.statusid from (
        select ssp.ssp_id as postId, ssp.ssp_sfmm_id as postedByUserId ,sspb.sspb_ssup_id as bookmarkedByUserId, sspb.sspb_ssc_id as statusId  from satsang_social.satsang_social_posts ssp 
        left join satsang_social.satsang_social_post_bookmarks sspb 
        on ssp.ssp_id =sspb.sspb_ssp_id
        where sspb.sspb_id is null and ssp.ssp_ssc_id = 201
        ssp.ssp_sfmm_id =$1
        union
        select ssp.ssp_id as postId, ssp.ssp_sfmm_id as postedByUserId ,sspb.sspb_ssup_id as bookmarkedByUserId, sspb.sspb_ssc_id  from satsang_social.satsang_social_posts ssp 
        left join satsang_social.satsang_social_post_bookmarks sspb 
        on ssp.ssp_id =sspb.sspb_ssp_id
        where ssp.ssp_sfmm_id =$1 and sspb.sspb_ssup_id =$1 and sspb.sspb_ssc_id = 451
        and ssp.ssp_ssc_id = 201
        )x
        order by Random()
        limit 1
        `
        const result = await PgSocialClient.query(query,[myFriendId])
        return {
            postId: result.rows[0]?.postid,
            postedByUserId: result.rows[0]?.postedbyuserid,
            bookmarkedByUserId: result.rows[0]?.bookmarkedbyuserid
        }
    }
    async getMyFriendsRandomBookmarkReadyDeletedPost(bookmarkedByUserId:string){
        const myFriendId = await TestContext.services.userRepo.getRandomFriendIdWithAcceptedStatusOtherThanLoggedIn(bookmarkedByUserId)
        const query = `
        select x.postid, x.postedbyuserid, x.bookmarkedbyuserid, x.statusid from (
        select ssp.ssp_id as postId, ssp.ssp_sfmm_id as postedByUserId ,sspb.sspb_ssup_id as bookmarkedByUserId, sspb.sspb_ssc_id as statusId  from satsang_social.satsang_social_posts ssp 
        left join satsang_social.satsang_social_post_bookmarks sspb 
        on ssp.ssp_id =sspb.sspb_ssp_id
        where sspb.sspb_id is null and ssp.ssp_ssc_id = 200
        ssp.ssp_sfmm_id =$1
        union
        select ssp.ssp_id as postId, ssp.ssp_sfmm_id as postedByUserId ,sspb.sspb_ssup_id as bookmarkedByUserId, sspb.sspb_ssc_id  from satsang_social.satsang_social_posts ssp 
        left join satsang_social.satsang_social_post_bookmarks sspb 
        on ssp.ssp_id =sspb.sspb_ssp_id
        where ssp.ssp_sfmm_id =$1 and sspb.sspb_ssup_id =$1 and sspb.sspb_ssc_id = 451
        and ssp.ssp_ssc_id = 200
        )x
        order by Random()
        limit 1
        `
        const result = await PgSocialClient.query(query,[myFriendId])
        return {
            postId: result.rows[0]?.postid,
            postedByUserId: result.rows[0]?.postedbyuserid,
            bookmarkedByUserId: result.rows[0]?.bookmarkedbyuserid
        }
    }
    async getMyFriendsRandomBookmarkReadyPostWithFriendsVisibility(bookmarkedByUserId:string){
        const myFriendId = await TestContext.services.userRepo.getRandomFriendIdWithAcceptedStatusOtherThanLoggedIn(bookmarkedByUserId)
        const query = `
        select x.postid, x.postedbyuserid, x.bookmarkedbyuserid, x.statusid from (
        select ssp.ssp_id as postId, ssp.ssp_sfmm_id as postedByUserId ,sspb.sspb_ssup_id as bookmarkedByUserId, sspb.sspb_ssc_id as statusId  from satsang_social.satsang_social_posts ssp 
        left join satsang_social.satsang_social_post_bookmarks sspb 
        on ssp.ssp_id =sspb.sspb_ssp_id
        where sspb.sspb_id is null and ssp.ssp_ssc_id = 202 
        ssp.ssp_sfmm_id =$1
        union
        select ssp.ssp_id as postId, ssp.ssp_sfmm_id as postedByUserId ,sspb.sspb_ssup_id as bookmarkedByUserId, sspb.sspb_ssc_id  from satsang_social.satsang_social_posts ssp 
        left join satsang_social.satsang_social_post_bookmarks sspb 
        on ssp.ssp_id =sspb.sspb_ssp_id
        where ssp.ssp_sfmm_id =$1 and sspb.sspb_ssup_id =$1 and sspb.sspb_ssc_id = 451
        and ssp.ssp_ssc_id = 202
        )x
        order by Random()
        limit 1
        `
        const result = await PgSocialClient.query(query,[myFriendId])
        return {
            postId: result.rows[0]?.postid,
            postedByUserId: result.rows[0]?.postedbyuserid,
            bookmarkedByUserId: result.rows[0]?.bookmarkedbyuserid
        }
    }
    async getMyFriendsRandomBookmarkReadyPostWithFriendsOfFriendsVisibility(bookmarkedByUserId:string){
        const myFriendId = await TestContext.services.userRepo.getRandomFriendIdWithAcceptedStatusOtherThanLoggedIn(bookmarkedByUserId)
        const query = `
        select x.postid, x.postedbyuserid, x.bookmarkedbyuserid, x.statusid from (
        select ssp.ssp_id as postId, ssp.ssp_sfmm_id as postedByUserId ,sspb.sspb_ssup_id as bookmarkedByUserId, sspb.sspb_ssc_id as statusId  from satsang_social.satsang_social_posts ssp 
        left join satsang_social.satsang_social_post_bookmarks sspb 
        on ssp.ssp_id =sspb.sspb_ssp_id
        where sspb.sspb_id is null and ssp.ssp_ssc_id = 203
        ssp.ssp_sfmm_id =$1
        union
        select ssp.ssp_id as postId, ssp.ssp_sfmm_id as postedByUserId ,sspb.sspb_ssup_id as bookmarkedByUserId, sspb.sspb_ssc_id  from satsang_social.satsang_social_posts ssp 
        left join satsang_social.satsang_social_post_bookmarks sspb 
        on ssp.ssp_id =sspb.sspb_ssp_id
        where ssp.ssp_sfmm_id =$1 and sspb.sspb_ssup_id =$1 and sspb.sspb_ssc_id = 451
        and ssp.ssp_ssc_id = 203
        )x
        order by Random()
        limit 1
        `
        const result = await PgSocialClient.query(query,[myFriendId])
        return {
            postId: result.rows[0]?.postid,
            postedByUserId: result.rows[0]?.postedbyuserid,
            bookmarkedByUserId: result.rows[0]?.bookmarkedbyuserid
        }
    }



    async getMyFriendsOfFriendsRandomBookmarkReadyPublicPost(bookmarkedByUserId:string){
        const myFriendId = await TestContext.services.userRepo.getValidFriendsOfFriendId(bookmarkedByUserId)
        const query = `
        select x.postid, x.postedbyuserid, x.bookmarkedbyuserid, x.statusid from (
        select ssp.ssp_id as postId, ssp.ssp_sfmm_id as postedByUserId ,sspb.sspb_ssup_id as bookmarkedByUserId, sspb.sspb_ssc_id as statusId  from satsang_social.satsang_social_posts ssp 
        left join satsang_social.satsang_social_post_bookmarks sspb 
        on ssp.ssp_id =sspb.sspb_ssp_id
        where sspb.sspb_id is null and ssp.ssp_ssc_id = 204
        ssp.ssp_sfmm_id =$1
        union
        select ssp.ssp_id as postId, ssp.ssp_sfmm_id as postedByUserId ,sspb.sspb_ssup_id as bookmarkedByUserId, sspb.sspb_ssc_id  from satsang_social.satsang_social_posts ssp 
        left join satsang_social.satsang_social_post_bookmarks sspb 
        on ssp.ssp_id =sspb.sspb_ssp_id
        where ssp.ssp_sfmm_id =$1 and sspb.sspb_ssup_id =$1 and sspb.sspb_ssc_id = 451
        and ssp.ssp_ssc_id = 204
        )x
        order by Random()
        limit 1
        `
        const result = await PgSocialClient.query(query,[myFriendId])
        return {
            postId: result.rows[0]?.postid,
            postedByUserId: result.rows[0]?.postedbyuserid,
            bookmarkedByUserId: result.rows[0]?.bookmarkedbyuserid
        }
    }
    async getMyFriendsOfFriendsRandomBookmarkReadyHiddenPost(bookmarkedByUserId:string){
        const myFriendId = await TestContext.services.userRepo.getValidFriendsOfFriendId(bookmarkedByUserId)
        const query = `
        select x.postid, x.postedbyuserid, x.bookmarkedbyuserid, x.statusid from (
        select ssp.ssp_id as postId, ssp.ssp_sfmm_id as postedByUserId ,sspb.sspb_ssup_id as bookmarkedByUserId, sspb.sspb_ssc_id as statusId  from satsang_social.satsang_social_posts ssp 
        left join satsang_social.satsang_social_post_bookmarks sspb 
        on ssp.ssp_id =sspb.sspb_ssp_id
        where sspb.sspb_id is null and ssp.ssp_ssc_id = 201
        ssp.ssp_sfmm_id =$1
        union
        select ssp.ssp_id as postId, ssp.ssp_sfmm_id as postedByUserId ,sspb.sspb_ssup_id as bookmarkedByUserId, sspb.sspb_ssc_id  from satsang_social.satsang_social_posts ssp 
        left join satsang_social.satsang_social_post_bookmarks sspb 
        on ssp.ssp_id =sspb.sspb_ssp_id
        where ssp.ssp_sfmm_id =$1 and sspb.sspb_ssup_id =$1 and sspb.sspb_ssc_id = 451
        and ssp.ssp_ssc_id = 201
        )x
        order by Random()
        limit 1
        `
        const result = await PgSocialClient.query(query,[myFriendId])
        return {
            postId: result.rows[0]?.postid,
            postedByUserId: result.rows[0]?.postedbyuserid,
            bookmarkedByUserId: result.rows[0]?.bookmarkedbyuserid
        }
    }
    async getMyFriendsOfFriendsRandomBookmarkReadyDeletedPost(bookmarkedByUserId:string){
        const myFriendId = await TestContext.services.userRepo.getValidFriendsOfFriendId(bookmarkedByUserId)
        const query = `
        select x.postid, x.postedbyuserid, x.bookmarkedbyuserid, x.statusid from (
        select ssp.ssp_id as postId, ssp.ssp_sfmm_id as postedByUserId ,sspb.sspb_ssup_id as bookmarkedByUserId, sspb.sspb_ssc_id as statusId  from satsang_social.satsang_social_posts ssp 
        left join satsang_social.satsang_social_post_bookmarks sspb 
        on ssp.ssp_id =sspb.sspb_ssp_id
        where sspb.sspb_id is null and ssp.ssp_ssc_id = 200
        ssp.ssp_sfmm_id =$1
        union
        select ssp.ssp_id as postId, ssp.ssp_sfmm_id as postedByUserId ,sspb.sspb_ssup_id as bookmarkedByUserId, sspb.sspb_ssc_id  from satsang_social.satsang_social_posts ssp 
        left join satsang_social.satsang_social_post_bookmarks sspb 
        on ssp.ssp_id =sspb.sspb_ssp_id
        where ssp.ssp_sfmm_id =$1 and sspb.sspb_ssup_id =$1 and sspb.sspb_ssc_id = 451
        and ssp.ssp_ssc_id = 200
        )x
        order by Random()
        limit 1
        `
        const result = await PgSocialClient.query(query,[myFriendId])
        return {
            postId: result.rows[0]?.postid,
            postedByUserId: result.rows[0]?.postedbyuserid,
            bookmarkedByUserId: result.rows[0]?.bookmarkedbyuserid
        }
    }
    async getMyFriendsOfFriendsRandomBookmarkReadyPostWithFriendsVisibility(bookmarkedByUserId:string){
        const myFriendId = await TestContext.services.userRepo.getValidFriendsOfFriendId(bookmarkedByUserId)
        const query = `
        select x.postid, x.postedbyuserid, x.bookmarkedbyuserid, x.statusid from (
        select ssp.ssp_id as postId, ssp.ssp_sfmm_id as postedByUserId ,sspb.sspb_ssup_id as bookmarkedByUserId, sspb.sspb_ssc_id as statusId  from satsang_social.satsang_social_posts ssp 
        left join satsang_social.satsang_social_post_bookmarks sspb 
        on ssp.ssp_id =sspb.sspb_ssp_id
        where sspb.sspb_id is null and ssp.ssp_ssc_id = 202
        ssp.ssp_sfmm_id =$1
        union
        select ssp.ssp_id as postId, ssp.ssp_sfmm_id as postedByUserId ,sspb.sspb_ssup_id as bookmarkedByUserId, sspb.sspb_ssc_id  from satsang_social.satsang_social_posts ssp 
        left join satsang_social.satsang_social_post_bookmarks sspb 
        on ssp.ssp_id =sspb.sspb_ssp_id
        where ssp.ssp_sfmm_id =$1 and sspb.sspb_ssup_id =$1 and sspb.sspb_ssc_id = 451
        and ssp.ssp_ssc_id = 202
        )x
        order by Random()
        limit 1
        `
        const result = await PgSocialClient.query(query,[myFriendId])
        return {
            postId: result.rows[0]?.postid,
            postedByUserId: result.rows[0]?.postedbyuserid,
            bookmarkedByUserId: result.rows[0]?.bookmarkedbyuserid
        }
    }
    async getMyFriendsOfFriendsRandomBookmarkReadyPostWithFriendsOfFriendVisibility(bookmarkedByUserId:string){
        const myFriendId = await TestContext.services.userRepo.getValidFriendsOfFriendId(bookmarkedByUserId)
        const query = `
        select x.postid, x.postedbyuserid, x.bookmarkedbyuserid, x.statusid from (
        select ssp.ssp_id as postId, ssp.ssp_sfmm_id as postedByUserId ,sspb.sspb_ssup_id as bookmarkedByUserId, sspb.sspb_ssc_id as statusId  from satsang_social.satsang_social_posts ssp 
        left join satsang_social.satsang_social_post_bookmarks sspb 
        on ssp.ssp_id =sspb.sspb_ssp_id
        where sspb.sspb_id is null and ssp.ssp_ssc_id = 203
        ssp.ssp_sfmm_id =$1
        union
        select ssp.ssp_id as postId, ssp.ssp_sfmm_id as postedByUserId ,sspb.sspb_ssup_id as bookmarkedByUserId, sspb.sspb_ssc_id  from satsang_social.satsang_social_posts ssp 
        left join satsang_social.satsang_social_post_bookmarks sspb 
        on ssp.ssp_id =sspb.sspb_ssp_id
        where ssp.ssp_sfmm_id =$1 and sspb.sspb_ssup_id =$1 and sspb.sspb_ssc_id = 451
        and ssp.ssp_ssc_id = 203
        )x
        order by Random()
        limit 1
        `
        const result = await PgSocialClient.query(query,[myFriendId])
        return {
            postId: result.rows[0]?.postid,
            postedByUserId: result.rows[0]?.postedbyuserid,
            bookmarkedByUserId: result.rows[0]?.bookmarkedbyuserid
        }
    }

    async getMyNonFriendsRandomBookmarkReadyPublicPost(bookmarkedByUserId:string){
        const myFriendId = await TestContext.services.userRepo.getRandomNonSocialFriendId(bookmarkedByUserId)
        const query = `
        select x.postid, x.postedbyuserid, x.bookmarkedbyuserid, x.statusid from (
        select ssp.ssp_id as postId, ssp.ssp_sfmm_id as postedByUserId ,sspb.sspb_ssup_id as bookmarkedByUserId, sspb.sspb_ssc_id as statusId  from satsang_social.satsang_social_posts ssp 
        left join satsang_social.satsang_social_post_bookmarks sspb 
        on ssp.ssp_id =sspb.sspb_ssp_id
        where sspb.sspb_id is null and ssp.ssp_ssc_id = 204
        ssp.ssp_sfmm_id =$1
        union
        select ssp.ssp_id as postId, ssp.ssp_sfmm_id as postedByUserId ,sspb.sspb_ssup_id as bookmarkedByUserId, sspb.sspb_ssc_id  from satsang_social.satsang_social_posts ssp 
        left join satsang_social.satsang_social_post_bookmarks sspb 
        on ssp.ssp_id =sspb.sspb_ssp_id
        where ssp.ssp_sfmm_id =$1 and sspb.sspb_ssup_id =$1 and sspb.sspb_ssc_id = 451
        and ssp.ssp_ssc_id = 204
        )x
        order by Random()
        limit 1
        `
        const result = await PgSocialClient.query(query,[myFriendId])
        return {
            postId: result.rows[0]?.postid,
            postedByUserId: result.rows[0]?.postedbyuserid,
            bookmarkedByUserId: result.rows[0]?.bookmarkedbyuserid
        }
    }
    async getMyNonFriendsRandomBookmarkReadyHiddenPost(bookmarkedByUserId:string){
        const myFriendId = await TestContext.services.userRepo.getRandomNonSocialFriendId(bookmarkedByUserId)
        const query = `
        select x.postid, x.postedbyuserid, x.bookmarkedbyuserid, x.statusid from (
        select ssp.ssp_id as postId, ssp.ssp_sfmm_id as postedByUserId ,sspb.sspb_ssup_id as bookmarkedByUserId, sspb.sspb_ssc_id as statusId  from satsang_social.satsang_social_posts ssp 
        left join satsang_social.satsang_social_post_bookmarks sspb 
        on ssp.ssp_id =sspb.sspb_ssp_id
        where sspb.sspb_id is null and ssp.ssp_ssc_id = 201
        ssp.ssp_sfmm_id =$1
        union
        select ssp.ssp_id as postId, ssp.ssp_sfmm_id as postedByUserId ,sspb.sspb_ssup_id as bookmarkedByUserId, sspb.sspb_ssc_id  from satsang_social.satsang_social_posts ssp 
        left join satsang_social.satsang_social_post_bookmarks sspb 
        on ssp.ssp_id =sspb.sspb_ssp_id
        where ssp.ssp_sfmm_id =$1 and sspb.sspb_ssup_id =$1 and sspb.sspb_ssc_id = 451
        and ssp.ssp_ssc_id = 201
        )x
        order by Random()
        limit 1
        `
        const result = await PgSocialClient.query(query,[myFriendId])
        return {
            postId: result.rows[0]?.postid,
            postedByUserId: result.rows[0]?.postedbyuserid,
            bookmarkedByUserId: result.rows[0]?.bookmarkedbyuserid
        }
    }
    async getMyNonFriendsRandomBookmarkReadyDeletedPost(bookmarkedByUserId:string){
        const myFriendId = await TestContext.services.userRepo.getRandomNonSocialFriendId(bookmarkedByUserId)
        const query = `
        select x.postid, x.postedbyuserid, x.bookmarkedbyuserid, x.statusid from (
        select ssp.ssp_id as postId, ssp.ssp_sfmm_id as postedByUserId ,sspb.sspb_ssup_id as bookmarkedByUserId, sspb.sspb_ssc_id as statusId  from satsang_social.satsang_social_posts ssp 
        left join satsang_social.satsang_social_post_bookmarks sspb 
        on ssp.ssp_id =sspb.sspb_ssp_id
        where sspb.sspb_id is null and ssp.ssp_ssc_id = 200
        ssp.ssp_sfmm_id =$1
        union
        select ssp.ssp_id as postId, ssp.ssp_sfmm_id as postedByUserId ,sspb.sspb_ssup_id as bookmarkedByUserId, sspb.sspb_ssc_id  from satsang_social.satsang_social_posts ssp 
        left join satsang_social.satsang_social_post_bookmarks sspb 
        on ssp.ssp_id =sspb.sspb_ssp_id
        where ssp.ssp_sfmm_id =$1 and sspb.sspb_ssup_id =$1 and sspb.sspb_ssc_id = 451
        and ssp.ssp_ssc_id = 200
        )x
        order by Random()
        limit 1
        `
        const result = await PgSocialClient.query(query,[myFriendId])
        return {
            postId: result.rows[0]?.postid,
            postedByUserId: result.rows[0]?.postedbyuserid,
            bookmarkedByUserId: result.rows[0]?.bookmarkedbyuserid
        }
    }
    async getMyNonFriendsRandomBookmarkReadyPostWithFriendsVisibility(bookmarkedByUserId:string){
        const myFriendId = await TestContext.services.userRepo.getRandomNonSocialFriendId(bookmarkedByUserId)
        const query = `
        select x.postid, x.postedbyuserid, x.bookmarkedbyuserid, x.statusid from (
        select ssp.ssp_id as postId, ssp.ssp_sfmm_id as postedByUserId ,sspb.sspb_ssup_id as bookmarkedByUserId, sspb.sspb_ssc_id as statusId  from satsang_social.satsang_social_posts ssp 
        left join satsang_social.satsang_social_post_bookmarks sspb 
        on ssp.ssp_id =sspb.sspb_ssp_id
        where sspb.sspb_id is null and ssp.ssp_ssc_id = 202
        ssp.ssp_sfmm_id =$1
        union
        select ssp.ssp_id as postId, ssp.ssp_sfmm_id as postedByUserId ,sspb.sspb_ssup_id as bookmarkedByUserId, sspb.sspb_ssc_id  from satsang_social.satsang_social_posts ssp 
        left join satsang_social.satsang_social_post_bookmarks sspb 
        on ssp.ssp_id =sspb.sspb_ssp_id
        where ssp.ssp_sfmm_id =$1 and sspb.sspb_ssup_id =$1 and sspb.sspb_ssc_id = 451
        and ssp.ssp_ssc_id = 202
        )x
        order by Random()
        limit 1
        `
        const result = await PgSocialClient.query(query,[myFriendId])
        return {
            postId: result.rows[0]?.postid,
            postedByUserId: result.rows[0]?.postedbyuserid,
            bookmarkedByUserId: result.rows[0]?.bookmarkedbyuserid
        }
    }
    async getMyNonFriendsRandomBookmarkReadyPostWithFriendsOfFriendVisibility(bookmarkedByUserId:string){
        const myFriendId = await TestContext.services.userRepo.getRandomNonSocialFriendId(bookmarkedByUserId)
        const query = `
        select x.postid, x.postedbyuserid, x.bookmarkedbyuserid, x.statusid from (
        select ssp.ssp_id as postId, ssp.ssp_sfmm_id as postedByUserId ,sspb.sspb_ssup_id as bookmarkedByUserId, sspb.sspb_ssc_id as statusId  from satsang_social.satsang_social_posts ssp 
        left join satsang_social.satsang_social_post_bookmarks sspb 
        on ssp.ssp_id =sspb.sspb_ssp_id
        where sspb.sspb_id is null and ssp.ssp_ssc_id = 203
        ssp.ssp_sfmm_id =$1
        union
        select ssp.ssp_id as postId, ssp.ssp_sfmm_id as postedByUserId ,sspb.sspb_ssup_id as bookmarkedByUserId, sspb.sspb_ssc_id  from satsang_social.satsang_social_posts ssp 
        left join satsang_social.satsang_social_post_bookmarks sspb 
        on ssp.ssp_id =sspb.sspb_ssp_id
        where ssp.ssp_sfmm_id =$1 and sspb.sspb_ssup_id =$1 and sspb.sspb_ssc_id = 451
        and ssp.ssp_ssc_id = 203
        )x
        order by Random()
        limit 1
        `
        const result = await PgSocialClient.query(query,[myFriendId])
        return {
            postId: result.rows[0]?.postid,
            postedByUserId: result.rows[0]?.postedbyuserid,
            bookmarkedByUserId: result.rows[0]?.bookmarkedbyuserid
        }
    }

    async getMyRandomBookmarkReadyPublicPost(bookmarkedByUserId:string){
        const query = `
        select x.postid, x.postedbyuserid, x.bookmarkedbyuserid, x.statusid from (
        select ssp.ssp_id as postId, ssp.ssp_sfmm_id as postedByUserId ,sspb.sspb_ssup_id as bookmarkedByUserId, sspb.sspb_ssc_id as statusId  from satsang_social.satsang_social_posts ssp 
        left join satsang_social.satsang_social_post_bookmarks sspb 
        on ssp.ssp_id =sspb.sspb_ssp_id
        where sspb.sspb_id is null and ssp.ssp_ssc_id = 204
        ssp.ssp_sfmm_id =$1
        union
        select ssp.ssp_id as postId, ssp.ssp_sfmm_id as postedByUserId ,sspb.sspb_ssup_id as bookmarkedByUserId, sspb.sspb_ssc_id  from satsang_social.satsang_social_posts ssp 
        left join satsang_social.satsang_social_post_bookmarks sspb 
        on ssp.ssp_id =sspb.sspb_ssp_id
        where ssp.ssp_sfmm_id =$1 and sspb.sspb_ssup_id =$1 and sspb.sspb_ssc_id = 451
        and ssp.ssp_ssc_id = 204
        )x
        order by Random()
        limit 1
        `
        const result = await PgSocialClient.query(query,[bookmarkedByUserId])
        return {
            postId: result.rows[0]?.postid,
            postedByUserId: result.rows[0]?.postedbyuserid,
            bookmarkedByUserId: result.rows[0]?.bookmarkedbyuserid
        }
    }
    async getMyRandomBookmarkReadyHiddenPost(bookmarkedByUserId:string){
        const query = `
        select x.postid, x.postedbyuserid, x.bookmarkedbyuserid, x.statusid from (
        select ssp.ssp_id as postId, ssp.ssp_sfmm_id as postedByUserId ,sspb.sspb_ssup_id as bookmarkedByUserId, sspb.sspb_ssc_id as statusId  from satsang_social.satsang_social_posts ssp 
        left join satsang_social.satsang_social_post_bookmarks sspb 
        on ssp.ssp_id =sspb.sspb_ssp_id
        where sspb.sspb_id is null and ssp.ssp_ssc_id = 201
        ssp.ssp_sfmm_id =$1
        union
        select ssp.ssp_id as postId, ssp.ssp_sfmm_id as postedByUserId ,sspb.sspb_ssup_id as bookmarkedByUserId, sspb.sspb_ssc_id  from satsang_social.satsang_social_posts ssp 
        left join satsang_social.satsang_social_post_bookmarks sspb 
        on ssp.ssp_id =sspb.sspb_ssp_id
        where ssp.ssp_sfmm_id =$1 and sspb.sspb_ssup_id =$1 and sspb.sspb_ssc_id = 451
        and ssp.ssp_ssc_id = 201
        )x
        order by Random()
        limit 1
        `
        const result = await PgSocialClient.query(query,[bookmarkedByUserId])
        return {
            postId: result.rows[0]?.postid,
            postedByUserId: result.rows[0]?.postedbyuserid,
            bookmarkedByUserId: result.rows[0]?.bookmarkedbyuserid
        }
    }
    async getMyRandomBookmarkReadyDeletedPost(bookmarkedByUserId:string){
        const query = `
        select x.postid, x.postedbyuserid, x.bookmarkedbyuserid, x.statusid from (
        select ssp.ssp_id as postId, ssp.ssp_sfmm_id as postedByUserId ,sspb.sspb_ssup_id as bookmarkedByUserId, sspb.sspb_ssc_id as statusId  from satsang_social.satsang_social_posts ssp 
        left join satsang_social.satsang_social_post_bookmarks sspb 
        on ssp.ssp_id =sspb.sspb_ssp_id
        where sspb.sspb_id is null and ssp.ssp_ssc_id = 200
        ssp.ssp_sfmm_id =$1
        union
        select ssp.ssp_id as postId, ssp.ssp_sfmm_id as postedByUserId ,sspb.sspb_ssup_id as bookmarkedByUserId, sspb.sspb_ssc_id  from satsang_social.satsang_social_posts ssp 
        left join satsang_social.satsang_social_post_bookmarks sspb 
        on ssp.ssp_id =sspb.sspb_ssp_id
        where ssp.ssp_sfmm_id =$1 and sspb.sspb_ssup_id =$1 and sspb.sspb_ssc_id = 451
        and ssp.ssp_ssc_id = 200
        )x
        order by Random()
        limit 1
        `
        const result = await PgSocialClient.query(query,[bookmarkedByUserId])
        return {
            postId: result.rows[0]?.postid,
            postedByUserId: result.rows[0]?.postedbyuserid,
            bookmarkedByUserId: result.rows[0]?.bookmarkedbyuserid
        }
    }
    async getMyRandomBookmarkReadyPostWithFriendsVisibility(bookmarkedByUserId:string){
        const query = `
        select x.postid, x.postedbyuserid, x.bookmarkedbyuserid, x.statusid from (
        select ssp.ssp_id as postId, ssp.ssp_sfmm_id as postedByUserId ,sspb.sspb_ssup_id as bookmarkedByUserId, sspb.sspb_ssc_id as statusId  from satsang_social.satsang_social_posts ssp 
        left join satsang_social.satsang_social_post_bookmarks sspb 
        on ssp.ssp_id =sspb.sspb_ssp_id
        where sspb.sspb_id is null and ssp.ssp_ssc_id = 202
        ssp.ssp_sfmm_id =$1
        union
        select ssp.ssp_id as postId, ssp.ssp_sfmm_id as postedByUserId ,sspb.sspb_ssup_id as bookmarkedByUserId, sspb.sspb_ssc_id  from satsang_social.satsang_social_posts ssp 
        left join satsang_social.satsang_social_post_bookmarks sspb 
        on ssp.ssp_id =sspb.sspb_ssp_id
        where ssp.ssp_sfmm_id =$1 and sspb.sspb_ssup_id =$1 and sspb.sspb_ssc_id = 451
        and ssp.ssp_ssc_id = 202
        )x
        order by Random()
        limit 1
        `
        const result = await PgSocialClient.query(query,[bookmarkedByUserId])
        return {
            postId: result.rows[0]?.postid,
            postedByUserId: result.rows[0]?.postedbyuserid,
            bookmarkedByUserId: result.rows[0]?.bookmarkedbyuserid
        }
    }
    async getMyRandomBookmarkReadyPostWithFriendsOfFriendsVisibility(bookmarkedByUserId:string){
        const query = `
        select x.postid, x.postedbyuserid, x.bookmarkedbyuserid, x.statusid from (
        select ssp.ssp_id as postId, ssp.ssp_sfmm_id as postedByUserId ,sspb.sspb_ssup_id as bookmarkedByUserId, sspb.sspb_ssc_id as statusId  from satsang_social.satsang_social_posts ssp 
        left join satsang_social.satsang_social_post_bookmarks sspb 
        on ssp.ssp_id =sspb.sspb_ssp_id
        where sspb.sspb_id is null and ssp.ssp_ssc_id = 203
        ssp.ssp_sfmm_id =$1
        union
        select ssp.ssp_id as postId, ssp.ssp_sfmm_id as postedByUserId ,sspb.sspb_ssup_id as bookmarkedByUserId, sspb.sspb_ssc_id  from satsang_social.satsang_social_posts ssp 
        left join satsang_social.satsang_social_post_bookmarks sspb 
        on ssp.ssp_id =sspb.sspb_ssp_id
        where ssp.ssp_sfmm_id =$1 and sspb.sspb_ssup_id =$1 and sspb.sspb_ssc_id = 451
        and ssp.ssp_ssc_id = 203
        )x
        order by Random()
        limit 1
        `
        const result = await PgSocialClient.query(query,[bookmarkedByUserId])
        return {
            postId: result.rows[0]?.postid,
            postedByUserId: result.rows[0]?.postedbyuserid,
            bookmarkedByUserId: result.rows[0]?.bookmarkedbyuserid
        }
    }


    // 2. Remove Bookmark Ready Post
    async getMyFriendsRandomRemoveBookmarkPublicReadyPost(bookmarkedByUserId:string){
        const myFriendId = await TestContext.services.userRepo.getRandomFriendIdWithAcceptedStatusOtherThanLoggedIn(bookmarkedByUserId)
        const query = `
        select x.postid, x.postedbyuserid, x.bookmarkedbyuserid from (
        select ssp.ssp_id as postId, ssp.ssp_sfmm_id as postedByUserId ,
        sspb.sspb_ssup_id as bookmarkedByUserId, sspb.sspb_ssc_id  
        from satsang_social.satsang_social_posts ssp 
        inner join satsang_social.satsang_social_post_bookmarks sspb 
        on ssp.ssp_id =sspb.sspb_ssp_id
        where ssp.ssp_sfmm_id =$1 and ssp.ssp_ssc_id = 204
        and sspb.sspb_ssup_id =$1 and sspb.sspb_ssc_id = 450
        )x
        order by Random()
        limit 1
        `
        const result = await PgSocialClient.query(query,[myFriendId])
        return {
            postId: result.rows[0]?.postid,
            postedByUserId: result.rows[0]?.postedbyuserid,
            bookmarkedByUserId: result.rows[0]?.bookmarkedbyuserid
        }
    }
    async getMyFriendsRandomRemoveBookmarkReadyHiddenPost(bookmarkedByUserId:string){
        const myFriendId = await TestContext.services.userRepo.getRandomFriendIdWithAcceptedStatusOtherThanLoggedIn(bookmarkedByUserId)
        const query = `
        select x.postid, x.postedbyuserid, x.bookmarkedbyuserid from (
        select ssp.ssp_id as postId, ssp.ssp_sfmm_id as postedByUserId ,
        sspb.sspb_ssup_id as bookmarkedByUserId, sspb.sspb_ssc_id  
        from satsang_social.satsang_social_posts ssp 
        inner join satsang_social.satsang_social_post_bookmarks sspb 
        on ssp.ssp_id =sspb.sspb_ssp_id
        where ssp.ssp_sfmm_id =$1 and ssp.ssp_ssc_id = 201
        and sspb.sspb_ssup_id =$1 and sspb.sspb_ssc_id = 450
        )x
        order by Random()
        limit 1
        `
        const result = await PgSocialClient.query(query,[myFriendId])
        return {
            postId: result.rows[0]?.postid,
            postedByUserId: result.rows[0]?.postedbyuserid,
            bookmarkedByUserId: result.rows[0]?.bookmarkedbyuserid
        }
    }
    async getMyFriendsRandomRemoveBookmarkReadyDeletedPost(bookmarkedByUserId:string){
        const myFriendId = await TestContext.services.userRepo.getRandomFriendIdWithAcceptedStatusOtherThanLoggedIn(bookmarkedByUserId)
        const query = `
        select x.postid, x.postedbyuserid, x.bookmarkedbyuserid from (
        select ssp.ssp_id as postId, ssp.ssp_sfmm_id as postedByUserId ,
        sspb.sspb_ssup_id as bookmarkedByUserId, sspb.sspb_ssc_id  
        from satsang_social.satsang_social_posts ssp 
        inner join satsang_social.satsang_social_post_bookmarks sspb 
        on ssp.ssp_id =sspb.sspb_ssp_id
        where ssp.ssp_sfmm_id =$1 and ssp.ssp_ssc_id = 200
        and sspb.sspb_ssup_id =$1 and sspb.sspb_ssc_id = 450
        )x
        order by Random()
        limit 1
        `
        const result = await PgSocialClient.query(query,[myFriendId])
        return {
            postId: result.rows[0]?.postid,
            postedByUserId: result.rows[0]?.postedbyuserid,
            bookmarkedByUserId: result.rows[0]?.bookmarkedbyuserid
        }
    }
    async getMyFriendsRandomRemoveBookmarkReadyPostWithFriendsVisibility(bookmarkedByUserId:string){
        const myFriendId = await TestContext.services.userRepo.getRandomFriendIdWithAcceptedStatusOtherThanLoggedIn(bookmarkedByUserId)
        const query = `
        select x.postid, x.postedbyuserid, x.bookmarkedbyuserid from (
        select ssp.ssp_id as postId, ssp.ssp_sfmm_id as postedByUserId ,
        sspb.sspb_ssup_id as bookmarkedByUserId, sspb.sspb_ssc_id  
        from satsang_social.satsang_social_posts ssp 
        inner join satsang_social.satsang_social_post_bookmarks sspb 
        on ssp.ssp_id =sspb.sspb_ssp_id
        where ssp.ssp_sfmm_id =$1 and ssp.ssp_ssc_id = 202
        and sspb.sspb_ssup_id =$1 and sspb.sspb_ssc_id = 450
        )x
        order by Random()
        limit 1
        `
        const result = await PgSocialClient.query(query,[myFriendId])
        return {
            postId: result.rows[0]?.postid,
            postedByUserId: result.rows[0]?.postedbyuserid,
            bookmarkedByUserId: result.rows[0]?.bookmarkedbyuserid
        }
    }
    async getMyFriendsRandomRemoveBookmarkReadyPostWithFriendsOfFriendsVisibility(bookmarkedByUserId:string){
        const myFriendId = await TestContext.services.userRepo.getRandomFriendIdWithAcceptedStatusOtherThanLoggedIn(bookmarkedByUserId)
        const query = `
        select x.postid, x.postedbyuserid, x.bookmarkedbyuserid from (
        select ssp.ssp_id as postId, ssp.ssp_sfmm_id as postedByUserId ,
        sspb.sspb_ssup_id as bookmarkedByUserId, sspb.sspb_ssc_id  
        from satsang_social.satsang_social_posts ssp 
        inner join satsang_social.satsang_social_post_bookmarks sspb 
        on ssp.ssp_id =sspb.sspb_ssp_id
        where ssp.ssp_sfmm_id =$1 and ssp.ssp_ssc_id = 203
        and sspb.sspb_ssup_id =$1 and sspb.sspb_ssc_id = 450
        )x
        order by Random()
        limit 1
        `
        const result = await PgSocialClient.query(query,[myFriendId])
        return {
            postId: result.rows[0]?.postid,
            postedByUserId: result.rows[0]?.postedbyuserid,
            bookmarkedByUserId: result.rows[0]?.bookmarkedbyuserid
        }
    }



    async getMyFriendsOfFriendsRandomRemoveBookmarkReadyPublicPost(bookmarkedByUserId:string){
        const myFriendId = await TestContext.services.userRepo.getValidFriendsOfFriendId(bookmarkedByUserId)
        const query = `
        select x.postid, x.postedbyuserid, x.bookmarkedbyuserid from (
        select ssp.ssp_id as postId, ssp.ssp_sfmm_id as postedByUserId ,
        sspb.sspb_ssup_id as bookmarkedByUserId, sspb.sspb_ssc_id  
        from satsang_social.satsang_social_posts ssp 
        inner join satsang_social.satsang_social_post_bookmarks sspb 
        on ssp.ssp_id =sspb.sspb_ssp_id
        where ssp.ssp_sfmm_id =$1 and ssp.ssp_ssc_id = 204
        and sspb.sspb_ssup_id =$1 and sspb.sspb_ssc_id = 450
        )x
        order by Random()
        limit 1
        `
        const result = await PgSocialClient.query(query,[myFriendId])
        return {
            postId: result.rows[0]?.postid,
            postedByUserId: result.rows[0]?.postedbyuserid,
            bookmarkedByUserId: result.rows[0]?.bookmarkedbyuserid
        }
    }
    async getMyFriendsOfFriendsRandomRemoveBookmarkReadyHiddenPost(bookmarkedByUserId:string){
        const myFriendId = await TestContext.services.userRepo.getValidFriendsOfFriendId(bookmarkedByUserId)
        const query = `
        select x.postid, x.postedbyuserid, x.bookmarkedbyuserid from (
        select ssp.ssp_id as postId, ssp.ssp_sfmm_id as postedByUserId ,
        sspb.sspb_ssup_id as bookmarkedByUserId, sspb.sspb_ssc_id  
        from satsang_social.satsang_social_posts ssp 
        inner join satsang_social.satsang_social_post_bookmarks sspb 
        on ssp.ssp_id =sspb.sspb_ssp_id
        where ssp.ssp_sfmm_id =$1 and ssp.ssp_ssc_id = 201
        and sspb.sspb_ssup_id =$1 and sspb.sspb_ssc_id = 450
        )x
        order by Random()
        limit 1
        `
        const result = await PgSocialClient.query(query,[myFriendId])
        return {
            postId: result.rows[0]?.postid,
            postedByUserId: result.rows[0]?.postedbyuserid,
            bookmarkedByUserId: result.rows[0]?.bookmarkedbyuserid
        }
    }
    async getMyFriendsOfFriendsRandomRemoveBookmarkReadyDeletedPost(bookmarkedByUserId:string){
        const myFriendId = await TestContext.services.userRepo.getValidFriendsOfFriendId(bookmarkedByUserId)
        const query = `
        select x.postid, x.postedbyuserid, x.bookmarkedbyuserid from (
        select ssp.ssp_id as postId, ssp.ssp_sfmm_id as postedByUserId ,
        sspb.sspb_ssup_id as bookmarkedByUserId, sspb.sspb_ssc_id  
        from satsang_social.satsang_social_posts ssp 
        inner join satsang_social.satsang_social_post_bookmarks sspb 
        on ssp.ssp_id =sspb.sspb_ssp_id
        where ssp.ssp_sfmm_id =$1 and ssp.ssp_ssc_id = 200
        and sspb.sspb_ssup_id =$1 and sspb.sspb_ssc_id = 450
        )x
        order by Random()
        limit 1
        `
        const result = await PgSocialClient.query(query,[myFriendId])
        return {
            postId: result.rows[0]?.postid,
            postedByUserId: result.rows[0]?.postedbyuserid,
            bookmarkedByUserId: result.rows[0]?.bookmarkedbyuserid
        }
    }
    async getMyFriendsOfFriendsRandomRemoveBookmarkReadyPostWithFriendsVisibility(bookmarkedByUserId:string){
        const myFriendId = await TestContext.services.userRepo.getValidFriendsOfFriendId(bookmarkedByUserId)
        const query = `
        select x.postid, x.postedbyuserid, x.bookmarkedbyuserid from (
        select ssp.ssp_id as postId, ssp.ssp_sfmm_id as postedByUserId ,
        sspb.sspb_ssup_id as bookmarkedByUserId, sspb.sspb_ssc_id  
        from satsang_social.satsang_social_posts ssp 
        inner join satsang_social.satsang_social_post_bookmarks sspb 
        on ssp.ssp_id =sspb.sspb_ssp_id
        where ssp.ssp_sfmm_id =$1 and ssp.ssp_ssc_id = 202
        and sspb.sspb_ssup_id =$1 and sspb.sspb_ssc_id = 450
        )x
        order by Random()
        limit 1
        `
        const result = await PgSocialClient.query(query,[myFriendId])
        return {
            postId: result.rows[0]?.postid,
            postedByUserId: result.rows[0]?.postedbyuserid,
            bookmarkedByUserId: result.rows[0]?.bookmarkedbyuserid
        }
    }
    async getMyFriendsOfFriendsRandomRemoveBookmarkReadyPostWithFriendsOfFriendVisibility(bookmarkedByUserId:string){
        const myFriendId = await TestContext.services.userRepo.getValidFriendsOfFriendId(bookmarkedByUserId)
        const query = `
        select x.postid, x.postedbyuserid, x.bookmarkedbyuserid from (
        select ssp.ssp_id as postId, ssp.ssp_sfmm_id as postedByUserId ,
        sspb.sspb_ssup_id as bookmarkedByUserId, sspb.sspb_ssc_id  
        from satsang_social.satsang_social_posts ssp 
        inner join satsang_social.satsang_social_post_bookmarks sspb 
        on ssp.ssp_id =sspb.sspb_ssp_id
        where ssp.ssp_sfmm_id =$1 and ssp.ssp_ssc_id = 203
        and sspb.sspb_ssup_id =$1 and sspb.sspb_ssc_id = 450
        )x
        order by Random()
        limit 1
        `
        const result = await PgSocialClient.query(query,[myFriendId])
        return {
            postId: result.rows[0]?.postid,
            postedByUserId: result.rows[0]?.postedbyuserid,
            bookmarkedByUserId: result.rows[0]?.bookmarkedbyuserid
        }
    }

    async getMyNonFriendsRandomRemoveBookmarkReadyPublicPost(bookmarkedByUserId:string){
        const myFriendId = await TestContext.services.userRepo.getRandomNonSocialFriendId(bookmarkedByUserId)
        const query = `
        select x.postid, x.postedbyuserid, x.bookmarkedbyuserid from (
        select ssp.ssp_id as postId, ssp.ssp_sfmm_id as postedByUserId ,
        sspb.sspb_ssup_id as bookmarkedByUserId, sspb.sspb_ssc_id  
        from satsang_social.satsang_social_posts ssp 
        inner join satsang_social.satsang_social_post_bookmarks sspb 
        on ssp.ssp_id =sspb.sspb_ssp_id
        where ssp.ssp_sfmm_id =$1 and ssp.ssp_ssc_id = 204
        and sspb.sspb_ssup_id =$1 and sspb.sspb_ssc_id = 450
        )x
        order by Random()
        limit 1
        `
        const result = await PgSocialClient.query(query,[myFriendId])
        return {
            postId: result.rows[0]?.postid,
            postedByUserId: result.rows[0]?.postedbyuserid,
            bookmarkedByUserId: result.rows[0]?.bookmarkedbyuserid
        }
    }
    async getMyNonFriendsRandomRemoveBookmarkReadyHiddenPost(bookmarkedByUserId:string){
        const myFriendId = await TestContext.services.userRepo.getRandomNonSocialFriendId(bookmarkedByUserId)
        const query = `
        select x.postid, x.postedbyuserid, x.bookmarkedbyuserid from (
        select ssp.ssp_id as postId, ssp.ssp_sfmm_id as postedByUserId ,
        sspb.sspb_ssup_id as bookmarkedByUserId, sspb.sspb_ssc_id  
        from satsang_social.satsang_social_posts ssp 
        inner join satsang_social.satsang_social_post_bookmarks sspb 
        on ssp.ssp_id =sspb.sspb_ssp_id
        where ssp.ssp_sfmm_id =$1 and ssp.ssp_ssc_id = 201
        and sspb.sspb_ssup_id =$1 and sspb.sspb_ssc_id = 450
        )x
        order by Random()
        limit 1
        `
        const result = await PgSocialClient.query(query,[myFriendId])
        return {
            postId: result.rows[0]?.postid,
            postedByUserId: result.rows[0]?.postedbyuserid,
            bookmarkedByUserId: result.rows[0]?.bookmarkedbyuserid
        }
    }
    async getMyNonFriendsRandomRemoveBookmarkReadyDeletedPost(bookmarkedByUserId:string){
        const myFriendId = await TestContext.services.userRepo.getRandomNonSocialFriendId(bookmarkedByUserId)
        const query = `
        select x.postid, x.postedbyuserid, x.bookmarkedbyuserid from (
        select ssp.ssp_id as postId, ssp.ssp_sfmm_id as postedByUserId ,
        sspb.sspb_ssup_id as bookmarkedByUserId, sspb.sspb_ssc_id  
        from satsang_social.satsang_social_posts ssp 
        inner join satsang_social.satsang_social_post_bookmarks sspb 
        on ssp.ssp_id =sspb.sspb_ssp_id
        where ssp.ssp_sfmm_id =$1 and ssp.ssp_ssc_id = 200
        and sspb.sspb_ssup_id =$1 and sspb.sspb_ssc_id = 450
        )x
        order by Random()
        limit 1
        `
        const result = await PgSocialClient.query(query,[myFriendId])
        return {
            postId: result.rows[0]?.postid,
            postedByUserId: result.rows[0]?.postedbyuserid,
            bookmarkedByUserId: result.rows[0]?.bookmarkedbyuserid
        }
    }
    async getMyNonFriendsRandomRemoveBookmarkReadyPostWithFriendsVisibility(bookmarkedByUserId:string){
        const myFriendId = await TestContext.services.userRepo.getRandomNonSocialFriendId(bookmarkedByUserId)
        const query = `
        select x.postid, x.postedbyuserid, x.bookmarkedbyuserid from (
        select ssp.ssp_id as postId, ssp.ssp_sfmm_id as postedByUserId ,
        sspb.sspb_ssup_id as bookmarkedByUserId, sspb.sspb_ssc_id  
        from satsang_social.satsang_social_posts ssp 
        inner join satsang_social.satsang_social_post_bookmarks sspb 
        on ssp.ssp_id =sspb.sspb_ssp_id
        where ssp.ssp_sfmm_id =$1 and ssp.ssp_ssc_id = 202
        and sspb.sspb_ssup_id =$1 and sspb.sspb_ssc_id = 450
        )x
        order by Random()
        limit 1
        `
        const result = await PgSocialClient.query(query,[myFriendId])
        return {
            postId: result.rows[0]?.postid,
            postedByUserId: result.rows[0]?.postedbyuserid,
            bookmarkedByUserId: result.rows[0]?.bookmarkedbyuserid
        }
    }
    async getMyNonFriendsRandomRemoveBookmarkReadyPostWithFriendsOfFriendVisibility(bookmarkedByUserId:string){
        const myFriendId = await TestContext.services.userRepo.getRandomNonSocialFriendId(bookmarkedByUserId)
        const query = `
        select x.postid, x.postedbyuserid, x.bookmarkedbyuserid from (
        select ssp.ssp_id as postId, ssp.ssp_sfmm_id as postedByUserId ,
        sspb.sspb_ssup_id as bookmarkedByUserId, sspb.sspb_ssc_id  
        from satsang_social.satsang_social_posts ssp 
        inner join satsang_social.satsang_social_post_bookmarks sspb 
        on ssp.ssp_id =sspb.sspb_ssp_id
        where ssp.ssp_sfmm_id =$1 and ssp.ssp_ssc_id = 203
        and sspb.sspb_ssup_id =$1 and sspb.sspb_ssc_id = 450
        )x
        order by Random()
        limit 1
        `
        const result = await PgSocialClient.query(query,[myFriendId])
        return {
            postId: result.rows[0]?.postid,
            postedByUserId: result.rows[0]?.postedbyuserid,
            bookmarkedByUserId: result.rows[0]?.bookmarkedbyuserid
        }
    }

    async getMyRandomBookmarkRemoveReadyPublicPost(bookmarkedByUserId:string){
        const query = `
        select x.postid, x.postedbyuserid, x.bookmarkedbyuserid from (
        select ssp.ssp_id as postId, ssp.ssp_sfmm_id as postedByUserId ,
        sspb.sspb_ssup_id as bookmarkedByUserId, sspb.sspb_ssc_id  
        from satsang_social.satsang_social_posts ssp 
        inner join satsang_social.satsang_social_post_bookmarks sspb 
        on ssp.ssp_id =sspb.sspb_ssp_id
        where ssp.ssp_sfmm_id =$1 and ssp.ssp_ssc_id = 204
        and sspb.sspb_ssup_id =$1 and sspb.sspb_ssc_id = 450
        )x
        order by Random()
        limit 1
        `
        const result = await PgSocialClient.query(query,[bookmarkedByUserId])
        return {
            postId: result.rows[0]?.postid,
            postedByUserId: result.rows[0]?.postedbyuserid,
            bookmarkedByUserId: result.rows[0]?.bookmarkedbyuserid
        }
    }
    async getMyRandomBookmarkRemoveReadyHiddenPost(bookmarkedByUserId:string){
        const query = `
        select x.postid, x.postedbyuserid, x.bookmarkedbyuserid from (
        select ssp.ssp_id as postId, ssp.ssp_sfmm_id as postedByUserId ,
        sspb.sspb_ssup_id as bookmarkedByUserId, sspb.sspb_ssc_id  
        from satsang_social.satsang_social_posts ssp 
        inner join satsang_social.satsang_social_post_bookmarks sspb 
        on ssp.ssp_id =sspb.sspb_ssp_id
        where ssp.ssp_sfmm_id =$1 and ssp.ssp_ssc_id = 201
        and sspb.sspb_ssup_id =$1 and sspb.sspb_ssc_id = 450
        )x
        order by Random()
        limit 1
        `
        const result = await PgSocialClient.query(query,[bookmarkedByUserId])
        return {
            postId: result.rows[0]?.postid,
            postedByUserId: result.rows[0]?.postedbyuserid,
            bookmarkedByUserId: result.rows[0]?.bookmarkedbyuserid
        }
    }
    async getMyRandomBookmarkRemoveReadyDeletedPost(bookmarkedByUserId:string){
        const query = `
        select x.postid, x.postedbyuserid, x.bookmarkedbyuserid from (
        select ssp.ssp_id as postId, ssp.ssp_sfmm_id as postedByUserId ,
        sspb.sspb_ssup_id as bookmarkedByUserId, sspb.sspb_ssc_id  
        from satsang_social.satsang_social_posts ssp 
        inner join satsang_social.satsang_social_post_bookmarks sspb 
        on ssp.ssp_id =sspb.sspb_ssp_id
        where ssp.ssp_sfmm_id =$1 and ssp.ssp_ssc_id = 200
        and sspb.sspb_ssup_id =$1 and sspb.sspb_ssc_id = 450
        )x
        order by Random()
        limit 1
        `
        const result = await PgSocialClient.query(query,[bookmarkedByUserId])
        return {
            postId: result.rows[0]?.postid,
            postedByUserId: result.rows[0]?.postedbyuserid,
            bookmarkedByUserId: result.rows[0]?.bookmarkedbyuserid
        }
    }
    async getMyRandomBookmarkRemoveReadyPostWithFriendsVisibility(bookmarkedByUserId:string){
        const query = `
        select x.postid, x.postedbyuserid, x.bookmarkedbyuserid from (
        select ssp.ssp_id as postId, ssp.ssp_sfmm_id as postedByUserId ,
        sspb.sspb_ssup_id as bookmarkedByUserId, sspb.sspb_ssc_id  
        from satsang_social.satsang_social_posts ssp 
        inner join satsang_social.satsang_social_post_bookmarks sspb 
        on ssp.ssp_id =sspb.sspb_ssp_id
        where ssp.ssp_sfmm_id =$1 and ssp.ssp_ssc_id = 202
        and sspb.sspb_ssup_id =$1 and sspb.sspb_ssc_id = 450
        )x
        order by Random()
        limit 1
        `
        const result = await PgSocialClient.query(query,[bookmarkedByUserId])
        return {
            postId: result.rows[0]?.postid,
            postedByUserId: result.rows[0]?.postedbyuserid,
            bookmarkedByUserId: result.rows[0]?.bookmarkedbyuserid
        }
    }
    async getMyRandomBookmarkRemoveReadyPostWithFriendsOfFriendsVisibility(bookmarkedByUserId:string){
        const query = `
        select x.postid, x.postedbyuserid, x.bookmarkedbyuserid from (
        select ssp.ssp_id as postId, ssp.ssp_sfmm_id as postedByUserId ,
        sspb.sspb_ssup_id as bookmarkedByUserId, sspb.sspb_ssc_id  
        from satsang_social.satsang_social_posts ssp 
        inner join satsang_social.satsang_social_post_bookmarks sspb 
        on ssp.ssp_id =sspb.sspb_ssp_id
        where ssp.ssp_sfmm_id =$1 and ssp.ssp_ssc_id = 203
        and sspb.sspb_ssup_id =$1 and sspb.sspb_ssc_id = 450
        )x
        order by Random()
        limit 1
        `
        const result = await PgSocialClient.query(query,[bookmarkedByUserId])
        return {
            postId: result.rows[0]?.postid,
            postedByUserId: result.rows[0]?.postedbyuserid,
            bookmarkedByUserId: result.rows[0]?.bookmarkedbyuserid
        }
    }
}