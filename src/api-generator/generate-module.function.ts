import { Route } from '../interfaces/route.interface';

export function generateModule(services: Route[]) {
    const serviceImports = services.map(service => {
        const name = service.config.name || service.constructorFunction.name;
        return { template: `import { ${name}Service } from './${name}.service';`, name: name + 'Service' };
    });
    return `
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
// Services
${serviceImports.map(imp => imp.template).join('\r\n')}

@NgModule({
    imports: [
        HttpClientModule
    ],
    providers: [
        ${serviceImports.map(imp => imp.name).join(',\r\n')}
    ]
})
export class ApiModule {}
`;
}
