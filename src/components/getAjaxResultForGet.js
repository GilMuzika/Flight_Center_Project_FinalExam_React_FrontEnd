    import axios from 'axios';


 

        const getAjaxResultPostForGet = (url, headers) => {
            //alert(`In Firer: \n${url}, ${stopFactor}`);
            return new Promise((resolve, reject) => {
                axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';
                axios.get(url, {headers})
                .then(res=>  {
                    resolve(res);
                })
                .catch(err => {
                    //console.log('In getAjaxResultPostForGet - error responce:');
                    console.log(`caught in  getAjaxResultPostForGet: \n${JSON.stringify(err)}`);
                    reject(err);
                });
            });
    }

    export default getAjaxResultPostForGet;



