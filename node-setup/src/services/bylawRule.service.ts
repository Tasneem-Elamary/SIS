import { BylawRuleRepo } from '../persistance/Repositories';
import { BylawRuleType } from '../types';

class BylawRuleService {
  constructor(private BylawRuleData: BylawRuleRepo) { }

  public createBylawRules = async (BylawId: string, rules: Partial<BylawRuleType>[]): Promise<BylawRuleType[] | undefined> => {
    try {
      const createdRules = [];

      for (const rule of rules) {
        const { min_GPA, hoursAllowed } = rule;
        if (min_GPA === undefined || hoursAllowed === undefined) {
          throw new Error('Missing required rule properties: min_GPA or hoursAllowed');
        }
        const ruleToCreate: BylawRuleType = { min_GPA, hoursAllowed, BylawId };
        const createdRule = await this.BylawRuleData.create(ruleToCreate);
        if (createdRule) { createdRules.push(createdRule); }
      }
      return createdRules;
    } catch (error) {
      console.log('Failed to create new bylaw rule due to error', error);
      throw new Error('Failed to create new bylaw rule');
    }
  };

  public getRulesByBylawId = async (BylawId: string): Promise<BylawRuleType[] | undefined> => {
    try {
      const bylawRules = await this.BylawRuleData.getBylawRulesBylawId(BylawId);
      if (bylawRules) { return bylawRules; }
    } catch (error) {
      console.log('Failed to get bylaw rules due to error', error);
      throw new Error('Failed to get bylaw rules new bylaw rule');
    }
  };
  // public updateBylawRules = async (BylawId: string, BylawsupdatedFields: Partial<BylawRuleType>[]): Promise<boolean> => {
    //     try {

  //         const rulesToUpdate = await this.BylawRuleData.getBylawRulesBylawId(BylawId);
  //         if (!rulesToUpdate) {
  //             throw new Error('Bylaw rules are not found');
  //         }
  //         for (let i = 0; i < rulesToUpdate.length; i++) {
  //             const ruleToUpdate = rulesToUpdate[i];
  //             const updatedFields = BylawsupdatedFields[i];

  //             // Apply the updates directly
  //             await ruleToUpdate.update(updatedFields);
  //         } return true
  //     } catch (error) {
  //         console.log("Failed to update bylaw rule due to error", error);
  //         throw new Error('Failed to update bylaw rule due to error');
  //     }
  // };
}
export default BylawRuleService;
