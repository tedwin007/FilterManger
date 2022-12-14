import {Filter} from './models/filter.class';
import {FilterInstance, FromJSONParams, IRawFilter} from './models/filter.interface';
import {FilterAllReadyExists, NoFilterWasFound} from "./consts/errors.const";


// todo: do I really want to throw an error or maybe its good enough to return null and log the msg ??

export class FilterManger {
    private readonly _originalData: IRawFilter = {}
    private _filters: FilterInstance = {};

    constructor(rawFilters: FromJSONParams) {
        this._originalData = rawFilters;
        this._filters = this.fromJSON(rawFilters)
    }

    /**
     * Get Filters List
     * returns a list of the available filters name
     * use cases:
     * - quickly check for changes (add/remove/load)
     * - choose the right filter from the list
     */
    getFiltersList(): string[] {
        return Object.keys(this._filters)
    }

    /**
     * Get Filter By Name
     * @param name
     */
    getFilterByName(name: string): Filter {
        const result = this._filters[name];
        if (!result) {
            throw NoFilterWasFound(name)
        }
        return result;
    }

    /**
     * Add Filter
     * @description adding in-memory filter, meaning you can load a filter.json file, add new filters (programmatically)
     * and then save back into a file (using the stringify method) with the new filters.
     * use cases :
     * - you can have "shared" filters where you want to extend/modify the filters
     *   for different application/BE-FE/libs etc...
     * - you can update existing filters list
     * -
     *
     @example ```ts
     FM.addFilter('hostName', ["^....."])
     // hostName is now available ()
     ```
     * @param name
     * @param rules
     */
    addFilter(name: string, rules: string[]): void {
        if (name in this._filters) {
            throw FilterAllReadyExists(name)
        }
        this._filters[name] = new Filter(name, rules);
    }

    removeFilter(name: string): boolean {
        if (name in this._filters) {
            return delete this._filters[name]
        }
        console.error(NoFilterWasFound(name).message)
        return false
    }

    /**
     * Stringify
     * return a json format string
     * can later be saved to a filters.json file
     */
    stringify(): string {
        return JSON.stringify(
            this.toJSON()
        )
    }

    /**
     * toJSON
     * transform the filters to a single JSON object
     */
    toJSON(): IRawFilter {
        let res: IRawFilter = {}
        for (const key in this._filters) {
            res = {...res, ...this._filters[key].toJson()}
        }
        return res;
    }

    /**
     * Revert
     * some time, you just want things to be as they were.
     */
    revert(): void {
        this._filters = this.fromJSON(this._originalData)
    }

    private fromJSON(rawFilters: FromJSONParams): FilterInstance {
        const result: FilterInstance = {}
        for (const key in rawFilters) {
            result[key] = new Filter(key, rawFilters[key]);
        }
        return result;
    }
}

