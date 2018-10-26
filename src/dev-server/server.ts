
import 'reflect-metadata';
import { Server } from '../index';
import { Api1 } from './api1.route';
import { Service1 } from './test.service';

@Server({ debug: true, routes: [Api1], providers: [Service1] })
class TestServer {}

