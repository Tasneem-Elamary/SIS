import { BylawRule } from '../../models';
import bylawRule from '../../models/bylawRule.model';
import { BylawRuleType } from '../../types';

interface BylawRuleRepo{
    create(bylawRule: BylawRuleType): Promise<BylawRuleType | undefined>;
    getById(id: string): Promise<BylawRuleType | undefined> ;
    update(id:string, updatedRules:Partial<BylawRuleType>): Promise<boolean>;
    delete(id: string): Promise<boolean>;
    getBylawRulesBylawId(BylawId: string): Promise<BylawRuleType[] | undefined>;

}
export default BylawRuleRepo;
