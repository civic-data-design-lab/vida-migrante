# Ecuador Migrant Integration Project

Project description. Check in later for updates.

## Project Details

This project was created with [SvelteKit](https://kit.svelte.dev/). A full
Svelte tutorial can be found [here](https://svelte.dev/tutorial/basics).

## Project Structure

Below is a simplified view of the project directories
```
ecuador-integration/
├ src/
│ ├ lib/
│ │ ├ assets/ 
│ │ │ ├ game-files/
│ │ │ └ images/
│ │ ├ components/ 
│ │ ├ stores/ 
│ │ └ utils/
│ ├ routes/
│ │ └ [your routes]
│ └ app.html
├ static/
│ └ [your static assets]
├ package.json
├ svelte.config.js
├ jsconfig.json
└ vite.config.js
```

Some key points:
* 📄 **Pages** and **layouts** can be found in the [`routes/`](src/routes/)
  directory. These are indicated as `+page.svelte` and `+layout.svelte`
  respectively. For example, the page found at the route `/game` game be found
  in `routes/game/+page.svelte`.
* 🖼️ General **assets** can be found in [`lib/assets/`](src/lib/assets/)
  directory.
  * You can find **game files** such as the card definitions under the
   [`lib/assets/game-files/`](src/lib/assets/game-files/) directory
   (`$gameFiles` alias).
  * **Images** can be found in the [`lib/assets/images/`](src/lib/assets/images/)
    directory (`$images` alias).
* 🟧 "Generic" **components** can be found in the
  [`lib/components/`](src/lib/components/) directory (`$components` alias).
  These are components that may be used in many different pages.  
* 🏪 **Stores** can be found in the [`lib/stores/`](src/lib/stores/) directory.
  The game data store can specifically be found at the alias `$gameData`.
* 🔧 **Utilities**, such as type definitions and generic function definitions
  can be found in the [`lib/utils/`](src/lib/utils/) directory. Type definitions
  can be found at the alias `$types`. 

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
section to view this preview. The live preview can also be found permanently
[here](https://ecuador-integration-git-develop-cddl.vercel.app/). 

To deploy to **production** (the live website), use the following steps:

1. Make sure you are still on the **`develop`** branch.
2. Make sure you do not have any unstashed or uncommitted changes in your local
   workspace (either commit your changes or stash them with `git stash`).
3. This project uses [semantic versioning](https://semver.org/) to add
   "checkpoints" and understand what kind of changes are being made.
   * Decide which version type (`major`, `minor`, `patch`) you believe best
   describes the changes made in the develop branch. For example, new features
   and functionality would affect the `minor` number, and bug fixes would affect
   the `patch` number. (`major` should only change if the website goes through a
   complete redesign; the major number will remain `0` until some "final" version
   is ready to present to clients).
   * Run `npm version <version-type>` to automatically change the version and
     push a new commit and tag to the develop branch.
4. Create a [Pull
   Request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request)
   (PR) from the develop branch.
   * Feel free to add any description, though the title of the PR should be
   the new version number.
   * Merge the pull request. 
5. (Optional) Create a [release](https://docs.github.com/en/repositories/releasing-projects-on-github/managing-releases-in-a-repository).
   * In combination with semantic versioning, GitHub's releases can be helpful
     to see what changes have been made and add transparency to the development
     process.
   * Create a new release based off the corresponding tag that was automatically
     generated by `npm version` (step 3). Add a detailed description about what
     this release entailed and how it affects the website, or automatically
     generate release notes (see [step 8](https://docs.github.com/en/repositories/releasing-projects-on-github/managing-releases-in-a-repository#creating-a-release)).
