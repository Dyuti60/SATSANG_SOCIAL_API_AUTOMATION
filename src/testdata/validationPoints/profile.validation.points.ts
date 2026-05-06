import { faker } from "@faker-js/faker";
import { ProfileFactory } from "../../testdata/factory/profile.factory";

type profilePayload = ReturnType<typeof ProfileFactory.uploadProfileMedia>
interface profileCases{
    description: string
    overrides: Partial<profilePayload>
    expectedStatus: number
    expectedMessage: string
}

export const profileValidationTestCases: profileCases[] = [
    {
        description: 'Blank Profile Media',
        overrides: {
            mediaId: ''
        },
        expectedStatus: 400,
        expectedMessage: ''
    },
    {
        description: 'Space Profile Media',
        overrides: {
            mediaId: ' '
        },
        expectedStatus: 400,
        expectedMessage: ''
    },
    {
        description: 'Non Existing Media',
        overrides: {
            mediaId: '0196ee78-3ba1-7663-88fd-b385aa46c64b'
        },
        expectedStatus: 400,
        expectedMessage: ''
    },
    {
        description: 'Number Datatype Media',
        overrides: {
            mediaId: 1276567675
        },
        expectedStatus: 400,
        expectedMessage: ''
    },
    {
        description: 'Boolean Datatype Media',
        overrides: {
            mediaId: true
        },
        expectedStatus: 400,
        expectedMessage: ''
    },


]