import DocumentsModel from '../models/mongo/documents.js';
import Base from './base';

class Documents extends Base {


    static getAll(req, res) {
        DocumentsModel.getAll().then(result => {
            console.log("Result: ", result);
            res.send("Hello");
        }).
        catch(err => {
            res.send("Something Went Wrong");
        });
    };

    static get(req, res) {
        let documentId = req.params.document_id || null;

        if(documentId === null) {
            res.send("Not Found", 404);
        }

        DocumentsModel.get({[DocumentsModel.Fields.ID.key]: documentId}).then((result) => {
            if (result === null) {
                throw new Error("DocumentNotFound");
            }
            console.log("Result: ", result);
            res.send("Success");
        }).catch((err) => {
            if(err.message === "DocumentNotFound") {
                res.send("Not Found", 404);
            }
            res.send("Something went wrong. Please try again later.", 500);
        });
    }

    static post(req, res) {
        let doc = new DocumentsModel({
            [DocumentsModel.Fields.CREATED_ON.key]: new Date(),
            [DocumentsModel.Fields.UPDATED_ON.key]: new Date()
        });
        doc.save().then(result => {
            console.log("Result: ", result);
            res.send("Document Created", 200);
        }).catch(err => {
            res.send("Something went wrong. Please try again later.", 500);
        });
        res.send("Not Implemented");
    }

    static put(req, res) {
        res.send("Not Implemented");
    }


}

export default Documents;