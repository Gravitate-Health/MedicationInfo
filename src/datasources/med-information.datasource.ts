import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

/* const config = {
  name: 'MedInformation',
  connector: 'mongodb',
  url: process.env.DB_URL + "MedInformation" + "?replicaSet=rs0",
  host: process.env.DB_HOST || 'localhost',
  port: 27017,
  user: "",
  password: "",
  database: "MedInformation",
  useNewUrlParser: true,
  protocol: 'mongodb+srv'
}; */

const config = {
  name: 'MedInformation',
  connector: 'mongodb',
  url: "mongodb://localhost:27017",
  host: 'localhost',
  port: 27017,
  user: "",
  password: "",
  database: "MedInformation",
  useNewUrlParser: true,
  protocol: 'mongodb'
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class MedInformationDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'MedInformation';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.MedInformation', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
