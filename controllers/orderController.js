import { log } from "console";
import Order from "../models/Order.js";

export const createOrderProduct = async (req, res, next) => {
  const { cart, shippingAddress, user, totalPrice, status , paymentInfo} = req.body;

  try{
     const shopItemMap = new Map();
     for(const item of cart){
      const shopId = item.shopId
      if(!shopItemMap.has(shopId)){
         shopItemMap.set(shopId,[])
      }
      shopItemMap.get(shopId).push(item)
     }
     const orders = [];

     for (const [shopId, items] of shopItemMap) {
      const order = await Order.create({
        cart: items,
        shippingAddress,
        user,
        totalPrice,
        paymentInfo,
        status,
      });
      orders.push(order);
    }
    // const orders = [];
    // const order = await Order.create({
    //   cart,
    //   shippingAddress,
    //   user,
    //   totalPrice,
    //   paymentInfo,
    // });
    // orders.push(order);

    res.status(201).json({
      success: true,
      orders,
    });

  }catch(err){
   next(err.message, 500);
   console.log(err);
  }
};
export const getOrderUser = async (req , res , next) =>{
    const userID = req.params.userid
    try{ 
        const orders = await Order.find({"user._id":userID}) 
        res.status(200).json({success:true,orders})
    }catch(err){
      console.log(err);
    }
}
export const getOrderShop = async (req , res , next) =>{
    const shopID = req.params.shopid
    try{ 
        const orders = await Order.find({"cart.shopId":shopID}) 
        res.status(200).json({success:true,orders})
    }catch(err){
      console.log(err);
    }
}
export const getOrderOneBookAllShop = async (req , res , next) =>{
    const bookId = req.params.bookid
    try{ 
        const orders = await Order.find({"cart._id":bookId}) 
        res.status(200).json({success:true,orders})
    }catch(err){
      console.log(err);
    }
}
export const getOrderOneUser = async (req , res , next) =>{
    const orderuserID = req.params.orderid
    try{ 
        const orders = await Order.findById(orderuserID) 
        res.status(200).json({success:true,orders})
    }catch(err){
      console.log(err);
    }
}                                                              