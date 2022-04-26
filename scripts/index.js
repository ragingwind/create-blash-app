import 'zx/globals'
import { echo } from 'zx/experimental'
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const errorNoPathName = `
Please specify the project directory
  yarn create blash - app ${chalk.green('<project-directory>')}

For example:
  yarn create blash - app ${chalk.green('my-blash-app')}
`;

const errorExistPath = (pathname) => `
${chalk.red(pathname)} already exists and is not empty
`;

try {
  let pathname = argv._[0];

  if (!pathname) {
    throw new Error(errorNoPathName);
  }

  let resolvedPathname = path.resolve(process.cwd(), pathname);

  let exist = await fs.pathExistsSync(resolvedPathname);

  if (exist) {
    // echo(errorExistPath(resolvedPathname));
    // await quiet($`exit 1`);
    throw new Error(errorExistPath(resolvedPathname));
  }

  // await fs.mkdirpSync(resolvedPathname);
  await fs.copySync(path.resolve(__dirname, '../template'), resolvedPathname);
} catch (p) {
  echo(p.message);
}