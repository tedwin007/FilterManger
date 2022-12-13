export const NoFilterWasFound = (name: string) => new Error(`No "${name}" filter was found. You can check available filters by running "getFiltersList" method`)
export const FilterAllReadyExists = (name: string) => new Error(`cannot use ${name} as a filter name since it is already being used by another filter`);
export const FailedValidationError = (value: string, rule: string) => new Error(`${value} failed in ${rule} test`)
