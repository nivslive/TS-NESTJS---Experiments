import { Controller, Get, Param, Query, Render } from '@nestjs/common';
import { AppService } from './app.service';
import FileSystem from './Utils/FileSystem';

@Controller('example')
export class AppController {
  constructor(private readonly appService: AppService) {}
  
  @Get('use/:file')
  use(@Param('file') file: string,): FileSystem {
    return FileSystem.pick(file);
  }

  @Get('create/:structure/:reference')
  @Render('index.pug')
  getComponentStructure(
    @Param('structure') structure: string,
    @Param('reference') reference: string): any {
    
    if(typeof structure !== 'string') throw new Error('Is not string.');
    const inputs = [
      { 
        'type': structure,
        'reference': reference,
        'placeholder': '',
        'order': '0',
      }
    ];

      if(reference === 'test') {
        inputs[0].placeholder = 'Referencias de teste';
      }
        // stringify JSON Object
        const jsonContent = JSON.stringify(inputs);
        console.log(jsonContent);
     
        FileSystem.json("structure", jsonContent);
    return  { 'inputs': inputs };
  }

  @Get(':component')
  getComponent(@Param('component') component: string): Object {
    let data: Object = {};
    if(component === 'response') {
      data = {
        'id': '',
        'component': '',
        'type': '',
        'data': [],
      };
    } 
     
    // stringify JSON Object
    const jsonContent = JSON.stringify(data);
    console.log(jsonContent); 
    FileSystem.json("component", jsonContent);
    return this.appService.getComponent(data);
  }
}
