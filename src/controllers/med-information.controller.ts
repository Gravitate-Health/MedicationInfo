import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {MedInformation} from '../models';
import {MedInformationRepository} from '../repositories';

export class MedInformationController {
  constructor(
    @repository(MedInformationRepository)
    public medInformationRepository : MedInformationRepository,
  ) {}

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
            exclude: ['id'],
          }),
        },
      },
    })
    medInformation: Omit<MedInformation, 'id'>,
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

  @patch('/med-informations/{id}')
  @response(204, {
    description: 'MedInformation PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MedInformation, {partial: true}),
        },
      },
    })
    medInformation: MedInformation,
  ): Promise<void> {
    await this.medInformationRepository.updateById(id, medInformation);
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
