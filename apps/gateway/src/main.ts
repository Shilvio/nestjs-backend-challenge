import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const configService = app.get(ConfigService);
  
  const port = configService.get<number>('PORT') || 3000;

  // setup the the Swagger Documentation and enable the use of the JWT authentication in it
  const config = new DocumentBuilder()
    .setTitle('Backend Challenge API')
    .setDescription('The Gateway API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(port);
  
  console.log(`Gateway is listening on HTTP port ${port}`);
  console.log(`Swagger is available at: http://localhost:${port}/api`);
}
bootstrap();