const Cart = require('../models/cart');


exports.addItemsToCart = (req, res) => {
    Cart.findOne({ user: req.user._id })//if user exist then his 1 cart existe don't create
    .exec((error, cart) => {
        if(error) return res.status(400).json({ error });
        if(cart){ //if cart already exist then update cart by quantity
            //if product exist in cart then
            const product = req.body.cartItems.product;
            const item = cart.cartItems.find(c => c.product == product);//product already exist
            let condition, update;
            
            
            
            if(item){ // check if we have one product already
                condition = {"user": req.user._id, "cartItems.product": product};
                action = {    
                    "$set": {
                        "cartItems.$": { //select that item & update the quantity
                            ...req.body.cartItems,
                            quantity: item.quantity + req.body.cartItems.quantity
                        }
                    }
                };
            }else{ //we don't have product with this name : so add to cart
                condition = {user: req.user._id};
                update = {
                    "$push": {
                        "cartItems": req.body.cartItems
                    }
                };
            }
            Cart.findOneAndUpdate( condition, update ) //find the item them update         
            .exec((error, _cart) => {
                if(error) return res.status(400).json({ error });
                if(_cart){ return res.status(201).json({ cart: cart }); }
            })
            //res.status(200).json({message: cart});
        }else{ 
            //if cart don't exist then create a new cart
            const cart = new Cart({
                user: req.user._id, //from  the req 
                cartItems: [req.body.cartItems]
            });
            cart.save((error, cart) => {
                if(error) return res.status(400).json({ error });
                if(cart){ return res.status(201).json({ cart }); }
            });
        }
    });
};