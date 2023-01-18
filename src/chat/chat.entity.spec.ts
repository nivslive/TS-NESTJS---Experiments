import { Test, TestingModule } from '@nestjs/testing';
import { Chat } from './entities/chat.entity';

describe('Chat Entity', () => {
  let entity: Chat;
  entity = new Chat;

  it('should be defined', () => {
    expect(entity).toBeDefined();
  });

  it.only('id should be called', () => {
    console.log(entity.id);
    //expect().toBeCalled();
  });

  it('slug should be called', () => {
    expect(entity.slug).toBeCalled();
  });
  
  it('typeorm must exists', () => {
    console.log('test');
  });
});

