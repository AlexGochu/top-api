import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	Delete,
	HttpException,
	HttpStatus,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { Cat } from './cats.model';
import { CreateCatDto } from './dto/create-cat.dto';

@Controller('cats')
export class CatsController {
	constructor(private readonly catsService: CatsService) {}

	@Get()
	async getCats(): Promise<Cat[] | null> {
		return this.catsService.findAll();
	}

	@Post()
	async create(@Body() cat: CreateCatDto): Promise<Cat> {
		return this.catsService.create(cat);
	}
	@Delete(':id')
	async delete(@Param('id') id: string) {
		const deletedDoc = await this.catsService.delete(id);
		if (!deletedDoc) {
			throw new HttpException('REVIEW_NOT_FOUND', HttpStatus.NOT_FOUND);
		}
	}
}
