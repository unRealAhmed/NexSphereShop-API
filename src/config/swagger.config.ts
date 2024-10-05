import { Express, Request, Response } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { version } from '../../package.json';

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'REST API Docs',
            version,
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: [
        './src/modules/**/*.ts',
        './src/validations/*.ts',
        './src/shared/types/*.ts',
        './documentation/*.yaml',
    ],
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app: Express, port: number) {
    // Swagger page
    app.use(
        '/docs',
        swaggerUi.serve,
        swaggerUi.setup(swaggerSpec, {
            swaggerOptions: {
                docExpansion: 'none',
                showExtensions: true,
                showCommonExtensions: true,
                displayOperationId: true,
                showRequestDuration: true,
                showCommonQueryParameters: true,
                showCommonHeaders: true,
                showTryItOut: true,
                useCompactRequest: true,
                useExamplesValues: true,
                useSubmitButton: true,
                useDownloadButton: true,
                useSaveButton: true,
                useClearButton: true,
                useCancelButton: true,
                useReDocTheme: true,
                reDocTheme: {
                    darkMode: true,
                    colors: {
                        primary: '#2196F3',
                        secondary: '#75757'
                    }
                }
            }
        })
    );

    // Docs in JSON format
    app.get('/docs.json', (req: Request, res: Response) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });

    console.log(`Docs available at http://localhost:${port}/docs`);
}

export default swaggerDocs;
