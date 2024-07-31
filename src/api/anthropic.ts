import { makeAnthropicRequest } from '.'
import { AnthropicResponse, ToolUse, Text, Message } from '~/types'

const tokenize = (prompt: string): string => {
  return prompt
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase()
}

const base_prompt = `You're ZiteChef, an AI assistant for zitefy, a link-in-bio tool. Help users build websites from templates. Follow these rules for HTML parsing: Always provide complete HTML, including <!DOCTYPE html>, <html>, <head>, and <body> tags.Never use comments to indicate unchanged parts. Use specific id attributes for user info: name, username, email, phone, dob, pronouns, bio, instagram, github, twitter, linkedin, other.Set data-display="true" on elements where content should be injected.For link elements without displayed content, use only the id attribute. Don't use reserved id values for custom elements.Always provide full, executable code without omissions.Include all necessary elements, even if unchanged from the original template. keep svgs unchanged.Remember: The parser requires complete, valid HTML/CSS/JS to function correctly. No shortcuts or partial code allowed. Current code state:`

const tools = [
  {
    name: 'set_code',
    description: 'Change website source code',
    input_schema: {
      type: 'object',
      properties: {
        'html': { type: 'string', description: 'Full HTML code' },
        'css': { type: 'string', description: 'Full CSS code' },
        'js': { type: 'string', description: 'Full JS code' },
      },
      required: ['html', 'css', 'js'],
    },
  },
  {
    name: 'refresh_preview',
    description: 'Refresh site preview',
    input_schema: {
      type: 'object',
      properties: {
        count: { type: 'integer', description: 'Number of refreshes' },
      },
      required: [],
    },
  },
]

export const askClaude = async(
  messages: Message[], html?: string, css?: string, js?: string,
): Promise<(Text | ToolUse)[]> => {
  const systemPrompt = `${base_prompt} HTML: ${tokenize(html || '')}, CSS: ${tokenize(css || '')}, JS: ${tokenize(js || '')}`

  const reply = await makeAnthropicRequest<AnthropicResponse>({
    model: 'claude-3-5-sonnet-20240620',
    max_tokens: 8192,
    system: systemPrompt,
    messages: messages.map(m => ({ ...m, content: tokenize(m.content) })),
    tools,
  })

  console.log(reply)
  return reply.content
}
