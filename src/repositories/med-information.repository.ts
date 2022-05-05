import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MedInformationDataSource} from '../datasources';
import {MedInformation, MedInformationRelations} from '../models';

export class MedInformationRepository extends DefaultCrudRepository<
  MedInformation,
  typeof MedInformation.prototype.id,
  MedInformationRelations
> {
  constructor(
    @inject('datasources.MedInformation') dataSource: MedInformationDataSource,
  ) {
    super(MedInformation, dataSource);
  }
}
