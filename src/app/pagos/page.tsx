"use client";

import PaymentCard from "@/components/PaymentCard";
import { PaymentSearchResult } from "mercadopago/dist/clients/payment/search/types";
import React from "react";
import useSWR, { Fetcher } from "swr";

const Pagos = () => {
  const fetcher: Fetcher<PaymentSearchResult[]> = (url: string) =>
    fetch(url).then((res) => res.json());
  const { data, isLoading } = useSWR(`api/mp`, fetcher, {
    refreshInterval: 1000,
  });

  return (
    <div>
      <header className="bg-blue-600 text-white w-full py-4 px-6 flex justify-center items-center mb-2">
        <h1 className="text-2xl font-bold">Pagos</h1>
      </header>
      {isLoading && <p>Cargando...</p>}
      {data && (
        <ul className="">
          {data.map((e) => {
            return (
              <li
                key={e.id}
                className="flex justify-center"
              >
                <PaymentCard payment={e} />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Pagos;
