import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../utils/mongodb';

export async function GET() {
  const { db } = await connectToDatabase();
  const items = await db.collection('items').find({}).toArray();
  return NextResponse.json({ data: items });
}

export async function POST(req) {
  const { db } = await connectToDatabase();
  const body = await req.json();
  const result = await db.collection('items').insertOne(body);
  return NextResponse.json({ data: result.ops[0] });
}
