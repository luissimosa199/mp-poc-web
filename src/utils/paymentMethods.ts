type PaymentMethod = {
  [key: string]: string;
};

export const paymentMethods: PaymentMethod = {
  account_money: "Dinero en la cuenta de Mercado Pago",
  ticket: "Boletos, Pago en Caixa Electronica, PayCash, Efecty, Oxxo, etc.",
  bank_transfer: "Pix y PSE (Pagos Seguros en Línea)",
  atm: "Pago en cajero automático",
  credit_card: "Pago con tarjeta de crédito",
  debit_card: "Pago con tarjeta de débito",
  prepaid_card: "Pago con tarjeta prepago",
  digital_currency: "Compras con Mercado Crédito",
  digital_wallet: "Paypal",
  voucher_card: "Beneficios Alelo, Sodexo",
  crypto_transfer: "Pago con criptomonedas",
};
