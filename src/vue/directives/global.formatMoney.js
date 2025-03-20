export default {
  name: 'formatMoney',
  directive: {
    beforeMount (el) {
      const cents = parseInt(el.innerText);
      const dollars = cents / 100.00;

      el.innerText = `$${dollars}`;
    }
  }
}
