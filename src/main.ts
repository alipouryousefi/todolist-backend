import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  if (process.env.NODE_ENV === 'development') {
    app.enableCors({
      origin: true, // Allow all origins in development
      credentials: true,
    });
  } else {
    // Use strict configuration in production
  }

  const config = new DocumentBuilder()
    .setTitle('Todo API')
    .setDescription('The Todo Api description')
    .addTag('todo')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);
  

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
