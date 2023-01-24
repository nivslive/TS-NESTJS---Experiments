import { Injectable } from '@nestjs/common';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';
import { UpdatePortfolioDto } from './dto/update-portfolio.dto';
import { AppController } from 'src/app.controller';

@Injectable()
export class PortfolioService extends AppController {
  
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

  
  create(createPortfolioDto: CreatePortfolioDto) {
    return 'This action adds a new portfolio';
  }

  findAll() {
    return `This action returns all portfolio`;
  }

  findOne(id: number) {
    return `This action returns a #${id} portfolio`;
  }

  update(id: number, updatePortfolioDto: UpdatePortfolioDto) {
    return `This action updates a #${id} portfolio`;
  }

  remove(id: number) {
    return `This action removes a #${id} portfolio`;
  }
}
