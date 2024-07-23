import { Given, When, Then } from '@cucumber/cucumber';
import ApiHelper from '../../helpers/apiHelper';

const restApiHelper = new ApiHelper('https://rickandmortyapi.com/api');
const graphqlApiHelper = new ApiHelper('https://rickandmortyapi.com/graphql');

interface CustomWorld {
    endpoint?: string;
    query?: string;
    response?: any;
    error?: any;
}

Given('I set the REST API endpoint to {string}', function (this: CustomWorld, endpoint: string) {
    this.endpoint = endpoint;
});

Given('I set the GraphQL query to:', function (this: CustomWorld, query: string) {
    this.query = query;
});

When('I send a GET request to the REST endpoint', async function (this: CustomWorld) {
    try {
        this.response = await restApiHelper.get(this.endpoint!);
    } catch (error: any) {
        this.error = error;
    }
});

When('I send a POST request to the GraphQL endpoint', async function (this: CustomWorld) {
    try {
        this.response = await graphqlApiHelper.post('', { query: this.query! });
    } catch (error: any) {
        this.error = error;
    }
});

Then('the response status code should be {int}', function (this: CustomWorld, statusCode: number) {
    if (this.response) {
        expect(this.response.status).toEqual(statusCode);
    } else if (this.error) {
        expect(this.error.status).toEqual(statusCode);
    } else {
        throw new Error('No response or error received');
    }
});

Then('the REST response should contain the following data:', function (this: CustomWorld, dataTable) {
    const expectedData = dataTable.rowsHash();
    const actualData = this.response ? this.response.data : this.error.data;
    Object.keys(expectedData).forEach(key => {
        const expectedValue = expectedData[key];
        const actualValue = actualData[key];

        // Parse the expected value to its appropriate type before comparison
        if (!isNaN(expectedValue as any)) {
            expect(actualValue).toEqual(parseFloat(expectedValue));
        } else {
            expect(actualValue).toEqual(expectedValue);
        }
    });
});

Then('the GraphQL response should contain the following data:', function (this: CustomWorld, dataTable) {
    const expectedData = dataTable.rowsHash();
    const data = this.response ? this.response.data.data : this.error.data.data;
    Object.keys(expectedData).forEach(key => {
        expect(data[key]).toEqual(JSON.parse(expectedData[key]));
    });
});

Then('the response latency should be below {int} milliseconds', function (this: CustomWorld, threshold: number) {
    const latency = this.response ? this.response.latency : this.error.latency;
    expect(latency).toBeLessThan(threshold);
});
