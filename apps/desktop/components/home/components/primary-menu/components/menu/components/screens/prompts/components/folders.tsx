import { useContext } from 'react';

import { FolderInterface } from '@/types/folder';

import Folder from '@/components/common/folder';

import SystemPromptsContext from '../system-prompts.context';
import { SystemPromptComponent } from './prompt-component';

import { useFolders } from '@/providers/folders';
import { useSystemPrompts } from '@/providers/system-prompts';

export const SystemPromptFolders = () => {
  const { folders } = useFolders();

  const { updateSystemPrompt, selectedSystemPrompt } = useSystemPrompts();

  const {
    state: { searchTerm, filteredSystemPrompts },
  } = useContext(SystemPromptsContext);

  const handleHighlight = (folder: FolderInterface) => {
    if (selectedSystemPrompt) {
      const updatedPrompt = {
        ...selectedSystemPrompt,
        folderId: folder.id,
      };

      updateSystemPrompt(updatedPrompt);
    }
  };

  const Folders = (currentFolder: FolderInterface) =>
    filteredSystemPrompts
      .filter((p) => p.folderId)
      .map((systemPrompt, index) => {
        if (systemPrompt.folderId === currentFolder.id) {
          return (
            <div
              key={index}
              className="ml-5 gap-2 border-l border-theme-button-border-light dark:border-theme-button-border-dark pl-2"
            >
              <SystemPromptComponent systemPrompt={systemPrompt} />
            </div>
          );
        }
      });

  return (
    <div className="flex w-full flex-col pt-2">
      {folders
        .filter((folder) => folder.type === 'system_prompt')
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
