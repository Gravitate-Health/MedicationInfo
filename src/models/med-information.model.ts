import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class MedInformation extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true
  })
  identifier: string;

  @property({
    type: 'string',
    required: true,
  })
  id: string;

  @property({
    type: 'any',
  })
  code?: any;

  @property({
    type: 'string',
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

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;


  constructor(data?: Partial<MedInformation>) {
    super(data);
  }
}

export interface MedInformationRelations {
  // describe navigational properties here
}

export type MedInformationWithRelations = MedInformation & MedInformationRelations;
