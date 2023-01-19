import { Controller, Get, Param, Query, Render, Res } from '@nestjs/common';
import { AppService } from './app.service';
import FileSystem from './Utils/FileSystem';

@Controller('example')
export class AppController {
  previewFile: string = 'index';
  constructor(private readonly appService: AppService) {
    this.previewFile = 'index';
  }
  
  
  @Get('type/preview/:layout')
  @Render('type/index.pug') 
  type(@Param('layout') layout: string, @Res() res) {
    return  { 'type': layout };
  }

  @Get('use/:file')
  use(@Param('file') file: string,): FileSystem {
    return FileSystem.pick(file);
  }

  getComponents(components: string): any {
    return components;
  }

  getReference(reference: string): any {

    if(reference === 'default') {
      return {
        'components': this.getComponents('button,header,menu,galery'),
      };
    }

    if(reference === 'library') {
      return {
        'components': this.getComponents('button,header,menu,galery'),
      };
    }

    if(reference === 'office') {
      return {
        'components': this.getComponents('button,header,menu,galery'),
      };
    }

    if(reference === 'comercio') {
      return {
        'components': this.getComponents('button,header,menu,galery, commerce'),
      };
    }


    if(reference === 'magistant') {
      return {
        'components': this.getComponents('button,header,menu,galery'),
      };
    }
  }

  getStructure(structure: string): any {

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
        'reference':  this.getReference(reference),
        'placeholder': '',
        'order': '0',
      }
    ];

      if(reference === 'magnificant') {
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
