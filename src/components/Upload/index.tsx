import React, { ReactNode } from 'react';

import Dropzone, { Accept } from 'react-dropzone';
import { DropContainer, UploadMessage } from './styles';

interface UploadProps {
  onUpload: (...args: any[]) => any;
}

function Upload({ onUpload }: UploadProps): React.JSX.Element {
  function renderDragMessage(
    isDragActive: boolean,
    isDragRejest: boolean,
  ): ReactNode {
    if (!isDragActive) {
      return (
        <UploadMessage>Selecione ou arraste o arquivo aqui.</UploadMessage>
      );
    }

    if (isDragRejest) {
      return <UploadMessage type="error">Arquivo não suportado</UploadMessage>;
    }

    return <UploadMessage type="success">Solte o arquivo aqui</UploadMessage>;
  }

  return (
    <Dropzone
      // accept=".csv, application/vnd.ms-excel, text/csv"
      accept={{
        'application/vnd.ms-excel': [],
        'text/csv': [],
      }}
      onDropAccepted={files => onUpload(files)}
    >
      {({ getRootProps, getInputProps, isDragActive, isDragReject }): any => (
        <DropContainer
          {...getRootProps()}
          isDragActive={isDragActive}
          isDragReject={isDragReject}
        >
          <input {...getInputProps()} data-testid="upload" />
          {renderDragMessage(isDragActive, isDragReject)}
        </DropContainer>
      )}
    </Dropzone>
  );
}

export default Upload;
