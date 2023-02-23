import { TypegooseModule } from 'nestjs-typegoose';
import { Module } from '@nestjs/common';
import { Cat } from './cats.model';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Module({
	imports: [
		TypegooseModule.forFeature([
			{
				typegooseClass: Cat,
				schemaOptions: {
					collection: 'MyKitty',
				},
			},
		]),
	],
	controllers: [CatsController],
	providers: [CatsService],
})
export class CatsModule {}
