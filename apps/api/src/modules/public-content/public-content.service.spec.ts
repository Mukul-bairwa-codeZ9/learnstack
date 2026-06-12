import { Test, TestingModule } from '@nestjs/testing';
import { PublicContentService } from './public-content.service';

describe('PublicContentService', () => {
  let service: PublicContentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PublicContentService],
    }).compile();

    service = module.get<PublicContentService>(PublicContentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
