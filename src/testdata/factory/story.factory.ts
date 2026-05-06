import { faker } from '@faker-js/faker';

type StoryPayloadOptions = {
  mediaId?: string;
  mediaType?: number;
  visibilityType?: number;
  caption?: string;
  thumbnailMediaId?: string;
  viewerIds?: string[]
}

type reactStoryPayloadOptions = {
    statusId?: number,
    storyId?: string,
    reaction?: string
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
            mediaType: options.mediaType ?? faker.helpers.arrayElements([1,2]),
            visibilityType: options.visibilityType ?? faker.helpers.arrayElements([1,2,3]),
            caption: options.caption ?? faker.lorem.words(10),
            thumbnailMediaId: options.thumbnailMediaId ?? '',
            viewerIds: options.viewerIds ?? []
        }
        
        return payload
    }

    static buildStoryReactionPayload(options: reactStoryPayloadOptions={}){
        const payload = {
            statusId: options.statusId ?? 1,
            storyId: options.storyId ?? '',
            reaction: options.reaction ?? '❤️'
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