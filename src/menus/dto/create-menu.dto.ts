import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateMenuDto {
  @IsString()
  readonly category: string; //MenuCategory;
  @IsString()
  readonly name: string;
  @IsString()
  readonly description: string;
  @IsBoolean()
  readonly isSold: boolean;
  @IsString()
  readonly badge: string;
  @IsString() // ({each: true}) => []일때 모든 값의 타입이 맞는지 확인
  readonly items: string; //Item[];
  @IsString()
  readonly tags: string; //Tag[];
}
