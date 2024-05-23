import paymentService from '../service/payment.service.js';

const createCharge = async (req, res) => {
    try {
        const { stripeToken } = req.body;
        const charge = await paymentService.createCharge(stripeToken);
        res.send('¡Pago realizado con éxito!');
    } catch (error) {
        res.status(500).send(`Error: ${error.message}`);
    }
};

export default {
    createCharge
};
