const Razorpay = require('razorpay');

const Order = require('../models/order');

exports.purchasepremium = async (req, res) => {
    try {
        console.log(process.env.RAZORPAY_KEY_ID,process.env.RAZORPAY_KEY_SECRET);
        var rzp = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET
        })

        const amount = 2500;

        rzp.orders.create({amount, currency: "INR"}, (err, order)=>{
            if(err){
                throw new Error(JSON.stringify(err));
            }
            req.user.createOrder({orderid:order.id, status: 'PENDING'}).then(()=>{
                return res.status(201).json({order, key_id:rzp.key_id});
            })
            .catch(err => {
                throw new Error(err);
            })
        })
    } catch (err) {
        console.log(err);
        res.status(403).json({message:'someting went wrong', error:err});
    }
}

exports.updateTransactionStatus = async (req, res) => {
    try {
        
        const {payment_id, order_id} = req.body;
        
        const order = await Order.findOne({where:{orderid:order_id}});
        
        console.log(order);

        if(!order)
        {
            console.log('no order is available');
        }
        
        const promise1 = order.update({paymentid:payment_id, status:'SUCEESSFUL'})
        const promise2 =  req.user.update({ispremiumuser:true})
                    
        await Promise.all([promise1, promise2]);
        
        return res.status(202).json({success:true, message:"Transaction Successful"})
                
    } catch(err) {
        console.log(err);
        res.status(403).json({message:'something went wrong',err})
    }
}
