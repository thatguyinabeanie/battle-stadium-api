import { Factory } from 'rosie';
import { UserRequest } from '@/api/model/userRequest';

export const UserRequestFactory = Factory.define<UserRequest>('UserRequest')
.attr('username', () => 'username')
.attr('pronouns', () => 'pronouns')
.attr('email', () => 'email')
.attr('first_name', () => 'first_name')
.attr('last_name', () => 'last_name')
.attr('id', () => 0)
.attr('current_password', () => 'current_password')
;