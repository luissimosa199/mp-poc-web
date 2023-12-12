type PaymentMethod = {
  [key: string]: string;
};

export const paymentMethods: PaymentMethod = {
  pix: "Pago digital",
  account_money: "Pago con dinero en Mercado Pago",
  debin_transfer: "Débito directo de cuenta",
  ted: "Transferencia Electrónica (Brasil)",
  cvu: "Débito directo de CVU",
  pse: "Transferencia Electrónica (Colombia)",
  bank_transfer: "Transferencia",
  consumer_credits: "Crédito MP",
};
