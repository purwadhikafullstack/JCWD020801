import { Chip, IconButton, Typography } from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import ModalEditProduct from '../productManagement/components/modalEditProduct';
import ModalDelete from './modalDelete';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid';
import { IoMdAdd } from 'react-icons/io';
import axios from '../../../api/axios';

export default function ProductCard({
  productData,
  adminDataRedux,
  handleRefreshTable,
}) {
  const [clickedData, setClickedData] = useState([]);
  const [openModalEdit, setOpenEdit] = useState(false); //Modal Edit
  const [openDelete, setDelete] = useState(false); //Modal Delete
  const handleEdit = (item) => {
    setClickedData(item);
    setOpenEdit(!openModalEdit);
  };
  const handleDelete = (item) => {
    setClickedData(item);
    setDelete(!openDelete);
  };
  const [productImage, setProductImage] = useState();

  const getProductImage = async () => {
    try {
      const response = await axios.get(`products/images/${productData?.id}`);
      setProductImage(response.data?.imageProduct.image);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProductImage();
  }, [productData?.id]);

  return (
    <>
      <div className="bg-white p-8 rounded-xl shadow-md">
        <div className="flex flex-col gap-2">
          <img
            src={
              productImage
                ? productImage
                : 'https://th.bing.com/th/id/R.3156efdb345eadfa73224a6a32531124?rik=sFtdqrFD%2f60DrA&pid=ImgRaw&r=0&sres=1&sresct=1'
            }
            alt="product image"
            className="h-48 rounded-lg object-cover"
          />
          <Typography variant="h5" color="green" className="mt-2 font-bold">
            {productData?.name}
          </Typography>
          <Typography className="font-bold">Rp.{productData?.price}</Typography>
          <Typography className="font-bold">
            {productData?.weight} gr
          </Typography>
          <Typography>{productData?.description}</Typography>
          <div className="flex flex-row gap-1">
            <Typography>Category: {productData?.Category?.name}</Typography>
            <Typography>
              Subcategory:{' '}
              {productData?.SubCategory
                ? productData?.SubCategory?.name
                : 'Empty'}
            </Typography>
          </div>
          <div className="flex flex-row justify-end gap-1">
            {adminDataRedux?.isSuperAdmin === true && (
              <>
                <Chip
                  variant="filled"
                  size="sm"
                  value={
                    productData?.isDisabled != false ? 'Disabled' : 'Enabled'
                  }
                  color={productData?.isDisabled ? 'red' : 'green'}
                />
                <IconButton
                  variant="text"
                  onClick={() => handleDelete(productData)}
                >
                  <TrashIcon className="h-4 w-4" color="red" />
                </IconButton>
              </>
            )}
            <IconButton variant="text" onClick={() => handleEdit(productData)}>
              {adminDataRedux?.isSuperAdmin === true ? (
                <PencilIcon className="h-4 w-4" />
              ) : (
                <IoMdAdd className="h-5 w-5" />
              )}
            </IconButton>
          </div>
        </div>
      </div>
      <ModalEditProduct
        openModalEdit={openModalEdit}
        handleEdit={handleEdit}
        clickedData={clickedData}
        adminDataRedux={adminDataRedux}
        handleRefreshTable={handleRefreshTable}
      />
      <ModalDelete
        api={'/products'}
        openDelete={openDelete}
        handleDelete={handleDelete}
        clickedData={clickedData}
        handleRefreshTable={handleRefreshTable}
      />
    </>
  );
}
