import "jasmine";

import {FilterManger} from "./filter-manger";
import {FilterAllReadyExists, NoFilterWasFound} from "./consts/errors.const";
import {Filter} from "./models/filter.class";
import {IRawFilter} from "./models/filter.interface";

const filtersMock = {
    "numbersOnly": ["^[0-9]*$"], "includesUpperCase": ["[A-Z]"], "includesNumbers": ["\\d"],
}

describe("Filter", () => {
    let FM: FilterManger;

    beforeEach(() => {
        FM = new FilterManger(filtersMock);
    });

    it("FilterManger should be instantiated", () => {
        expect(FM).toBeDefined();
    });

    describe('getFiltersList', () => {
        it("should return filters name", () => {
            const expected = ['numbersOnly', 'includesUpperCase', 'includesNumbers'];
            expect(FM.getFiltersList()).toEqual(expected)
        });
    })

    describe('getFilterByName', () => {
        it("should return the filter's instance", () => {
            const expected = FM['_filters']['numbersOnly'];
            const input = FM.getFilterByName('numbersOnly');
            expect(input).toEqual(expected)
            expect(input.rules).toEqual(["^[0-9]*$"])
            expect(input.name).toEqual('numbersOnly')
        });

        it("should throw an error when not found", () => {
            try {
                expect(FM.getFilterByName('NaN')).toThrowError()
            } catch (err: any) {
                expect(err.message).toEqual(NoFilterWasFound('NaN').message)
            }
        });
    })

    describe('addFilter', () => {
        let createdFilter: Filter;
        beforeEach(() => {
            FM.addFilter('example', ["/abc/"])
            createdFilter = FM.getFilterByName('example')
        })

        it("should create a new Filter instance", () => {
            expect(createdFilter).toBeDefined()
        });

        it("example filter should contain the right rules", () => {
            expect(FM.getFilterByName('example').rules).toEqual(['/abc/'])
        })

        it("example filter should not be overwritten when exists", () => {
            try {
                expect(FM.addFilter('example', ["/abc/"])).toThrowError()
            } catch (err: any) {
                expect(err.message).toEqual(FilterAllReadyExists('example').message)
            }
        })
    })

    describe('removeFilter', () => {
        let deleteResponse: boolean
        beforeEach(() => {
            deleteResponse = FM.removeFilter('numbersOnly')
        })

        it("should delete 'numbersOnly' filter", () => {
            expect(deleteResponse).toEqual(true)
            expect(FM.getFiltersList().includes('numbersOnly')).toEqual(false)
        })

        it("should return false when the filter was not found", () => {
            expect(FM.removeFilter('numbersOnly')).toEqual(false)
        })
    })

    describe('stringify', () => {
        let stringifyResult: string
        beforeEach(() => {
            stringifyResult = FM.stringify();
        })

        it('should return the filters in a "IRawFilter" (string) form', () => {
            const expected = '{"numbersOnly":["^[0-9]*$"],"includesUpperCase":["[A-Z]"],"includesNumbers":["\\\\d"]}';
            expect(stringifyResult).toEqual(expected)
        });
    })

    describe('toJSON', () => {
        let toJSONResult: IRawFilter
        beforeEach(() => {
            toJSONResult = FM.toJSON();
        })

        it('should return the filters in a "IRawFilter" (object) form', () => {
            const expected: any = {numbersOnly: ['^[0-9]*$'], includesUpperCase: ['[A-Z]'], includesNumbers: ['\\d']};
            expect(toJSONResult).toEqual(expected)
        })
    })

    describe('revert', () => {
        beforeEach(() => {
            FM.addFilter('example', ["/abc/"])
            FM.removeFilter('numbersOnly')
            FM.revert();
        })

        it('should return the original filters list', () => {
            const expected = ['numbersOnly', 'includesUpperCase', 'includesNumbers'];
            expect(FM.getFiltersList()).toEqual(expected)
        });
    })
});