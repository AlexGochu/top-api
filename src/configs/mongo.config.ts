import { ConfigService } from '@nestjs/config';
import { TypegooseModuleOptions } from 'nestjs-typegoose';

export const getMongoConfig = async (configService: ConfigService): Promise<TypegooseModuleOptions> => {
	return {
		uri: getMongoString(configService),
		...getMongoOptions()
	};
};

const getMongoString = (configService: ConfigService) => {
	//return 'mongodb://nest:nest@localhost:27017/nest';

	//'mongodb://nest:nest@localhost:27017/?authSource=nest';
	// 'mongodb://' +
	// configService.get('MONGO_LOGIN') +
	// ':' +
	// configService.get('MONGO_PASSWORD') +
	// '@' +
	// configService.get('MONGO_HOST') +
	// ':' +
	// configService.get('MONGO_PORT') +
	// '/?authSource=' +
	// configService.get('MONGO_AUTHDATABASE');
	return 'mongodb://' +
		configService.get('MONGO_LOGIN') +
		':' +
		configService.get('MONGO_PASSWORD') +
		'@' +
		configService.get('MONGO_HOST') +
		':' +
		configService.get('MONGO_PORT') +
		'/' +
		configService.get('MONGO_AUTHDATABASE');
};
const getMongoOptions = () => ({
	useNewUrlParser: true,
	//useCreateIndex: true,
	useUnifiedTopology: true,
	//useFindAndModify: false,
});
