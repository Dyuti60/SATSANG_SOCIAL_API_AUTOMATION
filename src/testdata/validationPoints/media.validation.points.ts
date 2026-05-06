import { faker } from "@faker-js/faker";
import { MediaFactory } from "../../testdata/factory/media.factory";

type mediaPayload = ReturnType<typeof MediaFactory.buildInitialMediaUploadPayload>

interface postStoryCases{
    description: string
    overrides: Partial<mediaPayload>
    expectedStatus: number
    expectedMessage: string
}

export const mediaPostValidationTestCases: postStoryCases[]=[
    {
        description: 'Higher Image Media Height For Post',
        overrides: {
            medias:[
                {
                    mediaHeight: 1200,
                    mimeType:'image/webp',
                    mediaWidth:1920,
                    mediaSizeInBytes:524880
                }
            ]
        },
        expectedStatus: 400,
        expectedMessage: 'Higher Media Hight for Post'
    },
    {
        description: 'Smaller Image Media Height For Post',
        overrides: {
            medias:[
                {
                    mediaHeight: 1000,
                    mimeType:'image/webp',
                    mediaWidth:1920,
                    mediaSizeInBytes:524880
                }
            ]
        },
        expectedStatus: 400,
        expectedMessage: 'Smaller Media Hight for post'
    },
    {
        description: 'Higher Image Media Width For Post',
        overrides: {
            medias:[
                {
                    mediaHeight:1080,
                    mimeType:'image/webp',
                    mediaWidth:1950,
                    mediaSizeInBytes:524880
                }
            ]
        },
        expectedStatus: 400,
        expectedMessage: 'Higher Media Width for post'
    },
    {
        description: 'Smaller Image Media Width For Post',
        overrides: {
            medias:[
                {
                    mediaHeight:1080,
                    mimeType:'image/webp',
                    mediaWidth:1900,
                    mediaSizeInBytes:524880
                }
            ]
        },
        expectedStatus: 400,
        expectedMessage: 'Higher Media Width for Post'
    },
    {
        description: 'Smaller Image Media Height And Width For Post',
        overrides: {
            medias:[
                {
                    mediaHeight:980,
                    mimeType:'image/webp',
                    mediaWidth:1680,
                    mediaSizeInBytes:524880
                }
            ]
        },
        expectedStatus: 400,
        expectedMessage: 'Smaller Image Media Height And Width For Post'
    },
    {
        description: 'Higher Image Media Height And Width For Post',
        overrides: {
            medias:[
                {
                    mediaHeight:1081,
                    mimeType:'image/webp',
                    mediaWidth:1921,
                    mediaSizeInBytes:524880
                }
            ]
        },
        expectedStatus: 400,
        expectedMessage: 'Higher Image Media Height And Width For Post'
    },
    {
        description: 'Zero Image Media Height And Width For Post',
        overrides: {
            medias:[
                {
                    mediaHeight:0,
                    mimeType:'image/webp',
                    mediaWidth:0,
                    mediaSizeInBytes:524880
                }
            ]
        },
        expectedStatus: 400,
        expectedMessage: 'Zero Image Media Height And Width For Post'
    },
    {
        description: 'Zero Media Size For Post',
        overrides: {
            medias:[
                {
                    mediaHeight:1080,
                    mimeType:'image/webp',
                    mediaWidth:1920,
                    mediaSizeInBytes:0
                }
            ]
        },
        expectedStatus: 400,
        expectedMessage: 'Zero Media Size For Post'
    },
    {
        description: 'Higher Media Size For Post',
        overrides: {
            medias:[
                {
                    mediaHeight:1080,
                    mimeType:'image/webp',
                    mediaWidth:1920,
                    mediaSizeInBytes:524881
                }
            ]
        },
        expectedStatus: 400,
        expectedMessage: 'Higher Media Size For Post'
    },
    {
        description: 'Invalid Media Size For Post',
        overrides: {
            medias:[
                {
                    mediaHeight:100,
                    mimeType:'image/webp',
                    mediaWidth:100,
                    mediaSizeInBytes:100
                }
            ]
        },
        expectedStatus: 400,
        expectedMessage: 'Invalid Media Size For Post'
    },
]




