// utils
import { connectToDB } from '@utils/database';
// models
import Prompt from '@models/prompt';
// import { NextResponse, nextUrl, NextRequest } from 'next/server';

// ----------------------------------------------------------------

export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const prompts = await Prompt.find({ creator: params.id }).populate('creator');

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response('Faild to fetch all prompts', { status: 500 });
  }
};
