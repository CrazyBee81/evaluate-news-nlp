// Import the js file to test
import { validateImput } from "../js/imputChecker"

const formData = new FormData();
formData.append("url", "https://www.udacity.com/");
formData.append("lang", "en");


describe("url and language validation", () => {
    test("a valid url and language code should return a value of true", () => {
        const input = formData;
        const output = true;
        expect(validateImput(input)).toEqual(output);
    });
});

