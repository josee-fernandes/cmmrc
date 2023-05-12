import type { NextApiRequest, NextApiResponse } from 'next'
import Cors from 'cors'

import { Configuration, OpenAIApi } from 'openai'

// Initializing the cors middleware
// You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
const cors = Cors({
  methods: ['POST', 'GET', 'HEAD'],
})

const openaiConfig = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(openaiConfig)

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: Function
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Run the middleware
  await runMiddleware(req, res, cors)

  if (req.method === 'GET') {
    // Rest of the API logic
    res.json({ message: 'Hello Everyone!' })
  } else if (req.method === 'POST') {
    try {
      const { prompt } = req.body

      const response = await openai.createImage({
        prompt,
        n: 1,
        size: '1024x1024',
        response_format: 'b64_json',
      })

      const image = response.data.data[0].b64_json

      res.status(200).json({ photo: image })
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong' })
    }
  } else {
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '50mb',
    },
  },
}
