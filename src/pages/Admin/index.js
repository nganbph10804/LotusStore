import React, { useState ,useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/Forms/Button';
import FormInput from '../../components/Forms/Forminput';
import FormSelect from '../../components/Forms/FormSelect';
import Modal from '../../components/Modal';
import { addProductStart, deleteProductStart, fetchProductStart } from '../../redux/Product/product.actions';
import {firestore} from './../../firebase/ultils'
import './style.scss';



const Admin = props => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [hideModal, setHideModal] = useState(true);
  const [productCategory, setProductCategory] = useState('mens');
  const [productName, setProductName] = useState('');
  const [productThumbnail, setProductThumbnail] = useState('');
  const [productPrice, setProductPrice] = useState(0);
  const [err,setErr] = useState([]);


  const lstProduct = useSelector(state=>state.product.products);
  const toggleModal = () => setHideModal(!hideModal);

  const configModal = {
    hideModal,
    toggleModal
  };

  const resetForm= ()=>{
    setProductCategory('mens');
    setProductName('');
    setProductThumbnail('');
    setProductPrice(0);
    setErr(['add product Success!']);
    setTimeout(() => {
      setHideModal(true);
    }, 1500);
    
  }

  useEffect(() => {
    // firestore.collection('products').get().then(snapshot => {
    //   const snapshotData = snapshot.docs.map(doc => doc.data());
     
    //   setProducts(snapshotData);
    // }); 
    dispatch(fetchProductStart());
  }, []);

  const onDeleteProduct = id =>{
    dispatch(deleteProductStart(id))
    dispatch(fetchProductStart())

  }

  const handleSubmit = e => {
    e.preventDefault();
    if(!productName||!productThumbnail||!productPrice) {
      const er = ['Empty field! Try again!'];
      setErr(er);
  return;
}
    dispatch(
        addProductStart({
          productCategory,
          productName,
          productThumbnail,
          productPrice
        })
    );


        resetForm();
        dispatch( fetchProductStart());
        setTimeout(() => {
            setErr([]);
        }, 1500);
    // firestore.collection('products').doc().set({
    //   productCategory,
    //   productName,
    //   productThumbnail,
    //   productPrice
    // }).then(e => {
    //   // Success
    // });

  };
  return (
    <div className="admin">

<div className="callToActions">
        <ul>
          <li>
            <Button onClick={() => toggleModal()}>
              Add new product
            </Button>
          </li>
         
        </ul>
      </div>

      <Modal {...configModal}>
        <div className="addNewProductForm">
          <form onSubmit={handleSubmit}>
          {err?
             (<span style={{color:'red',fontWeight:800}}>{err}</span>)
             :''}
            <h2>
              Add new product
            </h2>
           

            <FormSelect
              label="Category"
              options={[{
                value: "mens",
                name: "Mens"
              }, {
                value: "womens",
                name: "Womens"
              }]}
              handleChange={e => setProductCategory(e.target.value)}
            />

            <FormInput
              label="Name"
              type="text"
              value={productName}
              handleChange={e => setProductName(e.target.value)}
            />

            <FormInput
              label="Main image URL"
              type="url"
              value={productThumbnail}
              handleChange={e => setProductThumbnail(e.target.value)}
            />

            <FormInput
              label="Price"
              type="number"
              min="0.00"
              max="10000.00"
              step="0.01"
              value={productPrice}
              handleChange={e => setProductPrice(e.target.value)}
            />

            <Button type="submit">
              Add product
            </Button>


          </form>
        </div>
      </Modal>
            <div className="manageProduct">
             <table border ="0" cellPadding="0" cellSpacing="0">
                <tbody>
                    <tr>
                        <th>
                            <h2>
                             Manage Products
                            </h2>
                        </th>
                    </tr>
                    <tr>
                      <td>
                          <table className="result" border ="0" cellPadding="10" cellSpacing="0">
                              <tbody>
                                  {lstProduct.map((product, index)=>{
                                    const {
                                      productName,
                                      productThumbnail,
                                      productPrice,
                                      documentID
                                    } = product;
                                    return(
                                      <tr>
                                        <td>
                                          <img src={productThumbnail}/>
                                        </td>
                                        <td>
                                          {productName}
                                        </td>
                                        <td>
                                          ${productPrice}
                                        </td>
                                        <td>
                                          <Button onClick={()=>onDeleteProduct(documentID)}>Delete</Button>
                                        </td>
                                      </tr>

                                    )
                                  })}
                              </tbody>
                          </table>
                      </td>
                    </tr>
                </tbody>
             </table>

            </div>
    </div>
  );
}

export default Admin;