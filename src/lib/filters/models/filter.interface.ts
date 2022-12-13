import {Filter} from "./filter.class";


// todo: maybe I should add "id" and "version" props? when will they be handy ? maybe different application's versions?
export interface BaseFilter {
    name: string;
    rules: string[]

    fromJson?(data: IRawFilter): BaseFilter;

    toJson(): IRawFilter;

    isValid(value: string): boolean;
}

export interface IFilterInstance {
    name: string
    rules: string[]
}

export interface IRawFilter {
    [filterName: string]: string[]
}

export interface FromJSONParams {
    [key: string]: string[]
}

export interface FilterInstance {
    [filterName: string]: Filter
}