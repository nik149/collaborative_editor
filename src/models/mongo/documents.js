import Base from './base';

class Documents extends Base {
    static Database = 'editor';
    static Collection = 'documents';
    static Fields =  {
        ID: {type: String, key: '_id'},
        SLUG: {type: String, key: 'slug'},
        CREATED_ON: {type: Date, key: 'created_on'},
        UPDATED_ON: {type: Date, key: 'updated_on'}
    };

    constructor(doc={}) {
        super(doc);
    }
}

export default Documents;