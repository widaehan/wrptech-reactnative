
export default class Request{

    url = 'http://wr.promptech.co.kr/api/';

    async post(rest, params){
        let res = await fetch(this.url + rest, {
            method: 'POST',
            headers : {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body : JSON.stringify(params),
        });
        return await res.json();
    };

    async get(rest){
        let res = await fetch(this.url + rest);
        return await res.json();
    }

}