import {BaseFilter, IRawFilter} from './filter.interface';
import {FailedValidationError} from "../consts/errors.const";

/**
 * Filter class
 * The "base" class defining "Filter"


 * "filter" can be defined in 2 forms:
 * - the first is it's the JSON form ( {@link FromJSONParams | {name:rules }}} )
 * - the second is its instance form (in the {@link FilterManger}})
 *
 * A filter is first being created in the first form and then gets instantiate to its second form
 * Only then you can use {@link isValid}
 *
 */
export class Filter implements BaseFilter {
    public name: string;
    public rules: string[];

    /**
     * toJson
     * bring back the filter to its original state  (IRawFilter)
     * @returns IRawFilter
     */
    toJson(): IRawFilter {
        return {
            [this.name]: this.rules
        };
    }

    constructor(name: string, rules: string[]) {
        this.name = name
        this.rules = rules
    }

    /**
     * Is Valid
     * test if a specific value against the filter rules
     * @returns boolean
     * @param value
     */
    isValid(value: string): boolean {
        let isValid = true;
        for (let i = 0; i < this.rules.length && isValid; i++) {
            const rule = new RegExp(this.rules[i]);
            isValid = rule.test(value)
            if (!isValid) {
                console.log(FailedValidationError(value, this.rules[i]))
            }
        }
        return isValid
    }
}
