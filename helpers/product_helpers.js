var db = require('../confiq/connection')
var collection = require('../confiq/collections')
const collections = require('../confiq/collections')
var objectId = require('mongodb').ObjectID
module.exports = {

    addProduct: (product, callBack) => {

        db.get().collection('product').insertOne(product).then((data) => {

            callBack(data.ops[0]._id)

        })
    },
    getAllProducts: () => {
        return new Promise(async (resolve, reject) => {
            let products = await db.get().collection(collection.PRODUCT_COLLECTION).find().toArray()
            resolve(products)
        })
    },
    deleteProduct: (proId) => {
        return new Promise((resolve, reject) => {
            db.get().collection(collection.PRODUCT_COLLECTION).removeOne({ _id: objectId(proId) }).then((response) => {
                console.log(response);
                resolve(response)
            })
        })
    },
    getProductDetails: (proId) => {
        return new Promise((resolve, reject) => {
            db.get().collection(collection.PRODUCT_COLLECTION).findOne({ _id:objectId(proId)}).then((product) => {
                resolve(product)
            })
        })
    },
    updateProduct: (proId, proDetails) => {
        return new Promise((resolve, reject) => {
            db.get().collection(collection.PRODUCT_COLLECTION)
                .updateOne({ _id: objectId(proId) }, {
                    $set: {
                        Name: proDetails.Name,
                        Category: proDetails.Category,
                        Price: proDetails.Price,
                        Description: proDetails.Description
                    }
                }).then((respones) => {
                    resolve()
                })
        })
    }
}