import { faker } from "@faker-js/faker";
import { MediaFactory } from "../../testdata/factory/media.factory";

type mediaPayload = ReturnType<typeof MediaFactory.buildInitialMediaUploadPayload>

interface postStoryCases{
    description: string
    overrides: Partial<mediaPayload>
    expectedStatus: number
    expectedMessage: string
}

export const mediaPostImageValidationTestCases: postStoryCases[]=[
    {
        description: 'Higher Image Media Height For Post',
        overrides: {
            medias:[
                {
                    mediaHeight: 1082,
                    mimeType:'image/webp',
                    mediaWidth:1080,
                    mediaSizeInBytes:5242880
                }
            ]
        },
        expectedStatus: 400,
        expectedMessage: 'Invalid file dimensions.'
    },
    {
        description: 'Smaller Image Media Height For Post',
        overrides: {
            medias:[
                {
                    mediaHeight: 1000,
                    mimeType:'image/webp',
                    mediaWidth:1080,
                    mediaSizeInBytes:5242880
                }
            ]
        },
        expectedStatus: 201,
        expectedMessage: 'Success'
    },
    {
        description: 'Higher Image Media Width For Post',
        overrides: {
            medias:[
                {
                    mediaHeight:1080,
                    mimeType:'image/webp',
                    mediaWidth:1082,
                    mediaSizeInBytes:5242880
                }
            ]
        },
        expectedStatus: 400,
        expectedMessage: 'Invalid file dimensions.'
    },
    {
        description: 'Smaller Image Media Width For Post',
        overrides: {
            medias:[
                {
                    mediaHeight:1080,
                    mimeType:'image/webp',
                    mediaWidth:1070,
                    mediaSizeInBytes:5242880
                }
            ]
        },
        expectedStatus: 201,
        expectedMessage: 'Success'
    },
    {
        description: 'Smaller Image Media Height And Width For Post',
        overrides: {
            medias:[
                {
                    mediaHeight:980,
                    mimeType:'image/webp',
                    mediaWidth:980,
                    mediaSizeInBytes:5242880
                }
            ]
        },
        expectedStatus: 201,
        expectedMessage: 'Success'
    },
    {
        description: 'Higher Image Media Height And Width For Post',
        overrides: {
            medias:[
                {
                    mediaHeight:1081,
                    mimeType:'image/webp',
                    mediaWidth:1090,
                    mediaSizeInBytes:5242880
                }
            ]
        },
        expectedStatus: 400,
        expectedMessage: 'Invalid file dimensions.'
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
        expectedMessage: 'Invalid file dimensions.'
    },
    {
        description: 'Zero Media Size For Post',
        overrides: {
            medias:[
                {
                    mediaHeight:1080,
                    mimeType:'image/webp',
                    mediaWidth:1080,
                    mediaSizeInBytes:0
                }
            ]
        },
        expectedStatus: 400,
        expectedMessage: 'Invalid file dimensions.'
    },
    {
        description: 'Higher Media Size For Post',
        overrides: {
            medias:[
                {
                    mediaHeight:1080,
                    mimeType:'image/webp',
                    mediaWidth:1920,
                    mediaSizeInBytes:5242881
                }
            ]
        },
        expectedStatus: 400,
        expectedMessage: 'File size exceeds the allowed limit.'
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
        expectedStatus: 201,
        expectedMessage: 'Success'
    },
]


