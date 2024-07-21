import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  
  if (process.env.NODE_ENV === 'development') {
    app.enableCors({
      origin: 'http://localhost:3000',
      credentials: true,
    });
    const options = new DocumentBuilder()
    .setTitle('Your API')
    .setDescription('API description')
    .setVersion('1.0')
    .build();
    
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);
  } else {
    // app.enableCors({
    //   allowedHeaders: "*",
    //   origin: 'https://oneplace.lol',
    //   credentials: true,
    // });
  }
  
  await app.listen(3001);
}
bootstrap();