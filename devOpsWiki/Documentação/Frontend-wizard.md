O nosso fronteend foi feito usando um sistema Cross-platform(andoid e ios), sendo assim permitido termos o app a funcionar nos dois sistemas operativos.

A baixo explico as dependências que usamos e o porque de usarmos as mesmas:
- **axios:** Usado para efetuar requests ao backend e assim interligar as duas apps;
- **babel:** Usada para compilar o typescript para javascript;
- **@types/*:** Dependências usadas para conseguirmos ter a tipagem de dependências que não a trazem nativamente;
- **@expo-google-fonts/*:** Dependências usadas para termos outros tipos de letras na app;
- **@expo/vector-icons:** Dependência para conseguirmos utilizar icons na app;
- **@expo/webpack-config** otimiza a execução de projetos universais React e react-native-web
- **expo-app-loading** adiciona a tela de splash da app
- **expo-document-picker**: Usado para editar o curriculo;
"@react-native-async-storage/async-storage": Um sistema de armazenamento assíncrono, não criptografado, persistente e de valor-chave para React Native;
- **expo-linear-gradient:** fornece uma visualização nativa do React que faz a transição entre várias cores em uma direção linear;
- **expo-status-bar:** oferece um componente e uma interface imperativa para controlar a barra de status da app
- **react-dom:** métodos que podem ser usados ​​no nível superior do seu aplicativo e como uma saída de emergência para sair do modelo React, se necessário;
- **react-native-dropdown-select-list:** Adiciona uma lista de seleção; 
- **react-native-gesture-handler:** fornece APIs de gerenciamento de gestos orientadas nativamente para criar as melhores experiências possíveis baseadas em toque no React Native;
- **react-native-iphone-x-helper:** Usado para ajudar na responsividade; 
- **react-native-safe-area-context:** forma flexivel para mexer na safe area;
- **react-native-svg:** Facilitar o upload de ficheiro SVG;
- **react-native-web:** Torna possível executar componentes e APIs React Native na web usando o React DOM;
- **@react-native-community/checkbox:** Adiciona um componente de CheckBox;
- **@react-navigation/native:** Foi usado para navegação entre telas;
- **@react-navigation/native-stack:** Melhora o desempenho durante a navegação;
- **@react-navigation/stack:** Fornece uma maneira para a app fazer a transição entre telas onde cada nova tela é colocada no topo de uma "pilha";
- **react-native:** Dependência usada para criar o app corss-platform;
- **react**: Dependência que "trabalha" em conjunto com o `react-native`;
- **@react-native-async-storage/async-storage:** Usado para conseguirmos salvar dados na cache do app, como por exemplo o token do utilizador e a que horas pode pedir para lhe ser enviado de novo o email de confirmação de conta;
 