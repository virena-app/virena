import { getNodeAtPath, getNodeKey, getParentKey, walk } from 'react-sortable-tree';
import getNthChildInfo from './getNthChildInfo.util';
/**
 * @param {number|string} parentKey - The key of the to-be parentNode of the node
 */
let ignoreCollapsed = true;


export const populateImg = function(image, selected, treeData) {
  if(selected) {
    console.log(`the selected title ${selected.subtitle}`)
    switch(selected.subtitle) {
      case 'BottomTab':
        console.log(`children ${selected.children}`);
        if(selected.children && selected.children.length) 
          return `${image}${selected.children.length}tab.png`;
      
      case 'Drawer':
        // check children exists, check if the first child is a bottomtabnav or a simple screen
        if(selected.children && selected.children.length) {
          if(selected.children[0].subtitle === 'BottomTab') 
            return `${image}/Tab-Drawer/${selected.children.length}TabDrawer.png`;
            
          return populateImg(image, selected.children[0])
        }
      
      case 'Simple Screen':
      // if(selected.children && selected.children.length) 
        // return `${image}/Screen/${selected.children.length}screen.png`;
        //trying to get the parent so i can access the children.length on the tree
        //selected.path === [0, 1];
        
        // if the selected component is Simple Screen, 
        const { parent, n } = getNthChildInfo(selected, treeData[0]);
        if(parent.subtitle === 'BottomTab') {
          return `${image}/Tab/${n}tab.png`;
        }
          // check what the subtitle (type) is 
            // if bottomtab
              // check the children
        
      case 'Stack':
        break;
      
      case 'Switch':
        return image += 'switch.png';
      
      default:
        return image += 'default.png'
    }
  
  }else {
    return image += 'default.png';
  }
}

