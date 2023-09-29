import { Injectable } from '@nestjs/common';

@Injectable()
export class FileService {
  getPostForm(): string {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Upload big file</title>
</head>
<body>
    <form method="post" enctype="multipart/form-data">
        <label for="file">File</label>
        <input id="file" name="file" type="file" />
        <button>Upload</button>
    </form>
</body>
</html>
`;
  }
}
