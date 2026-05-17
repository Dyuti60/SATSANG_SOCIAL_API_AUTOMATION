import { faker } from '@faker-js/faker';

type StoryPayloadOptions = {
  mediaId?: string;
  visibilityType?: number;
  caption?: string;
  thumbnailMediaId?: string;
  viewerIds?: string[]
}

type BulkStoryPayloadOptions = {
  mediaIds?: string[];
  visibilityType?: number;
  caption?: string;
  thumbnailMediaIds?: string;
  viewerIds?: string[];
};

type reactStoryPayloadOptions = {
    hasReacted?: boolean;
    storyId?: string;
}

type storyReactionViewsOptions = {
    storyId?: string
}

type storyDeleteOptions = {
    storyId?: string
}

export class StoryFactory {

    static buildStoryPayload(options: StoryPayloadOptions={}){
        const payload = {
            mediaId: options.mediaId ?? '',
            visibilityType: options.visibilityType ?? 1,
            caption: options.caption ?? faker.lorem.words(10),
            thumbnailMediaId: options.thumbnailMediaId ?? options.mediaId,
            viewerIds: options.viewerIds ?? []
        }
        
        return payload
    }


    /**
     * BULK STORY CREATE PAYLOAD
     */
    static buildBulkStoryPayload(options: BulkStoryPayloadOptions={}) {
        const payload = {
        stories: options.mediaIds?.map((mediaId, index) => ({
            mediaId,
            visibilityType: options.visibilityType ?? 1,
            caption:
            options.caption ??
            faker.lorem.words(10),

            thumbnailMediaId:
            options.mediaIds?.[index] ?? '',

            viewerIds: options.viewerIds ?? []
        }))
        };

        return payload;
    }
    
    static buildStoryReactionPayload(options: reactStoryPayloadOptions={}){
        const payload = {
            hasReacted: options.hasReacted ?? false,
            storyId: options.storyId ?? ''
        }
        return payload
    }

    static buildDeletStoryPayload(options: storyReactionViewsOptions = {}){
        const payload = {
            storyId: options.storyId ?? ''
        }
        return payload
    }

    static buildFetchStoryReactionPayload(options: storyDeleteOptions = {}){
        const payload = {
            storyId: options.storyId ?? ''
        }
        return payload
    }


}