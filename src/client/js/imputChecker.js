function validateImput(formdata) {
    const expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    const regex = new RegExp(expression);
    const supportedLang = ['en', 'es', 'fr', 'it', 'pt', 'ca']

    let valid = true;
    let massages = [];

    for (let pair of formdata.entries()) {
        if (pair[0] === "url") {
            if (!pair[1].match(regex)) {
                valid = false;
                massages.push('URL not valid, please try again')
            }
        } else if (pair[0] === "lang") {
            if (typeof pair[1] !== "string" || typeof pair[1] === "undefined") {
                valid = false;
                massages.push('language code needs to be a string of two characters length')
            } else if (pair[1].length > 2) {
                valid = false;
                massages.push('language code needs to be a string of two characters length')
            } else if (supportedLang.indexOf(pair[1]) === -1) {
                valid = false;
                massages.push('language not supported')
            }
        }
    }

    if (!valid) {
        for (msg of massages) {
            alert(msg);
        }
    }

    return valid;

}

export {validateImput}
