import { Injectable, Query } from '@nestjs/common';

@Injectable()
export class AppService {
  getComponent(data: Object): Object {
    return data;
  }
}
