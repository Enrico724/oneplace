import React, { createContext, useState } from 'react';
import { ModelFile } from '@/openapi';

export const SelectedFileContext = createContext<{
    selectedFile: ModelFile | null;
    setSelectedFile: React.Dispatch<React.SetStateAction<ModelFile | null>>;
}>({
    selectedFile: null,
    setSelectedFile: () => {},
});

export const SelectedFileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [selectedFile, setModelFile] = useState<ModelFile | null>(null);

    return (
        <SelectedFileContext.Provider value={{ selectedFile, setSelectedFile: setModelFile }}>
            {children}
        </SelectedFileContext.Provider>
    );
};
