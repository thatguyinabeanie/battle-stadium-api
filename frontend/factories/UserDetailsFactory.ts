import { Factory } from 'rosie';
import { UserDetails } from '@/api/model/user-details';

export const UserDetailsFactory = Factory.define<UserDetails>('UserDetails')
.attr('username', () => 'username')
.attr('pronouns', () => 'pronouns')
.attr('email', () => 'email')
.attr('first_name', () => 'first_name')
.attr('last_name', () => 'last_name')
.attr('id', () => 0)
;