import { BylawType } from '../../types';

interface BylawRepo {
  // Method to create a new bylaw
  create(bylaw: BylawType): Promise<BylawType | undefined>;

  // Method to find a bylaw by code
  getByCode(code: string): Promise<BylawType | undefined>;

  // Method to find a bylaw by ID
  getById(id: string): Promise<BylawType | undefined>;

  // Method to update an existing bylaw
  update(id: string, updateData: Partial<BylawType>): Promise<BylawType | undefined>;

  // Method to delete an existing bylaw
  delete(id: string): Promise<boolean>;
}

export default BylawRepo;