interface mediaStoryCases{
    description: string
    overrides: Partial<mediaPayload>
    expectedStatus: number
    expectedMessage: string
}

export const mediaStoryValidationTestCases: mediaStoryCases[]=[
    {
        description: 'Higher Image Media Height For Story',
        overrides: {
            medias:[
                {
                    mediaHeight: 1200,
                    mimeType:'image/webp',
                    mediaWidth:1920,
                    mediaSizeInBytes:524880
                }
            ]
        },
        expectedStatus: 400,
        expectedMessage: 'Higher Media Hight for Story'
    },
    {
        description: 'Smaller Image Media Height For Story',
        overrides: {
            medias:[
                {
                    mediaHeight: 1000,
                    mimeType:'image/webp',
                    mediaWidth:1920,
                    mediaSizeInBytes:524880
                }
            ]
        },
        expectedStatus: 400,
        expectedMessage: 'Smaller Media Hight for Story'
    },
    {
        description: 'Higher Image Media Width For Story',
        overrides: {
            medias:[
                {
                    mediaHeight:1080,
                    mimeType:'image/webp',
                    mediaWidth:1950,
                    mediaSizeInBytes:524880
                }
            ]
        },
        expectedStatus: 400,
        expectedMessage: 'Higher Media Width for Story'
    },
    {
        description: 'Smaller Image Media Width For Story',
        overrides: {
            medias:[
                {
                    mediaHeight:1080,
                    mimeType:'image/webp',
                    mediaWidth:1900,
                    mediaSizeInBytes:524880
                }
            ]
        },
        expectedStatus: 400,
        expectedMessage: 'Higher Media Width for Story'
    },
    {
        description: 'Smaller Image Media Height And Width For Story',
        overrides: {
            medias:[
                {
                    mediaHeight:980,
                    mimeType:'image/webp',
                    mediaWidth:1680,
                    mediaSizeInBytes:524880
                }
            ]
        },
        expectedStatus: 400,
        expectedMessage: 'Smaller Image Media Height And Width For Story'
    },
    {
        description: 'Higher Image Media Height And Width For Story',
        overrides: {
            medias:[
                {
                    mediaHeight:1081,
                    mimeType:'image/webp',
                    mediaWidth:1921,
                    mediaSizeInBytes:524880
                }
            ]
        },
        expectedStatus: 400,
        expectedMessage: 'Higher Image Media Height And Width For Story'
    },
    {
        description: 'Zero Image Media Height And Width For Story',
        overrides: {
            medias:[
                {
                    mediaHeight:0,
                    mimeType:'image/webp',
                    mediaWidth:0,
                    mediaSizeInBytes:524880
                }
            ]
        },
        expectedStatus: 400,
        expectedMessage: 'Zero Image Media Height And Width For Story'
    },
    {
        description: 'Zero Media Size For Story',
        overrides: {
            medias:[
                {
                    mediaHeight:1080,
                    mimeType:'image/webp',
                    mediaWidth:1920,
                    mediaSizeInBytes:0
                }
            ]
        },
        expectedStatus: 400,
        expectedMessage: 'Zero Media Size For Story'
    },
    {
        description: 'Higher Media Size For Story',
        overrides: {
            medias:[
                {
                    mediaHeight:1080,
                    mimeType:'image/webp',
                    mediaWidth:1920,
                    mediaSizeInBytes:524881
                }
            ]
        },
        expectedStatus: 400,
        expectedMessage: 'Higher Media Size For Story'
    },
    {
        description: 'Invalid Media Size For Story',
        overrides: {
            medias:[
                {
                    mediaHeight:100,
                    mimeType:'image/webp',
                    mediaWidth:100,
                    mediaSizeInBytes:100
                }
            ]
        },
        expectedStatus: 400,
        expectedMessage: 'Invalid Media Size For Story'
    },
]





