#!/usr/bin/env node

import fs from 'fs-extra';
import chalk from 'chalk';
import { resolve, dirname } from 'path';
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const errorNoPathName = `
Please specify the project directory
  yarn create blash - app ${chalk.green('<project-directory>')}

For example:
  yarn create blash - app ${chalk.green('my-blash-app')}
`;

const errorExistPath = (pathname) => `
${chalk.red(pathname)} already exists and is not empty
`;

const succeedCreate = (pathname) => `
Project created successfully! at ${chalk.green(pathname)}

cd ${pathname}
yarn install
`;

try {
  const pathname = process.argv[2];

  if (!pathname) {
    throw new Error(errorNoPathName);
  }

  const resolvedPathname = resolve(process.cwd(), pathname);
  const exist = await fs.pathExistsSync(resolvedPathname);

  if (exist) {
    throw new Error(errorExistPath(resolvedPathname));
  }

  await fs.mkdirpSync(resolvedPathname);
  await fs.copySync(resolve(__dirname, '../template'), resolvedPathname);

  console.log(succeedCreate(pathname));
} catch (p) {
  console.log(p.message);
}