// Import the js file to test
import { validateImput } from "../client/js/imputChecker"

const formData = new FormData();
formData.append("url", "https://www.udacity.com/");
formData.append("lang", "es");


describe("Filter function", () => {
    test("it should filter by a search term (link)", () => {
        const input = formData;
        const output = true;
        expect(validateImput(input)).toEqual(output);
    });
});
