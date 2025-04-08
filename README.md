## Cloudflare Playwright MCP

### Overview

This project leverages Playwright for automated browser testing and integrates with Cloudflare Workers for deployment.

### Build and Deploy

Follow these steps to set up and deploy the project:

1. Install dependencies:
```bash
npm ci
```

2. Deploy to Cloudflare Workers:

```bash
npx wrangler deploy
```

### Configure in Cloudflare Playground AI

![alt text](docs/imgs/playground-ai-screenshot.png)

[Cloudflare playground AI](https://playground.ai.cloudflare.com/) is a great way to test MCP servers using LLM models available in Workers AI.

- Navigate to https://playground.ai.cloudflare.com/
- Ensure model is set to `llama-3.3-70b-instruct-fp8-fast`
- In **MCP Servers**, set **URL** to https://cloudflare-playwright-mcp.rui-figueira.workers.dev/sse
- Click **Connect**
- Status should update to **Connected** and it should list 14 available tools

You can now start to interact with the model, and it will run necessary tools to accomplish what was requested.

> [!TIP]
> For best results, give simple instructions consisting of one single action, e. g., "Create a new todo entry", "Go to cloudflare site", "Take a screenshot"


Example of a conversation:

| Role | Message |
|------|---------|
| **User** | Go to demo.playwright.dev/todomvc |
| **Assistant** | *runs browser_navigate tool*<br> The page has been navigated to https://demo.playwright.dev/todomvc/. The page title is "React • TodoMVC". The page snapshot shows the content of the page, including a heading, a textbox, and several links. |
| **User** | Create some todo entry |
| **Assistant** |  *runs browser_type tool*<br> A new todo entry "Buy groceries" has been created. The page snapshot shows the updated content of the page, including the new todo entry. |
| **User** | Nice. Now create a todo in parrot style |
| **Assistant** | *runs browser_type tool*<br> A new todo entry "Polly wants a cracker" has been created in parrot style. The page snapshot shows the updated content of the page, including the new todo entry. |
| **User** | And create another todo in yoda style |
| **Assistant** | *runs browser_type tool*<br> A new todo entry "A walk, I must take" has been created in Yoda style. The page snapshot shows the updated content of the page, including the new todo entry. |
| **User** | Take a screenshot |
| **Assistant** | *runs browser_take_screenshot tool*<br> ![alt text](docs/imgs/todomvc-screenshot-1.png) A screenshot of the current page has been taken. The screenshot is in PNG format and is 56KB in size. |
| **User** | Now click the checkbox of the parrot todo entry |
| **Assistant** | *runs browser_clickt tool*<br> The checkbox of the parrot todo entry "Polly wants a cracker" has been clicked. The page snapshot shows the updated content of the page, with the checkbox now checked. |
| **User** | Take a screenshot |
| **Assistant** | *runs browser_take_screenshot tool*<br> ![alt text](docs/imgs/todomvc-screenshot-2.png) A screenshot of the current page has been taken. The screenshot is in PNG format and is 58KB in size. |
| **User** | Remove completed todo entries |
| **Assistant** | *runs browser_clickt tool*<br> The "Clear completed" button has been clicked. The page snapshot shows the updated content of the page, with the completed todo entry "Polly wants a cracker" removed. |
| **User** | Take a final screenshot |
| **Assistant** | *runs browser_take_screenshot tool*<br> ![alt text](docs/imgs/todomvc-screenshot-3.png) A final screenshot of the current page has been taken. The screenshot is in PNG format and is 50KB in size. |

### Configure in Claude Desktop

To integrate this project with Claude Desktop, use the following configuration:

1. Open the configuration file for Claude Desktop.
2. Add the following JSON snippet under the `mcpServers` section:

```json
{
  "mcpServers": {
    "cloudflare-playwright-mcp": {
      "command": "npx",
      "args": [
        "mcp-remote",
        "https://cloudflare-playwright-mcp.rui-figueira.workers.dev/sse"
      ]
    }
  }
}
```

3. Save the configuration file and restart Claude Desktop to apply the changes.

This setup ensures that Claude Desktop can communicate with the Cloudflare Playwright MCP server.

### Configure in VSCode Insiders

Install the Playwright MCP server in VS Code using one of these buttons:

<!--
// Generate using?:
const config = JSON.stringify({ name: 'cloudflare-playwright', type: 'sse', url: 'https://cloudflare-playwright-mcp.rui-figueira.workers.dev/sse' });
const urlForWebsites = `vscode:mcp/install?${encodeURIComponent(config)}`;
// Github markdown does not allow linking to `vscode:` directly, so you can use our redirect:
const urlForGithub = `https://insiders.vscode.dev/redirect?url=${encodeURIComponent(urlForWebsites)}`;
-->

[<img alt="Install in VS Code Insiders" src="https://img.shields.io/badge/VS_Code_Insiders-VS_Code_Insiders?style=flat-square&label=Install%20Server&color=24bfa5">](https://insiders.vscode.dev/redirect?url=vscode%3Amcp%2Finstall%3F%257B%2522name%2522%253A%2522cloudflare-playwright%2522%252C%2522type%2522%253A%2522sse%2522%252C%2522url%2522%253A%2522https%253A%252F%252Fcloudflare-playwright-mcp.rui-figueira.workers.dev%252Fsse%2522%257D)

Alternatively, you can install the Playwright MCP server using the VS Code CLI:

```bash
# For VS Code
code --add-mcp '{"name":"cloudflare-playwright","type":"sse","url":"https://cloudflare-playwright-mcp.rui-figueira.workers.dev/sse"}'
```

```bash
# For VS Code Insiders
code-insiders --add-mcp '{"name":"cloudflare-playwright","type":"sse","url":"https://cloudflare-playwright-mcp.rui-figueira.workers.dev/sse"}'
```

After installation, the Playwright MCP server will be available for use with your GitHub Copilot agent in VS Code.
