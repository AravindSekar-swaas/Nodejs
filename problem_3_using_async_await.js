// Shopping Portal Cart Value Evaluation

/* Input */
const shoppingCart = [
  { name: "Apple", price: 10, quantity: 4 },
  { name: "Banana", price: 5, quantity: 5 },
  { name: "Orange", price: 15, quantity: 3 },
];

function calculateTotal(cart) {
  var total = 0;
  // var Apple = 0;
  // var Banana = 0;
  // var Orange = 0;

  for (let value in cart) {
    if ((cart[value].name = "Apple")) {
      total = total + cart[value].price * cart[value].quantity;
    } else if ((cart[value].name = "Banana")) {
      total = total + cart[value].price * cart[value].quantity;
    } else {
      total = total + cart[value].price * cart[value].quantity;
    }
    // total = total + sum;
  }
  // total = Apple + Banana + Orange;
  return total;
}

function displayAmount(amount) {
    return new Promise((resolve, reject) => {
        if (amount > 0) {
            resolve("Your Total Cart Value is :" + amount)
        }
        else {
            reject("NO ITEM IN CART")
        }
        
    })
  console.log("Your Total Cart Value is :" + amount);
}

async function Cart() {
  try {
    const cartValue = await calculateTotal(shoppingCart);
      await displayAmount(cartValue)
          .then((amount) => {
              console.log(amount);
          })
          .catch((msg) => {
              console.log(msg);
      })
  } catch {
    console.log("Some Error");
  }
}
Cart();

// const totalCost = calculateTotal(shoppingCart);

// /* Output */
// console.log("Total cost: Rs." + totalCost);
/* Output */

/* Expected Output */
//Total cost: Rs.110
/* Expected Output */
