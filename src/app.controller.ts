import { Controller, Get, Param, Query, Render, Res } from '@nestjs/common';
import { AppService } from './app.service';
import FileSystem from './Utils/FileSystem';

@Controller('app')
export class AppController {
  type: string;
  constructor(private readonly appService: AppService) {}
  
  
  @Get('type/preview/:layout')
  @Render('type/index.pug') 
  typing(@Param('layout') layout: string) {
    const data = require('../storage/structure.json')[0];
    return  { 'type': data.type, 'structure': data.reference.components };
  }

  @Get('use/:file')
  use(@Param('file') file: string,): FileSystem {
    return FileSystem.pick(file);
  }
  getType() {
    return this.type;
  }

  setType(type: string): void {
    this.type = type;
  }
  getDefaultComponentData(components: Array<any>): any {

  }
  getPortfolioComponentData(components: Array<any>): any {
    let array: Array<Object> = [];
    let componentData: Object = {};
    components.forEach((component) => {
      try {
        component = component.trim();
        if(component === 'header') {
          componentData = {
            type: component,
            data: {
              color: 'red',
              border: '1px solid blue',
              title: 'title nois',
            }
          };
          array.push(componentData);
        }
        if(component === 'banner') {
          componentData = {
            type: component,
            data: {
              color: 'red',
              border: '1px solid blue',
              title: 'title nois',
            }
          };
          array.push(componentData);
        }
        
        if(component === 'menu') {
          componentData = {
            type: component,
            data: {
              color: 'red',
              border: '1px solid blue',
              title: 'title nois',
            }
          };
          array.push(componentData);
        }
        if(component === 'galery') {
          componentData = {
            type: component,
            data: {
              color: 'red',
              border: '1px solid blue',
              title: 'title nois',
            }
          };
          array.push(componentData);
        }
        if(component === 'about') {
          componentData = {
            type: component,
            data: {
              color: 'red',
              border: '1px solid blue',
              title: 'title nois',
            }
          };
          array.push(componentData);
        }
        if(component === 'footer') {
          componentData = {
            type: component,
            data: {
              color: 'red',
              border: '1px solid blue',
              title: 'title nois',
              social_medias: [
                {
                  title: 'facebook',
                  url: 'facebook.com'
                },
                {
                  title: 'orkut',
                  url: 'orkut.com'
                },
                {
                  title: 'test',
                  url: 'test.com'
                },
                {
                  title: 'test',
                  url: 'test.com'
                },
              ],
            }
          };
          array.push(componentData);
        }
      } catch(e) {}
    })
    return array;
  }

  getComponents(components: string): Array<Object> {
    const componentsSplited: Array<String> = components.split(',');
    if(this.getType() === 'portfolio') 
      return this.getPortfolioComponentData(componentsSplited);
    if(this.getType() === 'default') 
      return this.getDefaultComponentData(componentsSplited);
  };

  getReference(reference: string): any {

    try {
      if(reference === 'default') {
        return {
          'components': this.getComponents('button,header,menu,galery'),
        };
      }

      if(reference === 'portfolio') {
        return {
          'components': this.getComponents('header, menu, galery, about, footer')
        }
      }

      if(reference === 'blog') {
        return {
          'components': this.getComponents('button,header,menu,galery'),
        };
      }

      if(reference === 'office') {
        return {
          'content': {
            single_page: false,

          },
          'components': this.getComponents('button,header,menu,galery'),
        };
      }


    } catch(e) {
      return "Não tem essa referencia";
    }
      
  }

  getStructure(structure: string): any {

  }

  @Get('create/:page/:reference')
  @Render('index.pug')
  getComponentStructure(
    @Param('page') type: string,
    @Param('reference') reference: string): any {
    this.setType(type);
    if(typeof type !== 'string') throw new Error('Is not string.');
    interface Iinputs {
      type: String,
      reference: any,
      placeholder: String,
      order: Number;
    }
    const inputs: Array<Iinputs> = [
      { 
        type: this.getType(),
        reference:  this.getReference(this.getType()),
        placeholder: '',
        order: 0,
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
