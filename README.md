# postcss2json

Trivial utility project to convert CSS to JSON using `postcss`. Note
that media queries any other nested forms are generally omitted from
the output, as this is aimed for uses that care mostly about selector
names.

Other similar projects on NPM failed for me on certain CSS
syntax. `postcss` seems to be very reliable in that regard.

Slapped together in the middle of another project, don't expect
much.

## Usage

CLI:

```
npm i postcss2json
echo "a{color: red}b{color:blue}" | postcss2json
# Outputs:
#   {"selector":"a","attributes":[{"prop":"color","value":"red"}]}
#   {"selector":"b","attributes":[{"prop":"color","value":"blue"}]}
```

Library:

```
const postcss2json = require('postcss2json');
console.log(postcss2json('a{color: red}'));
// Outputs: [ { selector: 'a', attributes: [ { prop: "color", value: "red" } ] } ]
```
