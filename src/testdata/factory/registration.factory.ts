import { faker } from '@faker-js/faker';

type RegisterPayload = {
    username: string;
    bio: string;
    gender: 'male' | 'female' | 'other';
    dob: string;
    stateToken: string;
};

type RegisterOverrides = {
    [K in keyof RegisterPayload]?: unknown;
};

export class RegistrationFactory{

    static registerPayload(overrides?: RegisterOverrides): RegisterOverrides{
        return {
            username: faker.name.firstName()+faker.lorem.word()+faker.name.prefix(),
            bio: faker.lorem.paragraph(),
            gender: faker.helpers.arrayElement(['male','female','other']),
            dob: faker.date.birthdate().toISOString().split('T')[0],
            stateToken: faker.datatype.uuid(),
            ...overrides as Partial<RegisterOverrides>
        }
    }
}