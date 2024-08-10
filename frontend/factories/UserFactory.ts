import { Factory } from 'rosie';
import { User } from '@/api/model/user';

export const UserFactory = Factory.define<User>('User')
.attr('username', () => 'username')
.attr('pronouns', () => 'pronouns')
.attr('id', () => 0)
;