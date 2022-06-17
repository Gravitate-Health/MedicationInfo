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

import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import {MedInformation} from '../models';
import {MedInformationRepository} from '../repositories';

import axios from 'axios';

export class MedInformationController {
  constructor(
    @repository(MedInformationRepository)
    public medInformationRepository: MedInformationRepository,
  ) { }

  @post('/med-informations')
  @response(200, {
    description: 'MedInformation model instance',
    content: {'application/json': {schema: getModelSchemaRef(MedInformation)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MedInformation, {
            title: 'NewMedInformation',
            exclude: ['internalId'],
          }),
        },
      },
    })
    medInformation: Omit<MedInformation, 'internalId'>,
  ): Promise<MedInformation> {
    return this.medInformationRepository.create(medInformation);
  }

  @get('/med-informations/count')
  @response(200, {
    description: 'MedInformation model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(MedInformation) where?: Where<MedInformation>,
  ): Promise<Count> {
    return this.medInformationRepository.count(where);
  }

  @get('/med-informations')
  @response(200, {
    description: 'Array of MedInformation model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(MedInformation, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(MedInformation) filter?: Filter<MedInformation>,
  ): Promise<MedInformation[]> {
    return this.medInformationRepository.find(filter);
  }

  @patch('/med-informations')
  @response(200, {
    description: 'MedInformation PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MedInformation, {partial: true}),
        },
      },
    })
    medInformation: MedInformation,
    @param.where(MedInformation) where?: Where<MedInformation>,
  ): Promise<Count> {
    return this.medInformationRepository.updateAll(medInformation, where);
  }

  @get('/med-informations/{id}')
  @response(200, {
    description: 'MedInformation model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(MedInformation, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(MedInformation, {exclude: 'where'}) filter?: FilterExcludingWhere<MedInformation>
  ): Promise<MedInformation> {
    return this.medInformationRepository.findById(id, filter);
  }

  @post('/med-informations/{id}')
  @response(200, {
    description: 'MedInformation focused model instance'
  })
  async focusById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {},
      },
    })
    IPSinformation: any,
    @param.filter(MedInformation, {exclude: 'where'}) filter?: FilterExcludingWhere<MedInformation>,
  ): Promise<any> {

    let focusingModuleBody = {
      ePI: await this.medInformationRepository.findById(id, filter),
      IPS: IPSinformation
    }

    var focusingModuleResponse: any;

    try {
      let url = "http://focusing-module:3000/med-information-focus"
      //Register the user
      let focusingModuleResponseAxios = await axios({
        method: 'post',
        url: url,
        timeout: 10 * 1000,
        headers: {
          'Content-Type': 'application/json'
        },
        data: focusingModuleBody
      });

      console.log(focusingModuleResponseAxios.data);

      focusingModuleResponse = focusingModuleResponseAxios.data;
    } catch (error) {
      console.log(error);
    }

    return focusingModuleResponse;
  }

  @put('/med-informations/{id}')
  @response(204, {
    description: 'MedInformation PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() medInformation: MedInformation,
  ): Promise<void> {
    await this.medInformationRepository.replaceById(id, medInformation);
  }

  @del('/med-informations/{id}')
  @response(204, {
    description: 'MedInformation DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.medInformationRepository.deleteById(id);
  }
}
