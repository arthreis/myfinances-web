import React from 'react';

import { FiTrash } from 'react-icons/fi';
import { Container, FileInfo } from './styles';

interface FileProps {
  name: string;
  readableSize: string;
}

interface FileListProps {
  files: FileProps[];
  onDelete?: (props: any) => void;
}

function FileList({ files, onDelete }: FileListProps): React.JSX.Element {
  return (
    <Container>
      {files.map(uploadedFile => (
        <li key={uploadedFile.name}>
          <FileInfo>
            <div>
              <strong>{uploadedFile.name}</strong>
              <span>{uploadedFile.readableSize}</span>
            </div>
            <div>
              <FiTrash
                size={20}
                onClick={() => onDelete && onDelete(uploadedFile)}
              />
            </div>
          </FileInfo>
        </li>
      ))}
    </Container>
  );
}

export default FileList;
