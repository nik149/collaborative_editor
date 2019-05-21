import Base from './base';

class Documents extends Base {
    static Database = 'editor';
    static Collection = 'documents';
    static Fields =  {
        '_id': String,
        'link': String,
        'data': Object
    };

    constructor(doc={}) {
        super(doc);
    }
}

export default Documents;