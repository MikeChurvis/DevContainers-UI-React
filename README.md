# DevContainers-UI-React

In March 2023 at the Python Atlanta (PyATL) meetup group, I will hold a talk on Dev Containers. The talk comes with a companion web app. This is the codebase for the app's frontend.

## Application Specs

The PyATL logo sits in the middle of the screen. Just above it is a label that says "Click Here", and points to the logo.

When the user clicks the logo, the "Click Here" label becomes a number, the number of times that the logo has been clicked by all users of the app.

## Development Environment

Dev Container

- Ubuntu
- Node
- GitHub CLI

## Deployment

This app is served by GitHub Pages. A GitHub Actions workflow drives the CI pipeline, which is summarized below.

1. Lint the project.
2. Build the app.
3. Run Playwright tests against the built app.
4. Force-delete and recreate the `deploy-me` branch, then push the built app to it.
5. Trigger the deployment job in the portfolio host repo (use this Action: https://github.com/marketplace/actions/trigger-external-workflow).

Deployment is performed elsewhere. The `MikeChurvis/Portfolio` repo hosts my portfolio at `mikechurvis.com/portfolio`; it pulls the `deploy-me` branch into a named subdirectory (e.g. `mikechurvis.com/portfolio/pyatl`) and serves it from there.

## Testing

Vitest performs unit tests on logical entities. Unit test files are kept adjacent to the entities they cover. For example, tests for the reducer function in `src/appState.ts` are in `src/appState.tests.ts`.

Storybook provides an isolated testbed for visual components and their configurations.

Playwright runs the executable specs for the app as a whole.

## Sources

Mock websocket connection:
https://wanago.io/2022/08/08/javascript-testing-mocking-websockets-mock-socket/

Create a fixture:
https://playwright.dev/docs/test-fixtures#creating-a-fixture

Bug in Node/ESM that forces Playwright to import TS files as JS:
https://stackoverflow.com/questions/74916601/cannot-find-module-x-imported-from-y-playwright-with-typescript

How to setup Express with TypeScript in Vite:
https://dev.to/kevinqtogitty/how-to-set-up-an-express-server-with-typescript-and-es6-import-statements-using-vite-9l6

Running two processes concurrently in a Node project:
https://medium.com/@anwesha_das/a-strongly-typed-create-react-app-with-an-express-api-server-44e2334ccc71#e344

## Musings
