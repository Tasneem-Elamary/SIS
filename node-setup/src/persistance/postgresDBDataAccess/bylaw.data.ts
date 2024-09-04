import models from '../../models';
import { db } from '../../../config/postgresDB.config';
import { BylawType } from '../../types';

class BylawDataAccess {
  // Method to create a new bylaw
  create = async (bylaw: BylawType, transaction?: any): Promise<BylawType | undefined> => {
    try {
      const newBylaw = await models.Bylaw.create(bylaw, { transaction });
      return newBylaw.get();
    } catch (error) {
      console.error('Failed to create the bylaw:', error);
      throw new Error('Failed to create the bylaw, please try again!');
    }
  };

  // Method to find a bylaw by code
  getByCode = async (code: string): Promise<BylawType | undefined> => {
    try {
      const bylaw = await models.Bylaw.findOne({ where: { code } });
      return bylaw ? (bylaw.get() as BylawType) : undefined;
    } catch (error) {
      console.error('Failed to find the bylaw by code:', error);
      throw new Error('Failed to find the bylaw, please try again!');
    }
  };

  // Method to find a bylaw by ID
  getById = async (id: string): Promise<BylawType | undefined> => {
    try {
      const bylaw = await models.Bylaw.findOne({ where: { id } });
      return bylaw ? (bylaw.get() as BylawType) : undefined;
    } catch (error) {
      console.error('Failed to find the bylaw by ID:', error);
      throw new Error('Failed to find the bylaw, please try again!');
    }
  };

  // Method to update an existing bylaw
  update = async (id: string, updateData: Partial<BylawType>): Promise<BylawType | undefined> => {
    const transaction = await db.transaction();
    try {
      const bylaw = await models.Bylaw.findByPk(id, { transaction });

      if (!bylaw) {
        console.error('Bylaw not found');
        await transaction.rollback();
        return undefined;
      }

      await bylaw.update(updateData, { transaction });
      await transaction.commit();

      return bylaw.get() as BylawType;
    } catch (error) {
      await transaction.rollback();
      console.error('Failed to update bylaw:', error);
      throw new Error('Failed to update the bylaw, please try again!');
    }
  };

  // Method to delete an existing bylaw
  delete = async (id: string): Promise<boolean> => {
    const transaction = await db.transaction();
    try {
      const bylaw = await models.Bylaw.findByPk(id, { transaction });

      if (!bylaw) {
        console.error('Bylaw not found');
        await transaction.rollback();
        return false;
      }

      await bylaw.destroy({ transaction });
      await transaction.commit();
      return true;
    } catch (error) {
      await transaction.rollback();
      console.error('Failed to delete bylaw:', error);
      throw new Error('Failed to delete the bylaw, please try again!');
    }
  };
}

export default BylawDataAccess;
