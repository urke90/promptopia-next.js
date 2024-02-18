// utils
import { connectToDB } from '@utils/database';
// models
import Prompt from '@models/prompt';

// ----------------------------------------------------------------

export const GET = async (req, { params }) => {
  try {
    await connectToDB();

    const prompt = await Prompt.findById(params.id).populate('creator');
    if (!prompt) return new Response('Prompt not found', { status: 404 });

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response('Faild to fethc all prompts', { status: 500 });
  }
};

export const PATCH = async (req, { params }) => {
  const { prompt, tag } = await req.json();

  try {
    await connectToDB();

    const existingPromt = await Prompt.findById(params.id);
    if (!existingPromt) return new Response('Prompt not found', { status: 404 });

    existingPromt.prompt = prompt;
    existingPromt.tag = tag;

    await existingPromt.save();

    return new Response(JSON.stringify(existingPromt), { status: 200 });
  } catch (error) {
    console.log('errorrrrrrrrrrrrrrrrrrrrrrrr', error);
    return new Response('Faild to update the prompt', { status: 500 });
  }
};

export const DELETE = async (req, { params }) => {
  try {
    await connectToDB();

    await Prompt.findByIdAndDelete(params.id);

    return new Response('Prompt deleted sucessfully', { status: 200 });
  } catch (error) {
    return new Response('Faild to delete the prompt', { status: 500 });
  }
};
