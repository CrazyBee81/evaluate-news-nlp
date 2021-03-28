function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    const apiKey = 'c1ac7369879b1be57b73938699d3ad34';
    const baseURL = 'https://api.meaningcloud.com/sentiment-2.1';
    const expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    const regex = new RegExp(expression);

    document.getElementById('generate').addEventListener('click', performAction);


    function performAction(e) {
        const formdata = new FormData();
        formdata.append("key", apiKey);
        formdata.append("url", document.querySelector('#url').value);
        formdata.append("lang", document.querySelector('#lang').value);

        if (document.querySelector('#url').value.match(regex)) {
            const requestOptions = {
                method: 'POST',
                body: formdata,
                redirect: 'follow'
            };
            getNLPData(baseURL, requestOptions).then((response) => {
                console.log(response)
                document.getElementById('temp').innerHTML
            })
        } else {
            alert('URL not valid, please try again')
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
