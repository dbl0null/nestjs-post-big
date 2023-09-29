import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';
import { diskStorage } from 'multer';
import { v4 } from 'uuid';
import { extname } from 'path';

@ApiTags('file')
@Controller()
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @ApiOperation({
    summary:
      'Возвращает простейшую HTML форму, позволяющую прикрепить один файл большого размера и отправить его на сервер с помощью метода POST',
  })
  @ApiResponse({ status: 200, description: 'HTML Форма' })
  @Get()
  getPostForm(): string {
    return this.fileService.getPostForm();
  }

  @ApiOperation({
    summary:
      'Принимает POST форму, содержащую поле file, содержимое которого сохраняется в папке uploads со слючайно сгенерированным именем и исходным расширением',
  })
  @ApiResponse({ status: 200, description: 'HTML Форма' })
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: 'uploads',
        filename: function (req, file, cb) {
          console.log(file);
          cb(null, `${Date.now()}-${v4()}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    return this.fileService.getPostForm();
  }
}
