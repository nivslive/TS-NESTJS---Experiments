import { Controller, Get, Param, Query, Render, Res } from '@nestjs/common';
import { AppService } from './app.service';
import FileSystem from './Utils/FileSystem';
import { response } from 'express';
import internal from 'stream';

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

  getIterateComponents(...response: any): Object[] {
    return [...response];
  }
  getComponentData(response: string): Object {
    let object: Object = {};
    response.split(',').forEach((res) => {
      let splited: Array<string> = res.split(':');
      console.log(splited, 'getComponentData: splited')
      object[splited[0].trim()] = splited[1];
    })
    return object
  }
  portoflioComponentData(component: string): Object {
  
    interface IComponent {
      type: string,
      variation: number,
      data: Object,
    }
    
    let variation: IComponent = {
      type: "",
      variation: 1,
      data: {},
    };

    if(component === 'banner') {
      variation = {
        type: component,
        variation: 1,
        data: {
          
          img: 'red',
          title: 'title nois',
          description: '1px solid blue',
          
          button: this.getComponentData(` 
            title: title,
            icon: test,
            border: tal,
            url:blau`)
        }
      };
    }
    if(component === 'about') {
      variation = {
        type: component,
        variation: 1,
        data: this.getComponentData('color:red,border:1px solid blue, title: nois'),
      };
    }
    if(component === 'footer') {
      return {
        type: component,
        variation: 1,
        data: {
          color: 'red',
          border: '1px solid blue',
          title: 'title nois',
          social_medias: this.getIterateComponents(
            this.getComponentData('title:facebook,url:facebook.com'),
            this.getComponentData('title:linkedin,url:linkedin.com'),
          ),
        }
      };
    }

    if(component === 'list') {
      return {
        type: component,
        variation: 1,
        data: {
          color: 'red',
          border: '1px solid blue',
          title: 'title nois',
          social_medias: this.getIterateComponents(
            this.getComponentData('title:facebook,url:facebook.com'),
            this.getComponentData('title:linkedin,url:linkedin.com'),
          ),
        }
      };
    }
  }
  getPortfolioComponentData(components: Array<any>): Array<Object> {
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
    //if(this.getType() === 'default') 
      // return this.getDefaultComponentData(componentsSplited);
  };

  getReference(reference: string): Array<Object> | String {
    const references = {
      'default': 'button, header, menu, galery',
      'portfolio': 'banner, about, footer'
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
      type: string,
      reference: Object,
    }
    const inputs: Array<Iinputs> = [
      { 
        type: this.getType(),
        reference:  this.getReference(this.getType()),
      }
    ];
        // stringify JSON Object
        const jsonContent = JSON.stringify(inputs);
        console.log(jsonContent);
     
        FileSystem.json("structure", jsonContent);
    return  { 'inputs': inputs };
  }
}
