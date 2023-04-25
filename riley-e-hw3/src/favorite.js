class Favorite{
    constructor(text, url, comments, fid = self.crypto.randomUUID()){
        this.fid = fid;
        this.text = text;
        this.url = url;
        this.comments = comments;
    }
}

export {Favorite};