import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { ReviewController } from './review.controller';
import { ReviewModel } from './review.model/review.model';
import { ReviewService } from './review.service';

@Module({

	imports: [
		TypegooseModule.forFeature([{
			typegooseClass: ReviewModel,
			schemaOptions: {
				collection: 'Review'
			}
		}])
		//TypegooseModule.forFeature([ReviewModel])
	],
	controllers: [ReviewController],
	providers: [ReviewService]
})
export class ReviewModule {}
