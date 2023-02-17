# Ecuador Migrant Integration Project

Project description. Check in later for updates.

## Project Details

This project was created with [SvelteKit](https://kit.svelte.dev/). A full
Svelte tutorial can be found [here](https://svelte.dev/tutorial/basics).

## Development

Go through the following steps to get started developing:

0. Make sure you have [Node](https://nodejs.org/en/download/) installed and that
   you can run the `npm` command in your terminal.
1. [Clone](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository)
   the repository using `git clone` into your local workspace.
2. **IMPORTANT:** Switch to the **`develop` branch** before working (`git
checkout develop`). The `main` branch is only used for deployment.
3. Once you are in the project root directory, run `npm install` to install the
   dependencies.
4. Run the following command to start the development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

If everything works, you should be able to navigate to
http://localhost:5173 to see the website.

**Note:** To expose the localhost server to the internet (so you can test your
changes on your phone without having to redeploy), use the following steps.

0. Install the [`ngrok` CLI tool](https://ngrok.com/download). This tool creates
   a secure private tunnel to the cloud, giving you a publicly-accessible URL
   you can access from any device. Read more about `ngrok`
   [here](https://www.sitepoint.com/use-ngrok-test-local-site/).
1. Make sure your dev server is started as explained above.
   - If using VSCode, run the `Open tunnel` VSCode task (<kbd>Ctrl/⌘</kbd> +
     <kbd>Shift</kbd> + <kbd>P</kbd> > `Run Task` > `Open tunnel`).
   - You can otherwise run the command `ngrok http 5173`.

## Deployment

To deploy a **preview** of your changes, simply push your code to the `develop`
branch. On the GitHub repository, click "Preview" under the "Environments"
section to view this preview.

To deploy to **production** (the live website), you must create a pull request.
_Check in later for more details on this workflow_
