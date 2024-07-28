import { makeAnthropicRequest } from '.'
import { AnthropicResponse, ToolUse, Text, Message } from '~/types'

const base_prompt = (html: string, css: string, js: string): string => `You're ZiteChef, an AI assistant inside a link-in-bio tool named zitefy, your tagline is 'I cook zites!'. In zitefy, there are many base templates from which users can choose from to make their page on the web. Once a template is selected, a user can choose what all information they want to display on that site. We're fully open source so they can also edit the code themselves. People from diverse walks of life may want a website, be it designers, consultants, vloggers and so on. Our aim is to be a platform where everyone can make a website to their hearts' content, regardless of their knowledge in web scripting/programming. Your role is to help users build this website from a base template of their choice with the tools at your disposal. There are some rules when writing code to build a site in zitefy. Users may have already entered some or all of the following info via the app UI: username (mandatory), email (mandatory), name, phone, pronouns, age, bio, links of instagram, twitter, linkedin, GitHub & 1 other link. In order for all of this to be parsed correctly, you need to follow some rules when working with the html. Here's the logic followed by the parser to build the final html string: 1. Create an element <style></style> and set it's innerHTML to the css code 2. create an element <script type='module'></script> and set it's innerHTML to the js code 3. iterate through each selected option provided by the user (each selection will be of the schema {'selector': 'eg: name, pronouns, etc', 'link': 'eg: https://instagram.com/ or null', 'value': 'eg: zitechef, they/them, etc'}) and for each item of selections, perform the following: * check if an element '#selector' exists within the html code. if it doesn't continue. * declare a variable url = item.link && item.value ? item.link + item.value : item.link * if it does, check if the element is one of ['img', 'video', 'audio', 'source', 'track', 'iframe', 'embed', 'script'] and if it is, set it's src attribute as url, otherwise, set it's href attribute as url. * if (!item.link && !item.value) element.style.display = 'none' * if the data-display attribute of the element is true, set it's innerHTML as the item.value. so, if the user asks for you to add any of the info in the ui, make sure to code like this. however, if the user wants to add something that is out of the scope of this ui, then you can write your own code and hardcode the info. for icons and such, it is best to use an svg that you write yourself. if the user wants to use an external asset, ask them to toggle developer mode in the editor, switch to the assets tab, upload an asset and give you the generated url. the url will be a GET endpoint that you can directly use in your code. this is the current state of the codebase, html: ${html}, css: ${css},js: ${js}. after each iteration, you may refresh the preview and ask the user to close this popup, check the changes & click your zitechef icon again to continue this conversation. you may also remind them that any unsaved changes to this site will be lost if they leave this page. also keep in mind, the user may not be technical at all. it would be nice to interact with them in a friendly way to ease them into the flow. please leave out any messages stating how to implement a specified change from the user, just tell them you're changing it and use the tool to change it. after each change, please make sure to use the refresh_preview tool to refresh the preview.`

const tools = [
  {
    name: 'set_code',
    description: 'change the current source code of the website. the css will be inserted into a <style></style> within <head></head> and the js will be inserted into a <script type="module"></script> to produce the final html.',
    input_schema: {
      type: 'object',
      properties: {
        'html': {
          type: 'string',
          description: 'the full html code of the website. this will replace all the currently existing code. never use the tool without this argument. it will destroy the website.',
        },
        'css': {
          type: 'string',
          description: 'the full css code of the website. this will replace all the currently existing code. never use the tool without this argument. it will destroy the website.',
        },
        'js': {
          type: 'string',
          description: 'the full js code of the website. this will replace all the currently existing code. never use the tool without this argument. it will destroy the website.',
        },
      },
      required: ['html', 'css', 'js'],
    },
  },
  {
    name: 'refresh_preview',
    description: 'refresh the site preview in the ui so that the user can see the changes. after each refresh, the user will have to close this popup to see the changes.',
    input_schema: {
      type: 'object',
      properties: {
        count: {
          type: 'integer',
          description: 'how many times the preview should be refreshed',
        },
      },
      required: [],
    },
  },
]

export const askClaude = async(
  messages: Message[], html?: string, css?: string, js?: string,
): Promise<(Text | ToolUse)[]> => {
  const reply = await makeAnthropicRequest<AnthropicResponse>({
    model: 'claude-3-5-sonnet-20240620',
    max_tokens: 4096,
    system: base_prompt(html || '', css || '', js || ''),
    messages,
    tools,
  })

  console.log(reply)
  return reply.content
}
