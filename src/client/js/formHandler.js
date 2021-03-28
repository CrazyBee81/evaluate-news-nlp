function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    const baseURL = 'https://api.meaningcloud.com/sentiment-2.1';

    document.getElementById('generate').addEventListener('click', performAction);

    // getKey
    const getKey = async () => {
        const response = await fetch('/key');
        try {
            const newData = await response.data;
            console.log(newData);
            return newData;
        } catch (error) {
            console.log("error", error);
        }
    }

    function performAction(e) {
        const formdata = new FormData();
        formdata.append("key", getKey());
        formdata.append("txt", document.querySelector('#txt').value);
        formdata.append("lang", document.querySelector('#lang').value);

        const requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };
        getNLPData(baseURL, requestOptions).then(() => {
            console.log(response)
        })
    }

    const getNLPData = async (baseURL, requestOptions) => {
        const response = await fetch(baseURL, requestOptions).then(response => ({
            status: response.status,
            body: response.json()
        })).then((status, body) => console.log(status, body)).
        catch(error => console.log('error', error));
    }
}


export {handleSubmit}
