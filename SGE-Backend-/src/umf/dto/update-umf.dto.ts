import { PartialType } from '@nestjs/mapped-types';
import { CreateUmfDto } from './create-umf.dto';

export class UpdateUmfDto extends PartialType(CreateUmfDto) {}
