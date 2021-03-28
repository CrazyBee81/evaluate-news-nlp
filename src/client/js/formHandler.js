function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    const apiKey = 'c1ac7369879b1be57b73938699d3ad34';
    const baseURL = 'https://api.meaningcloud.com/sentiment-2.1';

    document.getElementById('generate').addEventListener('click', performAction);


    function performAction(e) {
        const formdata = new FormData();
        formdata.append("key", apiKey);
        formdata.append("url", document.querySelector('#url').value);
        formdata.append("lang", document.querySelector('#lang').value);

        if (Client.validateImput(formdata)) {
            const requestOptions = {
                method: 'POST',
                body: formdata,
                redirect: 'follow'
            };
            getNLPData(baseURL, requestOptions).then((response) => {
                console.log(response)
                document.getElementById('model').innerHTML = response.model;
                document.getElementById('agreement').innerHTML = response.agreement;
                document.getElementById('irony').innerHTML = response.irony;
                document.getElementById('polarity').innerHTML = response.score_tag;
            })
        }
    }

    const getNLPData = async (baseURL, requestOptions) => {
        const response = await fetch(baseURL, requestOptions)
        try {
            const newData = await response.json();
            console.log(newData)
            return newData;
        } catch (error) {
            console.log("error", error);
        }
    }

}

// updateUI
const updateUI = async () => {

    try {
        const newData = await response.data;
        console.log(newData);
        document.getElementById('temp').innerHTML = Math.round(newData.temp) + '°C';
        document.getElementById('date').innerHTML = newData.date;
        document.getElementById('content').innerHTML = newData.feelings;
    } catch (error) {
        console.log("error", error);
    }
}


export {handleSubmit}
