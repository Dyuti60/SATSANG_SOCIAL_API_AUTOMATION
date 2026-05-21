import { faker } from "@faker-js/faker";
import { StoryFactory } from "../../../src/testdata/factory/story.factory";

type storyPayload = ReturnType<typeof StoryFactory.buildStoryPayload>

interface postStoryCases{
    description: string
    overrides: Partial<storyPayload>
    expectedStatus: number
    expectedMessage: string
}

export const storyCreateTestCases: postStoryCases[]=[
    {
        description: 'Invalid Media Id',
        overrides: {
            mediaId:'0196ee78-3ba1-7663-88fd-b385aa46c64b'
        },
        expectedStatus: 400,
        expectedMessage: 'Invalid media for story'
    },
    {
        description: 'Null MediaId',
        overrides: {
            mediaId:null
        },
        expectedStatus: 400,
        expectedMessage: 'mediaId must be a UUID'
    },
    {
        description: 'Blank MediaId',
        overrides: {
            mediaId:''
        },
        expectedStatus: 400,
        expectedMessage: 'mediaId must be a UUID'
    },
    {
        description: 'Invalid MediaId Datatype',
        overrides: {
            mediaId:123
        },
        expectedStatus: 400,
        expectedMessage: 'mediaId must be a UUID'
    },
    {
        description: 'Invalid Visibility Type',
        overrides: {
            visibility:'Hello Friends'
        },
        expectedStatus: 400,
        expectedMessage: 'visibility must be one of the following values: ALL_FRIENDS, CLOSE_FRIENDS, SELECTED_FRIENDS'
    },
    {
        description: 'Null Visibility Type',
        overrides: {
            visibility:null
        },
        expectedStatus: 400,
        expectedMessage: 'visibility must be one of the following values: ALL_FRIENDS, CLOSE_FRIENDS, SELECTED_FRIENDS'
    },
    {
        description: 'Lengthy Caption',
        overrides: {
            caption: faker.lorem.paragraphs(10)
        },
        expectedStatus: 500,
        expectedMessage: 'value too long for type character varying(500)'
    },
    {
        description: 'Blank Caption',
        overrides: {
            caption: ''
        },
        expectedStatus: 201,
        expectedMessage: 'Story created successfully'
    },
    {
        description: 'Null Caption',
        overrides: {
            caption: null
        },
        expectedStatus: 201,
        expectedMessage: 'Story created successfully'
    },
    {
        description: 'Invalid Caption Datatype',
        overrides: {
            caption: true
        },
        expectedStatus: 400,
        expectedMessage: 'caption must be a string'
    },
    {
        description: 'Invalid ThumbnailMediaId',
        overrides: {
            thumbnailMediaId:'0196ee78-3ba1-7663-88fd-b385aa46c64b'
        },
        expectedStatus: 400,
        expectedMessage: 'Invalid MediaId'
    },
    {
        description: 'Null ThumbnailMediaId',
        overrides: {
            thumbnailMediaId:null
        },
        expectedStatus: 201,
        expectedMessage: 'Story created successfully'
    },
    {
        description: 'Blank ThumbnailMediaId',
        overrides: {
            thumbnailMediaId:''
        },
        expectedStatus: 400,
        expectedMessage: 'thumbnailMediaId must be a UUID'
    },
    {
        description: 'Invalid ThumbnailMediaId Datatype',
        overrides: {
            thumbnailMediaId:123
        },
        expectedStatus: 400,
        expectedMessage: 'thumbnailMediaId must be a UUID'
    },
    {
        description: 'Invalid ViewersId',
        overrides: {
            viewerIds:['0814d9ac-1542-4e74-82ec-28866c8ce8ca']
        },
        expectedStatus: 400,
        expectedMessage: 'Invalid ViewerId'
    },
    {
        description: 'Null ViewersId',
        overrides: {
            viewerIds:[null]
        },
        expectedStatus: 201,
        expectedMessage: 'Story created successfully'
    },
    {
        description: 'Blank ViewersId',
        overrides: {
            viewerIds:['']
        },
        expectedStatus: 201,
        expectedMessage: 'Story created successfully'
    },
    {
        description: 'Invalid Datatype ViewersId',
        overrides: {
            viewerIds:[123]
        },
        expectedStatus: 400,
        expectedMessage: 'viewerId must be a UUID'
    },

]