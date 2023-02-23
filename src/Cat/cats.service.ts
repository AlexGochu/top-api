import { Injectable } from '@nestjs/common';
import { ModelType, DocumentType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { Cat } from './cats.model';
import { CreateCatDto } from './dto/create-cat.dto';

@Injectable()
export class CatsService {
	constructor(@InjectModel(Cat) private readonly catModel: ModelType<Cat>) {}

	async create(createCatDto: CreateCatDto): Promise<Cat> {
		const createdCat = new this.catModel(createCatDto);
		return createdCat.save();
	}

	async findAll(): Promise<Cat[] | null> {
		return this.catModel.find().exec();
	}

	async delete(id: string): Promise<DocumentType<Cat> | null> {
		return this.catModel.findByIdAndDelete(id).exec();
	}
}
