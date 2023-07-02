const product = [
    {
      id: 0,
      image: 'sundae1.jpg',
      title: 'SUNDAE PLAIN',
      price: 120,
    },
    {
      id: 1,
      image: 'sundae2.jpg',
      title: 'SUNDAE CLASSIC',
      price: 135,
    },
    {
      id: 2,
      image: 'sundae3.jpg',
      title: 'SUNDAE GRANDE',
      price: 165,
    },
    {
      id: 3,
      image: 'cupsupreme.jpg',
      title: 'SUNDAE SUPREME',
      price: 185,
    },
    {
      id: 4,
      image: 'plainoreo.jpg',
      title: 'SUNDAE OREO',
      price: 75,
    },
    {
      id: 5,
      image: 'sundae4.jpg',
      title: 'SUNDAE OREO',
      price: 60,
    },
    {
      id: 6,
      image: 'sundae.jpg',
      title: 'SUNDAE',
      price: 45,
    },
    {
      id: 7,
      image: 'sundaeoreo.jpg',
      title: 'SUNDAE OREO W/ M&M',
      price: 80,
    },
    {
      id: 8,
      image: 'vanilacone.jpg',
      title: 'Vanila Ice cream',
      price: 20,
    },
    {
      id: 9,
      image: 'cappuccino.jpg',
      title: 'Cappuccino',
      price: 80,
    },
    {
      id: 10,
      image: 'americano.jpg',
      title: 'Americano',
      price: 70,
    },
    {
      id: 11,
      image: 'flatwhite.jpg',
      title: 'Flat white',
      price: 90,
    },
    {
      id: 12,
      image: 'caffemacchiato.jpg',
      title: 'Caffè macchiato',
      price: 120,
    },
    {
      id: 13,
      image: 'espresso.jpg',
      title: 'Espresso',
      price: 125,
    },
    {
      id: 14,
      image: 'caffemocha.jpg',
      title: 'Caffè mocha',
      price: 110,
    },
    {
      id: 15,
      image: 'Latte.jpg',
      title: 'Latte',
      price: 105,
    },

  ];
  
  const categories = [...new Set(product.map((item) => item.title))];
  let i = 0;
  var cart = [];
  
  document.getElementById('root').innerHTML = product.map((item) => {
    const { id, image, title, price } = item;
    return `
      <div class='box'>
        <div class='img-box'>
          <img class='images' src='${image}'></img>
        </div>
        <div class='bottom'>
          <p>${title}</p>
          <h2>₱ ${price}.00</h2>
          <button onclick='addtocart(${id})'>Add to cart</button>
        </div>
      </div>`;
  }).join('');
  //receipt
  function showPaymentSelection() {
    const paymentSelection = document.getElementById('paymentSelection');
    paymentSelection.style.display = 'block';
  }
  
  function showPaymentWidget() {
    const paymentWidget = document.getElementById('paymentWidget');
    paymentWidget.style.display = 'block';
  }
  
  function updatePaymentMethod(paymentMethod) {
    const paymentContent = document.getElementById('paymentContent');
  
    if (paymentMethod === 'cash') {
      paymentContent.innerHTML = `
        <p>Total: ₱ <span id="totalAmount"></span></p>
        <label for="cashInput">Enter the amount given by the customer:</label><br>
        <input type="text" id="cashInput"><br><br>
        <button onclick="processCashPayment()">Pay</button>
      `;
    } else if (paymentMethod === 'credit') {
      paymentContent.innerHTML = `
        <p>Total: ₱ <span id="totalAmount"></span></p>
        <label for="cardNumberInput">Enter the card number:</label><br>
        <input type="text" id="cardNumberInput"><br><br>
        <label for="cvvInput">Enter the CVV:</label><br>
        <input type="text" id="cvvInput"><br><br>
        <label for="expirationDateInput">Enter the expiration date (MM/YYYY):</label><br>
        <input type="text" id="expirationDateInput"><br><br>
        <button onclick="processCreditPayment()">Pay</button>
      `;
    } else {
      alert('Invalid payment method. Please try again.');
      return;
    }
  
    const total = cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    document.getElementById('totalAmount').textContent = total;
  }
  
  function processCashPayment() {
    const total = parseFloat(cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2));
    const cashInput = document.getElementById('cashInput').value;
    const cash = parseFloat(cashInput);
  
    if (isNaN(cash) || cash < total) {
      alert('Invalid amount entered. Payment not completed.');
      return;
    }
  
    const change = (cash - total).toFixed(2);
    const receiptContent = document.getElementById('receiptContent');
    receiptContent.innerText = generateReceipt() + `\nChange: ₱ ${change}`;
    showReceipt();
  }
  
  function processCreditPayment() {
    const cardNumberInput = document.getElementById('cardNumberInput').value;
    const cvvInput = document.getElementById('cvvInput').value;
    const expirationDateInput = document.getElementById('expirationDateInput').value;
  
    // Validate card details and process payment
    
  
    const receiptContent = document.getElementById('receiptContent');
    receiptContent.innerText = generateReceipt();
    showReceipt();
  }
  
  function hidePaymentSelection() {
    const paymentSelection = document.getElementById('paymentSelection');
    paymentSelection.style.display = 'none';
  }
  
  function showReceipt() {
    const receiptWidget = document.getElementById('receiptWidget');
    receiptWidget.style.display = 'block';
  
    const doneButton = document.createElement('button');
    doneButton.innerText = 'Purchase Done';
    doneButton.onclick = refreshPage;
    receiptWidget.appendChild(doneButton);
  }
  
  function generateReceipt() {
    const total = cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    let receiptMessage = `Receipt Details:\nNumber of Items: ${cart.length}\n\nOrder List:\n`;
    cart.forEach((item) => {
      receiptMessage += `${item.title} - ₱ ${item.price}.00 x ${item.quantity}\n`;
    });
    receiptMessage += `\nTotal: ₱ ${total}`;
  
    return receiptMessage;
  }
  
  function refreshPage() {
    location.reload(true);
  }
  

