import { Factory } from 'rosie';
import { PasswordRequest } from '@/api/model/passwordRequest';

export const PasswordRequestFactory = Factory.define<PasswordRequest>('PasswordRequest')
.attr('password', () => 'password')
.attr('password_confirmation', () => 'password_confirmation')
;