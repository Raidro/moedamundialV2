import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import telaPrincipal from '../screens/tela_principal/index.js'


export default createAppContainer(createSwitchNavigator(
  {
    
    telaPrincipal: { screen: telaPrincipal },
    
  },
  {
    initialRouteName: 'telaPrincipal',
  }
));