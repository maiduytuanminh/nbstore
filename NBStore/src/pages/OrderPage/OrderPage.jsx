import { Checkbox, Form } from 'antd'
import React, { useEffect, useState, useCallback } from 'react'
import {
  WrapperContainer,
  WrapperContent,
  PageTitle,
  WrapperMain,
  WrapperLeft,
  DeliverySection,
  CartSection,
  WrapperStyleHeader,
  WrapperStyleHeaderDilivery,
  WrapperListOrder,
  WrapperItemOrder,
  WrapperCountOrder,
  WrapperRight,
  OrderSummary,
  WrapperInfo,
  WrapperTotal,
  CheckoutButton,
  CustomCheckbox,
  EmptyCart
} from './style';
import { DeleteOutlined, MinusOutlined, PlusOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import { WrapperInputNumber } from '../../components/ProductDetailsComponent/style';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import AddressSelector from '../../components/AddressSelector/AddressSelector';
import { useDispatch, useSelector } from 'react-redux';
import { decreaseAmount, increaseAmount, removeAllOrderProduct, removeOrderProduct, selectedOrder } from '../../redux/slides/orderSlide';
import { convertPrice } from '../../utils';
import { useMemo } from 'react';
import ModalComponent from '../../components/ModalComponent/ModalComponent';
import InputComponent from '../../components/InputComponent/InputComponent';
import { useMutationHooks } from '../../hooks/useMutationHook';
import * as  UserService from '../../services/UserService'
import Loading from '../../components/LoadingComponent/Loading';
import * as message from '../../components/Message/Message'
import { updateUser } from '../../redux/slides/userSlide';
import { useNavigate, Link } from 'react-router-dom';
import StepComponent from '../../components/StepConponent/StepComponent';

const OrderPage = () => {
  const order = useSelector((state) => state.order)
  const user = useSelector((state) => state.user)

  const [listChecked, setListChecked] = useState([])
  const [isOpenModalUpdateInfo, setIsOpenModalUpdateInfo] = useState(false)
  const [selectedAddress, setSelectedAddress] = useState(null)
  const [stateUserDetails, setStateUserDetails] = useState({
    name: '',
    phone: '',
    address: '',
    city: ''
  })
  const navigate = useNavigate()
  const [form] = Form.useForm();

  const dispatch = useDispatch()
  const onChange = (e) => {
    if (listChecked.includes(e.target.value)) {
      const newListChecked = listChecked.filter((item) => item !== e.target.value)
      setListChecked(newListChecked)
    } else {
      setListChecked([...listChecked, e.target.value])
    }
  };

  const handleChangeCount = (type, idProduct, limited) => {
    if (type === 'increase') {
      if (!limited) {
        dispatch(increaseAmount({ idProduct }))
      }
    } else {
      if (!limited) {
        dispatch(decreaseAmount({ idProduct }))
      }
    }
  }

  const handleDeleteOrder = (idProduct) => {
    dispatch(removeOrderProduct({ idProduct }))
  }

  const handleOnchangeCheckAll = (e) => {
    if (e.target.checked) {
      const newListChecked = []
      order?.orderItems?.forEach((item) => {
        newListChecked.push(item?.product)
      })
      setListChecked(newListChecked)
    } else {
      setListChecked([])
    }
  }

  useEffect(() => {
    dispatch(selectedOrder({ listChecked }))
  }, [listChecked])

  useEffect(() => {
    if (form.__INTERNAL__.name) {
      form.setFieldsValue(stateUserDetails)
    }
  }, [form, stateUserDetails])

  useEffect(() => {
    if (isOpenModalUpdateInfo) {
      setStateUserDetails({
        city: user?.city,
        name: user?.name,
        address: user?.address,
        phone: user?.phone
      })
    }
  }, [isOpenModalUpdateInfo])

  const handleChangeAddress = () => {
    setIsOpenModalUpdateInfo(true)
  }

  const priceMemo = useMemo(() => {
    const result = order?.orderItemsSlected?.reduce((total, cur) => {
      return total + ((cur.price * cur.amount))
    }, 0)
    return result
  }, [order])

  const priceDiscountMemo = useMemo(() => {
    const result = order?.orderItemsSlected?.reduce((total, cur) => {
      const totalDiscount = cur.discount ? cur.discount : 0
      return total + (priceMemo * (totalDiscount * cur.amount) / 100)
    }, 0)
    if (Number(result)) {
      return result
    }
    return 0
  }, [order])

  const diliveryPriceMemo = useMemo(() => {
    if (priceMemo >= 20000 && priceMemo < 500000) {
      return 10000
    } else if (priceMemo >= 500000 || order?.orderItemsSlected?.length === 0) {
      return 0
    } else {
      return 20000
    }
  }, [priceMemo])

  const totalPriceMemo = useMemo(() => {
    return Number(priceMemo) - Number(priceDiscountMemo) + Number(diliveryPriceMemo)
  }, [priceMemo, priceDiscountMemo, diliveryPriceMemo])

  const handleRemoveAllOrder = () => {
    if (listChecked?.length > 1) {
      dispatch(removeAllOrderProduct({ listChecked }))
    }
  }

  const handleAddCard = () => {
    if (!order?.orderItemsSlected?.length) {
      message.error('Vui lòng chọn sản phẩm')
      return;
    }

    if (!selectedAddress) {
      message.error('Vui lòng chọn địa chỉ giao hàng')
      return;
    }

    const addressData = selectedAddress.data;
    console.log('Validating address:', selectedAddress);

    if (selectedAddress.type === 'current') {
      if (!addressData.fullName || !addressData.phone || !addressData.address) {
        message.error('Vui lòng điền đầy đủ thông tin địa chỉ giao hàng')
        return;
      }
    } else {
      if (!addressData.fullName || !addressData.phone || !addressData.address) {
        message.error('Vui lòng điền đầy đủ thông tin địa chỉ giao hàng')
        return;
      }
    }

    localStorage.setItem('selectedShippingAddress', JSON.stringify(selectedAddress));
    navigate('/payment')
  }

  const handleAddressChange = useCallback((addressInfo) => {
    setSelectedAddress(addressInfo);
  }, []);

  const mutationUpdate = useMutationHooks(
    (data) => {
      const { id, token, ...rests } = data
      const res = UserService.updateUser(id, { ...rests }, token)
      return res
    },
  )

  const { isLoading, data } = mutationUpdate

  const handleCancleUpdate = () => {
    setStateUserDetails({
      name: '',
      email: '',
      phone: '',
      isAdmin: false,
    })
    form.resetFields()
    setIsOpenModalUpdateInfo(false)
  }

  const handleUpdateInforUser = () => {
    const { name, address, city, phone } = stateUserDetails
    if (name && address && city && phone) {
      mutationUpdate.mutate({ id: user?.id, token: user?.access_token, ...stateUserDetails }, {
        onSuccess: () => {
          dispatch(updateUser({ name, address, city, phone }))
          setIsOpenModalUpdateInfo(false)
        }
      })
    }
  }

  const handleOnchangeDetails = (e) => {
    setStateUserDetails({
      ...stateUserDetails,
      [e.target.name]: e.target.value
    })
  }

  const itemsDelivery = [
    {
      title: '20.000 VND',
      description: 'Dưới 20.000 VND',
    },
    {
      title: '10.000 VND',
      description: 'Từ 20.000 VND đến dưới 500.000 VND',
    },
    {
      title: 'Free ship',
      description: 'Từ 500.000 VND trở lên',
    },
  ]

  // Kiểm tra giỏ hàng rỗng
  if (!order?.orderItems?.length) {
    return (
      <WrapperContainer>
        <WrapperContent>
          <PageTitle>Giỏ hàng</PageTitle>
          <EmptyCart>
            <ShoppingCartOutlined className="empty-icon" />
            <h3>Giỏ hàng của bạn đang trống</h3>
            <p>Hãy thêm một số sản phẩm vào giỏ hàng để tiếp tục mua sắm</p>
            <Link to="/products" className="continue-shopping">
              Tiếp tục mua sắm
            </Link>
          </EmptyCart>
        </WrapperContent>
      </WrapperContainer>
    )
  }

  return (
    <WrapperContainer>
      <WrapperContent>
        <PageTitle>Giỏ hàng của bạn</PageTitle>

        <WrapperMain>
          <WrapperLeft>
            {/* Delivery Section */}
            <DeliverySection>
              <h4>Phí giao hàng</h4>
              <WrapperStyleHeaderDilivery>
                <StepComponent
                  items={itemsDelivery}
                  current={
                    diliveryPriceMemo === 10000 ? 2 :
                    diliveryPriceMemo === 20000 ? 1 :
                    order.orderItemsSlected.length === 0 ? 0 : 3
                  }
                />
              </WrapperStyleHeaderDilivery>
            </DeliverySection>

            {/* Cart Items */}
            <CartSection>
              <WrapperStyleHeader>
                <div className="select-all">
                  <CustomCheckbox
                    onChange={handleOnchangeCheckAll}
                    checked={listChecked?.length === order?.orderItems?.length}
                  />
                  <span>Tất cả ({order?.orderItems?.length} sản phẩm)</span>
                </div>
                <div className="headers">
                  <span>Đơn giá</span>
                  <span>Số lượng</span>
                  <span>Thành tiền</span>
                  <DeleteOutlined
                    className="delete-all"
                    onClick={handleRemoveAllOrder}
                    title="Xóa tất cả sản phẩm đã chọn"
                  />
                </div>
              </WrapperStyleHeader>

              <WrapperListOrder>
                {order?.orderItems?.map((order) => {
                  return (
                    <WrapperItemOrder key={order?.product}>
                      <div style={{ width: '390px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <CustomCheckbox onChange={onChange} value={order?.product} checked={listChecked.includes(order?.product)}></CustomCheckbox>
                        <img src={order?.images?.[0] || order?.image} style={{
                          width: '77px',
                          height: '79px',
                          objectFit: 'cover',
                          border: '1px solid rgb(238, 238, 238)',
                          padding: '2px'
                        }} alt="order-image" />
                        <div style={{
                          width: 260,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}>{order?.name}</div>
                      </div>
                      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: '13px', color: '#242424' }}>{convertPrice(order?.price)}</span>
                        <WrapperCountOrder>
                          <button style={{ border: 'none', background: 'transparent', cursor: 'pointer' }} onClick={() => handleChangeCount('decrease', order?.product, order?.amount === 1)}>
                            <MinusOutlined style={{ color: '#000', fontSize: '10px' }} />
                          </button>
                          <WrapperInputNumber defaultValue={order?.amount} value={order?.amount} size="small" min={1} max={order?.countInstock} />
                          <button style={{ border: 'none', background: 'transparent', cursor: 'pointer' }} onClick={() => handleChangeCount('increase', order?.product, order?.amount === order.countInstock)}>
                            <PlusOutlined style={{ color: '#000', fontSize: '10px' }} />
                          </button>
                        </WrapperCountOrder>
                        <span style={{ color: 'rgb(255, 66, 78)', fontSize: '13px', fontWeight: 500 }}>{convertPrice(order?.price * order?.amount)}</span>
                        <DeleteOutlined style={{ cursor: 'pointer' }} onClick={() => handleDeleteOrder(order?.product)} />
                      </div>
                    </WrapperItemOrder>
                  )
                })}
              </WrapperListOrder>
            </CartSection>
          </WrapperLeft>

          <WrapperRight>
            {/* Address Selector */}
            <AddressSelector
              user={user}
              onAddressChange={handleAddressChange}
              showMapPicker={false}
            />

            {/* Order Summary */}
            <OrderSummary>
              <WrapperInfo>
                <div className="summary-row">
                  <span className="label">Tạm tính</span>
                  <span className="value">{convertPrice(priceMemo)}</span>
                </div>
                <div className="summary-row">
                  <span className="label">Giảm giá</span>
                  <span className="value">-{convertPrice(priceDiscountMemo)}</span>
                </div>
                <div className="summary-row">
                  <span className="label">Phí giao hàng</span>
                  <span className="value">{convertPrice(diliveryPriceMemo)}</span>
                </div>
              </WrapperInfo>

              <WrapperTotal>
                <span className="total-label">Tổng tiền</span>
                <div className="total-amount">
                  <span className="amount">{convertPrice(totalPriceMemo)}</span>
                  <span className="vat-note">(Đã bao gồm VAT nếu có)</span>
                </div>
              </WrapperTotal>
            </OrderSummary>

            {/* Checkout Button */}
            <CheckoutButton
              onClick={handleAddCard}
              disabled={!order?.orderItemsSlected?.length || !selectedAddress}
            >
              Thanh toán ({listChecked.length} sản phẩm)
            </CheckoutButton>
          </WrapperRight>
        </WrapperMain>
      </WrapperContent>

      {/* Update Info Modal */}
      <ModalComponent
        title="Cập nhật thông tin giao hàng"
        open={isOpenModalUpdateInfo}
        onCancel={handleCancleUpdate}
        onOk={handleUpdateInforUser}
      >
        <Loading isLoading={isLoading}>
          <Form
            name="basic"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            autoComplete="on"
            form={form}
          >
            <Form.Item
              label="Tên"
              name="name"
              rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}
            >
              <InputComponent
                value={stateUserDetails['name']}
                onChange={handleOnchangeDetails}
                name="name"
              />
            </Form.Item>
            <Form.Item
              label="Thành phố"
              name="city"
              rules={[{ required: true, message: 'Vui lòng nhập thành phố!' }]}
            >
              <InputComponent
                value={stateUserDetails['city']}
                onChange={handleOnchangeDetails}
                name="city"
              />
            </Form.Item>
            <Form.Item
              label="Số điện thoại"
              name="phone"
              rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
            >
              <InputComponent
                value={stateUserDetails.phone}
                onChange={handleOnchangeDetails}
                name="phone"
              />
            </Form.Item>
            <Form.Item
              label="Địa chỉ"
              name="address"
              rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
            >
              <InputComponent
                value={stateUserDetails.address}
                onChange={handleOnchangeDetails}
                name="address"
              />
            </Form.Item>
          </Form>
        </Loading>
      </ModalComponent>
    </WrapperContainer>
  )
}

export default OrderPage
