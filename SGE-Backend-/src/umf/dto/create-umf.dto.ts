import { IsNotEmpty, IsNumber, IsOptional, IsString, Length } from "class-validator";

export class CreateUmfDto {
    @IsNumber()
    @IsOptional()
    id_umf:number;

    @IsNumber()
    @IsNotEmpty()
    @Length(1, 2)
    cve_delegacion_imss:number;

    @IsString()
    @IsNotEmpty()
    @Length(2, 30)
    des_delegacion_imss:string;

    @IsString()
    @IsNotEmpty()
    @Length(2, 20)
    cve_presupuestal:string;

    @IsString()
    @IsNotEmpty()
    @Length(2, 60)
    unidad_medica:string;
}
