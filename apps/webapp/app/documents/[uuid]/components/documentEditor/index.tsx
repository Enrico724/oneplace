import { Editor, EditorContent, useEditor } from '@tiptap/react';
import Highlight from '@tiptap/extension-highlight'
import Typography from '@tiptap/extension-typography'
import StarterKit from '@tiptap/starter-kit';

import './index.scss';

type DocumentEditorProps = {
    uuid: string;
};

const DocumentEditor = ({ uuid }: DocumentEditorProps) => {
    const editor = useEditor({ 
        extensions: [
            StarterKit,
            Highlight,
            Typography,
        ], 
        content: ``
    })

    return (
       <EditorContent
            className='h-screen'
            editor={editor}
            value={''}
        />
    );
};

export {
    DocumentEditor,
};