# AlticeLabsCaseStudy

## Run instructions

1. Change the `apiUrl` value in `src/environments/environment.ts` to the `crudcrud` endpoint.
2. Execute the `app.ps1` powershell script which builds and starts the container in detached mode.
3. Navigate to `localhost:4200`.

Note: missing nginx configuration to serve single page applications (redirect to index.html) therefore page refresh is not functional.