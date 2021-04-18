function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field

    const baseURL = 'https://api.meaningcloud.com/sentiment-2.1';

    document.getElementById('generate').addEventListener('click', performAction);


    function performAction(e) {
        const formdata = new FormData();
        getData("http://localhost:8082/key").then((response) => {
            formdata.append("key", response);
            formdata.append("url", document.querySelector('#url').value);
            formdata.append("lang", document.querySelector('#lang').value);
            if (Client.validateImput(formdata)) {
                postData(baseURL, formdata).then((response) => {
                    let newData = response;
                    newData = {
                        model: newData.model,
                        agreement: newData.agreement,
                        irony: newData.irony,
                        score_tag: newData.score_tag
                    }
                    console.log(newData);
                    postData('/add', {}, JSON.stringify({newData}).then(() => {
                        updateUI()
                    });
                })
            }
        })
    }

    const getData = async (url) => {
        console.log(url);
        const response = await fetch(url)
        try {
            const newData = await response.json();
            return newData;
        } catch (error) {
            console.log("error", error);
        }
    }

    // Async POST
    const postData = async (url = '', data = {}) => {
        const response = await fetch(url, {method: 'POST', body: data});
        try {
            const newData = await response.json();
            console.log(newData)
            return newData;
        } catch (error) {
            console.log("error", error);
        }
    };
}

// updateUI
const updateUI = async () => {
    try {
        const response = await fetch("http://localhost:8082/all");
        console.log(response);
        document.getElementById('model').innerHTML = response.model;
        document.getElementById('agreement').innerHTML = response.agreement;
        document.getElementById('irony').innerHTML = response.irony;
        document.getElementById('polarity').innerHTML = response.score_tag;
    } catch (error) {
        console.log("error", error);
    }
}


export {handleSubmit}
