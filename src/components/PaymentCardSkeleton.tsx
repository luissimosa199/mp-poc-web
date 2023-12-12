import React from "react";

const PaymentCardSkeleton = () => {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm w-full max-w-lg mx-4 mb-4 bg-gray-300 animate-pulse">
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="text-2xl font-semibold leading-none tracking-tight text-black flex gap-2">
          ID:{" "}
          <div className="bg-gray-100 rounded-md animate-pulse h-6 w-40 "></div>
        </h3>
        <p className="text-sm text-gray-600 flex gap-2">
          <span>Estatus: </span>
          <span className="bg-gray-100 rounded-md animate-pulse h-4 w-12"></span>
        </p>
      </div>
      <div className="p-6">
        <p className="text-black flex gap-2 items-center">
          <span className="font-bold">Monto:</span>
          <span className="bg-gray-100 rounded-md animate-pulse h-4 w-12"></span>
        </p>
        <p className="text-black flex gap-2 items-center">
          <span className="font-bold">Fecha:</span>{" "}
          <span className="bg-gray-100 rounded-md animate-pulse h-4 w-72 "></span>
        </p>
        <p className="text-black flex gap-2 items-center">
          <span className="font-bold">Descripción:</span>{" "}
          <span className="bg-gray-100 rounded-md animate-pulse h-4 w-40 "></span>
        </p>
        <p className="text-black flex gap-2 items-center">
          <span className="font-bold">Medio de pago:</span>{" "}
          <span className="bg-gray-100 rounded-md animate-pulse h-4 w-40 "></span>
        </p>
      </div>
    </div>
  );
};

export default PaymentCardSkeleton;
