import { where } from 'sequelize';
import { BylawRule } from '../../models';
import { BylawRuleType } from '../../types';
import { BylawRuleRepo } from '../Repositories';

class BylawRuleDataAccess implements BylawRuleRepo {
  public async create(bylawRule: BylawRuleType): Promise<BylawRuleType | undefined> {
    try {
      const createdBylawRule = await BylawRule.create(bylawRule);
      return createdBylawRule.get({ plain: true });
    } catch (error) {
      console.log('Failed to create bylaw');

      return undefined;
    }
  }

  public async getById(id: string): Promise<BylawRuleType | undefined> {
    try {
      const bylawRule = await BylawRule.findByPk(id);
      return bylawRule?.get({ plain: true });
    } catch (error) {
      console.log('Failed to GET bylaw');

      return undefined;
    }
  }

  public async getBylawRulesBylawId(BylawId: string): Promise<BylawRuleType[]|undefined> {
    try {
      const bylawRules = await BylawRule.findAll({ where: { BylawId } });

      return bylawRules.map((bylawRule) => bylawRule.get({ plain: true }));
    } catch (error) {
      console.log('Failed to GET bylaw');

      return undefined;
    }
  }

  public async update(id:string, updatedRules:Partial<BylawRuleType>): Promise<boolean> {
    try {
      const bylawRule = await BylawRule.findByPk(id);
      if (bylawRule) {
        await bylawRule.update(updatedRules);
        return true;
      }

      throw Error('Bylaw not found');
    } catch (error) {
      console.log('Failed to update bylaw due to error:', error);

      return false;
    }
  }

  public async delete(id: string): Promise<boolean> {
    try {
      const bylawRule = await BylawRule.findByPk(id);
      if (bylawRule) {
        const deleted = await bylawRule.destroy();
        return true;
      }

      throw Error('Bylaw not found');
    } catch (error) {
      console.log('Failed to DELETE bylaw due to error:', error);

      return false;
    }
  }
}
export default BylawRuleDataAccess;
