import { Factory } from 'rosie';
import { Format } from '@/api/model/format';

export const FormatFactory = Factory.define<Format>('Format')
.attr('id', () => 0)
.attr('name', () => 'name')
;