import { Factory } from 'rosie';
import { UserPostRequest } from '@/api/model/userPostRequest';

export const UserPostRequestFactory = Factory.define<UserPostRequest>('UserPostRequest')
.attr('username', () => 'username')
.attr('pronouns', () => 'pronouns')
.attr('email', () => 'email')
.attr('first_name', () => 'first_name')
.attr('last_name', () => 'last_name')
.attr('id', () => 0)
.attr('password', () => 'password')
.attr('password_confirmation', () => 'password_confirmation')
;