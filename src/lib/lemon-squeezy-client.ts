import 'server-only'
import {getOrder} from "@lemonsqueezy/lemonsqueezy.js";
import { configureLemonSqueezy } from "@/config/lemonsqueezy";

export async function getOrderDetails(orderId: string) {

    configureLemonSqueezy();
    const order = await getOrder(orderId);
    return order;

}

