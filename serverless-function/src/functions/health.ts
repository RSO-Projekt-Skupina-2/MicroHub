import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext
} from "@azure/functions";

export async function health(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {

  const start = Date.now();

  context.log("Health check invoked");

  const response: HttpResponseInit = {
    status: 200,
    jsonBody: {
      status: "ok",
      service: "microhub",
      component: "health-function",
      timestamp: new Date().toISOString()
    }
  };

  const duration = Date.now() - start;
  context.log(`Health check completed in ${duration} ms`);

  return response;
}

app.http("health", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler: health
});
