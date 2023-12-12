import { parseDate } from "@/utils/parseDate";
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
          <span className="font-bold">Fecha aprobada:</span>{" "}
          <span>{parseDate(payment.date_approved as string)}</span>
        </p>
        <p className="text-black">
          <span className="font-bold">Tipo de pago:</span>{" "}
          <span>{payment.payment_type_id}</span>
        </p>
        <p className="text-black">
          <span className="font-bold">Description:</span>{" "}
          <span>{payment.description}</span>
        </p>
        <p className="text-black">
          <span className="font-bold">Medio de pago:</span>{" "}
          <span>{payment.payment_method_id}</span>
        </p>
      </div>
    </div>
  );
};

export default PaymentCard;
