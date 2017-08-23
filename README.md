# Object Delta Mask
![alt text](https://travis-ci.org/robertwpowell/object-delta-mask.svg)

Produces a grpc json mask string that can be used for patch http verbs. The string constains the property paths of what is differnent from the source object. 

See [JSON Mapping](//developers.google.com/protocol-buffers/docs/proto3#json) : `FieldMask	string	"f.fooBar,h"`

## Installation 

- [npm](//npmjs.org/doc/cli/npm-install.html): `npm install object-delta-mask`

```js
const mask = require('object-delta-mask');

  let merchant = {
                name: "home",
                description: "james is a nice boy",
                id: 203203,
                age: 23,
                isActive: false,
                price: {
                    micro: 2000,
                    isCheap: false,
                    address: {
                        line1: "dfdfd"
                    }
                }
            };
  let dirtyMerchant = {
                name: "home",
                description: "james is a boy",
                id: 203203,
                age: 20,
                isActive: true,
                price: {
                    micro: 2001,
                    isCheap: true,
                    address: {
                        line1: "fddd"
                    }
                }
            };
  
  let result = mask.createMask(merchant, dirtyMerchant);
    
    
  //result ="description,age,isActive,price.micro,price.isCheap,price.address.line1"

```
