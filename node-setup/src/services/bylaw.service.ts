import { BylawType } from '../types';
import { BylawRepo } from '../persistance/Repositories';

class BylawService {
  // eslint-disable-next-line no-useless-constructor
  constructor(private BylawData: BylawRepo) {}

  // Method to create a new bylaw
  public create = async (bylaw: BylawType): Promise<BylawType | undefined> => {
    try {
      const newBylaw = await this.BylawData.create(bylaw);
      return newBylaw;
    } catch (error) {
      throw new Error('Failed to create the bylaw, Please try again!');
    }
  };

  // Method to find a bylaw by its code
  public getByCode = async (code: string): Promise<BylawType | undefined> => {
    try {
      const bylaw = await this.BylawData.getByCode(code);
      return bylaw;
    } catch (error) {
      throw new Error('Failed to find the bylaw by code, Please try again!');
    }
  };

  // Method to find a bylaw by its ID
  public getById = async (id: string): Promise<BylawType | undefined> => {
    try {
      const bylaw = await this.BylawData.getById(id);
      return bylaw;
    } catch (error) {
      throw new Error('Failed to find the bylaw by ID, Please try again!');
    }
  };

  // Method to update an existing bylaw
  public update = async (id: string, updateData: Partial<BylawType>): Promise<BylawType | undefined> => {
    try {
      const updatedBylaw = await this.BylawData.update(id, updateData);
      return updatedBylaw;
    } catch (error) {
      throw new Error('Failed to update the bylaw, Please try again!');
    }
  };

  // Method to delete an existing bylaw
  public delete = async (id: string): Promise<boolean> => {
    try {
      const success = await this.BylawData.delete(id);
      return success;
    } catch (error) {
      throw new Error('Failed to delete the bylaw, Please try again!');
    }
  };
}

export default BylawService;
