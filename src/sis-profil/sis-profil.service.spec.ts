import { Test, TestingModule } from '@nestjs/testing';
import { SisProfilService } from './sis-profil.service';

describe('SisProfilService', () => {
  let service: SisProfilService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SisProfilService],
    }).compile();

    service = module.get<SisProfilService>(SisProfilService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
