import express from "express";
import { PaymentApiRoutes } from "./infra/rest/payment-api.routes";
import { Env } from "./server.config";

const PaymentApi = express();
PaymentApi.use(express.json());
PaymentApi.use(express.urlencoded({ extended: true }));
PaymentApi.use('/payment-api', PaymentApiRoutes);

const PORT = Env.SERVER_PORT;
PaymentApi.listen(PORT, () => {
    console.log(`Server running on port ${ PORT }`);
});