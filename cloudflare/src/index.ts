import { McpAgent } from 'agents/mcp';
import { env } from 'cloudflare:workers';

import type { BrowserEndpoint } from '@cloudflare/playwright';
import fs from '@cloudflare/playwright/fs';
import packageJSON from '../package.json';

import { endpointURLString } from '@cloudflare/playwright';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { createServerWithTools } from '../../src/server';
import common from '../../src/tools/common';
import console from '../../src/tools/console';
import dialogs from '../../src/tools/dialogs';
import files from '../../src/tools/files';
import keyboard from '../../src/tools/keyboard';
import navigate from '../../src/tools/navigate';
import network from '../../src/tools/network';
import pdf from '../../src/tools/pdf';
import screen from '../../src/tools/screen';
import snapshot from '../../src/tools/snapshot';
import tabs from '../../src/tools/tabs';
import type { Tool, ToolCapability } from '../../src/tools/tool';

const snapshotTools: Tool<any>[] = [
  ...common(true),
  ...console,
  ...dialogs(true),
  ...files(true),
  ...keyboard(true),
  ...navigate(true),
  ...network,
  ...pdf,
  ...snapshot,
  ...tabs(true),
];

const screenshotTools: Tool<any>[] = [
  ...common(false),
  ...console,
  ...dialogs(false),
  ...files(false),
  ...keyboard(false),
  ...navigate(false),
  ...network,
  ...pdf,
  ...screen,
  ...tabs(false),
];

type Options = {
  vision?: boolean;
  capabilities?: ToolCapability[];
};

export function createMcpAgent(endpoint: BrowserEndpoint, options?: Options): typeof McpAgent<typeof env, {}, {}> {
  const cdpEndpoint = typeof endpoint === 'string'
    ? endpoint
    : endpoint instanceof URL
      ? endpoint.toString()
      : endpointURLString(endpoint);

  const allTools = options?.vision ? screenshotTools : snapshotTools;
  const tools = allTools.filter(tool => !options?.capabilities || tool.capability === 'core' || options.capabilities.includes(tool.capability));

  fs.mkdirSync('/playwright-mcp', { recursive: true });

  const server = createServerWithTools({
    name: 'Cloudflare Playwright',
    version: packageJSON.version,
    tools,
    resources: [],
    browserName: 'chromium',
    userDataDir: '/playwright-mcp',
    cdpEndpoint,
  });

  return class PlaywrightMcpAgent extends McpAgent<typeof env, {}, {}> {
    // we can use a Server instead of a McpServer here
    // but we need to force it
    // @ts-expect-error server is not a McpServer, it's a Server (see https://github.com/cloudflare/agents/issues/187)
    server = server as McpServer;

    async init() {
      // do nothing
    }
  };
}
