/**
 * Create a npm package for this class 
 * This class is responsible for evaluating two objects and returning the 
 * property paths of the changed properties
 * 
 * The initial driver for this was to support patching http verbs 
 * @export
 * @class mask
 */
export class mask {

    static createMask(original: Object, dirty: Object, objectName="") {
        
        var changeMask = [];
        if (original.constructor === Object
            && dirty.constructor === Object) {
            //case 2 they are objects
            //in this case
            let keys1 = Object.keys(original);
            let keys2 = Object.keys(dirty);


            //if the second object doesn't have all the keys the first one does -> !=
            let i;
            for (i = 0; i < keys1.length; ++i) {
                if ((dirty.hasOwnProperty(keys1[i]))) {

                    //they have the same keys, so compare their keys's objects one by one
                    let origVal = original[keys1[i]];
                    let dirtyVal = dirty[keys1[i]];
                    let isPrimitive = mask.isPrimitive(origVal, dirtyVal);
                    if (isPrimitive && origVal !== dirtyVal) {
                        changeMask.push(`${objectName}${keys1[i]}`);
                    }else if (!isPrimitive) {
                        // handle object 
                        changeMask.push(mask.createMask(origVal,dirtyVal,`${objectName}${keys1[i]}.`));
                    }
                }
            }


        }
        return changeMask.join();

    }

    static digestDepth(original: Object, dirty: Object){
            let keys1 = Object.keys(original);
            let keys2 = Object.keys(dirty);

    }

    static isPrimitive(obj1: Object, obj2: Object) {
        if (
            (
                typeof (obj1) === 'number' ||
                typeof (obj1) === 'string' ||
                typeof (obj1) === 'boolean'
            ) &&
            (
                typeof (obj2) === 'number' ||
                typeof (obj2) === 'string' ||
                typeof (obj2) === 'boolean'
            )
        ) {
            return true;
        } else {
            return false;
        }
    }

}