export const mediaPostVideoValidationTestCases: postStoryCases[]=[
    {
        description: 'Higher Image Media Height For Post',
        overrides: {
            medias:[
                {
                    mediaHeight: 750,
                    mimeType:'video/mp4',
                    mediaWidth:1280,
                    mediaSizeInBytes:5242880
                }
            ]
        },
        expectedStatus: 400,
        expectedMessage: 'Invalid file dimensions.'
    },
    {
        description: 'Smaller Image Media Height For Post',
        overrides: {
            medias:[
                {
                    mediaHeight: 700,
                    mimeType:'video/mp4',
                    mediaWidth: 1280,
                    mediaSizeInBytes:5242880
                }
            ]
        },
        expectedStatus: 201,
        expectedMessage: 'Success'
    },
    {
        description: 'Higher Image Media Width For Post',
        overrides: {
            medias:[
                {
                    mediaHeight:720,
                    mimeType:'video/mp4',
                    mediaWidth:1281,
                    mediaSizeInBytes:5242880
                }
            ]
        },
        expectedStatus: 400,
        expectedMessage: 'Invalid file dimensions.'
    },
    {
        description: 'Smaller Image Media Width For Post',
        overrides: {
            medias:[
                {
                    mediaHeight:720,
                    mimeType:'image/webp',
                    mediaWidth:1279,
                    mediaSizeInBytes:5242880
                }
            ]
        },
        expectedStatus: 201,
        expectedMessage: 'Success'
    },
    {
        description: 'Smaller Image Media Height And Width For Post',
        overrides: {
            medias:[
                {
                    mediaHeight:718,
                    mimeType:'image/webp',
                    mediaWidth:1278,
                    mediaSizeInBytes:5242880
                }
            ]
        },
        expectedStatus: 201,
        expectedMessage: 'Success'
    },
    {
        description: 'Higher Image Media Height And Width For Post',
        overrides: {
            medias:[
                {
                    mediaHeight:1081,
                    mimeType:'image/webp',
                    mediaWidth:1090,
                    mediaSizeInBytes:5242880
                }
            ]
        },
        expectedStatus: 400,
        expectedMessage: 'Invalid file dimensions.'
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
        expectedMessage: 'Invalid file dimensions.'
    },
    {
        description: 'Zero Media Size For Post',
        overrides: {
            medias:[
                {
                    mediaHeight:1080,
                    mimeType:'image/webp',
                    mediaWidth:1080,
                    mediaSizeInBytes:0
                }
            ]
        },
        expectedStatus: 400,
        expectedMessage: 'Invalid file dimensions.'
    },
    {
        description: 'Higher Media Size For Post',
        overrides: {
            medias:[
                {
                    mediaHeight:720,
                    mimeType:'image/webp',
                    mediaWidth:1280,
                    mediaSizeInBytes:5242881
                }
            ]
        },
        expectedStatus: 400,
        expectedMessage: 'File size exceeds the allowed limit.'
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
        expectedStatus: 201,
        expectedMessage: 'Success'
    },
]




interface mediaStoryCases{
    description: string
    overrides: Partial<mediaPayload>
    expectedStatus: number
    expectedMessage: string
}

export const mediaStoryImageValidationTestCases: mediaStoryCases[]=[
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
        expectedMessage: 'Invalid file dimensions.'
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
        expectedStatus: 201,
        expectedMessage: 'Success'
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
        expectedMessage: 'Invalid file dimensions.'
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
        expectedStatus: 201,
        expectedMessage: 'Success'
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
        expectedStatus: 201,
        expectedMessage: 'Success'
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
        expectedMessage: 'Invalid file dimensions.'
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
                    mediaSizeInBytes:5242881
                }
            ]
        },
        expectedStatus: 400,
        expectedMessage: 'File size exceeds the allowed limit.'
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


