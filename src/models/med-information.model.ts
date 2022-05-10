import {Entity, model, property} from '@loopback/repository';

@model()
export class MedInformation extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
    required: true,
  })
  id: string;

  @property({
    type: 'string',
    required: true,
  })
  identifier: string;

  @property({
    type: 'any',
  })
  code?: any;

  @property({
    type: 'string',
    required: true,
  })
  status: string;

  @property({
    type: 'any',
  })
  marketingAuthorizationHolder?: any;

  @property({
    type: 'any',
  })
  doseForm?: any;

  @property({
    type: 'any',
  })
  totalVolume?: any;

  @property({
    type: 'any',
  })
  ingredient?: any;

  @property({
    type: 'any',
  })
  batch?: any;


  constructor(data?: Partial<MedInformation>) {
    super(data);
  }
}

export interface MedInformationRelations {
  // describe navigational properties here
}

export type MedInformationWithRelations = MedInformation & MedInformationRelations;
