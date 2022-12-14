import "jasmine";

import {FilterManger} from "./filter-manger";

const filtersMock = {
    "numbersOnly": ["^[0-9]*$"],
    "includesUpperCase": ["[A-Z]"],
    "includesNumbers": ["\\d"],
}

describe("Filter", () => {
    let FM: FilterManger;

    beforeEach(() => {
        FM = new FilterManger(filtersMock);
    });

    it("FilterManger should be instantiated", () => {
        expect(FM).toBeDefined();
    });
});