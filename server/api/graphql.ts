import { getGraphQLParameters, processRequest, renderGraphiQL, sendResult, shouldRenderGraphiQL } from "graphql-helix";
import { application } from "../graphql/index";
import { useQuery, useBody, useMethod, isMethod } from 'h3'

export default async (req, res) => {

    // only read body param on POST request - workaround because useBody returns an error on GET request
    let body = { query: '' }
    if (isMethod(req, 'POST')) {
        body = await useBody(req)
    }

    const request = {
        body: body || '',
        headers: req.headers,
        method: req.method,
        query: body.query || '',
    };

    if (shouldRenderGraphiQL(request)) {
        return renderGraphiQL({ endpoint: "/api/graphql" })
    } else {
        const { operationName, query, variables } = getGraphQLParameters(request);

        const result = await processRequest({
            operationName,
            query,
            variables,
            request,
            schema: application.schema,
            execute: application.createExecution(),
            subscribe: application.createSubscription(),
        });


        sendResult(result, res);
    }
}