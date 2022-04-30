import { schema } from 'normalizr';

export const usersSchema = new schema.Entity('users');
export const educationsSchema = new schema.Entity('educations', {
  user: usersSchema,
});
export const experiencesSchema = new schema.Entity('experiences', {
  user: usersSchema,
});
