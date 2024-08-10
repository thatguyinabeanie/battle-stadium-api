import { Factory } from 'rosie';
import { Organization } from '@/api/model/organization';

export const OrganizationFactory = Factory.define<Organization>('Organization')
.attr('id', () => 0)
.attr('name', () => 'name')
.attr('owner', () => undefined)
.attr('description', () => undefined)
;