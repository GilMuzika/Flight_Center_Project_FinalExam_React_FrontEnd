import axios from 'axios';

const getAjaxResultPost = (url, data, headers) => {

    return new Promise((resolve, reject) => {
        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        axios.post(url, data, {headers})
        .then(res=>  {
            resolve(res);
        })
        .catch(err => {
            console.log('caught in  getAjaxResultPost:');
            console.log(err);
            //alert(`caught in  getAjaxResultPost: \n${JSON.stringify(err)}`);
            reject(err);
        });
    });

}

export default getAjaxResultPost;