// Copyright IBM Corp. and LoopBack contributors 2019. All Rights Reserved.
// Node module: @loopback/example-greeting-app
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {inject, service} from '@loopback/core';
import {get, param, Request, response, ResponseObject, RestBindings} from '@loopback/rest';
import {
  GreetingService
} from '../services';
import {Message} from '../types';

const GREETING_RESPONSE: ResponseObject = {
  description: 'Ping Response',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        title: 'GreetingResponse',
        properties: {
          timestamp: {type: 'string'},
          language: {type: 'string'},
          greeting: {type: 'string'},
          headers: {
            type: 'object',
            properties: {
              'Content-Type': {type: 'string'},
            },
            additionalProperties: true,
          },
        },
      },
    },
  },
};

/* istanbul ignore file */
export class GreetingController {
  constructor(
    @service(GreetingService) private greetingService: GreetingService,
    @inject(RestBindings.Http.REQUEST) private request: Request,
  ) { }

  @get('/greet/{name}')
  @response(200, GREETING_RESPONSE)
  async greet(@param.path.string('name') name: string): Promise<Message> {
    console.log('inside the Greet option')
    const language: string =
      this.request.acceptsLanguages(['en', 'zh']) || 'en';
    const greeting = await this.greetingService.greet(language, name);
    console.log('inside the Greet option => ', greeting)
    return {
      timestamp: new Date(),
      language,
      greeting,
    };
  }
}
