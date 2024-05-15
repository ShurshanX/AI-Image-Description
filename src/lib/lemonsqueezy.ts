'use server'
import {getOrder} from "@lemonsqueezy/lemonsqueezy.js";
import { configureLemonSqueezy } from "@/config/lemonsqueezy";

export async function getOrderDetails(orderId: number) {

    configureLemonSqueezy();
    const order = await getOrder(orderId);
    return order;

}