interface mediaProfileCases{
    description: string
    overrides: Partial<mediaPayload>
    expectedStatus: number
    expectedMessage: string
}

export const mediaProfileValidationTestCases: mediaProfileCases[]=[
    {
        description: 'Higher Image Media Height For Profile',
        overrides: {
            medias:[
                {
                    mediaHeight: 1200,
                    mimeType:'image/webp',
                    mediaWidth:1920,
                    mediaSizeInBytes:524880
                }
            ]
        },
        expectedStatus: 400,
        expectedMessage: 'Higher Media Hight for Profile'
    },
    {
        description: 'Smaller Image Media Height For Profile',
        overrides: {
            medias:[
                {
                    mediaHeight: 1000,
                    mimeType:'image/webp',
                    mediaWidth:1920,
                    mediaSizeInBytes:524880
                }
            ]
        },
        expectedStatus: 400,
        expectedMessage: 'Smaller Media Hight for Profile'
    },
    {
        description: 'Higher Image Media Width For Profile',
        overrides: {
            medias:[
                {
                    mediaHeight:1080,
                    mimeType:'image/webp',
                    mediaWidth:1950,
                    mediaSizeInBytes:524880
                }
            ]
        },
        expectedStatus: 400,
        expectedMessage: 'Higher Media Width for Profile'
    },
    {
        description: 'Smaller Image Media Width For Profile',
        overrides: {
            medias:[
                {
                    mediaHeight:1080,
                    mimeType:'image/webp',
                    mediaWidth:1900,
                    mediaSizeInBytes:524880
                }
            ]
        },
        expectedStatus: 400,
        expectedMessage: 'Higher Media Width for Profile'
    },
    {
        description: 'Smaller Image Media Height And Width For Profile',
        overrides: {
            medias:[
                {
                    mediaHeight:980,
                    mimeType:'image/webp',
                    mediaWidth:1680,
                    mediaSizeInBytes:524880
                }
            ]
        },
        expectedStatus: 400,
        expectedMessage: 'Smaller Image Media Height And Width For Profile'
    },
    {
        description: 'Higher Image Media Height And Width For Profile',
        overrides: {
            medias:[
                {
                    mediaHeight:1081,
                    mimeType:'image/webp',
                    mediaWidth:1921,
                    mediaSizeInBytes:524880
                }
            ]
        },
        expectedStatus: 400,
        expectedMessage: 'Higher Image Media Height And Width For Profile'
    },
    {
        description: 'Zero Image Media Height And Width For Profile',
        overrides: {
            medias:[
                {
                    mediaHeight:0,
                    mimeType:'image/webp',
                    mediaWidth:0,
                    mediaSizeInBytes:524880
                }
            ]
        },
        expectedStatus: 400,
        expectedMessage: 'Zero Image Media Height And Width For Profile'
    },
    {
        description: 'Zero Media Size For Profile',
        overrides: {
            medias:[
                {
                    mediaHeight:1080,
                    mimeType:'image/webp',
                    mediaWidth:1920,
                    mediaSizeInBytes:0
                }
            ]
        },
        expectedStatus: 400,
        expectedMessage: 'Zero Media Size For Profile'
    },
    {
        description: 'Higher Media Size For Profile',
        overrides: {
            medias:[
                {
                    mediaHeight:1080,
                    mimeType:'image/webp',
                    mediaWidth:1920,
                    mediaSizeInBytes:524881
                }
            ]
        },
        expectedStatus: 400,
        expectedMessage: 'Higher Media Size For Profile'
    },
    {
        description: 'Invalid Media Size For Profile',
        overrides: {
            medias:[
                {
                    mediaHeight:100,
                    mimeType:'image/webp',
                    mediaWidth:100,
                    mediaSizeInBytes:100
                }
            ]
        },
        expectedStatus: 400,
        expectedMessage: 'Invalid Media Size For Profile'
    },
]