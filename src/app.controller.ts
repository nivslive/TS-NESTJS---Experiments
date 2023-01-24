import { Controller, Get, Param, Query, Render, Res } from '@nestjs/common';
import { AppService } from './app.service';
import FileSystem from './Utils/FileSystem';
import { response } from 'express';

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
  getIterateComponents(...response: any) {
    return [...response];
  }
  getComponentData(response: string) {
    let object: Object = {};
    response.split(',').forEach((res) => {
      let splited: Array<string> = res.split(':');
      console.log(splited, 'getComponentData: splited')
      object[splited[0]] = splited[1];
    })
    return object
  }
  portoflioComponentData(component: string): Object {
    if(component === 'banner') {
      return {
        type: component,
        data: {
          color: 'red',
          border: '1px solid blue',
          title: 'title nois',
          button: this.getComponentData(` 
            title:title,
            description:tal,
            img:blau,
            test:fodase,
            maizena: seila,
            test: aonde,
            mano: porque,
            `),
        }
      };
    }
    if(component === 'about') {
      return {
        type: component,
        data: {
          color: 'red',
          border: '1px solid blue',
          title: 'title nois',
        }
      };
    }
    if(component === 'footer') {
      return {
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
    }
  }
  getPortfolioComponentData(components: Array<any>): any {
    console.log(components, 'getPortfolioComponentData');
    let array: Array<Object> = [];
    components.forEach((component) => {
      try {
        component = component.trim();
        array.push(this.portoflioComponentData(component));
      } catch(e) {}
    })
    console.log(array, 'array: getPortfolioComponentData');
    return array;
  }

  getComponents(components: string): Array<Object> {
    console.log(components, 'getComponents');
    const componentsSplited: Array<String> = components.split(',');
    if(this.getType() === 'portfolio') 
      return this.getPortfolioComponentData(componentsSplited);
    if(this.getType() === 'default') 
      return this.getDefaultComponentData(componentsSplited);
  };

  getReference(reference: string): any {
    const references = {
      'default': 'button, header, menu, galery',
      'portfolio': 'about, footer'
    }
    console.log(this.getComponents(references[reference]), 'getReference: references');
    try {
      return this.getComponents(references[reference]);
    } catch(e) { return "Não tem essa referencia"; }      
  }

  getStructure(structure: string): any {

  }
  detectEnterInSring(str: string): void {
  for (let i = 0; i < str.length; i++) {
    if (str[i] === '\n' || str[i] === '\r') {
      console.log('found enter key')
    };
  };
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
