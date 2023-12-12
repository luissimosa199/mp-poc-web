type PaymentTypeMap = { [key: string]: string };

export const paymentType: PaymentTypeMap = {
  pix: "Pago digital",
  account_money: "Pago con dinero en Mercado Pago",
  debin_transfer: "Débito directo de cuenta",
  ted: "Transferencia Electrónica (Brasil)",
  cvu: "Débito directo de CVU",
  pse: "Transferencia Electrónica (Colombia)",
};
