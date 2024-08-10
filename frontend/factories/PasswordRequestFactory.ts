import { Factory } from 'rosie';
import { PasswordRequest } from '@/api/model/password-request';

export const PasswordRequestFactory = Factory.define<PasswordRequest>('PasswordRequest')
.attr('password', () => 'password')
.attr('password_confirmation', () => 'password_confirmation')
;