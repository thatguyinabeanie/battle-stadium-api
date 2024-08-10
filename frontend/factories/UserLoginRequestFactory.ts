import { Factory } from 'rosie';
import { UserLoginRequest } from '@/api/model/user-login-request';

export const UserLoginRequestFactory = Factory.define<UserLoginRequest>('UserLoginRequest')
.attr('email', () => 'email')
.attr('password', () => 'password')
;