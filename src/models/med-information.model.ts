// Copyright 2022 Universidad Politécnica de Madrid
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class MedInformation extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  internalId: string;

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
