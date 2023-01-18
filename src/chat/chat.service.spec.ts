import { Test, TestingModule } from '@nestjs/testing';
import { ChatService } from './chat.service';

describe('ChatService', () => {
  let service: ChatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChatService],
    }).compile();

    service = module.get<ChatService>(ChatService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be return json', () => {
    const response = [
      // room
      {
        id: 0,
        title: 'test',
        subjects: [
          {
            id: 0,
            title: 'test',
            messages: [
              {
                id: 0,
                message: 'test',
                user_id: 0,
              },
              {
                id: 2,
                message: 'test',
                user_id: 0,
              },
              {
                id: 3,
                message: 'test',
                user_id: 0,
              } 
            ],
          }
        ],

      }
    ];
  })
});
