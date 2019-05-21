import DocumentsModel from '../models/mongo/documents.js';
import Base from './base';

class Documents extends Base {
    static get(req, res) {
        DocumentsModel.getAll().then(result => {
            console.log("Result: ", result);
            res.send("Hello");
        }).
        catch(err => {
            res.send("Something Went Wrong");
        });
    };

    static post(req, res) {
        res.send("Not Implemented");
    }

    static put(req, res) {
        res.send("Not Implemented");
    }
}

export default Documents;