export const mediaStoryVideoValidationTestCases: mediaStoryCases[]=[
    {
        description: 'Higher Video Media Height For Story',
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
        expectedMessage: 'Invalid file dimensions.'
    },
    {
        description: 'Smaller Video Media Height For Story',
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
        expectedStatus: 201,
        expectedMessage: 'Success'
    },
    {
        description: 'Higher Video Media Width For Story',
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
        expectedMessage: 'Invalid file dimensions.'
    },
    {
        description: 'Smaller Video Media Width For Story',
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
        expectedStatus: 201,
        expectedMessage: 'Success'
    },
    {
        description: 'Smaller Video Media Height And Width For Story',
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
        expectedStatus: 201,
        expectedMessage: 'Success'
    },
    {
        description: 'Higher Video Media Height And Width For Story',
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
        expectedMessage: 'Invalid file dimensions.'
    },
    {
        description: 'Zero Video Media Height And Width For Story',
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
        expectedMessage: 'Invalid file dimensions.'
    },
    {
        description: 'Zero Vidio Size For Story',
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
        expectedMessage: 'Invalid file dimensions.'
    },
    {
        description: 'Higher Video Size For Story',
        overrides: {
            medias:[
                {
                    mediaHeight:1080,
                    mimeType:'image/webp',
                    mediaWidth:1920,
                    mediaSizeInBytes:5242881
                }
            ]
        },
        expectedStatus: 400,
        expectedMessage: 'Invalid file dimensions.'
    },
    {
        description: 'Invalid Video Size For Story',
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
        expectedMessage: 'Invalid file dimensions.'
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
                    mediaWidth:1080,
                    mediaSizeInBytes:5242880
                }
            ]
        },
        expectedStatus: 400,
        expectedMessage: 'Invalid file dimensions.'
    },
    {
        description: 'Smaller Image Media Height For Profile',
        overrides: {
            medias:[
                {
                    mediaHeight: 1000,
                    mimeType:'image/webp',
                    mediaWidth:1080,
                    mediaSizeInBytes:5242880
                }
            ]
        },
        expectedStatus: 201,
        expectedMessage: 'Success'
    },
    {
        description: 'Higher Image Media Width For Profile',
        overrides: {
            medias:[
                {
                    mediaHeight:1080,
                    mimeType:'image/webp',
                    mediaWidth:1950,
                    mediaSizeInBytes:5242880
                }
            ]
        },
        expectedStatus: 400,
        expectedMessage: 'Invalid file dimensions.'
    },
    {
        description: 'Smaller Image Media Width For Profile',
        overrides: {
            medias:[
                {
                    mediaHeight:1080,
                    mimeType:'image/webp',
                    mediaWidth:1070,
                    mediaSizeInBytes:5242880
                }
            ]
        },
        expectedStatus: 201,
        expectedMessage: 'Success'
    },
    {
        description: 'Smaller Image Media Height And Width For Profile',
        overrides: {
            medias:[
                {
                    mediaHeight:980,
                    mimeType:'image/webp',
                    mediaWidth:980,
                    mediaSizeInBytes:5242880
                }
            ]
        },
        expectedStatus: 201,
        expectedMessage: 'Success'
    },
    {
        description: 'Higher Image Media Height And Width For Profile',
        overrides: {
            medias:[
                {
                    mediaHeight:1081,
                    mimeType:'image/webp',
                    mediaWidth:1082,
                    mediaSizeInBytes:5242880
                }
            ]
        },
        expectedStatus: 400,
        expectedMessage: 'Invalid file dimensions.'
    },
    {
        description: 'Zero Image Media Height And Width For Profile',
        overrides: {
            medias:[
                {
                    mediaHeight:0,
                    mimeType:'image/webp',
                    mediaWidth:0,
                    mediaSizeInBytes:5242880
                }
            ]
        },
        expectedStatus: 400,
        expectedMessage: 'Invalid file dimensions.'
    },
    {
        description: 'Zero Media Size For Profile',
        overrides: {
            medias:[
                {
                    mediaHeight:1080,
                    mimeType:'image/webp',
                    mediaWidth:1080,
                    mediaSizeInBytes:0
                }
            ]
        },
        expectedStatus: 400,
        expectedMessage: 'Invalid file dimensions.'
    },
    {
        description: 'Higher Media Size For Profile',
        overrides: {
            medias:[
                {
                    mediaHeight:1080,
                    mimeType:'image/webp',
                    mediaWidth:1080,
                    mediaSizeInBytes:5242881
                }
            ]
        },
        expectedStatus: 400,
        expectedMessage: 'File size exceeds the allowed limit.'
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
        expectedStatus: 201,
        expectedMessage: 'Success'
    },
]