import { Test, TestingModule } from '@nestjs/testing';
import { PublicContentController } from './public-content.controller';

describe('PublicContentController', () => {
  let controller: PublicContentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PublicContentController],
    }).compile();

    controller = module.get<PublicContentController>(PublicContentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
