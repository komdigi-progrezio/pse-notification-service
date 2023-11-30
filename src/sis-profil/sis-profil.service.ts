import { Injectable } from '@nestjs/common';
import { errorResponse } from 'src/utils/errorResponse';
import { sis_profil } from 'models/sis_profil';
import { sis_penyelenggara } from 'models/sis_penyelenggara';
import { sisProfilResource } from './resource/sisProfilResource';
import { par_instansi } from 'models/par_instansi';
import { par_satuan_kerja } from 'models/par_satuan_kerja';
import { account } from 'models/account';
import { sis_penanggung_jawab } from 'models/sis_penanggung_jawab';
import { sis_fungsikhusus } from 'models/sis_fungsikhusus';
import { sis_ruang_lingkup } from 'models/sis_ruang_lingkup';
import { sis_jenis_layanan } from 'models/sis_jenis_layanan';
import { sis_pengaman } from 'models/sis_pengaman';
import { sis_tata_kelola } from 'models/sis_tata_kelola';
import { sis_sop } from 'models/sis_sop';
import { sis_software } from 'models/sis_software';
import { sis_hardware } from 'models/sis_hardware';
import { sis_tenaga_ahli_stock } from 'models/sis_tenaga_ahli_stock';
import * as moment from 'moment';
import { Op } from 'sequelize';
import { accountResource } from 'src/account/resource/accountResource';
import { request_update } from 'models/request_update';
import { requestUpdateResource } from 'src/request-update/resource/requestUpdateResource';

@Injectable()
export class SisProfilService {
  async findAll({ orderBy = 'created_at', limit = 50, offset = 0 }: {orderBy?: string, limit?: number, offset?: number}): Promise<any> {
    try {
      const data = await sis_profil.findAll({
        order: [[orderBy, 'DESC']],
        limit: limit,
        offset: offset,
        include: [
          {
            model: sis_penyelenggara,
  
            include: [
              {
                model: par_satuan_kerja,
                include: [
                  {
                    model: par_instansi,
                  },
                ],
              },
            ],
          },
          {
            model: account,
          },
          {
            model: sis_penanggung_jawab,
          },
          {
            model: sis_fungsikhusus,
          },
          {
            model: sis_ruang_lingkup,
          },
          {
            model: sis_jenis_layanan,
          },
          {
            model: sis_pengaman,
          },
          {
            model: sis_tata_kelola,
          },
          {
            model: sis_sop,
          },
          {
            model: sis_software,
          },
          {
            model: sis_hardware,
          },
          {
            model: sis_tenaga_ahli_stock,
          },
        ],
      });
      
      return sisProfilResource(data);
    } catch (error) {
      throw new Error('An error occurred');
    }
  }

  async getPergantian(): Promise<any> {
    try {
      const cutoffDate = moment().subtract(365, 'days').toDate();
      const data = account.findAll({
        attributes: {
          exclude: ['password'], // Exclude the 'password' field
        },
        where: {
          modified_at: {
            [Op.gte]: cutoffDate,
          },
        },
        order: [['modified_at', 'DESC']],
        limit: 50,
      });

      return accountResource(data)
    } catch (error) {
      throw new Error('An error occurred');
    }
  }

  async getPejabatBaru(): Promise<any> {
    try {
      const cutoffDate = moment().subtract(365, 'days').toDate();
      const data = account.findAll({
        attributes: {
          exclude: ['password'], // Exclude the 'password' field
        },
        where: {
          modified_at: {
            [Op.gte]: cutoffDate,
          },
        },
        order: [['created_at', 'DESC']],
        limit: 50,
      });

      return accountResource(data)
    } catch (error) {
      throw new Error('An error occurred');
    }
  }

  async getUbahData(request: { filter: string; q: string }): Promise<any> {
    const { filter, q } = request;
    const queryOptions: any = {};

    if ((filter && filter !== 'null') && (q && q !== 'null')) {
      queryOptions.where = {
        // Adjust the property name based on your actual model structure
        [filter]: {
          [Op.like]: `%${q}%`,
        },
      };
    }

    const data = await request_update.findAll({
      ...queryOptions,
      order: [['created_at', 'DESC']],
      limit: 50,
      include: [
        {
          model: sis_profil,
          include: [
            {
              model: account,
              attributes: {
                exclude: ['password'], // Exclude the 'password' field
              }
            }
          ]
        }
      ]
    });

    return {
      data: requestUpdateResource(data)
    };
  }
}
