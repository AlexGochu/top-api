import { ReviewModel } from './../review/review.model/review.model';
import { CreateProductDto } from './dto/create-product.dto';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { FindProductDto } from './dto/find-product.dto';
import { ProductModel } from './product.model/product.model';

@Injectable()
export class ProductService {
	constructor(@InjectModel(ProductModel) private readonly productModle: ModelType<ProductModel>) {}


	async create(dto: CreateProductDto) {
		return this.productModle.create(dto);
	}

	async findById(id: string) {
		return this.productModle.findById(id).exec();
	}
	async deleteById(id: string) {
		return this.productModle.findByIdAndDelete(id).exec();
	}
	async updateById(id: string, dto: CreateProductDto) {
		return this.productModle.findByIdAndUpdate(id, dto, { new: true }).exec();
	}

	async findWithReviews(dto: FindProductDto) {
		return this.productModle.aggregate([
			{
				$match: {
					categories: dto.category
				}
			},
			{
				$sort: {
					_id: 1
				}
			},
			{
				$limit: dto.limit
			},
			{
				$lookup: {
					from: 'Review',
					localField: '_id',
					foreignField: 'productId',
					as: 'reviews'
				}
			},
			{
				$addFields: {
					reviewCount: { $size: '$reviews' },
					reviewAvg: { $avg: '$reviews.rating' }
				}
			}
		]).exec() as unknown as (ProductModel & { review: ReviewModel[], reviewCount: number, reviewAvg: number })[];
	}
}
