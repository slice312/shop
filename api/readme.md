## Как дебажить в WebStorm
### 1 метод, самый простой
1. `npm run build` - (`"babel src -d dist --source-maps"`) для того чтобы babel преобразовал код  
  и создал для него source maps на мой исходный код.
  + `-d dist` - dist это папка которую указал в `webpack.config.js`
1. В WebStorm создать конфигурацию Node.js
  + `Node interpreter` - `D:\Projects\react\Zeon\shop\api\node_modules\.bin\babel-node.cmd` - путь до babel-node
  + `Working directory` - папка проекта (`D:\Projects\react\Zeon\shop\api`)
  + `JavaScript file` - точка входа (`src\index.js`)

<br/>

### через nodemon
`    "debug": "nodemon --exec ./node_modules/.bin/babel-node --config-file ./babel.config.json --inspect src/index.js"` такой можно запустить через nodemon и в консоле будет сообщение о том что дебагер слушает порт.

Дальше хз как, не разобрался как при атачить дебагер вебсторма

<br/><br/>

## Как дебажить в Visual Studio Code
+ https://stackoverflow.com/questions/38557822/debugging-in-visual-studio-code-with-babel-node
+ https://www.youtube.com/watch?v=YTVFqkqlNo8

