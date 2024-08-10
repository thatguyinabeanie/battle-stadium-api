import { Factory } from 'rosie';
import { UserLoginRequest } from '@/api/model/userLoginRequest';

export const UserLoginRequestFactory = Factory.define<UserLoginRequest>('UserLoginRequest')
.attr('email', () => 'email')
.attr('password', () => 'password')
;