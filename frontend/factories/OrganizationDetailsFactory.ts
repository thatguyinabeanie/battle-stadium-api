import { Factory } from 'rosie';
import { OrganizationDetails } from '@/api/model/organization-details';

export const OrganizationDetailsFactory = Factory.define<OrganizationDetails>('OrganizationDetails')
.attr('id', () => 0)
.attr('name', () => 'name')
.attr('owner', () => undefined)
.attr('description', () => undefined)
;