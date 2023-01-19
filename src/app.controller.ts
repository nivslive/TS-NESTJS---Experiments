import { Controller, Get, Param, Query, Render } from '@nestjs/common';
import { AppService } from './app.service';


// file system module to perform file operations
const fs = require('fs-extra');


@Controller('example')
export class AppController {
  constructor(private readonly appService: AppService) {}
  
  createJSON(file: string, content: string, cb?: any) {
    fs.outputFile('storage/' + file + '.json', content, err => {
      if(err) {
        console.log(err);
      } else {
        console.log('The file was saved!');
      }
    })
  }

  @Get(':structure/:reference')
  @Render('index.pug')
  getComponentStructure(@Param('structure') structure: string,
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
        // stringify JSON Object
        const jsonContent = JSON.stringify(inputs);
        console.log(jsonContent);
     
        this.createJSON("structure", jsonContent);
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
    this.createJSON("component", jsonContent);
    return this.appService.getComponent(data);
  }
}
