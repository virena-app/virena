export const populateImg = function(image, selected) {
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
            return populateImg(image, selected.children[0])
          
          return `${image}/Screen-Drawer/${selected.children.length}DrawerScreen.png`;
        }
      
      case 'Simple Screen':
      // if(selected.children && selected.children.length) 
        return `${image}/Screen/${selected.children.length}screen.png`;
        
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

