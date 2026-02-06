import type { IntlShape } from "react-intl"
import type { TreeDataNode } from 'antd';

export const getYesOrNo=(intl:IntlShape)=>{
    return [
        {label:intl.formatMessage({id:"global.yes"}),value:true},
        {label:intl.formatMessage({id:"global.no"}),value:false},
    ]
}
interface ITree {
    id:number,
    name:string,
    parentId?:number,
    children?:ITree[]
}
export function transformTreeData<T extends ITree>(list: T[]): TreeDataNode[] {
  const nodes = list.map(item => ({
    ...item,
    key: item.id,
  }))

  const nodeMap = new Map<number, TreeDataNode>()
  nodes.forEach(node => {
    nodeMap.set(node.id, {
      title:node.name,
      key: node.id,
    });
  });

  const roots: TreeDataNode[] = []

  nodes.forEach(node => {
    const newNode = nodeMap.get(node.id)!
    if (node.parentId != null) {
      const parent = nodeMap.get(node.parentId);
      if (parent) {
        parent.children = parent.children || [];
        parent.children.push(newNode);
      }
    } else {
      roots.push(newNode);
    }
  });

  return roots;
};