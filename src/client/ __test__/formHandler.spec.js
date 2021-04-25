// Import the js file to test
import {postFormData} from "../js/formHandler"
import {getData} from "../js/formHandler"

const baseURL = 'https://api.meaningcloud.com/sentiment-2.1';
const formData = new FormData();
formData.append("key", process.env.API_KEY);
formData.append("url", "https://ast.wikipedia.org/wiki/Sopa");
formData.append("lang", "es");


describe("testing getData", () => {
    test("get Data should return api key", () => {
        getData("http://localhost:8081/key").then((response) => {
            const output = process.env.API_KEY
            expect(response).toBe(output)
        })
    });
});

describe("testing api response", () => {
    test("post formData should return an object sentiment api", () => {
        let data;
        postFormData(baseURL, formData).then((response) => {
            data = {
                model: response.model,
                agreement: response.agreement,
                irony: response.irony,
                score_tag: response.score_tag
            }
            const output = {agreement: "DISAGREEMENT", score_tag: "P", irony: "NONIRONIC", model: "general_es"}
            expect(data).toBe(output)
        })
    });
});

