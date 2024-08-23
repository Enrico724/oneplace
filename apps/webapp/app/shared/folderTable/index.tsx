import { Folder } from "@/openapi";
import { TreeTable } from 'primereact/treetable';
import { Column } from 'primereact/column';
import { TreeNode } from "primereact/treenode";
        

interface ContentTableProps {
  folders: Folder[];
  onAction: () => void;
}

function toTreeNode(folder: Folder  , index: string = '0'): TreeNode {
  return {
    key: index,
    label: folder.name,
    icon: 'pi',
    data: {   
      ...folder, 
      createdAt: new Date(folder.createdAt).toLocaleDateString(),
      qtyFolders: folder.subfolders.length, 
      qtyFiles: folder.files.length 
    },
    children: folder.subfolders.map((subFolder, subIndex) => toTreeNode(subFolder, `${index}-${subIndex}`)),
  }
}

export function FolderTable({ folders, onAction }: ContentTableProps) {
  const nodes = folders.map(folder => toTreeNode(folder));
  return (
    <TreeTable value={nodes} tableStyle={{ textAlign: 'left', minWidth: '50rem' }}>
      <Column field="name" header="Name" expander></Column>
      <Column field="createdAt" header="Created"></Column>
      <Column field="qtyFolders" header="Qty Folders"></Column>
      <Column field="qtyFiles" header="Qty Files"></Column>
    </TreeTable>    
  );
}
