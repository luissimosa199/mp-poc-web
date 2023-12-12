import MercadoPagoConfig, { Payment } from "mercadopago";

export async function POST(request: Request) {
  const data = await request.json();

  const client = new MercadoPagoConfig({
    accessToken: process.env.MP_ACCESS_TOKEN as string,
  });

  const payment = new Payment(client);

  const paymentHistory = await payment.search({
    options: {
      criteria: "desc",
      sort: "date_created",
    },
  });

  return Response.json("bien");
}

export async function GET() {
  const client = new MercadoPagoConfig({
    accessToken: process.env.MP_ACCESS_TOKEN as string,
  });

  const payment = new Payment(client);

  try {
    const paymentHistory = await payment.search({
      options: {
        criteria: "desc",
        sort: "date_created",
      },
    });

    const payments = paymentHistory.results?.map((e) => {
      return {
        id: e.id,
        status: e.status,
        transaction_amount: e.transaction_amount,
        date_approved: e.date_approved,
        payment_type_id: e.payment_type_id,
        description: e.description,
        date_created: e.date_created,
        notification_url: e.notification_url,
        payment_method_id: e.payment_method_id,
      };
    });

    return Response.json(payments);
  } catch (error) {
    return Response.json(
      { error: error },
      {
        status: 500,
        statusText: JSON.stringify(error),
      }
    );
  }
}
