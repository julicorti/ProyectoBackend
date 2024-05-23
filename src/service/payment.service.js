import stripePackage from 'stripe';

const stripe = stripePackage(process.env.STRIPE_SECRET_KEY);

const createCharge = async (token) => {
    try {
        const charge = await stripe.charges.create({
            amount: 5000, // el monto en centavos, por ejemplo, $50.00
            currency: 'usd',
            description: 'Ejemplo de cargo',
            source: token,
        });
        return charge;
    } catch (error) {
        throw new Error(error.message);
    }
};

export default {
    createCharge
};
