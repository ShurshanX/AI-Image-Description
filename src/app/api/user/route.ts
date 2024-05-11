import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {

    return NextResponse.json(0,{ status: 200 });
}