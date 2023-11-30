import { Test, TestingModule } from '@nestjs/testing';
import { SisProfilController } from './sis-profil.controller';
import { SisProfilService } from './sis-profil.service';

describe('SisProfilController', () => {
  let controller: SisProfilController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SisProfilController],
      providers: [SisProfilService],
    }).compile();

    controller = module.get<SisProfilController>(SisProfilController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
