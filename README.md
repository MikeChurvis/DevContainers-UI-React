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

- Playwright
