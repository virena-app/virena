export const populateImg = function(image, selected) {
  if(selected) {
    switch(selected.subtitle) {
      case 'BottomTab':
        console.log(`children ${selected.children}`);
        if(selected.children && selected.children.length) 
          return `image${selected.children.length}tab.png`;
      
      case 'Drawer':
        if(selected.children && selected.children.length) 
          return `image${selected.children.length}drawer.png`;
      
      case 'Simple Screen':
        return image += 'simple.png';
        
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

