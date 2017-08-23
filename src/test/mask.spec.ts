var mask = require('./mask').mask;

describe("Mask", () => {
    describe("build mask with string change one level", () => {
        it("returns a mask with a single property changed", () => {
            let merchant = {
                name: "home",
                description: "james is a nice boy"
            };
            let dirtyMerchant = {
                name: "Tan at home",
                description: "james is a nice boy"
            }

            let result = mask.createMask(merchant, dirtyMerchant);

            // Assert
            expect(result).toEqual("name");
        });
    });
    describe("build mask with two string change one level", () => {
        it("returns a mask with a two properties changed", () => {
            let merchant = {
                name: "home",
                description: "james is a nice boy",
                id: 203203
            };
            let dirtyMerchant = {
                name: "Tan at home",
                description: "james is not a nice boy",
                id: 203203
            }

            let result = mask.createMask(merchant, dirtyMerchant);

            // Assert
            expect(result).toEqual("name,description");
        });
    });
    describe("build mask with one number change one level", () => {
        it("returns a mask with a one number property changed", () => {
            let merchant = {
                name: "home",
                description: "james is a nice boy",
                id: 203203,
                age: 23
            };
            let dirtyMerchant = {
                name: "home",
                description: "james is a nice boy",
                id: 203203,
                age: 20
            }

            let result = mask.createMask(merchant, dirtyMerchant);

            // Assert
            expect(result).toEqual("age");
        });
    });
    describe("build mask with string and number change one level", () => {
        it("returns a mask with properties changed", () => {
            let merchant = {
                name: "home",
                description: "james is a nice boy",
                id: 203203,
                age: 23
            };
            let dirtyMerchant = {
                name: "home",
                description: "james is a boy",
                id: 203203,
                age: 20
            }

            let result = mask.createMask(merchant, dirtyMerchant);

            // Assert
            expect(result).toEqual("description,age");
        });
    });
    describe("build mask with string,bool and number change one level", () => {
        it("returns a mask with properties changed", () => {
            let merchant = {
                name: "home",
                description: "james is a nice boy",
                id: 203203,
                age: 23,
                isActive: false
            };
            let dirtyMerchant = {
                name: "home",
                description: "james is a boy",
                id: 203203,
                age: 20,
                isActive: true
            }

            let result = mask.createMask(merchant, dirtyMerchant);

            // Assert
            expect(result).toEqual("description,age,isActive");
        });
    });
    describe("build mask with string,bool,price and number change two level", () => {
        it("returns a mask with properties changed", () => {
            let merchant = {
                name: "home",
                description: "james is a nice boy",
                id: 203203,
                age: 23,
                isActive: false,
                price: {
                    micro: 2000
                }
            };
            let dirtyMerchant = {
                name: "home",
                description: "james is a boy",
                id: 203203,
                age: 20,
                isActive: true,
                price: {
                    micro: 2001
                }
            }

            let result = mask.createMask(merchant, dirtyMerchant);

            // Assert
            expect(result).toEqual("description,age,isActive,price.micro");
        });
    });
    describe("build mask with string,bool,price,address and number change three level", () => {
        it("returns a mask with properties changed", () => {
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
            }

            let result = mask.createMask(merchant, dirtyMerchant);

            // Assert
            expect(result).toEqual("description,age,isActive,price.micro,price.isCheap,price.address.line1");
        });
    });
});