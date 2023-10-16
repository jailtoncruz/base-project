import { RenderModule } from '@jailtoncruz/nest-next';
import { Module } from '@nestjs/common';
import Next from 'next';

@Module({
  imports: [
    RenderModule.forRootAsync(
      Next({
        dev: process.env.NODE_ENV !== 'production',
      }),
      {
        viewsDir: null,
        dynamicRoutes: [],
        passthrough404: true,
      },
    ),
  ],
})
export class NextJSModule {}
