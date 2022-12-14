import "jasmine";

import {Filter} from "./filter.class";

describe("Filter", () => {
    let filter: Filter;

    beforeEach(() => {
        filter = new Filter('example', ["[A-Z]"]);
    });

    it("filter should be instantiated", () => {
        expect(filter).toBeDefined();
        expect(filter.name).toEqual('example')
        expect(filter.rules).toEqual(["[A-Z]"])
    });

    describe('toJSON', () => {
        it('should return an "IRawFilter" filter ', () => {
            expect(filter.toJson()).toEqual({'example': ["[A-Z]"]})
        });
    })

    describe('isValid', () => {
        it("should return true", () => {
            expect(filter.isValid('ABC')).toBeTrue();
        });

        it("return false", () => {
            expect(filter.isValid('abc')).toBeFalse();
        });
    })

});