//
  function displaycart() {
    const countElement = document.getElementById('count');
    const cartItemElement = document.getElementById('cartItem');
    const totalElement = document.getElementById('total');
  
    countElement.innerText = cart.length;
  
    if (cart.length === 0) {
      cartItemElement.innerHTML = "Your cart is empty";
      totalElement.innerText = "₱ 0.00";
    } else {
      let total = 0;
      cartItemElement.innerHTML = '';
  
      cart.forEach((item, index) => {
        const { image, title, price, quantity } = item;
        total += price * quantity;
  
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
  
        const imageElement = document.createElement('div');
        imageElement.className = 'row-img';
        const imageTag = document.createElement('img');
        imageTag.className = 'row-img';
        imageTag.src = image;
        imageElement.appendChild(imageTag);
  
        const titleElement = document.createElement('p');
        titleElement.style.fontSize = '12px';
        titleElement.innerText = title;
  
        const priceElement = document.createElement('h2');
        priceElement.style.fontSize = '15px';
        priceElement.innerText = `₱ ${price}.00`;
  
        const quantityElement = document.createElement('span');
        quantityElement.style.marginLeft = '5px';
        quantityElement.innerText = `x${quantity}`;
  
        const trashIcon = document.createElement('i');
        trashIcon.className = 'bi bi-trash-fill';
        trashIcon.addEventListener('click', () => delElement(index));
  
        cartItem.appendChild(imageElement);
        cartItem.appendChild(titleElement);
        cartItem.appendChild(priceElement);
        cartItem.appendChild(quantityElement);
        cartItem.appendChild(trashIcon);
  
        cartItemElement.appendChild(cartItem);
      });
  
      const totalWrapper = document.createElement('div');
      totalWrapper.className = 'total-wrapper';
  
      const totalLabel = document.createElement('p');
      totalLabel.innerText = 'Total:';
  
      const totalPrice = document.createElement('h2');
      totalPrice.innerText = `₱ ${total.toFixed(2)}`;
  
      totalWrapper.appendChild(totalLabel);
      totalWrapper.appendChild(totalPrice);
      cartItemElement.appendChild(totalWrapper);
  
      totalElement.innerText = `₱ ${total.toFixed(2)}`;
    }
  }
  
  
  function addtocart(id) {
    const selectedProduct = product.find((item) => item.id === id);
  
    
    const existingItem = cart.find((item) => item.id === selectedProduct.id);
    if (existingItem) {
      
      existingItem.quantity++;
    } else {
      
      selectedProduct.quantity = 1;
      cart.push(selectedProduct);
    }
  
    displaycart();
  }
  
  function delElement(index) {
    const deletedItem = cart[index];
    
   
    deletedItem.quantity--;
  
   
    if (deletedItem.quantity === 0) {
      cart.splice(index, 1);
    }
  
    displaycart();
  }
  
  function displaycart() {
    const countElement = document.getElementById('count');
    const cartItemElement = document.getElementById('cartItem');
    const totalElement = document.getElementById('total');
  
    countElement.innerText = cart.length;
  
    if (cart.length === 0) {
      cartItemElement.innerHTML = "Your cart is empty";
      totalElement.innerText = "₱ 0.00";
    } else {
      let total = 0;
      cartItemElement.innerHTML = '';
  
      cart.forEach((item, index) => {
        const { image, title, price, quantity } = item;
        total += price * quantity;
  
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
  
        const imageElement = document.createElement('div');
        imageElement.className = 'row-img';
        const imageTag = document.createElement('img');
        imageTag.className = 'row-img';
        imageTag.src = image;
        imageElement.appendChild(imageTag);
  
        const titleElement = document.createElement('p');
        titleElement.style.fontSize = '12px';
        titleElement.innerText = title;
  
        const priceElement = document.createElement('h2');
        priceElement.style.fontSize = '15px';
        priceElement.innerText = `₱ ${price}.00`;
  
        const quantityElement = document.createElement('span');
        quantityElement.style.marginLeft = '5px';
        quantityElement.innerText = `x${quantity}`;
  
        const trashIcon = document.createElement('i');
        trashIcon.className = 'bi bi-trash-fill';
        trashIcon.addEventListener('click', () => delElement(index));
  
        cartItem.appendChild(imageElement);
        cartItem.appendChild(titleElement);
        cartItem.appendChild(priceElement);
        cartItem.appendChild(quantityElement);
        cartItem.appendChild(trashIcon);
  
        cartItemElement.appendChild(cartItem);
      });
  
      totalElement.innerText = `₱ ${total.toFixed(2)}`;
    }
  }