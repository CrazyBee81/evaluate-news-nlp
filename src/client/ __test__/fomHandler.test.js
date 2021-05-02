// Import the js file to test
import {getData} from "../js/formHandler"

describe("testing getData", () => {
    test("get Data should return api key", () => {
        return getData("http://localhost:8081/key").then((data) => {
            const output = process.env.API_KEY
            expect(data).toBe(output)
        })
    });
});

