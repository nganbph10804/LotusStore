import CKEditor from 'ckeditor4-react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/Forms/Button';
import FormInput from '../../components/Forms/Forminput';
import FormSelect from '../../components/Forms/FormSelect';
import LoadMore from '../../components/LoadMore';
import Modal from '../../components/Modal';
import { addProductStart, deleteProductStart, fetchProductStart } from '../../redux/Product/product.actions';
import './style.scss';



const Admin = props => {
  const dispatch = useDispatch();
  const [hideModal, setHideModal] = useState(true);
  const [productCategory, setProductCategory] = useState('mens');
  const [productName, setProductName] = useState('');
  const [productThumbnail, setProductThumbnail] = useState('');
  const [productPrice, setProductPrice] = useState(0);
  const [err,setErr] = useState([]);


  const lstProduct = useSelector(state=>state.product.products);
  const {data,queryDoc,isLastPage} =lstProduct;
  const toggleModal = () => setHideModal(!hideModal);

  const [productDesc,setProductDesc] = useState('');

  const configModal = {
    hideModal,
    toggleModal
  };

  const resetForm= ()=>{
    setProductCategory('mens');
    setProductName('');
    setProductThumbnail('');
    setProductPrice(0);
    setProductDesc('');
    setErr(['add product Success!']);
    setTimeout(() => {
      setHideModal(true);
    }, 1500);
    
  }
  const [filter,setFilter] = useState({
    filterType :'',
    pageSize : 6
  });

  useEffect(() => {
   
    dispatch(fetchProductStart(filter));
  }, [filter]);

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
          productPrice,
          productDesc
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
  const onClickLoadMore = ()=>{
  
    dispatch(
      fetchProductStart({ filterType:''  ,startAfterDoc: queryDoc
      ,persistProducts : data
      })
  )
  }
  const configLoadMore = {
    onLoadMoreEvt : onClickLoadMore
  }
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

            <CKEditor
            onChange={evt => setProductDesc(evt.editor.getData())}
            />
            <br/>

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
                                  {data?.map((product, index)=>{
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
                                  <tr>
                                    <td>
                                      {!isLastPage && (
                                        <LoadMore {...configLoadMore} />
                                      )}
                                    </td>
                                  </tr>
                                 
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