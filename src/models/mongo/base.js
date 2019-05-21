import mongoClient from '../../databases/mongoClient';

class Base {
    static Collection;
    static Fields;
    static Database;
    constructor(doc={}) {
        Object.keys(this.Fields).forEach((key) => {
            this[key] = doc.get(key, null);
        });
    }

    toJSON() {
        let data = {};
        Object.keys(this.constructor.Fields).forEach((key) => {
            if(key !== '_id' && this.constructor.Fields[key] in [String, Number]) {
                data[key] = this[key];
            }
        });
        return data;
    }

    static fromJSON(obj) {
        return new this(obj);
    }

    static get(query={}) {
        return this.fromJSON(mongoClient.getConnection()[this.Database][this.Collection].findOne(query));
    }

    static getAll(query={}) {
        return new Promise((resolve, reject) => {
            mongoClient.getConnection()[this.Database].collection(this.Collection).find(query).toArray((err, result) => {
                if (err)  reject(err);
                resolve(result.map(doc => {
                    return this.fromJSON(doc);
                }));
            });
        });
    }

    validate() {
        return true;
    }

    save() {
        this.validate();
        if(this._id) {
            mongoClient.getConnection()[Base.Database][Base.Collection].update({'_id': this._id}, {'$set': this.toJSON()});
        } else {
            mongoClient.getConnection()[Base.Database][Base.Collection].insert(this.toJSON());
        }
    }
}

export default Base;