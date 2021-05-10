import { firestore } from "../../firebase/ultils"



export const handleAddProduct = product =>{
    return new Promise((resolve,reject)=>{
        firestore
            .collection('products')
            .doc()
            .set(product)
            .then(()=>{
                resolve();
            })

            .catch(err=>{
                reject(err);
            })
    });


}

export const handleFetchProduct = () =>{
    return new Promise((resolve,reject)=>{
        firestore
            .collection('products')
            .get()
            .then(snapshot =>{
                const listProduct = snapshot.docs.map(doc =>{
                    return {
                        ...doc.data(),
                        documentID : doc.id
                    }
                });
                resolve(listProduct);
            })
            .catch(err =>{
                reject(err);
            })
    })
}

export const handleDeleteProduct = documentID =>{
    return new Promise((resolve,reject)=>{
        firestore
            .collection('products')
            .doc(documentID)
            .delete()
            .then(()=>{
                resolve();
            })
            .catch(err=>{
                reject(err);
            })
    })
}