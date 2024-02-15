// utils
import { connectToDB } from '@utils/database';
// models
import Prompt from '@models/prompt';

// ----------------------------------------------------------------

export const GET = async () => {
  try {
    await connectToDB();

    const prompts = await Prompt.find({}).populate('creator');

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response('Faild to fethc all prompts', { status: 200 });
  }
};