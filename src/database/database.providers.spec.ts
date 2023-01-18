import { Test, TestingModule } from '@nestjs/testing';
import { databaseProviders } from './database.providers';
import { database } from './database';
describe('database', () => {
  beforeEach(async () => {
  });

  describe('root', () => {
    it('provider should return DATA_SOURCE', () => {
        console.log(databaseProviders);
        // Output:
        //  [ { provide: 'DATA_SOURCE', useFactory: [AsyncFunction: useFactory] } ]
        expect(databaseProviders[0].provide).toEqual('DATA_SOURCE');
        //expect(apController.getHello()).toBe('Hello World!');
    });
  });
  it('should return mysql', () => {
     return database.type === 'mysql';
  })
});
