"use strict";

const patisserie = {
  bananaCaramel: {
    stock: 3,
    price: 9.99,
  },
  contessa: {
    stock: 5,
    price: 7.99,
  },
  concorde: {
    stock: 11,
    price: 22.99,
  },
  mouseCake: {
    stock: 8,
    price: 16.99,
  },
  confettiSuprise: {
    stock: 9,
    price: 14.99,
  },
};

// console.log(patisserie.mouseCake.stock);
// console.log(patisserie["mouseCake"].stock);

const cakeType = document.getElementById("cakeSelect");
const orderAmount = document.getElementById("cakeAmount");
const orderBtn = document.getElementById("submit_btn");




const checkOrder = (orderArray) => {
  // console.log(orderArray);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let stockControl = patisserie[orderArray[0]].stock;
      let totalPayment = patisserie[orderArray[0]].price * orderArray[1];
      if (stockControl >= orderArray[1]) {
        console.log(`stock is enough, your cost is ${totalPayment} $. Do you confirm? Press "1".`);
        resolve([orderArray, totalPayment]);
      } else {
        reject("stock is not enough");
      }
    }, 2000);
  })
};



const payment = (resolvedValueArray) => {
  // console.log(resolvedValueArray);  
  return new Promise((resolve, reject) => {
    document.addEventListener("keydown", (e) => {
      console.log(e.key);
      setTimeout(() => {
        if (e.key === "1") {
          // console.log(`Your  payment is accepted with total ${resolvedValueArray[1]} `);
          resolve(resolvedValueArray[0])
        } else {
          reject("Your  payment is rejected by you.");
        }
      }, 2000);
    })

  })

  // dont forget setTimeout

}

const stockControl = (resolvedValueArray) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let leftControl = patisserie[resolvedValueArray[0]].stock - resolvedValueArray[1];
      console.log(`${resolvedValueArray[0]} stock left  ${leftControl}`);
      patisserie[resolvedValueArray[0]].stock = leftControl;
      if (leftControl < 2) {
        resolve(`To cashier: ${resolvedValueArray[0]} stock critic  ${leftControl}`);
      } else {
        reject(`To cashier: ${resolvedValueArray[0]} stock enough  ${leftControl}`);
      }
    }, 2000);
  })
}






orderBtn.onclick = () => {
  // let order = ['contessa', 2];   // sample order template, you should take values from DOM
  // create promise chain

  let order = [cakeType.value, orderAmount.value];
  console.log(order);
  checkOrder(order)
    .then((resolvedValue) => {
      return payment(resolvedValue);
    })
    .then((resolvedValuePayment) => {
      return stockControl(resolvedValuePayment);

    }).then((resolvedValueControl) => {
      console.log(resolvedValueControl);

    })
    .catch((rejectedValuePayment) => { console.log(rejectedValuePayment) })
}

