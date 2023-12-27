import { useContext } from 'react';

import { FolderInterface } from '@/types/folder';

import Folder from '@/components/common/folder';

import PromptsContext from '../prompts.context';
import { TemplateComponent } from './template-component';

import { useFolders } from '@/providers/folders';
import { useTemplates } from '@/providers/templates';

export const TemplateFolders = () => {
  const { folders } = useFolders();

  const { updateTemplate, selectedTemplate } = useTemplates();

  const {
    state: { searchTerm, filteredPrompts },
  } = useContext(PromptsContext);

  const handleHighlight = (folder: FolderInterface) => {
    if (selectedTemplate) {
      updateTemplate({
        ...selectedTemplate,
        folderId: folder.id,
      });
    }
  };

  const Folders = (currentFolder: FolderInterface) =>
    filteredPrompts
      .filter((p) => p.folderId)
      .map((prompt, index) => {
        if (prompt.folderId === currentFolder.id) {
          return (
            <div
              key={index}
              className="ml-5 gap-2 border-l border-theme-button-border-light dark:border-theme-button-border-dark pl-2"
            >
              <TemplateComponent template={prompt} />
            </div>
          );
        }
      });

  return (
    <div className="flex w-full flex-col pt-2">
      {folders
        .filter((folder) => folder.type === 'prompt')
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((folder, index) => (
          <Folder
            key={index}
            searchTerm={searchTerm}
            currentFolder={folder}
            handleHighlight={handleHighlight}
            folderComponent={Folders(folder)}
          />
        ))}
    </div>
  );
};
