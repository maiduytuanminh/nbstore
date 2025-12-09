import {Form, Radio } from 'antd'
import React, { useEffect, useState } from 'react'
import { Lable, WrapperInfo, WrapperLeft, WrapperRadio, WrapperRight, WrapperTotal } from './style';

import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import { useDispatch, useSelector } from 'react-redux';
import { convertPrice } from '../../utils';
import { useMemo } from 'react';
import ModalComponent from '../../components/ModalComponent/ModalComponent';
import InputComponent from '../../components/InputComponent/InputComponent';
import AddressMapPicker from '../../components/AddressMapPicker/AddressMapPicker';
import { useMutationHooks } from '../../hooks/useMutationHook';
import * as  UserService from '../../services/UserService'
import * as OrderService from '../../services/OrderService'
import Loading from '../../components/LoadingComponent/Loading';
import * as message from '../../components/Message/Message'
import { updateUser } from '../../redux/slides/userSlide';
import { useNavigate } from 'react-router-dom';
import { removeAllOrderProduct } from '../../redux/slides/orderSlide';
import { PayPalButton } from "react-paypal-button-v2";
import * as PaymentService from '../../services/PaymentService'

const PaymentPage = () => {
  const order = useSelector((state) => state.order)
  const user = useSelector((state) => state.user)

  const [delivery, setDelivery] = useState('fast')
  const [payment, setPayment] = useState('later_money')
  const navigate = useNavigate()
  const [sdkReady , setSdkReady] = useState(false)

  const [isOpenModalUpdateInfo, setIsOpenModalUpdateInfo] = useState(false)
  const [stateUserDetails, setStateUserDetails] = useState({
    name: '',
    phone: '',
    address: '',
    city: ''
  })
  const [shippingAddress, setShippingAddress] = useState({
    fullAddress: '',
    street: '',
    district: '',
    city: '',
    province: '',
    phone: '',
    coordinates: null
  })
  const [form] = Form.useForm();

  const dispatch = useDispatch()

  // Đọc thông tin địa chỉ từ localStorage khi component mount
  useEffect(() => {
    const savedAddress = localStorage.getItem('selectedShippingAddress');
    if (savedAddress) {
      try {
        const addressInfo = JSON.parse(savedAddress);
        console.log('PaymentPage - Reading saved address:', addressInfo); // Debug log

        if (addressInfo.type === 'current') {
          // Sử dụng địa chỉ hiện tại của user
          setStateUserDetails({
            name: addressInfo.data.fullName,
            phone: addressInfo.data.phone,
            address: addressInfo.data.address,
            city: addressInfo.data.city
          });
          setShippingAddress({
            fullAddress: `${addressInfo.data.address}, ${addressInfo.data.city}`,
            phone: addressInfo.data.phone,
            city: addressInfo.data.city,
            street: '',
            district: '',
            province: '',
            coordinates: null
          });
        } else if (addressInfo.type === 'new') {
          // Sử dụng địa chỉ mới
          setStateUserDetails({
            name: addressInfo.data.fullName,
            phone: addressInfo.data.phone,
            address: addressInfo.data.address,
            city: '' // Không cần city riêng cho địa chỉ mới
          });

          // Sử dụng thông tin địa chỉ từ form địa chỉ mới
          setShippingAddress({
            fullAddress: addressInfo.data.fullAddress || addressInfo.data.address,
            street: addressInfo.data.street || '',
            district: addressInfo.data.district || '',
            city: addressInfo.data.city || '',
            province: addressInfo.data.province || '',
            phone: addressInfo.data.phone,
            coordinates: addressInfo.data.coordinates
          });
        }
      } catch (error) {
        console.error('Error parsing saved address:', error);
      }
    }
  }, []);

  useEffect(() => {
    form.setFieldsValue(stateUserDetails)
  }, [form, stateUserDetails])

  useEffect(() => {
    if(isOpenModalUpdateInfo) {
      setStateUserDetails({
        city: user?.city,
        name: user?.name,
        address: user?.address,
        phone: user?.phone
      })
      // Initialize shipping address with user info
      setShippingAddress({
        fullAddress: `${user?.address || ''} ${user?.city || ''}`.trim(),
        phone: user?.phone || '',
        city: user?.city || '',
        street: '',
        district: '',
        province: '',
        coordinates: null
      })
    }
  }, [isOpenModalUpdateInfo, user])

  const handleChangeAddress = () => {
    setIsOpenModalUpdateInfo(true)
  }

  const priceMemo = useMemo(() => {
    const result = order?.orderItemsSlected?.reduce((total, cur) => {
      return total + ((cur.price * cur.amount))
    },0)
    return result
  },[order])

  const priceDiscountMemo = useMemo(() => {
    const result = order?.orderItemsSlected?.reduce((total, cur) => {
      const totalDiscount = cur.discount ? cur.discount : 0
      return total + (priceMemo * (totalDiscount  * cur.amount) / 100)
    },0)
    if(Number(result)){
      return result
    }
    return 0
  },[order])

  const diliveryPriceMemo = useMemo(() => {
    if(priceMemo > 200000){
      return 10000
    }else if(priceMemo === 0 ){
      return 0
    }else {
      return 20000
    }
  },[priceMemo])

  const totalPriceMemo = useMemo(() => {
    return Number(priceMemo) - Number(priceDiscountMemo) + Number(diliveryPriceMemo)
  },[priceMemo,priceDiscountMemo, diliveryPriceMemo])

  const handleAddOrder = () => {
    // Kiểm tra thông tin cần thiết từ shippingAddress và stateUserDetails
    const orderFullName = stateUserDetails.name || user?.name;
    const orderPhone = shippingAddress.phone || stateUserDetails.phone || user?.phone;
    const orderAddress = shippingAddress.fullAddress || stateUserDetails.address || user?.address;

    if(user?.access_token && order?.orderItemsSlected && orderFullName
      && orderAddress && orderPhone && priceMemo && user?.id) {
        console.log('Creating order with shipping info:', { // Debug log
          fullName: orderFullName,
          phone: orderPhone,
          address: orderAddress,
          shippingAddress
        });

        // eslint-disable-next-line no-unused-expressions
        mutationAddOrder.mutate(
          {
            token: user?.access_token,
            orderItems: order?.orderItemsSlected,
            fullName: orderFullName,
            address: orderAddress,
            phone: orderPhone,
            city: stateUserDetails.city || user?.city,
            paymentMethod: payment,
            itemsPrice: priceMemo,
            shippingPrice: diliveryPriceMemo,
            totalPrice: totalPriceMemo,
            user: user?.id,
            email: user?.email,
            // Thêm thông tin địa chỉ giao hàng chi tiết
            shippingAddress: {
              fullName: orderFullName,
              phone: orderPhone,
              fullAddress: orderAddress,
              street: shippingAddress.street,
              district: shippingAddress.district,
              city: shippingAddress.city,
              province: shippingAddress.province,
              coordinates: shippingAddress.coordinates
            }
          }
        )
      } else {
        message.error('Thông tin đặt hàng chưa đầy đủ. Vui lòng quay lại trang đặt hàng để kiểm tra.');
      }
  }

  const mutationUpdate = useMutationHooks(
    (data) => {
      const { id,
        token,
        ...rests } = data
      const res = UserService.updateUser(
        id,
        { ...rests }, token)
      return res
    },
  )

  const mutationAddOrder = useMutationHooks(
    (data) => {
      const {
        token,
        ...rests } = data
      const res = OrderService.createOrder(
        { ...rests }, token)
      return res
    },
  )

  const { isLoading } = mutationUpdate
  const { data: dataAdd,isLoading:isLoadingAddOrder, isSuccess, isError } = mutationAddOrder

  useEffect(() => {
    if (isSuccess && dataAdd?.status === 'OK') {
      const arrayOrdered = []
      order?.orderItemsSlected?.forEach(element => {
        arrayOrdered.push(element.product)
      });
      dispatch(removeAllOrderProduct({listChecked: arrayOrdered}))
      message.success('Đặt hàng thành công')
      navigate('/orderSuccess', {
        state: {
          delivery,
          payment,
          orders: order?.orderItemsSlected,
          totalPriceMemo: totalPriceMemo
        }
      })
    } else if (isError) {
      message.error('Đặt hàng thất bại')
    }
  }, [isSuccess,isError])

  const handleCancleUpdate = () => {
    setStateUserDetails({
      name: user?.name,
      address: user?.address,
      city: user?.city,
      phone: user?.phone,
    })
    setIsOpenModalUpdateInfo(false)
  }

  const onSuccessPaypal = (details, data) => {
    // Sử dụng thông tin từ shippingAddress và stateUserDetails như trong handleAddOrder
    const orderFullName = shippingAddress?.fullName || stateUserDetails.name || user?.name;
    const orderPhone = shippingAddress?.phone || stateUserDetails.phone || user?.phone;
    const orderAddress = shippingAddress?.fullAddress || stateUserDetails.address || user?.address;

    mutationAddOrder.mutate(
      {
        token: user?.access_token,
        orderItems: order?.orderItemsSlected,
        fullName: orderFullName,
        address: orderAddress,
        phone: orderPhone,
        city: stateUserDetails.city || user?.city,
        paymentMethod: payment,
        itemsPrice: priceMemo,
        shippingPrice: diliveryPriceMemo,
        totalPrice: totalPriceMemo,
        user: user?.id,
        isPaid: false, // Thay đổi từ true thành false để giữ trạng thái "chờ xử lý"
        paidAt: details.update_time, // Vẫn lưu thời gian thanh toán PayPal
        email: user?.email,
        // Thêm thông tin địa chỉ giao hàng chi tiết
        shippingAddress: {
          fullName: orderFullName,
          address: orderAddress, // Thêm field address (required)
          phone: orderPhone,
          city: shippingAddress.city || stateUserDetails.city || user?.city,
          fullAddress: orderAddress,
          street: shippingAddress.street,
          district: shippingAddress.district,
          province: shippingAddress.province,
          coordinates: shippingAddress.coordinates
        }
      }
    )
  }

  const handleUpdateInforUser = () => {
    const {name, address,city, phone} = stateUserDetails
    if(name && address && city && phone){
      mutationUpdate.mutate({ id: user?.id, token: user?.access_token, ...stateUserDetails }, {
        onSuccess: () => {
          dispatch(updateUser({name, address,city, phone}))
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
  const handleDilivery = (e) => {
    setDelivery(e.target.value)
  }

  const handlePayment = (e) => {
    setPayment(e.target.value)
  }

  const addPaypalScript = async () => {
    const { data } = await PaymentService.getConfig()
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = `https://www.paypal.com/sdk/js?client-id=${data}&currency=USD`
    script.async = true;
    script.onload = () => {
        setSdkReady(true)
    }
    document.body.appendChild(script)
  }

  useEffect(() => {
    if(!window.paypal) {
        addPaypalScript()
    }else {
        setSdkReady(true)
    }
  }, [])

  const handleAddressSelect = (addressData) => {
    setShippingAddress({
      fullAddress: addressData.fullAddress,
      street: addressData.street,
      district: addressData.district,
      city: addressData.city,
      province: addressData.province,
      phone: addressData.phone,
      coordinates: addressData.coordinates
    });

    // Cập nhật stateUserDetails với thông tin cơ bản
    setStateUserDetails(prev => ({
      ...prev,
      address: addressData.fullAddress,
      phone: addressData.phone
    }));
  };

  return (
    <div style={{background: '#f5f5fa', with: '100%', height: '100vh'}}>
      <Loading isLoading={isLoadingAddOrder}>
        <div style={{height: '100%', width: '1270px', margin: '0 auto'}}>
          <h3>Thanh toán</h3>
          <div style={{ display: 'flex', justifyContent: 'center'}}>
            <WrapperLeft>
              <WrapperInfo>
                <div>
                  <Lable>Chọn phương thức giao hàng</Lable>
                  <WrapperRadio onChange={handleDilivery} value={delivery}>
                    <Radio  value="fast"><span style={{color: '#ea8500', fontWeight: 'bold'}}>FAST</span> Giao hàng tiết kiệm</Radio>
                    <Radio  value="gojek"><span style={{color: '#ea8500', fontWeight: 'bold'}}>GO_JEK</span> Giao hàng tiết kiệm</Radio>
                  </WrapperRadio>
                </div>
              </WrapperInfo>
              <WrapperInfo>
                <div>
                  <Lable>Chọn phương thức thanh toán</Lable>
                  <WrapperRadio onChange={handlePayment} value={payment}>
                    <Radio value="later_money"> Thanh toán tiền mặt khi nhận hàng</Radio>
                    <Radio value="paypal"> Thanh toán tiền bằng paypal</Radio>
                  </WrapperRadio>
                </div>
              </WrapperInfo>
            </WrapperLeft>
            <WrapperRight>
              <div style={{width: '100%'}}>
                <WrapperInfo>
                  <div>
                    <span style={{fontSize: '16px', fontWeight: 'bold', color: '#52c41a'}}>
                      📦 Thông tin giao hàng đã chọn:
                    </span>
                    <br /><br />
                    <span>👤 Người nhận: </span>
                    <span style={{fontWeight: 'bold'}}>
                      {stateUserDetails.name || user?.name}
                    </span>
                    <br />
                    <span>📞 Số điện thoại: </span>
                    <span style={{fontWeight: 'bold'}}>
                      {shippingAddress.phone || stateUserDetails.phone || user?.phone}
                    </span>
                    <br />
                    <span>📍 Địa chỉ giao hàng: </span>
                    <span style={{fontWeight: 'bold'}}>
                      {shippingAddress.fullAddress || `${stateUserDetails.address || user?.address} ${stateUserDetails.city || user?.city}`}
                    </span>
                    <br /><br />
                    <span onClick={() => navigate('/order')} style={{color: '#9255FD', cursor:'pointer'}}>
                      📝 Quay lại chỉnh sửa địa chỉ giao hàng
                    </span>
                  </div>
                </WrapperInfo>
                <WrapperInfo>
                  <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                    <span>Tạm tính</span>
                    <span style={{color: '#000', fontSize: '14px', fontWeight: 'bold'}}>{convertPrice(priceMemo)}</span>
                  </div>
                  <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                    <span>Giảm giá</span>
                    <span style={{color: '#000', fontSize: '14px', fontWeight: 'bold'}}>{convertPrice(priceDiscountMemo)}</span>
                  </div>
                  <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                    <span>Phí giao hàng</span>
                    <span style={{color: '#000', fontSize: '14px', fontWeight: 'bold'}}>{convertPrice(diliveryPriceMemo)}</span>
                  </div>
                </WrapperInfo>
                <WrapperTotal>
                  <span>Tổng tiền</span>
                  <span style={{display:'flex', flexDirection: 'column'}}>
                    <span style={{color: 'rgb(254, 56, 52)', fontSize: '24px', fontWeight: 'bold'}}>{convertPrice(totalPriceMemo)}</span>
                    <span style={{color: '#000', fontSize: '11px'}}>(Đã bao gồm VAT nếu có)</span>
                  </span>
                </WrapperTotal>
              </div>
              {payment === 'paypal' && sdkReady ? (
                <div style={{width: '320px'}}>
                  <PayPalButton
                    amount={Math.round(totalPriceMemo / 30000)}
                    onSuccess={onSuccessPaypal}
                    onError={(error) => {
                      console.error('PayPal Error:', error);
                      message.error('Lỗi thanh toán PayPal. Vui lòng thử lại.');
                    }}
                    onCancel={() => {
                      message.info('Bạn đã hủy thanh toán PayPal');
                    }}
                  />
                </div>
              ) : payment === 'paypal' && !sdkReady ? (
                <div style={{width: '320px', textAlign: 'center', padding: '20px'}}>
                  <div style={{color: '#1890ff'}}>🔄 Đang tải PayPal...</div>
                </div>
              ) : (
                <ButtonComponent
                  onClick={() => handleAddOrder()}
                  size={40}
                  styleButton={{
                      background: 'rgb(255, 57, 69)',
                      height: '48px',
                      width: '320px',
                      border: 'none',
                      borderRadius: '4px'
                  }}
                  textbutton={'Đặt hàng'}
                  styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}
              ></ButtonComponent>
              )}
            </WrapperRight>
          </div>
        </div>
        <ModalComponent
          title="🗺️ Cập nhật thông tin giao hàng"
          open={isOpenModalUpdateInfo}
          onCancel={handleCancleUpdate}
          onOk={handleUpdateInforUser}
          width={800}
        >
          <Loading isLoading={isLoading}>
            <AddressMapPicker
              onAddressSelect={handleAddressSelect}
              currentAddress={`${stateUserDetails.address} ${stateUserDetails.city}`}
              currentPhone={stateUserDetails.phone}
            />
            <Form
              name="basic"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 18 }}
              // onFinish={onFinish}
              // onFinishFailed={onFinishFailed}
              autoComplete="off"
              form={form}
            >
              <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: 'Please input your name!' }]}
              >
                <InputComponent value={stateUserDetails['name']} onChange={handleOnchangeDetails} name="name" />
              </Form.Item>
              <Form.Item
                label="City"
                name="city"
                rules={[{ required: true, message: 'Please input your city!' }]}
              >
                <InputComponent value={stateUserDetails['city']} onChange={handleOnchangeDetails} name="city" />
              </Form.Item>
              <Form.Item
                label="Phone"
                name="phone"
                rules={[{ required: true, message: 'Please input your  phone!' }]}
              >
                <InputComponent value={stateUserDetails.phone} onChange={handleOnchangeDetails} name="phone" />
              </Form.Item>

              <Form.Item
                label="Adress"
                name="address"
                rules={[{ required: true, message: 'Please input your  address!' }]}
              >
                <InputComponent value={stateUserDetails.address} onChange={handleOnchangeDetails} name="address" />
              </Form.Item>
            </Form>
          </Loading>
        </ModalComponent>
      </Loading>
    </div>
  )
}

export default PaymentPage
