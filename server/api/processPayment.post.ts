import Stripe from "stripe";
import type { H3Event } from "h3";

export default defineEventHandler(async (event: H3Event) => {
  const stripe = new Stripe(process.env.STRIPE_TEST_SECRET_KEY as string);
  try {
    // Cria a sessão de checkout
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'brl',
            product_data: {
              name: 'Mensagem por Telefone',
            },
            unit_amount: 2000, // Preço em centavos (R$20,00)
          },
          quantity: 1, 
        },
      ],
      mode: 'payment',
      success_url: 'http://localhost:3000/agendado', // URL de sucesso
      cancel_url: 'http://localhost:3000/agendamento', // URL de cancelamento
    });
    // Retorna o ID da sessão de checkout para o frontend
    return { id: session.id, pagadoStatus: session.payment_status };
  } catch (err) {
    console.error("Erro ao tentar processar pagamento:", err);
    return { error: "Erro ao processar o pagamento" }; // Retorna uma mensagem de erro
  }
});
