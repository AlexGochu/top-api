import { ModelOptions, prop, Severity } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export enum TopLevelCategory {
	Courses,
	Services,
	Books,
	Products
}
export class HhData {
	@prop()
	countNumber: number;

	@prop()
	juniorSalary: number;

	@prop()
	middleSalary: number;

	@prop()
	seniorSalary: number;
}
export class TopPageAdvantage {
	@prop()
	title: string;

	@prop()
	description: string;
}



export interface TopPageModel extends Base {}
@ModelOptions({
	schemaOptions: { timestamps: true },
	options: { allowMixed: Severity.ALLOW }
})
export class TopPageModel extends TimeStamps {
	@prop({ enum: TopLevelCategory })
	firstCategory: TopLevelCategory;

	@prop()
	secondCategory: string;

	@prop()
	alias: string;

	@prop()
	title: string;

	@prop()
	cateogory: string;

	@prop({ type: () => HhData })
	hh?: HhData;

	@prop({ type: () => [TopPageAdvantage] })
	advantages: TopPageAdvantage[];

	@prop()
	seoText: string;

	@prop()
	tagsTitle: string;

	@prop(() => [String])
	tags: string[];
}
