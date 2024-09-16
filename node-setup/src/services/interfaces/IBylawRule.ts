import { BylawRuleType } from '../../types';

interface IBylawRule{
    create(bylawRule: BylawRuleType): Promise<BylawRuleType | undefined>;
    getById(id: string): Promise<BylawRuleType | undefined> ;
    update(id:string, updatedRules:Partial<BylawRuleType>): Promise<boolean>;
    delete(id: string): Promise<boolean>;

}
export default IBylawRule;
