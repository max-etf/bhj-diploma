/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    const xhr = new XMLHttpRequest;
    xhr.responseType = 'json';

    const formData = new FormData();
    let url = options.url; /*  */
    if (options.data) {
        if (options.method === 'GET'){
            url += '?' + Object.entries(options.data).map(
                 ([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`).join('&')
        }
        else {
            Object.entries(options.data).forEach(v => {formData.append(...v)});
        }
    }

    xhr.onreadystatechange = () => {
        if(xhr.readyState === XMLHttpRequest.DONE){
            let err = null;
            let response = null;

            if (xhr.status === 200) {
                const r = xhr.response;
                if (r && r.success) {
                    response = r;
                }
                else{
                    err = r;
                }
            }
            else {
                err = new Error('not OK(200)');
                console.log(err);
                throw(err);
            }
            if(options.callback){
            options.callback(err, response);
            }
        }
    };

    try {
    xhr.open(options.method, url);
    xhr.send(formData);
    }
    catch(e){
        console.log(e);
    }
    return xhr;
};
