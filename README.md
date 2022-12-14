
WIP:
- tests

This is one package (out of 3) in a
[JQL](https://www.atlassian.com/blog/jira-software/jql-the-most-flexible-way-to-search-jira-14) like feature..
Want to know more?
<br/>
<br/>
Mail: tidharwin@gmail.com
<br/>
Linkedin: https://www.linkedin.com/in/tidharw/*

# Filter Manger 
Reviewers: 
 - Aviv B

Created in order to provide a uniform way to preform and mange your application validations and fillers.
- Validations can be saved in a File/In-memory/DB
- All Validations must maintain the ```IRawFilter``` interface ( ```{ [Filter Name]: [Rules] }``` )
- This package can be wrap as a npm package and can be used both in the client (js/angular/react/etc..) and on a node server
- Client: you will probably want to get the filters "Raw data" from the server/instantiate the filters in-memory
- Server: You can load the filters from files (have access to the fs) / fetch it from the DB

! Mange the filters in the server 
  Fetch the filters using a request to BE and 
  Use the package in both to instantiate the filters

## Dev
- to wrap as a npm package use ```npm run build```
  (don't forget to bump if needed)
- to run in "dev" mode with file watch use ```npm run dev```
- to re-build the docs run ```npm run doc```
- "main" folder containing the transpiled files
- development is done on files in```/src/lib```
- some example filters can be found in ```/src/lib/assets/filters```

```ts

// Loading the filters from a *.json file 
const path = __dirname + '/lib/assets/'
let filleName = 'filters.json'
let data: any = readFileSync(path + filleName)
data = JSON.parse(data.toString())
// Instantiating the FilterManger
const FM: FilterManger = new FilterManger(data);
// Listing the filters name
console.log('Listing the filters name: getFiltersList() ', FM.getFiltersList());
// In-memory filter, ready to be used
const numbersOnly = FM.getFilterByName('numbersOnly')
const includesNumbers = FM.getFilterByName('includesNumbers')

// Validating different inputs against the  
console.log('numbersOnly');
console.log(numbersOnly?.isValid("2")); // true  
console.log(numbersOnly?.isValid("2Be")); // false
console.log(numbersOnly?.isValid("0rN0t "));// false
console.log('includesNumbers');
console.log(includesNumbers?.isValid('abc'));
console.log(includesNumbers?.isValid('abc5'));

// Add new filter (In-memory) 
FM.addFilter('hostName', ["^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-ֿֿֿֿֿֿ_]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-_]*[A-Za-z0-9])$"])
console.log('hostName is now available: getFiltersList() ', FM.getFiltersList());
const hostName = FM.getFilterByName('hostName')
console.log('hostName');
console.log(hostName?.isValid('b.com')); // true 
console.log(hostName?.isValid('b.%com')); // false

// Remove filter 
console.log("Remove 'hostName' filter ");
console.log(FM.removeFilter('hostName')); // true 
console.log(FM.removeFilter('hostName')); // false -> What was removed can be removed

// Getting the most updated filter's list in a (stringify) json format
console.log("Getting the most updated filter's list in a (stringify) json format ", FM.stringify());
// Updating / Creating filters file
// writeFileSync(path + 'filtersV2.json', FM.stringify(), 'utf-8');

// Revert
console.log("Restore the filters to their original sate (in-memory) ");
FM.addFilter('isTeddy', ["/bear/gm"])
console.log('Adding "isTeddy" filter', FM.getFiltersList());
FM.addFilter('isWienreb', ["/Wienreb/gm"])
console.log('Adding "isWienreb" filter', FM.getFiltersList());
FM.revert()
console.log('After revert() ', FM.getFiltersList());
```