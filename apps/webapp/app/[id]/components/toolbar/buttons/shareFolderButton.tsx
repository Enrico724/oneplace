import { Button } from 'flowbite-react';
import React from 'react';
import { HiOutlineShare } from 'react-icons/hi2';

interface ShareFolderButtonProps {
    folderId: string;
}

const ShareFolderButton: React.FC<ShareFolderButtonProps> = ({ folderId }) => {
    const handleShare = () => {
        // Implement the logic for sharing the folder
    };

    return (
        <Button onClick={handleShare}>
            <HiOutlineShare className='h-6 w-6' />
        </Button>
    );
};

export default ShareFolderButton;