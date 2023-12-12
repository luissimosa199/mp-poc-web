import { paymentType } from "@/utils/PaymentType";
import { parseDate } from "@/utils/parseDate";
import { paymentMethods } from "@/utils/paymentMethods";
import { PaymentSearchResult } from "mercadopago/dist/clients/payment/search/types";
import React from "react";

const PaymentCard = ({ payment }: { payment: PaymentSearchResult }) => {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm w-full max-w-lg mx-4 mb-4">
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="text-2xl font-semibold leading-none tracking-tight text-black">
          ID: {payment.id}
        </h3>
        <p className="text-sm text-gray-600">
          Estatus: {payment.status === "approved" ? "Aprobado" : payment.status}
        </p>
      </div>
      <div className="p-6">
        <p className="text-black">
          <span className="font-bold">Monto:</span> $
          {payment.transaction_amount}
        </p>
        <p className="text-black">
          <span className="font-bold">Fecha:</span>{" "}
          <span>{parseDate(payment.date_approved as string)}</span>
        </p>
        <p className="text-black">
          <span className="font-bold">Tipo de pago:</span>{" "}
          <span>{paymentMethods[payment.payment_method_id as string]}</span>
        </p>
        <p className="text-black">
          <span className="font-bold">Descripción:</span>{" "}
          <span>{payment.description}</span>
        </p>
        <p className="text-black">
          <span className="font-bold">Medio de pago:</span>{" "}
          <span>{paymentType[payment.payment_method_id as string]}</span>
        </p>
      </div>
    </div>
  );
};

export default PaymentCard;
