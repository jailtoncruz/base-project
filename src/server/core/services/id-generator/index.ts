import ShortUniqueId from 'short-unique-id';

const { randomUUID } = new ShortUniqueId({ length: 12 });
export const uid = randomUUID;
