const main = (): void => {
  console.log('Your plug-in has started!');

  const enabled = true;
  const outgoingsMultiplier = 1.0;
  const incomeMultiplier = 1.0;

  if (enabled) {
    console.log(`Outgoings will be multiplied by ${outgoingsMultiplier}`);
    console.log(`Income will be multiplied by ${incomeMultiplier}`);
  }

  const handlePayment = (e: PaymentEventArgs): void => {
    if (enabled) {
      if (e.amount > 0) e.amount *= outgoingsMultiplier;
      if (e.amount < 0) e.amount *= incomeMultiplier;
    }
  };

  context.subscribe('park.finance.payment', handlePayment);
};

export default main;
