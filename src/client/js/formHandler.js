function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field

    const baseURL = 'https://api.meaningcloud.com/sentiment-2.1';

    document.getElementById('generate').addEventListener('click', performAction);


    function performAction(e) {
        const formdata = new FormData();
        getData("http://localhost:8081/key").then((response) => {
            formdata.append("key", response);
            formdata.append("url", document.querySelector('#url').value);
            formdata.append("lang", document.querySelector('#lang').value);
            if (Client.validateImput(formdata)) {
                postFormData(baseURL, formdata).then((response) => {
                    let newData = response;
                    newData = {
                        model: newData.model,
                        agreement: newData.agreement,
                        irony: newData.irony,
                        score_tag: newData.score_tag
                    }
                    console.log(newData);
                    postJSONData('http://localhost:8081/add', newData).then(() => {
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
    const postFormData = async (url = '', data) => {
        const response = await fetch(url, {method: 'POST', body: data});
        try {
            const newData = await response.json();
            console.log(newData)
            return newData;
        } catch (error) {
            console.log("error", error);
        }
    };

    // Async POST
    const postJSONData = async (url = '', data) => {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
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
        const response = await fetch("http://localhost:8081/all");
        response.json().then(data => {
            document.getElementById('model').innerHTML = data.model;
            document.getElementById('agreement').innerHTML = data.agreement;
            document.getElementById('irony').innerHTML = data.irony;
            document.getElementById('polarity').innerHTML = data.score_tag;
        });
    } catch (error) {
        console.log("error", error);
    }
}


export {handleSubmit}
