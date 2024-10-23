import Stripe from "stripe";

export default defineEventHandler(async () => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
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
      success_url: 'http://localhost:3000/agendado?session_id={CHECKOUT_SESSION_ID}', // URL de sucesso
      cancel_url: 'http://localhost:3000/agendamento', // URL de cancelamento
    });
    // Retorna o ID da sessão de checkout para o frontend
    return { id: session.id };
  } catch (err) {
    console.error("Erro ao tentar processar pagamento:", err);
    return { error: "Erro ao processar o pagamento" }; // Retorna uma mensagem de erro
  }
});
