import mongoClient from '../../databases/mongoClient';

class Base {
    static Collection;
    static Fields;
    static Database;
    constructor(doc={}) {
        Object.keys(this.Fields).forEach((field) => {
            this[field[key]] = doc.get(field[key], null);
        });
    }

    toJSON() {
        let data = {};
        Object.keys(this.constructor.Fields).forEach((field) => {
            if(field[key] !== '_id' && field[type] in [String, Number]) {
                data[field[key]] = this[field[key]];
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