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
